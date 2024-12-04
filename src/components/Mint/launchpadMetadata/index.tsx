import { TMetaData } from '@/types';
import Image from 'next/image';

const LaunchpadMetaData = ({ metaData }: { metaData: TMetaData }) => {
  if (!metaData) {
    return (
      <>
        <div className='flex flex-col gap-2'>
          <div className='h-[2.5rem] w-full max-w-96 rounded-md bg-ob-black-lightest lg:h-[3.5rem] xl:h-[4.5rem]'></div>
          <div className='h-[1.5rem] w-full max-w-full rounded-md bg-ob-black-lightest'></div>
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
        <h2 className='text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl xl:text-7xl'>{metaData?.name}</h2>
        <p className='text-ob-grey-lighter'>{metaData?.description}</p>
      </div>

      <div className='flex flex-row gap-2'>
        <div className='social-icons flex w-full flex-row justify-start gap-2'>
          {metaData?.discord_link && (
            <a href={metaData.discord_link} target='_blank' rel='noreferrer'>
              <Image src='/img/socials/discord.svg' alt='discord' width={25} height={25} />
            </a>
          )}
          {metaData?.twitter_link && (
            <a href={metaData.twitter_link} target='_blank' rel='noreferrer'>
              <Image src='/img/socials/x.svg' alt='discord' width={25} height={25} />
            </a>
          )}
          {metaData?.website_link && (
            <a href={metaData?.website_link} target='_blank' rel='noreferrer'>
              <Image src='/img/socials/link.svg' alt='discord' width={25} height={25} />
            </a>
          )}
          {metaData?.instagram_link && (
            <a href={metaData?.instagram_link} target='_blank' rel='noreferrer'>
              <Image src='/img/socials/instagram.svg' alt='discord' width={25} height={25} />
            </a>
          )}
          {metaData?.telegram_link && (
            <a href={metaData.telegram_link} target='_blank' rel='noreferrer'>
              <Image src='/img/socials/telegram.svg' alt='discord' width={25} height={25} />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default LaunchpadMetaData;
