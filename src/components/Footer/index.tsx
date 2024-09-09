'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='w-full bg-black pb-8 pt-12 text-white'>
      <div className='mx-auto max-w-[100%] px-4 sm:px-6 lg:px-12'>
        <div className='mb-32 grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='flex flex-col items-start'>
            <img src='/img/ordinals-bot-logo.svg' alt='OrdinalsBot Logo' width={200} height={50} />
          </div>
          <div className='col-span-2 grid grid-cols-2 gap-8'>
            <div>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400'>GENERAL</h3>
              <ul className='space-y-2'>
                {['Home', 'Creators', 'Partners', 'Marketplace'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className='text-xl font-semibold transition-colors hover:text-gray-300'
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400'>COMPANY</h3>
              <ul className='space-y-2'>
                {['Developers', 'Guides', 'Help', 'Runes'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className='text-xl font-semibold transition-colors hover:text-gray-300'
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='text-ob-white flex flex-col items-center justify-between md:flex-row md:gap-2'>
          <div className='flex space-x-6'>
            {/* TODO - add real links */}
            <Link href='#privacy' className='text-sm transition-colors hover:text-gray-300'>
              Privacy Policy
            </Link>
            <Link href='#terms' className='text-sm transition-colors hover:text-gray-300'>
              Terms & Conditions
            </Link>
          </div>
          <div className='flex items-center'>
            <span className='mr-2 text-sm font-bold'>Powered by</span>
            <img src='/img/ordinals-bot-logo.svg' alt='OrdinalsBot Logo' width={100} height={24} />
          </div>
          <div className='flex space-x-4'>
            {['instagram', 'x', 'telegram', 'discord'].map((social) => (
              <Link key={social} href={`#${social}`} className='transition-opacity hover:opacity-75'>
                <img src={`/img/socials/${social}.svg`} alt={`${social} icon`} width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
