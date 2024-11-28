'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInscriptionsWithPricesByCollection } from '@/lib/services';
import { InscriptionsGrid } from '@/components/Grids';

export const SingleCollectionFilterPanel = ({ slug }: { slug: string }) => {
  const { data: inscriptionsWithPrices, isPending, fetchNextPage } = useInscriptionsWithPricesByCollection(slug);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      {/* <div className='basis-1/6'>
        <Filters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      </div> */}
      <div className='basis-5/6'>
        {/* // @ts-expect-error - TODO: The type is actually correct for inscriptions. But it still needs to be completely fleshed out. */}
        <InscriptionsGrid inscriptions={(inscriptionsWithPrices as any) ?? []} loading={isPending} />
        <div ref={ref} />
        {/* // @ts-expect-error - TODO: The type is actually correct for inscriptions. But it still needs to be completely fleshed out.
          // <SingleCollectionInscriptionsTable inscriptions={inscriptions} nextPageLoading={isPlaceholderData} /> */}
      </div>
    </>
  );
};
