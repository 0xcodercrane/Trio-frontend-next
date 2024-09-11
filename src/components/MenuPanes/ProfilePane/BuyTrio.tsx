'use client';

import { Button } from '@/components/ui/button';

const Card = ({ logo, name }: { logo: string, name: string }) => {
  return (
    <div className="grid justify-items-center items-center p-6 bg-ob-black-light rounded-lg shadow-md hover:shadow-xl transition-all h-full">
      <div className="flex flex-col justify-center items-center space-y-4 h-full">
        <img src={logo} alt={name} className="w-16 h-auto" />

        <span className="text-white">{name}</span>

        <Button
          variant="secondary"
          className="bg-white text-black rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 h-[50vh]">
      <Card logo="/img/btc.svg" name="Gate.io" />
      <Card logo="/img/btc.svg"name="MEXC Global" />
      <Card logo="/img/btc.svg" name="BingX" />
      <Card logo="/img/btc.svg" name="Unisat" />
    </div>
  );
};