'use client';

import Link from 'next/link';
import NotFound from '@/app/not-found';
import { FadeIn } from '../common';
import { Container } from '@/components/Container';
import { useArtistQuery } from '@/lib/services';
import SpotLight from '../SpotLight';
import Image from 'next/image';
import { PanelsWrapper } from './FilterPanels';
import LoadingScreen from '../common/LoadingScreen';

interface ArtistProps {
  slug: string;
}

export default function Artist({ slug }: ArtistProps) {
  const { data, isPending, error } = useArtistQuery(slug);
  if (isPending) return <LoadingScreen />;
  if (!data)
    return (
      <div className='flex w-full justify-center'>
        <NotFound />
      </div>
    );

  const { name, description, twitter_url } = data!;

  return (
    <div className='relative'>
      <div className='absolute z-0 h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] w-full'>
        <div className='absolute z-20 h-full w-full bg-gradient-to-t from-ob-black via-ob-black/[0.80] to-transparent'></div>
        <Image
          src='/img/placeholder-hero.jpg'
          alt='some hero image'
          className='animate-fade-in h-full w-full'
          width={1000}
          height={1000}
          style={{
            objectFit: 'cover'
          }}
        />
        <FadeIn />
      </div>

      <Container padding>
        <div className='z-10 flex h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] flex-row'>
          <div className='flex w-1/2 flex-col justify-end gap-4 pb-12'>
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
      </Container>

      <SpotLight type='artist' slug={slug} />

      <PanelsWrapper />
    </div>
  );
}
