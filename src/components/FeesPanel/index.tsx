import { usePrices } from '@/lib/services';
import { satsToBitcoin } from '@/lib/utilities';

interface FeesPanelProps {
  listPriceSats: number | undefined;
  takerFeeSats: number | undefined;
}

export default function FeesPanel({ listPriceSats, takerFeeSats }: FeesPanelProps) {
  const { satsToUsd } = usePrices();
  return (
    <div className='flex flex-col gap-4 rounded-lg bg-ob-grey p-4'>
      <div className='flex w-full flex-row text-ob-grey-lightest'>
        <div className='basis-1/3'>List Price:</div>
        <div className='basis-1/3'>{satsToBitcoin(listPriceSats || 0)} BTC</div>
        <div className='basis-1/3'>{satsToUsd(listPriceSats).formatted}</div>
      </div>
      <div className='flex w-full flex-row text-ob-grey-lightest'>
        <div className='basis-1/3'>Taker Fee (2%):</div>
        <div className='basis-1/3'>{satsToBitcoin(takerFeeSats || 0)} BTC</div>
        <div className='basis-1/3'>{satsToUsd(takerFeeSats).formatted}</div>
      </div>
      <div className='flex w-full flex-row text-white'>
        <div className='basis-1/3'>Total:</div>
        <div className='basis-1/3'>{satsToBitcoin((takerFeeSats || 0) + (listPriceSats || 0))} BTC</div>
        <div className='basis-1/3'>{satsToUsd((takerFeeSats || 0) + (listPriceSats || 0)).formatted}</div>
      </div>
    </div>
  );
}
