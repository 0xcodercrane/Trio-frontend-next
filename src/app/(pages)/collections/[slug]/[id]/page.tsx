'use client';

import BuyNow from '@/components/BuyNow';
import PanelsWrapper from '@/components/Collection/panels';
import { Container } from '@/components/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollectionItemQuery } from '@/lib/services/fetchCollectionItem';

export default function Page({ params }: { params: { slug: string; id: string } }) {
  const { slug, id } = params;
  const { data, isPending, error } = useCollectionItemQuery(slug, id);

  return (
    <div className='flex h-auto w-full flex-col'>
      <div className='flex h-auto min-h-[--top-section-height] w-full flex-col items-center justify-center bg-ob-black-light pt-[--header-height]'>
        <Container padding>
          <div className='flex h-full flex-row items-center justify-center'>
            <div className='h-full basis-1/2 pt-12'>
              <Skeleton className='h-full max-h-[650px] w-full max-w-[650px] rounded-xl bg-ob-grey'></Skeleton>
            </div>

            <div className='flex h-full basis-1/2 flex-col items-start justify-start gap-8 px-12 py-24'>
              <div className='w-full'>
                {isPending && <Skeleton className='mb-2 h-12 w-2/3' />}
                {!isPending && <h2 className='mb-2'>{data?.name}</h2>}

                {isPending && (
                  <div className='flex h-[24px] w-1/2 flex-row gap-4'>
                    {Array.from({ length: 2 }).map((_, index) => (
                      <Skeleton key={index} className='h-full w-1/2 bg-ob-grey' />
                    ))}
                  </div>
                )}
                {!isPending && (
                  <div className='flex w-1/2 flex-row justify-start gap-4'>
                    <span>{data?.collection?.name}</span>
                    <span>By ARTIST NAME</span>
                  </div>
                )}
              </div>
              <BuyNow />
            </div>
          </div>
        </Container>
      </div>
      <PanelsWrapper collectionId={data?.collection_id} />
    </div>
  );
}
