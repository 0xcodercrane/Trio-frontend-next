import { SearchButton } from '@/components/SearchButton';
import Link from 'next/link';

type TNavItem = {
  name: string;
  href: string;
  target?: string;
};

const NAV_CONFIG: TNavItem[] = [
  // {
  //   name: 'Marketplace',
  //   href: '/'
  // },
  {
    name: 'Collections',
    href: '/collections'
  },
  // {
  //   name: 'Artists',
  //   href: '/artists'
  // },
  {
    name: 'Create',
    href: '/launchpad'
  },
  {
    name: 'Rewards',
    href: '/rewards'
  },
  {
    name: 'Token',
    href: 'https://token.ordinalsbot.com',
    target: '_blank'
  }
];

export default function NavBar() {
  return (
    <>
      <div className='z-30 rounded-full pl-2 text-white md:h-[--header-content-height] md:border-solid md:bg-[#646464]/[.14]'>
        <div className='flex h-full min-w-full flex-col items-center justify-center px-[0.5rem] py-[0.5rem] md:flex-row md:gap-6'>
          {NAV_CONFIG.map((item, index) => (
            <div key={index} className='w-full pl-4 text-left text-4xl font-semibold md:pl-0 md:text-sm'>
              <Link
                style={{ textDecoration: 'none' }}
                className='hover:opacity-80'
                href={item.href}
                target={item.target || ''}
              >
                {item.name}
              </Link>
            </div>
          ))}
          <div className='h-full border border-white/[0.15]'></div>
          <SearchButton />
        </div>
      </div>
    </>
  );
}
