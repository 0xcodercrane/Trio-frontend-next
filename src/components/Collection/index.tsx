'use client';

import Link from 'next/link';
import { useCollectionBySlugQuery, useCollectionStats } from '@/lib/services';
import { Container } from '@/components/Container';
import { Panels } from '@/components/Collection/FilterPanels';
import { Skeleton } from '../ui/skeleton';
import { Img } from '../Img';
import NotFound from '@/app/not-found';
import { satsToBitcoin } from '@/lib/utilities';
import { TSocialsConfig } from '@/types/socials';
import { useMemo } from 'react';
import { ESOCIALS } from '@/lib/constants';
import { getSocialIcon } from '@/lib/utilities/socials';
import Socials from '../Socials';
import { CollectionIcon } from '../CollectionIcon';
interface CollectionProps {
  slug: string;
}

export default function Collection({ slug }: CollectionProps) {
  const { data, isPending, error } = useCollectionBySlugQuery(slug);
  const { data: stats, isPending: isPendingStats } = useCollectionStats(slug);

  const { name, twitter_link, discord_link, website_link, banner_image, icon } = data || {};

  const socialsConfig: TSocialsConfig = useMemo(() => {
    const config: TSocialsConfig = {};
    if (discord_link) config[ESOCIALS.Discord] = { link: discord_link, img: getSocialIcon(ESOCIALS.Discord) };
    if (twitter_link) config[ESOCIALS.X] = { link: twitter_link, img: getSocialIcon(ESOCIALS.X) };
    if (website_link) config[ESOCIALS.Web] = { link: website_link, img: getSocialIcon(ESOCIALS.Web) };
    return config;
  }, [data]);

  if (!isPending && !data) {
    return <NotFound />;
  }

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
                  <Socials config={socialsConfig} />
                </div>
                <div>{name ? <h2 className='text-6xl text-white'>{name}</h2> : <Skeleton className='h-12 w-full' />}</div>

                <div className='flex flex-row gap-8'>
                  {[
                    {
                      label: 'floor price',
                      value: `${stats?.min_price ? satsToBitcoin(stats?.min_price) : '—'} BTC`
                    },
                    {
                      label: 'all time volume',
                      value: `${satsToBitcoin(stats?.total_volume_all_time ?? 0)} BTC`
                    },
                    {
                      label: 'listed',
                      value: stats?.distinct_listings_count ?? 0
                    },
                    {
                      label: 'total supply',
                      value: stats?.total_inscriptions_count ?? 0
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
                        <span className='bold'>{isPendingStats ? <Skeleton className='min-h-6 w-full' /> : row.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className='flex basis-1/2 flex-row items-end justify-end'>
                {!isPending ? (
                  <CollectionIcon
                    className='h-[210px] w-[210px] overflow-hidden rounded-xl'
                    src={icon ?? undefined}
                    slug={slug}
                  />
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
