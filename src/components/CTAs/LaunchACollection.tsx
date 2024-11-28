'use client';

import { Button } from '@/components/ui/button';
import { useRandomInscriptionsQuery } from '@/lib/services';
import { MediaWrapper } from '../common';
import { Skeleton } from '../ui/skeleton';
import { Container } from '../Container';
import { useRouter } from 'next/navigation';
import { ButtonLink } from '../common/ButtonLink';

export default function LaunchACollection() {
  const router = useRouter();
  const { data, isPending, error } = useRandomInscriptionsQuery({ limit: 8, offset: 0 });

  return (
    <Container padding className='bg-ob-purple-darkest'>
      <div className='flex h-full max-h-[100vh] w-full flex-row items-center justify-center overflow-hidden'>
        <div className='flex w-1/2 flex-col gap-4'>
          <h2 className='bold capitalize'>Launch a Collection</h2>
          <span>
            The trio marketplace is home to our innovative collection launchpad. We make it easy for artists and creators to
            upload and configure the launch of their project. From the price of each item, to setting whitelists, we have the
            most advanced collection launchpad in the industry.
          </span>
          <div className='flex flex-row gap-4'>
            <ButtonLink href='/launchpad' buttonTxt='Launch' />
          </div>
        </div>

        <div className='flex w-1/2 flex-row items-center justify-center gap-4'>
          <div className='-mb-96 flex h-full w-2/5 flex-col gap-4'>
            {(isPending || error) && <VerticalInscriptionsSkeleton />}
            {!isPending &&
              data &&
              data.map((inscription, index) => {
                return (
                  <MediaWrapper
                    key={index}
                    id={inscription.inscription_id}
                    className='relative h-[--inscription-large] max-h-[--inscription-large] w-full overflow-hidden rounded-xl'
                  />
                );
              })}
          </div>

          <div className='mb-32 flex h-full w-2/5 flex-col gap-4'>
            {(isPending || error) && <VerticalInscriptionsSkeleton />}
            {!isPending &&
              data &&
              data.slice(5, 8).map((inscription, index) => {
                return (
                  <MediaWrapper
                    key={index}
                    id={inscription.inscription_id}
                    className='relative h-[--inscription-large] max-h-[--inscription-large] w-full overflow-hidden rounded-xl'
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Container>
  );
}

const VerticalInscriptionsSkeleton = () =>
  Array.from({ length: 4 }).map((_, index) => {
    return <Skeleton key={index} className='h-[--inscription-tall] max-h-[--inscription-tall] w-full rounded-xl' />;
  });
