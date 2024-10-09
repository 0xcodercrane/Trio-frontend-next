'use client';

import { Button } from '@/components/ui/button';
import { useRandomInscriptionsQuery } from '@/lib/services';
import { MediaWrapper } from '../common/MediaViewer';
import { Skeleton } from '../ui/skeleton';

const IMG_HEIGHT = 360;

export default function LaunchACollection() {
  const { data, isPending, error } = useRandomInscriptionsQuery({ limit: 8, offset: 0 });

  return (
    <div className='flex h-full max-h-[100vh] w-full flex-row items-center justify-center overflow-hidden bg-ob-black-lighter'>
      <div className='flex h-full w-1/2 flex-col justify-start gap-8 p-24 text-white'>
        <h2 className='bold capitalize'>Launch a Collection</h2>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam.
        </span>
        <Button variant='secondary'>Launch</Button>
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
  );
}

const VerticalInscriptionsSkeleton = () =>
  Array.from({ length: 4 }).map((_, index) => {
    return <Skeleton key={index} className='h-[--inscription-tall] max-h-[--inscription-tall] w-full rounded-xl' />;
  });
