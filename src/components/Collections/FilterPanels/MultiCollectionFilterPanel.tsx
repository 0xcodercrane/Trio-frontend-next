'use client';

import { useState } from 'react';
import { EFILTERS, EVIEW_TYPES } from '@/lib/constants';
import { InscriptionsGrid } from '@/components/Grids';
import { useFilter } from '@/lib/hooks/useFilter';
import { useRandomInscriptionsQuery } from '@/lib/services';
import { Filters } from '@/components/FilterPanel';
import { MultiCollectionInscriptionsTable } from '@/components/Tables';

export const MultiCollectionFilterPanel = () => {
  const [currentFilter, setCurrentFilter] = useState(EFILTERS.MOST_LIKED);
  const { offset, limit, viewType } = useFilter();
  const { data, isPending, error, isPlaceholderData } = useRandomInscriptionsQuery({ offset, limit });

  if (!data) return <>No data</>;

  return (
    <div className='flex w-full flex-row gap-8'>
      <div className='basis-1/6'>
        <Filters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      </div>
      <div className='basis-5/6'>
        {viewType === EVIEW_TYPES.GRID ? (
          // @ts-expect-error - TODO: The type is actually correct for inscriptions. But it still needs to be completely fleshed out.
          <InscriptionsGrid inscriptions={data} />
        ) : (
          <MultiCollectionInscriptionsTable inscriptions={data} nextPageLoading={isPlaceholderData} />
        )}
      </div>
    </div>
  );
};
