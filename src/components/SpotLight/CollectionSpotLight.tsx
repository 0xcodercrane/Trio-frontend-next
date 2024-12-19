'use client';
import { buttonVariants } from '@/components/ui/button';
import { useCollectionBySlugQuery } from '@/lib/services';
import { MediaWrapper } from '../common';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { Img } from '../Img';

const INNERS_DESCRIPTION = `Inners by Rebel Society is a vibrant 10k Ordinals free mint launching on Trio Launchpad December 19th, in partnership with Trio and Xverse.
The collection celebrates the spirited, childlike spark within us all—bursting with color, cheek, and a touch of snark. These playful characters embody freedom, authenticity, and a mischievous edge.`;

export function CollectionSpotLight({ slug }: { slug: string }) {
  const { data, isPending } = useCollectionBySlugQuery(slug);
  return (
    <div className='mt-[--section-vertical-padding] flex flex-row gap-8'>
      <div className='flex h-full w-1/2 flex-col justify-center gap-8 py-24 text-white'>
        {data ? <h2 className='max-w-md font-bold capitalize'>{data.name}</h2> : <Skeleton className='h-12 w-full' />}
        {data ? (
          <span className='max-w-md text-ob-grey-lightest'>
            {slug === 'inners' ? INNERS_DESCRIPTION : data?.description}
          </span>
        ) : (
          <Skeleton className='h-24 w-full' />
        )}
        {isPending ? (
          <Skeleton className='h-12 w-36' />
        ) : (
          <Link href={`/collections/${slug}`} className={cn(buttonVariants({ variant: 'cta' }), 'p-4')}>
            View Collection
          </Link>
        )}
      </div>
      <div className='max-w-1/2 flex max-h-[--inscription-larger] w-full items-end justify-end'>
        <div className='w-full max-w-[--inscription-larger]'>
          {slug === 'inners' ? (
            <Img className='max-w-full rounded-lg' src='/img/inners.webp' />
          ) : (
            <MediaWrapper
              id={data?.inscriptions[0].inscription_id}
              size='full'
              className='!static overflow-hidden rounded-xl'
            />
          )}
        </div>
      </div>
    </div>
  );
}
