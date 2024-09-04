import Link from 'next/link';

const NAV_CONFIG = [
  {
    name: 'Creators',
    href: '/launchpad',
  },
  {
    name: 'Developers',
    href: 'https://docs.ordinalsbot.com',
    target: '_blank',
  },
  {
    name: 'Help',
    href: '/faq',
  },
  {
    name: 'Partners',
    href: '/partners',
  },
  {
    name: 'Runes',
    href: '/runes',
  },
  {
    name: 'TRIO',
    href: 'https://token.ordinalsbot.com',
    target: '_blank',
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
      </div>
    </div>
  );
};