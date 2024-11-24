'use client';

import { Panels } from '@/components/Collection/FilterPanels';
import { Avatar, Divider } from '@/components/common';
import { useInscriptionDataQuery } from '@/components/common/MediaViewer/useInscriptionDataQuery';
import { Container } from '@/components/Container';
import InscriptionInfo from '@/components/InscriptionInfo';
import { SplashPageLayout } from '@/components/Layouts';
import OrderFlow from '@/components/OrderFlow';
import Section from '@/components/Section';
import { Skeleton } from '@/components/ui/skeleton';
import { useInscriptionWithCollectionData } from '@/lib/services';
import { shortenAddress } from '@/lib/utilities';
import Link from 'next/link';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: collectionData, isPending: isPendingCollectionData } = useInscriptionWithCollectionData(id) as any;
  const { data: inscriptionData, isLoading: isLoadingInscriptionData } = useInscriptionDataQuery(id);

  return (
    <div className='mt-12 flex h-auto w-full flex-col bg-ob-purple-darkest'>
      <Section className='flex items-center justify-center'>
        <SplashPageLayout media={{ type: 'inscription', id }} childrenWrapperJustify='start'>
          <Container paddingLeft className='basis-1/2'>
            <div className='flex h-full flex-col justify-start gap-4'>
              <div className='w-full'>
                {isPendingCollectionData || isLoadingInscriptionData ? (
                  <Skeleton className='h-12 w-2/3' />
                ) : (
                  <h3>{collectionData?.name ?? `Inscription #${inscriptionData?.details.number}`}</h3>
                )}

                {isPendingCollectionData ? (
                  <Skeleton className='my-2 h-6 w-full' />
                ) : (
                  <div className='my-2'>
                    {collectionData?.collection ? (
                      <Link className='font-semibold text-ob-yellow' href={`/collections/${collectionData.collection.slug}`}>
                        {collectionData.collection.name}
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
                  <div className='mt-2 flex flex-row justify-start gap-4 text-white'>
                    Owned by <Avatar size='xs' />
                    {shortenAddress(inscriptionData.details?.address)}
                  </div>
                )}
              </div>
              <Divider className='my-4' />
              <OrderFlow inscriptionId={id} />
              <InscriptionInfo details={inscriptionData?.details} />
            </div>
          </Container>
        </SplashPageLayout>
      </Section>
      {collectionData?.collection_id && <Panels slug={(collectionData as unknown as any)?.collection?.slug || ''} />}
    </div>
  );
}
