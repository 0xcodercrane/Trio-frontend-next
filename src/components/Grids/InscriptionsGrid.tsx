'use client';

import { getHeight } from '@/lib/utilities';
import { MediaWrapper } from '../common';
import { InscriptionOverlay } from '../InscriptionOverlay';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';

export default function InscriptionsGrid({
  inscriptions,
  loading
}: {
  inscriptions: Array<{
    inscription_id: string;
    name: string;
    order_status?: 'active' | 'inactive' | 'pending_taker_confirmation' | 'pending_maker_confirmation' | 'broadcast';
    price?: number;
  }>;
  loading: boolean;
}) {
  const router = useRouter();
  // const { size } = useFilter();
  return (
    <div className='grid grid-cols-5 gap-2'>
      {inscriptions.map((inscription, index) => (
        <div key={inscription.inscription_id} className='group relative cursor-pointer'>
          {loading ? (
            <Skeleton
              className={`${getHeight('basis-[20%]')} w-full min-w-[--inscription-tiniest] max-w-[--inscription-largest]`}
            />
          ) : (
            <div
              onClick={() => router.push(`/inscriptions/${inscription.inscription_id}`)}
              className='max-h-[18vw] cursor-pointer overflow-hidden rounded-xl'
            >
              <MediaWrapper
                id={inscription.inscription_id}
                className='relative max-w-full overflow-hidden rounded-xl group-hover:opacity-80'
                size='18vw'
                square
              />

              <InscriptionOverlay
                id={inscription.inscription_id}
                name={inscription.name || ''}
                price={inscription.order_status === 'active' ? inscription.price : undefined}
              />
            </div>
          )}
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
