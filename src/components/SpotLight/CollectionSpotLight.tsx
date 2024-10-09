'use client';
import { Button } from '@/components/ui/button';
import { useCollectionBySlugQuery } from '@/lib/services';
import { MediaWrapper } from '../common/MediaViewer';
import InscriptionSkeleton from '../Skeletons/InscriptionSkeleton';

export function CollectionSpotLight({ slug }: { slug: string }) {
  const { data, isPending, error } = useCollectionBySlugQuery(slug);
  return (
    <div className='flex h-[80vh] flex-row'>
      <div className='flex h-full w-1/2 flex-col justify-center gap-8 py-24 text-white'>
        <h2 className='font-bold capitalize'>Collection Spotlight</h2>
        <span className='text-ob-grey-lightest'>{data?.description}</span>
        <Button variant='secondary' className='capitalize'>
          View Collections
        </Button>
      </div>
      <div className='flex h-full w-1/2 items-center justify-center'>
        {isPending && <InscriptionSkeleton />}
        {!isPending && (
          <MediaWrapper
            id={data?.inscriptions[0].inscription_id}
            square
            size={350}
            className='relative overflow-hidden rounded-xl'
          />
        )}
      </div>
    </div>
  );
}
