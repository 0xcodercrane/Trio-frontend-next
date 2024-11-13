'use client';

import { useMemo } from 'react';
import { Inscription } from '@/types/database';
import { MediaWrapper } from '../common';
import { InscriptionOverlay } from '../InscriptionOverlay';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import { useFilter } from '@/lib/hooks/useFilter';
import { mapSizeToGlobalVar } from '../FilterPanel/FilterPanelHeader/SizeSelector';
import { ESIZES } from '@/lib/constants';

export default function InscriptionsGrid({
  inscriptions,
  loading
}: {
  inscriptions: Array<{ inscription_id: string; name: string; price?: number }>;
  loading: boolean;
}) {
  const router = useRouter();
  const { size } = useFilter();
  return (
    <div className={`flex flex-row flex-wrap gap-2`}>
      {inscriptions.map((inscription, index) => (
        <div key={index} className={`relative ${mapSizeToBasis(size)}`}>
          {loading ? (
            <Skeleton className='h-full max-h-[--inscription-largest] w-full min-w-[--inscription-tiniest] max-w-[--inscription-largest] xs:min-h-[--inscription-tiniest] md:min-h-[--inscription-large]' />
          ) : (
            <div onClick={() => router.push(`/inscriptions/${inscription.inscription_id}`)} className='cursor-pointer'>
              <MediaWrapper
                id={inscription.inscription_id}
                className='relative max-w-full overflow-hidden rounded-xl'
                size={mapSizeToGlobalVar(size)}
                square
              />
              {/* TODO: Add price */}
              <InscriptionOverlay id={inscription.inscription_id} name={inscription.name || ''} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const mapSizeToBasis = (size: ESIZES) => {
  switch (size) {
    case ESIZES.XS:
      return 'basis-[9%]';
    case ESIZES.SM:
    case ESIZES.MD:
      return 'basis-[32%]';
    case ESIZES.LG:
    case ESIZES.XL:
    case ESIZES.XXL:
      return 'basis-[49%]';
  }
};
