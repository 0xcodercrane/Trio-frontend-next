'use client';

import { Button } from '@/components/ui/button';
import { useArtistQuery } from '@/lib/services';
import Section from '../Section';
import { SplashPageLayout } from '../Layouts';
import { useRouter } from 'next/navigation';
import { EMediaType, EOrientation } from '@/types';

export function ArtistSpotLight({ slug }: { slug: string }) {
  const { data, isPending, error } = useArtistQuery(slug);
  const router = useRouter();
  return (
    <Section className='bg-ob-purple-darkest' padding={false} paddingLeft={false}>
      <SplashPageLayout
        media={{ type: EMediaType.INSCRIPTION, id: data?.collections && data.collections[0].inscriptions[0].inscription_id }}
        orientation={EOrientation.LTR}
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
