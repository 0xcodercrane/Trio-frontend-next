'use client';

import { useFilter } from '@/lib/hooks/useFilter';
import { useCollections } from '@/lib/services';
import { CollectionsTable } from '@/components/Tables';

export const MultiCollectionFilterPanel = () => {
  const { offset, limit, searchKeyword } = useFilter();

  const { data, isLoading } = useCollections({ offset, limit }, searchKeyword);

  return (
    <div className='flex w-full flex-row gap-8'>
      {/* <div className='basis-1/6'>
        <Filters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      </div> */}
      <div className='w-full'>
        <CollectionsTable isLoading={isLoading} collections={data} />
      </div>
    </div>
  );
};
