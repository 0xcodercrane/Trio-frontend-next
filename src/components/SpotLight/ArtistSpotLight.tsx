'use client';

import { Button } from '@/components/ui/button';
import { useArtistQuery } from '@/lib/services';
import InscriptionSkeleton from '../Skeletons/InscriptionSkeleton';
import { MediaWrapper } from '../common/MediaViewer';

export function ArtistSpotLight({ slug }: { slug: string }) {
  const { data, isPending, error } = useArtistQuery(slug);
  return (
    <div className='flex h-[80vh] flex-row'>
      <div className='flex h-full w-1/2 flex-col justify-center gap-8 py-24 text-white'>
        <h2 className='font-bold capitalize'>Artist Spotlight</h2>
        <span className='text-ob-grey-lightest'>{data?.description}</span>
        <Button variant='secondary' className='capitalize'>
          View Artist
        </Button>
      </div>
      <div className='flex w-1/2 items-center justify-center'>
        {isPending && <InscriptionSkeleton />}
        {!isPending && (
          <MediaWrapper
            id={data?.collections && data.collections[0].inscriptions?.inscription_id}
            square
            size={350}
            className='relative overflow-hidden rounded-xl'
          />
        )}
      </div>
    </div>
  );
}
