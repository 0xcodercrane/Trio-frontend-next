'use client';

import BuyNow from '@/components/BuyNow';
import { PanelsWrapper } from '@/components/Collection/FilterPanels';
import { MediaWrapper } from '@/components/common/MediaViewer';
import { Container } from '@/components/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollectionItemByIdQuery } from '@/lib/services';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string; id: string } }) {
  const { slug, id } = params;
  const { data, isPending, error } = useCollectionItemByIdQuery(slug, id);

  return (
    <div className='flex h-auto w-full flex-col'>
      <div className='flex h-auto min-h-[--top-section-height] w-full flex-col items-center justify-center bg-ob-black-light pt-[--header-height]'>
        <Container padding>
          <div className='flex h-full flex-row items-center justify-center'>
            <div className='flex h-full basis-1/2 items-center justify-center'>
              <div className='max-h-[--inscription-largest] max-w-[--inscription-largest]'>
                <MediaWrapper
                  id={data?.inscription_id}
                  size={'full'}
                  square
                  className='relative overflow-hidden rounded-xl'
                />
              </div>
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
                    {/* @ts-ignore */}
                    <Link href={`/artists/${data?.collection?.artist?.slug}`}>By {data?.collection?.artist?.name}</Link>
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
