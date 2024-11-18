import { Button } from '../../../ui/button';
import { useListings } from '@/lib/hooks';
import { ChangeEvent, useState } from 'react';
import { Input } from '../../../ui/input';
import { bitcoinToSats } from '@/lib/utilities';
import FeesPanel from '../../../FeesPanel';
import { TermsAndConditions } from '../../../TermsAndConditions';

interface ListItemProps {
  inscriptionId: string | undefined;
}

export default function ListItem({ inscriptionId }: ListItemProps) {
  const { listInscriptions } = useListings();

  const [price, setPrice] = useState<string>('0');

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value || '');
  };

  const handleList = async () => {
    if (!inscriptionId || !priceInSats) {
      return;
    }
    await listInscriptions([{ inscription_id: inscriptionId, price: priceInSats }]);
  };

  const priceInSats = bitcoinToSats(parseFloat(price));
  const marketplaceFeeSats = priceInSats * 0.005;

  return (
    <>
      <div className='flex flex-col gap-6 p-4'>
        <FeesPanel listPriceSats={priceInSats} feeSats={marketplaceFeeSats} variant='listing' />
        <form className='bg-ob-purple flex flex-col gap-2 rounded-lg p-4'>
          <div className='flex w-full flex-row items-center justify-between rounded-sm bg-white pr-2 ring-1 ring-ob-white-20'>
            <Input
              className='min-w-12 grow border-none bg-white pl-2 text-right text-lg font-bold text-ob-grey'
              onChange={handlePriceChange}
              value={price}
              placeholder='Set price'
            />
            <span className='text-nowrap bg-white pl-1 text-lg text-ob-grey'>BTC</span>
          </div>
          <TermsAndConditions actionName='List Item' />
          <Button
            disabled={!inscriptionId || !parseFloat(price)}
            className='mt-4 min-w-full rounded-md text-lg'
            onClick={handleList}
            type='button'
          >
            List Item
          </Button>
        </form>
      </div>
    </>
  );
}
