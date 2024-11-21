'use client';

import { Collection } from '@/types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { satsToBitcoin } from '@/lib/utilities';
import { useMemo } from 'react';

//TODO - Figure out the type for objects receives as a result of a join from supabase
type CollectionExt = Collection & { floor_price: number; total_listings: number; total_supply: number };
export function CollectionsTable({ collections, isLoading }: { collections: CollectionExt[]; isLoading: boolean }) {
  const router = useRouter();

  return (
    <div className='w-full'>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead align='left'>Collection</TableHead>
            <TableHead align='right'>Floor price</TableHead>
            <TableHead align='right'>Listed</TableHead>
            <TableHead align='right'>Total Supply</TableHead>
            <TableHead align='right'>24h % Change</TableHead>
            <TableHead align='right'>24h Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody style={{ gap: 4 }}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, indexRow) => (
                <TableRow key={`row-${indexRow}`}>
                  {Array.from({ length: 5 }).map((_, indexCell) => (
                    <TableCell key={`cell-${indexCell}`}>
                      <Skeleton className='min-h-6 w-full' />
                    </TableCell>
                  ))}
                  <TableCell align='right'>
                    <Skeleton className='min-h-6 w-full' />
                  </TableCell>
                </TableRow>
              ))
            : collections.map((collection, index) => {
                return (
                  <TableRow
                    key={collection.id}
                    onClick={() => router.push(`/collections/${collection.slug}`)}
                    className='cursor-pointer'
                  >
                    <TableCell>
                      <div className='flex h-12 min-h-12 flex-row items-center gap-2'>
                        <img src={collection.icon || ''} className='h-12 w-12' />

                        <span className='text-lg font-bold'>{collection.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align='right'>
                      {collection.floor_price ? satsToBitcoin(collection.floor_price) + ' BTC' : '—'}
                    </TableCell>
                    <TableCell align='right'>
                      {collection.total_listings} ({Math.round((collection.total_listings / collection.total_supply) * 100)}
                      %)
                    </TableCell>
                    <TableCell align='right'>{collection.total_supply}</TableCell>
                    <TableCell align='right'>—</TableCell>
                    <TableCell align='right'>—</TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
}
