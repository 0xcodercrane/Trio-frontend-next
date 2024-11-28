'use client';

import { Button } from '@/components/ui/button';
import { TRIO_EXCHANGES } from '@/lib/constants';
import { CandlestickChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ logo, label, link }: { logo: string; label: string; link: string }) => {
  return (
    <div className='grid h-full items-center justify-items-center rounded-lg bg-ob-purple-dark p-6 shadow-md transition-all hover:shadow-xl'>
      <div className='flex h-full max-h-[128px] flex-col items-center justify-center space-y-4'>
        {logo === '' ? (
          <CandlestickChart size={48} color='white' />
        ) : (
          <Image src={logo} alt={label} width={128} height={100} className='h-full max-h-[128px]' />
        )}

        <Link href={link} target='_blank'>
          <Button
            variant='secondary'
            className='rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200'
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
    <div className='grid h-[50vh] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {TRIO_EXCHANGES.map(({ label, link, img }) => (
        <Card key={label} logo={img} label={label} link={link} />
      ))}
    </div>
  );
};
