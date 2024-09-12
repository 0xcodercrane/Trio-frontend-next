import { Search } from 'lucide-react';
import Link from 'next/link';

type TNavItem = {
  name: string;
  href: string;
  target?: string;
};

const NAV_CONFIG: TNavItem[] = [
  {
    name: 'Marketplace',
    href: '/',
  },
  {
    name: 'Collections',
    href: '/collections',
  },
  {
    name: 'Artists',
    href: '/artists',
  },
  {
    name: 'Trio',
    href: '/trio',
  },
];

export default function NavBar() {
  return (
    <div className='z-30 rounded-full px-2 md:h-[48px] md:border-solid md:bg-[#646464]/[.14]'>
      <div className='flex h-full min-w-full flex-col items-center justify-center px-[0.5rem] py-[0.5rem] font-extrabold md:flex-row md:gap-6'>
        {NAV_CONFIG.map((item, index) => (
          <div
            key={index}
            className='w-full pl-4 text-left text-4xl font-extrabold md:pl-0 md:text-sm'
          >
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
        <div className='h-full border border-ob-black/[0.15]'></div>
        <div className='flex h-full min-w-[52px] items-center rounded-full bg-ob-black/[0.15] p-[0.75rem]'>
          <Search className='w-full' size='16' />
        </div>
      </div>
    </div>
  );
}
