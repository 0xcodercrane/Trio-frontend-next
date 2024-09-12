'use client';

import { Button } from '@/components/ui/button';

const Card = ({ logo, name }: { logo: string; name: string }) => {
  return (
    <div className='grid h-full items-center justify-items-center rounded-lg bg-ob-black-light p-6 shadow-md transition-all hover:shadow-xl'>
      <div className='flex h-full flex-col items-center justify-center space-y-4'>
        <img src={logo} alt={name} className='h-auto w-16' />

        <span className='text-white'>{name}</span>

        <Button
          variant='secondary'
          className='rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200'
          onClick={() => console.log(`Buy ${name}`)}
        >
          Buy $TRIO
        </Button>
      </div>
    </div>
  );
};

export const BuyTrioTab = () => {
  return (
    // TODO fix the divs height
    <div className='grid h-[50vh] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      <Card logo='/img/btc.svg' name='Gate.io' />
      <Card logo='/img/btc.svg' name='MEXC Global' />
      <Card logo='/img/btc.svg' name='BingX' />
      <Card logo='/img/btc.svg' name='Unisat' />
    </div>
  );
};
