import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { ENV, ENVS, NETWORK, OB_SOCIALS_CONFIG } from '@/lib/constants';
import Socials from '../Socials';

export default function Footer() {
  return (
    <footer className='w-full bg-ob-purple-dark pb-8 pt-12 text-white'>
      <Container padding>
        <div className='mb-32 grid grid-cols-2 gap-8 md:grid-cols-3'>
          <div className='flex flex-col items-start gap-4'>
            <img src='/img/trio-logo.svg' alt='OrdinalsBot Logo' width={95} height={30} />
            {ENV !== ENVS.PROD && (
              <span className='w-full text-left italic text-ob-grey-lightest'>
                Connected to <span className='font-bold text-ob-green-light'>{NETWORK}</span>
              </span>
            )}
            <div className='flex gap-4 md:hidden'>
              <Socials config={OB_SOCIALS_CONFIG} />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-8 md:col-span-2'>
            <div>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400'>GENERAL</h3>
              <ul className='space-y-2'>
                {[
                  {
                    label: 'Home',
                    href: '/'
                  },
                  {
                    label: 'Creators',
                    href: '/launchpad'
                  },
                  {
                    label: 'Partners',
                    href: 'https://ordinalsbot.com/partners',
                    target: '_blank'
                  },
                  {
                    label: 'Marketplace',
                    href: '/collections'
                  }
                ].map(({ label, href, target }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={target}
                      className='text-xl font-semibold transition-colors hover:text-gray-300'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400'>COMPANY</h3>
              <ul className='space-y-2'>
                {[
                  {
                    label: 'Developers',
                    href: 'https://docs.ordinalsbot.com',
                    target: '_blank'
                  },
                  {
                    label: 'Guides',
                    href: 'https://www.youtube.com/@ordinalsbot',
                    target: '_blank'
                  },
                  {
                    label: 'Help',
                    href: 'https://discord.com/invite/9nBhVgCjct',
                    target: '_blank'
                  },
                  {
                    label: 'Runes',
                    href: 'https://ordinalsbot.com/runes',
                    target: '_blank'
                  }
                ].map(({ label, href, target }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={target}
                      className='text-xl font-semibold transition-colors hover:text-gray-300'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400'>TOKEN</h3>
              <ul className='space-y-2'>
                {[
                  {
                    label: 'Whitepaper',
                    href: 'https://token.ordinalsbot.com',
                    target: '_blank'
                  },
                  {
                    label: 'Where to Buy',
                    href: 'https://token.ordinalsbot.com/getting-started/marketplaces',
                    target: '_blank'
                  },
                  {
                    label: 'Price',
                    href: 'https://www.coingecko.com/en/coins/trio-ordinals',
                    target: '_blank'
                  },
                  {
                    label: 'Tokenomics',
                    href: 'https://token.ordinalsbot.com/tokenomics/overview',
                    target: '_blank'
                  }
                ].map(({ label, href, target }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={target}
                      className='text-xl font-semibold transition-colors hover:text-gray-300'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='text-ob-white flex flex-col items-center justify-between md:flex-row md:gap-2'>
          <div className='flex space-x-6'>
            {/* <Link href='#privacy' className='text-sm transition-colors hover:text-gray-300'>
              Privacy Policy
            </Link> */}
            <Link href='/terms' className='text-sm transition-colors hover:text-gray-300'>
              Terms & Conditions
            </Link>
          </div>
          <div className='flex items-center'>
            <span className='mr-2 text-sm font-bold'>Powered by</span>
            <Image src='/img/ob-logo.svg' alt='OrdinalsBot Logo' width={100} height={24} loading='lazy' />
          </div>
          <div className='hidden space-x-4 md:flex'>
            <Socials config={OB_SOCIALS_CONFIG} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
