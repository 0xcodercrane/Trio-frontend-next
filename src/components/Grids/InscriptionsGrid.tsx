'use client';

import { getHeight } from '@/lib/utilities';
import { MediaWrapper } from '../common';
import { InscriptionOverlay } from '../InscriptionOverlay';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';

export default function InscriptionsGrid({
  inscriptions,
  isFetching
}: {
  inscriptions: Array<{
    inscription_id: string;
    name: string;
    order_status?: 'active' | 'inactive' | 'pending_taker_confirmation' | 'pending_maker_confirmation' | 'broadcast';
    price?: number;
  }>;
  isFetching: boolean;
}) {
  const router = useRouter();
  // const { size } = useFilter();
  return (
    <div className='grid grid-cols-5 gap-4'>
      {isFetching
        ? Array.from({ length: 10 }).map((_, indexRow) => (
            <Skeleton key={`skeleton-inscriptions-grid-${indexRow}`} className='aspect-square w-full' />
          ))
        : inscriptions.map((inscription, index) => (
            <div key={inscription.inscription_id} className='group relative cursor-pointer'>
              <div
                onClick={() => router.push(`/inscriptions/${inscription.inscription_id}`, { scroll: true })}
                className='cursor-pointer overflow-hidden rounded-xl'
              >
                <MediaWrapper
                  id={inscription.inscription_id}
                  className='relative aspect-square w-full overflow-hidden rounded-xl group-hover:opacity-80'
                  square
                />

                <InscriptionOverlay
                  id={inscription.inscription_id}
                  name={inscription.name || ''}
                  price={inscription.order_status === 'active' ? inscription.price : undefined}
                />
              </div>
            </div>
          ))}
    </div>
  );
}

// const mapSizeToBasis = (size: ESIZES) => {
//   switch (size) {
//     case ESIZES.XS:
//       return 'basis-[9%]';
//     case ESIZES.SM:
//     case ESIZES.MD:
//       return 'basis-[32%]';
//     case ESIZES.LG:
//     case ESIZES.XL:
//     case ESIZES.XXL:
//       return 'basis-[49%]';
//   }
// };
