'use client';

import { Inscription } from '@/types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { MediaWrapper } from '../common';
import { useRouter } from 'next/navigation';

//TODO - Figure out the type for objects receives as a result of a join from supabase
export default function SingleCollectionInscriptionsTable({
  inscriptions,
  nextPageLoading
}: {
  inscriptions: Inscription[];
  nextPageLoading: boolean;
}) {
  const router = useRouter();
  if (!inscriptions) return null;
  return (
    <div className='w-full'>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Last Sold</TableHead>
            <TableHead>% Change</TableHead>
            <TableHead>Rare Sats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody style={{ gap: 4 }}>
          {inscriptions.map((inscription, index) => {
            return (
              <TableRow
                key={index}
                onClick={() => router.push(`/collections/${inscription.collection.slug}/${inscription.inscription_id}`)}
                className='cursor-pointer'
              >
                <TableCell>
                  <div className='flex h-[--inscription-tiniest] min-h-[--inscription-tiniest] flex-row items-center gap-2'>
                    <div className='h-[--inscription-tiniest] w-[--inscription-tiniest]'>
                      <MediaWrapper
                        id={inscription.inscription_id}
                        size='full'
                        blur={nextPageLoading}
                        className={`relative overflow-hidden rounded-sm`}
                      />
                    </div>
                    <span className='text-lg font-bold'>{inscription.name}</span>
                  </div>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
