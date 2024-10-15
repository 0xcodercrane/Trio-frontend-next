'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ logo, label, link }: { logo: string; label: string; link: string }) => {
  return (
    <div className='grid h-full items-center justify-items-center rounded-lg bg-ob-black-light p-6 shadow-md transition-all hover:shadow-xl'>
      <div className='flex h-full max-h-[128px] flex-col items-center justify-center space-y-4'>
        <Image src={logo} alt={label} width={128} height={100} className='h-full max-h-[128px]' />

        <Link href={link} target='_blank'>
          <Button
            variant='secondary'
            className='rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200'
            onClick={() => console.log(`Buy ${name}`)}
          >
            Buy $TRIO
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const BuyTrioTab = () => {
  return (
    // TODO fix the divs height
    <div className='grid h-[50vh] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {[
        {
          label: 'Gate.io',
          link: 'https://www.gate.io/trade/TRIO_USDT',
          logo: '/img/exchanges/gateio.svg'
        },
        {
          label: 'MEXC Global',
          link: 'https://www.mexc.com/exchange/TRIO_USDT',
          logo: '/img/exchanges/mexc.svg'
        },
        {
          label: 'BingX',
          link: 'https://bingx.com/en/spot/TRIOUSDT/',
          logo: '/img/exchanges/bingx.svg'
        },
        {
          label: 'UniSat',
          link: 'https://unisat.io/market/brc20?tick=TRIO',
          logo: '/img/exchanges/logo_unisat.svg'
        }
      ].map(({ label, link, logo }) => (
        <Card key={label} logo={logo} label={label} link={link} />
      ))}
    </div>
  );
};
