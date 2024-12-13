'use client';

import Link from 'next/link';
import { useCollectionBySlugQuery } from '@/lib/services';
import { Container } from '@/components/Container';
import { Panels } from '@/components/Collection/FilterPanels';
import { Skeleton } from '../ui/skeleton';
import { Img } from '../Img';

interface CollectionProps {
  slug: string;
}

export default function Collection({ slug }: CollectionProps) {
  const { data, isPending, error } = useCollectionBySlugQuery(slug);

  const { name, description, twitter_link, discord_link, website_link, artist, banner_image, icon } = data || {};

  const hasBanner = !!banner_image;
  return (
    <div className='relative'>
      <div className='absolute z-0 h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] w-full bg-ob-purple-dark'>
        <div className='absolute z-20 h-full w-full bg-gradient-to-t from-ob-purple-darkest via-ob-purple-dark/[0.1] to-ob-purple-darkest'></div>
        {banner_image && (
          <img
            src={banner_image}
            alt='banner image'
            className='h-full w-full'
            width={1000}
            height={1000}
            style={{
              objectFit: 'cover'
            }}
          />
        )}
      </div>

      <Container padding>
        <div
          className={`z-10 flex ${hasBanner ? 'h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))]' : 'h-[24rem]'} flex-row`}
        >
          <div className='flex h-full w-full flex-col justify-end'>
            <div className='flex w-full flex-row pb-12'>
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
                  ].map((row, index) => {
                    if (row.url === null) return null;
                    return (
                      <div key={index} className=''>
                        {row.url ? (
                          <Link href={row.url} className='transition-opacity hover:opacity-75'>
                            <img src={`/img/socials/${row.label}.svg`} alt={`${row} icon`} width={24} height={24} />
                          </Link>
                        ) : (
                          <Skeleton className='h-6 w-6' />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div>{name ? <h2 className='text-6xl text-white'>{name}</h2> : <Skeleton className='h-12 w-full' />}</div>

                <div className='flex flex-row gap-8'>
                  {[
                    {
                      label: 'floor price',
                      value: 'XXX'
                    },
                    {
                      label: 'all time volume',
                      value: 'XXX'
                    },
                    {
                      label: 'total supply',
                      value: 'XXX'
                    },
                    {
                      label: 'listed',
                      value: 'XXX'
                    },
                    {
                      label: 'owners',
                      value: 'XXX'
                    },
                    // {
                    //   label: 'royalties',
                    //   value: '0.00%'
                    // },
                    // {
                    //   label: 'created',
                    //   value: new Date().toLocaleDateString()
                    // },
                    {
                      label: 'chain',
                      value: 'bitcoin'
                    }
                    // {
                    //   label: 'mint price',
                    //   value: `${0.0000325} BTC`
                    // }
                  ].map((row, index) => {
                    return (
                      <div key={index} className='flex flex-col justify-between capitalize text-white'>
                        <span className='bold text-sm'>{row.label}</span>
                        <span className='bold'>{row.value ? row.value : <Skeleton className='min-h-6 w-full' />}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className='flex basis-1/2 flex-row justify-end'>
                {icon ? (
                  <Img fallback={<></>} className='h-[210px] w-[210px] rounded-xl' src={icon} />
                ) : (
                  <Skeleton className='h-[210px] w-[210px] rounded-xl' />
                )}
                {/* <div className='flex min-h-[320px] w-full flex-row justify-end'>
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Panels slug={slug} />
    </div>
  );
}
