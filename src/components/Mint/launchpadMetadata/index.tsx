import Socials from '@/components/Socials';
import { ESOCIALS } from '@/lib/constants';
import { getSocialIcon } from '@/lib/utilities/socials';
import { TMetaData } from '@/types';
import { TSocialsConfig } from '@/types/socials';
import { useMemo } from 'react';

const LaunchpadMetaData = ({ metaData }: { metaData: TMetaData }) => {
  const socialsConfig: TSocialsConfig = useMemo(() => {
    const config: TSocialsConfig = {};
    if (!metaData) return config;
    const { discord_link, twitter_link, website_link, instagram_link, telegram_link } = metaData;
    if (discord_link) config[ESOCIALS.Discord] = { link: discord_link, img: getSocialIcon(ESOCIALS.Discord) };
    if (twitter_link) config[ESOCIALS.X] = { link: twitter_link, img: getSocialIcon(ESOCIALS.X) };
    if (website_link) config[ESOCIALS.Web] = { link: website_link, img: getSocialIcon(ESOCIALS.Web) };
    if (instagram_link) config[ESOCIALS.Instagram] = { link: instagram_link, img: getSocialIcon(ESOCIALS.Instagram) };
    if (telegram_link) config[ESOCIALS.Telegram] = { link: telegram_link, img: getSocialIcon(ESOCIALS.Telegram) };
    return config;
  }, [metaData]);

  if (!metaData) {
    return (
      <>
        <div className='flex flex-col gap-2'>
          <div className='h-[2.5rem] w-full max-w-96 rounded-md bg-ob-black-lightest lg:h-[3.5rem] xl:h-[4.5rem]'></div>
          <div className='h-[6rem] w-full max-w-full rounded-md bg-ob-black-lightest'></div>
        </div>

        <div className='flex flex-row gap-2'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='h-7 w-7 animate-pulse rounded-lg bg-ob-black-lightest'></div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        <h2 className='mb-5 text-2xl font-extrabold leading-none md:text-3xl lg:text-4xl xl:text-5xl'>{metaData?.name}</h2>
        <p className='text-ob-grey-lighter'>{metaData?.description}</p>
      </div>

      <div className='flex w-full flex-row justify-start gap-4'>
        <Socials config={socialsConfig} />
      </div>
    </>
  );
};

export default LaunchpadMetaData;
