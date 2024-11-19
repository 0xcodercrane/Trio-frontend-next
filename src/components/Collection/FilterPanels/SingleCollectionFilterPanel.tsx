'use client';

import { useMemo, useState } from 'react';
import { Filters } from '../../FilterPanel/Filters';
import { EFILTERS, EVIEW_TYPES } from '@/lib/constants';
import { InscriptionsGrid } from '@/components/Grids';
import { SingleCollectionInscriptionsTable } from '@/components/Tables';
import { useFilter } from '@/lib/hooks/useFilter';
import { useInscriptionsByCollectionSlug } from '@/lib/services/fetchInscriptionsByCollectionSlug';
import { useInscriptionsWithPricesByCollection } from '@/lib/services';

export const SingleCollectionFilterPanel = ({ slug }: { slug: string }) => {
  const [currentFilter, setCurrentFilter] = useState(EFILTERS.MOST_LIKED);

  const { offset, limit, viewType } = useFilter();
  const {
    data: defaultInscriptions,
    isPending,
    error,
    isPlaceholderData
  } = useInscriptionsByCollectionSlug(slug, {
    offset,
    limit
  });

  const { data: inscriptionsWithPrices } = useInscriptionsWithPricesByCollection(slug);

  if (!defaultInscriptions) return <>No data</>;

  return (
    <>
      <div className='basis-1/6'>
        <Filters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      </div>
      <div className='basis-5/6'>
        {viewType === EVIEW_TYPES.GRID ? (
          // @ts-expect-error - TODO: The type is actually correct for inscriptions. But it still needs to be completely fleshed out.
          <InscriptionsGrid inscriptions={inscriptionsWithPrices} loading={isPending} />
        ) : (
          // @ts-expect-error - TODO: The type is actually correct for inscriptions. But it still needs to be completely fleshed out.
          <SingleCollectionInscriptionsTable inscriptions={defaultInscriptions} nextPageLoading={isPlaceholderData} />
        )}
      </div>
    </>
  );
};
