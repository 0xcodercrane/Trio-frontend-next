'use client';

import { useState } from 'react';
import { Filters } from './Filters';
import { EFILTERS, EVIEW_TYPES } from '@/lib/constants';
import { InscriptionsGrid } from '@/components/Grids';
import { InscriptionsTable } from '@/components/Tables';
import { useInscriptionsByCollectionId } from '@/lib/services/fetchInscriptionsByCollectionId';
import { useFilter } from '@/lib/hooks/useFilter';

export const FilterPanel = ({ viewType, collectionId }: { viewType: EVIEW_TYPES; collectionId: number }) => {
  const [currentFilter, setCurrentFilter] = useState(EFILTERS.MOST_LIKED);
  const filter = useFilter();
  const { data, isPending, error, isPlaceholderData } = useInscriptionsByCollectionId(collectionId!, {
    offset: filter.offset,
    limit: filter.limit
  });

  if (!data) return <>No data</>;

  return (
    <>
      <div className='basis-1/6'>
        <Filters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      </div>
      <div className='basis-5/6'>
        {viewType === EVIEW_TYPES.GRID ? (
          // @ts-expect-error - TODO: The type is actually correct for inscriptions. But it still needs to be completely fleshed out.
          <InscriptionsGrid inscriptions={data} />
        ) : (
          // @ts-expect-error - TODO: The type is actually correct for inscriptions. But it still needs to be completely fleshed out.
          <InscriptionsTable inscriptions={data} nextPageLoading={isPlaceholderData} />
        )}
      </div>
    </>
  );
};
