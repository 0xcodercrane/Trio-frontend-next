'use client';

import { PanelsWrapper } from '@/components/Collection/FilterPanels';
import { Divider } from '@/components/common';
import { Container } from '@/components/Container';
import { SplashPageLayout } from '@/components/Layouts';
import OrderFlow from '@/components/OrderFlow';
import Section from '@/components/Section';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollectionItemByIdQuery } from '@/lib/services';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string; id: string } }) {
  const { slug, id } = params;

  const { data, isPending, error } = useCollectionItemByIdQuery(slug, id);

  return (
    <div className='flex h-auto w-full flex-col bg-ob-black-light'>
      <Section className='flex items-center justify-center'>
        <SplashPageLayout media={{ type: 'inscription', id }}>
          <Container paddingLeft className='basis-1/2'>
            <div className='flex h-full flex-col justify-center'>
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
              <Divider className='my-4' />
              <OrderFlow />
            </div>
          </Container>
        </SplashPageLayout>
      </Section>
      <PanelsWrapper slug={slug} />
    </div>
  );
}
