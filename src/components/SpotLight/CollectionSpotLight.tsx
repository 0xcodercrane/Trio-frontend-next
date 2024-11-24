'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCollectionBySlugQuery } from '@/lib/services';
import { MediaWrapper } from '../common';
import InscriptionSkeleton from '../Skeletons/InscriptionSkeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CollectionSpotLight({ slug }: { slug: string }) {
  const { data, isPending, error } = useCollectionBySlugQuery(slug);
  return (
    <div className='mt-[--section-vertical-padding] flex h-[80vh] flex-row gap-8'>
      <div className='flex h-full w-1/2 flex-col justify-center gap-8 py-24 text-white'>
        <h2 className='max-w-md font-bold capitalize'>{data?.name}</h2>
        <span className='max-w-md text-ob-grey-lightest'>{data?.description}</span>
        <Link href={`/collections/${slug}`} className={cn(buttonVariants({ variant: 'cta' }))}>
          View Collection
        </Link>
      </div>
      <div className='max-w-1/2 flex items-center justify-center'>
        {isPending && <InscriptionSkeleton size='--inscription-larger' />}
        {!isPending && (
          <MediaWrapper
            id={data?.inscriptions[0].inscription_id}
            size='--inscription-larger'
            className='relative overflow-hidden rounded-xl'
          />
        )}
      </div>
    </div>
  );
}
