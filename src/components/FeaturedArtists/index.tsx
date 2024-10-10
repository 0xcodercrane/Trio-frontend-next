'use client';

import { Container } from '@/components/Container';
import { useFeaturedArtistsQuery } from '@/lib/services';
import { MediaWrapper } from '../common/MediaViewer';
import { InscriptionOverlay } from '@/components/InscriptionOverlay';

export default function FeaturedArtists() {
  const { data: artists, isPending, error } = useFeaturedArtistsQuery();
  if (!artists) return null;
  return (
    <div className='h-50vh flex w-screen justify-center bg-ob-black-light py-12'>
      <Container padding>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between py-12'>
            <h3>Featured Artists</h3>
            <span className='font-thin'>View all Artists ( {artists.length} )</span>
          </div>
          <div className='flex flex-row gap-4'>
            {artists.map(({ name, feature_rank }, index) => {
              return (
                <div
                  key={index}
                  className='relative flex min-h-[350px] max-w-[350px] items-center justify-start rounded-xl bg-ob-black md:basis-1/4'
                >
                  <MediaWrapper
                    id='6e6093d576b77ae8a1ecd31d6685fa466391601cbd58bf3348c255c4085ec869i0'
                    size='full'
                    className='overflow-hidden rounded-xl'
                  ></MediaWrapper>
                  <InscriptionOverlay
                    id='6e6093d576b77ae8a1ecd31d6685fa466391601cbd58bf3348c255c4085ec869i0'
                    name={name}
                    rank={feature_rank}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
