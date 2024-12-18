'use client';

import { Container } from '@/components/Container';
import { useFeaturedArtistsQuery } from '@/lib/services';
import { MediaWrapper } from '../common';
import { InscriptionOverlay } from '@/components/InscriptionOverlay';

export default function FeaturedArtists() {
  const { data: artists, isPending } = useFeaturedArtistsQuery();
  if (!artists) return null;
  return (
    <div className='h-50vh flex justify-center bg-ob-purple-dark py-16'>
      <Container padding>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between py-16'>
            <h3>Featured Artists</h3>
            <span className='font-thin'>View all Artists ( {artists.length} )</span>
          </div>
          <div className='flex flex-row gap-4'>
            {artists.map(({ name, feature_rank }, index) => {
              return (
                <div
                  key={index}
                  className='relative flex min-h-[--inscription-default] items-center justify-start rounded-xl bg-ob-purple-darkest md:basis-1/4'
                >
                  <MediaWrapper
                    id='6e6093d576b77ae8a1ecd31d6685fa466391601cbd58bf3348c255c4085ec869i0'
                    size='full'
                    className='overflow-hidden rounded-xl'
                    blur={isPending}
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
