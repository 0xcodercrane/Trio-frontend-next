'use client';

import { Button } from '@/components/ui/button';
import { useArtistQuery } from '@/lib/services';
import InscriptionSkeleton from '../Skeletons/InscriptionSkeleton';
import { MediaWrapper } from '../common';
import Section from '../Section';
import { SplashPageLayout } from '../Layouts';
import { useRouter } from 'next/navigation';

export function ArtistSpotLight({ slug }: { slug: string }) {
  const { data, isPending, error } = useArtistQuery(slug);
  const router = useRouter();
  return (
    <Section className='bg-ob-black' padding={false} paddingLeft={false}>
      <SplashPageLayout
        media={{ type: 'inscription', id: data?.collections && data.collections[0].inscriptions[0].inscription_id }}
        orientation='rtl'
      >
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold capitalize'>About {data?.name}</h2>
          <span className='text-ob-grey-lightest'>{data?.description}</span>
          <Button variant='secondary' className='capitalize' onClick={() => router.push(`/artists/${slug}`)}>
            View Artist
          </Button>
        </div>
      </SplashPageLayout>
    </Section>
  );
}
