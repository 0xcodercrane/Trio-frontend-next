'use client';

import { useLatestTrades } from '@/lib/services';
import { useRouter } from 'next/navigation';
import { Loading, MediaWrapper } from '../common';
import { InscriptionOverlay } from '../InscriptionOverlay';

const LATEST_TRADES = 6;
export const LatestTrades = () => {
  const { data, isPending, error } = useLatestTrades('7 days', LATEST_TRADES);
  const router = useRouter();
  return (
    <div className='flex w-full flex-col gap-4'>
      <h3>Latest Trades</h3>
      {isPending && <Loading />}
      {error && <div>Error Fetching Latest Trading Activity</div>}
      {data && (
        <div className='grid w-full grid-cols-6 gap-4'>
          {data.slice(0, LATEST_TRADES).map(({ inscription_id, inscription_name, price }) => {
            return (
              <div key={inscription_id} className='cols-span-1 group relative cursor-pointer'>
                <div
                  onClick={() => router.push(`/inscriptions/${inscription_id}`, { scroll: true })}
                  className='cursor-pointer overflow-hidden rounded-xl'
                >
                  <MediaWrapper
                    id={inscription_id}
                    className='relative aspect-square w-full overflow-hidden rounded-xl group-hover:opacity-80'
                    square
                  />

                  <InscriptionOverlay id={inscription_id} name={inscription_name} price={price} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
