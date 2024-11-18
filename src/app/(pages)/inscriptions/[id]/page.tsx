'use client';

import { PanelsWrapper } from '@/components/Collection/FilterPanels';
import { Avatar, Divider } from '@/components/common';
import { useInscriptionDataQuery } from '@/components/common/MediaViewer/useInscriptionDataQuery';
import { Container } from '@/components/Container';
import { SplashPageLayout } from '@/components/Layouts';
import OrderFlow from '@/components/OrderFlow';
import Section from '@/components/Section';
import { Skeleton } from '@/components/ui/skeleton';
import { useInscriptionWithCollectionData } from '@/lib/services';
import { shortenAddress } from '@/lib/utilities';
import Link from 'next/link';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: collectionData, isPending: isPendingCollectionData } = useInscriptionWithCollectionData(id);
  const { data: inscriptionData } = useInscriptionDataQuery(id);

  return (
    <div className='flex h-auto w-full flex-col bg-ob-purple-darkest'>
      <Section className='flex items-center justify-center'>
        <SplashPageLayout media={{ type: 'inscription', id }} childrenWrapperJustify='start'>
          <Container paddingLeft className='basis-1/2'>
            <div className='flex h-full flex-col justify-start'>
              <div className='w-full'>
                {isPendingCollectionData && <Skeleton className='mb-2 h-12 w-2/3' />}
                {!isPendingCollectionData && <h2 className='mb-2'>{collectionData?.name}</h2>}

                {isPendingCollectionData && (
                  <div className='flex h-[24px] w-1/2 flex-row gap-4'>
                    {Array.from({ length: 2 }).map((_, index) => (
                      <Skeleton key={index} className='h-full w-1/2 bg-ob-grey' />
                    ))}
                  </div>
                )}
                {!isPendingCollectionData && (
                  <div className='flex w-1/2 flex-row justify-start gap-4'>
                    {/* @ts-ignore */}
                    <Link href={`/artists/${collectionData?.collection?.artist?.slug}`}>
                      By {(collectionData as unknown as any)?.collection?.artist?.name}
                    </Link>
                  </div>
                )}
                {!!inscriptionData && (
                  <div className='mt-2 flex flex-row justify-start gap-4 text-white'>
                    Owned by <Avatar size='xs' />
                    {shortenAddress(inscriptionData.details?.address)}
                  </div>
                )}
              </div>
              <Divider className='my-4' />
              <OrderFlow inscriptionId={id} />
            </div>
          </Container>
        </SplashPageLayout>
      </Section>
      <PanelsWrapper slug={(collectionData as unknown as any)?.collection?.slug || ''} />
    </div>
  );
}
