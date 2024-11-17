import { Button } from '../ui/button';
import { useListings } from '@/lib/hooks';
import { ChangeEvent, useState } from 'react';
import { Input } from '../ui/input';
import Link from 'next/link';
import { bitcoinToSats } from '@/lib/utilities';

interface BuyNowProps {
  inscriptionId: string | undefined;
}

export default function ListItem({ inscriptionId }: BuyNowProps) {
  const { listInscriptions } = useListings();

  const [price, setPrice] = useState<string>('0');

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value || '');
  };

  const handleList = async () => {
    const priceInSats = bitcoinToSats(parseFloat(price));
    if (!inscriptionId || !priceInSats) {
      return;
    }
    await listInscriptions([{ inscription_id: inscriptionId, price: priceInSats }]);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex w-full flex-row items-center justify-between rounded-sm bg-ob-purple-darkest pr-2 ring-1 ring-ob-white-20'>
        <Input
          className='min-w-12 grow border-none bg-ob-purple-darkest pl-2 text-ob-grey-lightest'
          onChange={handlePriceChange}
          value={price}
        />
        <span className='text-nowrap pl-1 text-sm text-ob-grey-lightest'>BTC</span>
      </div>
      <Button
        disabled={!inscriptionId || !parseFloat(price)}
        size='lg'
        variant='secondary'
        className='min-w-full'
        onClick={handleList}
      >
        List Now
      </Button>
      <span className='text-bold text-ob-grey-lighter'>
        By clicking on List Now you agree to our&nbsp;
        <Link href='/terms-and-conditions' target='_blank' className='text-ob-grey-lightest'>
          Terms and Conditions
        </Link>
      </span>
    </div>
  );
}
