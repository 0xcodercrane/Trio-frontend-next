'use client';

import { Button } from '@/components/ui/button';
import { useRandomInscriptionsQuery } from '@/lib/services';
import { MediaWrapper } from '../common';
import { Skeleton } from '../ui/skeleton';
import { Container } from '../Container';

const IMG_HEIGHT = 360;

export default function LaunchACollection() {
  const { data, isPending, error } = useRandomInscriptionsQuery({ limit: 8, offset: 0 });

  return (
    <Container padding className='bg-ob-purple-dark'>
      <div className='flex h-full max-h-[100vh] w-full flex-row items-center justify-center overflow-hidden'>
        <div className='flex flex-col gap-4'>
          <h2 className='bold capitalize'>Launch a Collection</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam.
          </span>
          <div className='flex flex-row gap-4'>
            <Button className='min-w-[90px]'>Launch</Button>
            <Button className='min-w-[90px]' variant='outline'>
              View Collections
            </Button>
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
