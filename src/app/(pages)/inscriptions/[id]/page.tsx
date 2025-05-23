'use client';

import NotFound from '@/app/not-found';
import { Panels } from '@/components/Collection/FilterPanels';
import { useInscriptionDataQuery } from '@/components/common/MediaViewer/useInscriptionDataQuery';
import InscriptionInfo from '@/components/InscriptionInfo';
import { SplashPageLayout } from '@/components/Layouts';
import OrderFlow from '@/components/OrderFlow';
import Section from '@/components/Section';
import { Skeleton } from '@/components/ui/skeleton';
import { useInscriptionWithCollectionData } from '@/lib/services';
import { shortenAddress } from '@/lib/utilities';
import { EMediaType } from '@/types';
import Link from 'next/link';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: collectionData, isPending: isPendingCollectionData } = useInscriptionWithCollectionData(id) as any;
  const { data: inscriptionData, isLoading: isLoadingInscriptionData } = useInscriptionDataQuery(id);

  if (!isLoadingInscriptionData && !inscriptionData) {
    return <NotFound />;
  }

  return (
    <div className='mt-12 flex h-auto w-full flex-col bg-ob-purple-darkest'>
      <Section className='flex items-center justify-center'>
        <SplashPageLayout media={{ type: EMediaType.INSCRIPTION, id }}>
          <div className='flex h-full flex-col justify-start gap-4'>
            <div className='w-full'>
              {isPendingCollectionData || isLoadingInscriptionData ? (
                <Skeleton className='h-12 w-2/3' />
              ) : (
                <h3 className='text-2xl md:text-3xl lg:text-4xl'>
                  {collectionData?.name ?? `Inscription #${inscriptionData?.details.number}`}
                </h3>
              )}

              {isPendingCollectionData ? (
                <Skeleton className='my-2 h-6 w-full' />
              ) : (
                <div className='my-2'>
                  {collectionData?.collection ? (
                    <Link className='font-semibold' href={`/collections/${collectionData.collection.slug}`}>
                      From {collectionData.collection.name}
                    </Link>
                  ) : (
                    <div className='text-white'>This inscription is not part of any recognized collection.</div>
                  )}
                </div>
              )}
              {isPendingCollectionData && (
                <div className='flex h-[24px] w-1/2 flex-row gap-4'>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <Skeleton key={index} className='h-full w-1/2' />
                  ))}
                </div>
              )}
              {
                // !isPendingCollectionData && (
                //   <div className='flex w-1/2 flex-row justify-start gap-4'>
                //     {/* @ts-ignore */}
                //     <Link href={`/artists/${collectionData?.collection?.artist?.slug}`}>
                //       By {(collectionData as unknown as any)?.collection?.artist?.name}
                //     </Link>
                //   </div>
                // )
              }
              {!!inscriptionData && (
                <div className='mt-2 flex flex-row justify-start gap-4 font-semibold text-white'>
                  Owned by {shortenAddress(inscriptionData.details?.address)}
                </div>
              )}
            </div>
            <OrderFlow inscriptionId={id} collectionSlug={collectionData?.collection?.slug} />
            <InscriptionInfo details={inscriptionData?.details} />
          </div>
        </SplashPageLayout>
      </Section>
      {collectionData?.collection_id && (
        <Panels showOnlyItems slug={(collectionData as unknown as any)?.collection?.slug || ''} />
      )}
    </div>
  );
}
