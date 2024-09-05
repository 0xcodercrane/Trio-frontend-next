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
    href: '/collections'
  },
  {
    name: 'Artists',
    href: '/artists',
  },
  {
    name: 'Trio',
    href: '/trio',
  }
];

export default function NavBar () {
  return (
    <div className='md:h-[48px] rounded-full md:border-solid md:bg-[#646464]/[.14] px-2 z-30'>
      <div className='
          flex flex-col md:flex-row md:gap-6 justify-center items-center
          min-w-full 
          h-full
          font-extrabold
          px-[0.5rem]
          py-[0.5rem]
        '
      >
        {
          NAV_CONFIG.map((item, index) => (
            <div key={index} className='pl-4 md:pl-0 text-left w-full text-4xl md:text-sm font-extrabold'>
              <Link
                style={{ textDecoration: 'none' }}
                className='hover:opacity-80'
                href={item.href}
                target={item.target || ''}>{item.name}</Link>
            </div>
          ))     
        }
        <div className='h-full border border-ob-black/[0.15]'></div>
        <div className='bg-ob-black/[0.15] p-[0.75rem] rounded-full min-w-[52px] h-full flex items-center'><Search className='w-full' size='16' /></div>
      </div>
    </div>
  );
};