'use client';

import Link from 'next/link';
import NotFound from '@/app/not-found';
import { Loading } from '../common';
import { Container } from '@/components/Container';
import { useArtistQuery } from '@/lib/services/fetchArtist';

interface ArtistProps {
  slug: string;
}

export default function Artist({ slug }: ArtistProps) {
  const { data, isPending, error } = useArtistQuery(slug);
  if (isPending) return <Loading />;
  if (!data)
    return (
      <div className='flex w-full justify-center'>
        <NotFound />
      </div>
    );

  const { name, description, twitter_url } = data!;

  return (
    <>
      <Container>
        <div className='z-10 mt-[--header-height] flex h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] flex-row px-4 pb-12 md:px-16'>
          <div className='flex w-full flex-row flex-wrap'>
            <div className='flex w-1/2 flex-col justify-end gap-4'>
              <div className='flex flex-row gap-4'>
                {[
                  // {
                  //   label: 'discord',
                  //   url: discord_link
                  // },
                  // {
                  //   label: 'link',
                  //   url: website_link
                  // },
                  {
                    label: 'x',
                    url: twitter_url
                  }
                  // {
                  //   label: 'instagram',
                  //   url: 'https://instagram.com/ordinalsbot'
                  // }
                ].map((row, index) => {
                  if (row.url === null) return null;
                  return (
                    <div key={index} className=''>
                      <Link href={row.url} className='transition-opacity hover:opacity-75'>
                        <img src={`/img/socials/${row.label}.svg`} alt={`${row} icon`} width={24} height={24} />
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div>
                <h2 className='text-6xl text-white'>{name}</h2>
              </div>

              <div className='flex flex-row gap-8'>
                {[
                  {
                    label: 'collections',
                    value: data.collections.length
                  },
                  {
                    label: 'volume USD',
                    value: '7.331 M'
                  },
                  {
                    label: 'volume BTC',
                    value: 109.2
                  },
                  {
                    label: 'address',
                    value: 'bc1p....6rzv'
                  }
                ].map((row, index) => {
                  return (
                    <div key={index} className='flex flex-col justify-between text-white'>
                      <span className='bold text-sm capitalize'>{row.label}</span>
                      <span className='bold'>{row.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className='flex h-[80vh] w-full flex-row bg-ob-black-lighter py-48 text-white'>
        <div className='flex w-1/2 flex-col justify-start gap-8 px-24'>
          <h2 className='bold text-6xl capitalize'>About {data.name}</h2>
          <span>{data.description}</span>
        </div>
        <div className='flex w-1/2 items-center justify-center'>
          <div className='h-[450px] w-[450px] rounded-xl bg-[#252525]'></div>
        </div>
      </div>
    </>
  );
}
