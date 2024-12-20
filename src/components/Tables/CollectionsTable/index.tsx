'use client';

import { Collections } from '@/types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { satsToBitcoin } from '@/lib/utilities';
import { useContext } from 'react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { Info } from 'lucide-react';
import { CollectionIcon } from '@/components/CollectionIcon';

//TODO - Use supabase types - do not redeclare
export function CollectionsTable({
  collections,
  isLoading,
  searchMode = false
}: {
  collections: Collections;
  isLoading: boolean;
  searchMode?: boolean;
}) {
  const router = useRouter();
  const {
    menuDisclosure: { close }
  } = useContext(GlobalContext);

  const handleRowClick = (collectionSlug: string) => {
    router.push(`/collections/${collectionSlug}`, { scroll: true });
    close();
  };

  return (
    <div className='h-full w-full'>
      <Table className='h-full w-full'>
        <TableHeader className={`sticky ${searchMode ? 'top-[-1rem]' : 'top-0'}`}>
          <TableRow>
            <TableHead align='left'>Collection</TableHead>
            <TableHead align='right'>Floor price</TableHead>
            <TableHead align='right'>7D Volume</TableHead>
            {!searchMode && (
              <>
                <TableHead align='right'>Listed</TableHead>
                <TableHead align='right'>Total Supply</TableHead>
              </>
            )}

            {/* <TableHead align='right'>24h % Change</TableHead>
            <TableHead align='right'>24h Volume</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody style={{ gap: 4 }} className='overflow-auto'>
          {isLoading
            ? Array.from({ length: 10 }).map((_, indexRow) => (
                <TableRow key={`row-${indexRow}`}>
                  {Array.from({ length: searchMode ? 3 : 5 }).map((_, indexCell) => (
                    <TableCell key={`cell-${indexCell}`}>
                      <Skeleton className='min-h-12 w-full' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : collections.map((collection) => {
                return (
                  <TableRow key={collection.id} onClick={() => handleRowClick(collection.slug)} className='cursor-pointer'>
                    <TableCell>
                      <div className='flex h-12 flex-row items-center gap-4'>
                        <CollectionIcon
                          showFallback
                          slug={collection.slug}
                          src={collection.icon}
                          className='aspect-square w-12'
                        />
                        <span className='text-lg font-bold'>{collection.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align='right'>
                      {collection.floor_price ? satsToBitcoin(collection.floor_price) + ' BTC' : '—'}
                    </TableCell>
                    <TableCell align='right'>{satsToBitcoin(collection?.weekly_trading_volume || 0) + ' BTC'}</TableCell>
                    {!searchMode && (
                      <>
                        <TableCell align='right'>
                          {collection.total_listings} (
                          {Math.round((collection.total_listings / collection.total_supply) * 100)}
                          %)
                        </TableCell>
                        <TableCell align='right'>{collection.total_supply}</TableCell>
                      </>
                    )}

                    {/* <TableCell align='right'>—</TableCell>
                    <TableCell align='right'>—</TableCell> */}
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      {!isLoading && collections.length === 0 && (
        <div className='flex w-full items-center gap-2 p-4 text-lg text-white'>
          <Info size={32} /> No collections found.
        </div>
      )}
    </div>
  );
}
