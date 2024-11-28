import { usePrices } from '@/lib/services';
import { satsToBitcoin } from '@/lib/utilities';

interface FeesPanelProps {
  listPriceSats: number | undefined;
  feeSats: number | undefined;
  variant?: 'buy' | 'listing';
}

export default function FeesPanel({ listPriceSats, feeSats, variant = 'buy' }: FeesPanelProps) {
  const { satsToUsd } = usePrices();
  const pricePlusFee = (feeSats || 0) + (listPriceSats || 0);
  const priceMinusFee = (listPriceSats || 0) - (feeSats || 0);
  return (
    <div className='flex flex-col gap-4 rounded-lg bg-ob-purple-dark'>
      <div className='flex w-full flex-row text-xl font-bold text-white'>
        <div className='basis-1/3'>List Price:</div>
        <div className='basis-1/3'>{satsToBitcoin(listPriceSats || 0)} BTC</div>
        <div className='basis-1/3'>{satsToUsd(listPriceSats).formatted}</div>
      </div>
      <div className='flex w-full flex-row text-white'>
        <div className='basis-1/3'>{variant === 'buy' ? 'Taker Fee (2%)' : 'Marketplace Fee (0.5%)'}:</div>
        <div className='basis-1/3'>{satsToBitcoin(feeSats || 0)} BTC</div>
        <div className='basis-1/3'>{satsToUsd(feeSats).formatted}</div>
      </div>
      <div className='flex w-full flex-row text-white'>
        <div className='basis-1/3'>{variant === 'buy' ? 'Total' : 'You receive'}:</div>
        <div className='basis-1/3'>{variant === 'buy' ? satsToBitcoin(pricePlusFee) : satsToBitcoin(priceMinusFee)} BTC</div>
        <div className='basis-1/3'>
          {variant === 'buy' ? satsToUsd(pricePlusFee).formatted : satsToUsd(priceMinusFee).formatted}
        </div>
      </div>
    </div>
  );
}
