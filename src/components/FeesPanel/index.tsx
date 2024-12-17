import {
  MARKETPLACE_MAKER_FEE_BPS,
  MARKETPLACE_TAKER_FEE_BPS,
  MARKETPLACE_TRIO_DISCOUNT_THRESHOLD,
  MIN_UTXO_VALUE
} from '@/lib/constants';
import { usePrices, useTokenBalanceQuery } from '@/lib/services';
import { bpsToDecimal, bpsToPercentage, satsToBitcoin } from '@/lib/utilities';
import { useWallet } from '@/lib/hooks';
import { ZeroFeeDialog } from '../ZeroFeeDialog';

interface FeesPanelProps {
  listPriceSats: number | undefined;
  variant?: 'buy' | 'listing';
}

const getFee = (priceInSats: number, feeMultiplier: number, variant: 'buy' | 'listing') => {
  const fee = priceInSats * feeMultiplier;
  return fee < MIN_UTXO_VALUE && variant === 'buy' ? MIN_UTXO_VALUE : fee;
};

export default function FeesPanel({ listPriceSats, variant = 'buy' }: FeesPanelProps) {
  const { satsToUsd } = usePrices();
  const wallet = useWallet();

  const { data: tokenBalance } = useTokenBalanceQuery(wallet?.ordinalsAddress || '', 'TRIO');
  const hasTrioDiscount = tokenBalance && tokenBalance.overallBalance >= MARKETPLACE_TRIO_DISCOUNT_THRESHOLD;

  const feeMultiplier = bpsToDecimal(variant === 'buy' ? MARKETPLACE_TAKER_FEE_BPS : MARKETPLACE_MAKER_FEE_BPS);
  const feeSats = getFee(listPriceSats || 0, feeMultiplier, variant);
  const pricePlusFee = feeSats + (listPriceSats || 0);
  const priceMinusFee = (listPriceSats || 0) - feeSats;
  const totalPrice = hasTrioDiscount ? listPriceSats : variant === 'buy' ? pricePlusFee : priceMinusFee;

  return (
    <div className='flex flex-col gap-4 rounded-lg bg-ob-purple-dark'>
      <div className='flex w-full flex-row text-xl font-bold text-white'>
        <div className='basis-1/2'>List Price</div>
        <div className='basis-1/4 whitespace-nowrap text-right'>{satsToBitcoin(listPriceSats || 0)} BTC</div>
        <div className='basis-1/4 whitespace-nowrap text-right'>{satsToUsd(listPriceSats).formatted}</div>
      </div>
      <div className={`flex w-full flex-row items-center text-white/60 ${hasTrioDiscount && 'line-through'}`}>
        <div className='flex basis-1/2 items-center gap-4'>
          {variant === 'buy'
            ? `Taker Fee (${hasTrioDiscount ? 0 : bpsToPercentage(MARKETPLACE_TAKER_FEE_BPS)}%)`
            : `Maker Fee (${hasTrioDiscount ? 0 : bpsToPercentage(MARKETPLACE_MAKER_FEE_BPS)}%)`}
          {!hasTrioDiscount && variant === 'buy' && <ZeroFeeDialog />}
        </div>
        <div className='basis-1/4 whitespace-nowrap text-right'>{satsToBitcoin(hasTrioDiscount ? 0 : feeSats)} BTC</div>
        <div className='basis-1/4 whitespace-nowrap text-right'>{satsToUsd(hasTrioDiscount ? 0 : feeSats).formatted}</div>
      </div>
      <div className='flex w-full flex-row text-white/60'>
        <div className='basis-1/2'>{variant === 'buy' ? 'Total' : 'You receive'}</div>
        <div className='basis-1/4 text-right'>{satsToBitcoin(totalPrice || 0)} BTC</div>
        <div className='basis-1/4 text-right'>{satsToUsd(totalPrice).formatted}</div>
      </div>
    </div>
  );
}
