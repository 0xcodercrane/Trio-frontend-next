'use client';

import { useState } from 'react';
import { EFILTERS, EVIEW_TYPES } from '@/lib/constants';
import { InscriptionsGrid } from '@/components/Grids';
import { useFilter } from '@/lib/hooks/useFilter';
import { useCollections, useRandomInscriptionsQuery } from '@/lib/services';
import { Filters } from '@/components/FilterPanel';
import { CollectionsTable, MultiCollectionInscriptionsTable } from '@/components/Tables';

export const MultiCollectionFilterPanel = () => {
  const [currentFilter, setCurrentFilter] = useState(EFILTERS.MOST_LIKED);
  const { offset, limit, setMax } = useFilter();

  const { data, isPending } = useCollections({ offset, limit });

  return (
    <div className='flex w-full flex-row gap-8'>
      {/* <div className='basis-1/6'>
        <Filters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      </div> */}
      <div className='w-full'>
        <CollectionsTable isLoading={isPending} collections={data} />
      </div>
    </div>
  );
};
