'use client';

import { LatestTrades } from '@/types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { satsToBitcoin, shortenAddress, shortenInscriptionId, shortenTxid } from '@/lib/utilities';
import { Info } from 'lucide-react';
import { MediaWrapper } from '@/components/common';
import { DateTime } from 'luxon';
import { MEMPOOL_SPACE_URL } from '@/lib/constants';
import Link from 'next/link';

export function CollectionTradesTable({ latestTrades, isLoading }: { latestTrades: LatestTrades; isLoading: boolean }) {
  return (
    <div className='h-full w-full text-white'>
      <Table className='h-full w-full'>
        <TableHeader className='sticky top-0'>
          <TableRow>
            <TableHead align='left'>Name</TableHead>
            <TableHead align='left'>Type</TableHead>
            <TableHead align='right'>Price</TableHead>
            <TableHead align='right'>Seller</TableHead>
            <TableHead align='right'>Buyer</TableHead>
            <TableHead align='right'>Time</TableHead>
            <TableHead align='right'>Transaction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody style={{ gap: 4 }} className='overflow-auto'>
          {isLoading
            ? Array.from({ length: 10 }).map((_, indexRow) => (
                <TableRow key={`row-${indexRow}`}>
                  {Array.from({ length: 7 }).map((_, indexCell) => (
                    <TableCell key={`cell-${indexCell}`}>
                      <Skeleton className='min-h-12 w-full' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : latestTrades.map((trade) => {
                return (
                  <TableRow key={trade.transaction_id}>
                    <TableCell align='left'>
                      <Link href={`/inscriptions/${trade.inscription_id}`}>
                        <div className='flex h-12 min-w-32 flex-row items-center gap-4'>
                          <div className='aspect-square w-12 overflow-hidden rounded-lg'>
                            <MediaWrapper id={trade.inscription_id} className='!static !max-w-full' />
                          </div>
                          <div className='text-lg font-bold'>
                            {trade.inscription_name ?? `Inscription ${shortenInscriptionId(trade.inscription_id)}`}
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell align='left'>Sale</TableCell>
                    <TableCell align='right'>{trade.price ? satsToBitcoin(trade.price) + ' BTC' : '—'}</TableCell>
                    <TableCell align='right'>{shortenAddress(trade.maker_address)}</TableCell>
                    <TableCell align='right'>{shortenAddress(trade.taker_address)}</TableCell>
                    <TableCell align='right'>
                      {trade.trade_timestamp ? DateTime.fromISO(trade.trade_timestamp).toRelative() : '—'}
                    </TableCell>
                    <TableCell align='right'>
                      {trade.transaction_id ? (
                        <Link href={`${MEMPOOL_SPACE_URL}/tx/${trade.transaction_id}`}>
                          {shortenTxid(trade.transaction_id)}
                        </Link>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      {!isLoading && latestTrades.length === 0 && (
        <div className='flex w-full items-center gap-2 p-4 text-lg text-white'>
          <Info size={32} /> No trade activity found.
        </div>
      )}
    </div>
  );
}
