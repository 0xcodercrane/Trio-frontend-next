import Section from '@/components/Section';
import { DEFAULT_METADATA } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Home() {
  return (
    <Section>
      <div className='relative isolate mb-10 overflow-hidden bg-gray-900' style={{ borderRadius: '40px' }}>
        <div className='px-6 py-24 sm:px-6 sm:py-32 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
              Earn rewards by minting and buying on Bitcoin.
            </h2>
            <p className='mx-auto mt-6 max-w-[1000px] text-pretty text-lg/8 text-gray-300'>
              Trio is your go to marketplace for the best digital collectibles on Bitcoin. With exclusive drops and a fun
              rewards system, you can earn while you collect.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href='/collections'
                className='inline-flex h-[--button-height-md] max-h-[--max-button-height] w-[144px] w-auto min-w-[80px] max-w-[160px] max-w-[192px] items-center justify-center whitespace-nowrap rounded-lg bg-ob-yellow px-8 text-sm font-medium text-black ring-offset-background transition-colors hover:bg-ob-yellow/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&.active]:bg-white [&.active]:text-black'
              >
                Browse Collections
              </Link>

              <Link href='/rewards' className='text-sm/6 font-semibold text-white'>
                Get Rewards <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
        <svg
          viewBox='0 0 1024 1024'
          className='absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]'
          aria-hidden='true'
        >
          <circle cx='512' cy='512' r='512' fill='url(#8d958450-c69f-4251-94bc-4e091a323369)' fillOpacity='0.7' />
          <defs>
            <radialGradient id='8d958450-c69f-4251-94bc-4e091a323369'>
              <stop stopColor='#7775D6' />
              <stop offset='1' stopColor='#E935C1' />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div>
        <div className='mx-auto mt-20'>
          <div className='flex items-center justify-between space-x-4'>
            <h2 className='text-white-900 text-lg font-medium'>Upcoming Mints</h2>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4'>
            <Link href='/mint/punk-royale' className='group relative'>
              <div className='relative'>
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/web-ob-prod.appspot.com/o/content%2Fpunk-royale.webp?alt=media&token=27ed0587-a335-4511-8ebc-253319cfe902'
                  alt='Punk Royale'
                  className='aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover'
                />
                <div className='absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100' aria-hidden='true'>
                  <div className='w-full rounded-md bg-white/75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter'>
                    Go to Mint
                  </div>
                </div>
              </div>
              <div className='mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900'>
                <span>
                  <span>
                    <span aria-hidden='true' className='absolute inset-0'></span>
                    Punk Royale
                  </span>
                </span>
                <p>LIVE</p>
              </div>
              <p className='mt-1 text-sm text-gray-500'>Mint</p>
            </Link>

            <div className='group relative'>
              <div className='relative'>
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/web-ob-prod.appspot.com/o/content%2Fsatorials.webp?alt=media&token=133da49f-246b-4057-8b57-a0b966c6aafb'
                  alt='Satorials'
                  className='aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover'
                />
              </div>
              <div className='mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900'>
                <span>
                  <span>
                    <span aria-hidden='true' className='absolute inset-0'></span>
                    Satorials
                  </span>
                </span>
                <p>Coming Soon</p>
              </div>
              <p className='mt-1 text-sm text-gray-500'>Mint</p>
            </div>

            <div className='group relative'>
              <div className='relative'>
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/web-ob-prod.appspot.com/o/content%2Finners.webp?alt=media&token=25efd731-798c-4e79-aade-a381f47f2932'
                  alt='Inners'
                  className='aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover'
                />
              </div>
              <div className='mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900'>
                <span>
                  <span>
                    <span aria-hidden='true' className='absolute inset-0'></span>
                    Inners
                  </span>
                </span>
                <p>Coming Soon</p>
              </div>
              <p className='mt-1 text-sm text-gray-500'>Mint</p>
            </div>

            <div className='group relative'>
              <div className='relative'>
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/web-ob-prod.appspot.com/o/content%2Fordiboos.webp?alt=media&token=79925248-806e-4da8-9393-2bf5c8db9b01'
                  alt='OrdiBoos'
                  className='aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover'
                />
              </div>
              <div className='mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900'>
                <span>
                  <span>
                    <span aria-hidden='true' className='absolute inset-0'></span>
                    OrdiBoos
                  </span>
                </span>
                <p>Coming Soon</p>
              </div>
              <p className='mt-1 text-sm text-gray-500'>Mint</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
