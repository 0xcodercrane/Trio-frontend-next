'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NotFound from '@/app/not-found';
import { Loading } from '../common';
import { useCollectionQuery } from '@/lib/services';

interface CollectionProps {
  slug: string;
}

export default function Collection({ slug }: CollectionProps) {
  const { data, isPending, error } = useCollectionQuery(slug);

  if (isPending) return <Loading />;
  if (!data)
    return (
      <div className='flex w-full justify-center'>
        <NotFound />
      </div>
    );

  const { name, description, twitter_link, discord_link, website_link, artist } = data!;

  return (
    <>
      <div className='flex basis-1/2 flex-col justify-end gap-4'>
        <div className='flex flex-row gap-4'>
          {[
            {
              label: 'discord',
              url: discord_link
            },
            {
              label: 'link',
              url: website_link
            },
            {
              label: 'x',
              url: twitter_link
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
              label: 'assets',
              value: data.inscriptions.length
            },
            {
              label: 'royalties',
              value: '0.00%'
            },
            {
              label: 'created',
              value: new Date().toLocaleDateString()
            },
            {
              label: 'chain',
              value: 'bitcoin'
            },
            {
              label: 'mint price',
              value: `${0.0000325} BTC`
            }
          ].map((row, index) => {
            return (
              <div key={index} className='flex flex-col justify-between capitalize text-white'>
                <span className='bold text-sm'>{row.label}</span>
                <span className='bold'>{row.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex basis-1/2 flex-col justify-end'>
        <div className='flex min-h-[320px] w-full flex-row justify-end'>
          <div className='flex min-w-[210px] max-w-[210px] rounded-xl bg-white/[0.14] p-6'>
            <div className='flex w-full flex-col items-center justify-between'>
              <Image
                src='/img/placeholder-artist.png'
                alt='artist placeholder'
                width={160}
                height={160}
                className='w-full'
              />
              <span className='text-white'>By {artist?.name}</span>
              <Link href={`/artist/${artist?.slug}`} className='max-w-full'>
                <Button variant='secondary' className='max-w-full text-xs'>
                  View Artist Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
