'use client';

import { Container } from '@/components/Container';
import { useFeaturedArtistsQuery } from '@/lib/services';
import Favorite from '../Favorite';
import { MediaWrapper } from '../common/MediaViewer';

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
                  <div className='absolute bottom-0 z-10 flex h-full w-full flex-col justify-end rounded-xl'>
                    {
                      <div className='absolute right-3 top-3 hover:cursor-pointer hover:opacity-80'>
                        <Favorite action={() => {}} />
                      </div>
                    }
                    <div className='flex w-full flex-row items-center justify-between rounded-b-xl bg-[#000]/[0.50] px-4 py-2 text-center backdrop-blur-2xl'>
                      <span className='text-left font-extrabold capitalize'>{name}</span>
                      <span className='text-xs font-extrabold'>#{feature_rank}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
