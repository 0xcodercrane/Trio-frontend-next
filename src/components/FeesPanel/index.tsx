import { AuthContext } from '@/app/providers/AuthContext';
import { MARKETPLACE_MAKER_FEE_BPS, MARKETPLACE_TAKER_FEE_BPS, MARKETPLACE_TRIO_DISCOUNT_THRESHOLD } from '@/lib/constants';
import { usePrices, useTokenBalanceQuery, useTrioInfoQuery } from '@/lib/services';
import { satsToBitcoin } from '@/lib/utilities';
import { useContext } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface FeesPanelProps {
  listPriceSats: number | undefined;
  variant?: 'buy' | 'listing';
}

export default function FeesPanel({ listPriceSats, variant = 'buy' }: FeesPanelProps) {
  const { satsToUsd } = usePrices();

  const { user, wallet } = useContext(AuthContext);

  const { data: tokenBalance } = useTokenBalanceQuery(wallet?.ordinalsAddress || '', 'TRIO');
  const hasTrioDiscount = tokenBalance && parseInt(tokenBalance.overall_balance) >= MARKETPLACE_TRIO_DISCOUNT_THRESHOLD;

  const feeBps = variant === 'buy' ? MARKETPLACE_TAKER_FEE_BPS : MARKETPLACE_MAKER_FEE_BPS;
  const feeSats = listPriceSats ? (feeBps / 10000) * listPriceSats : 0;
  const pricePlusFee = feeSats + (listPriceSats || 0);
  const priceMinusFee = (listPriceSats || 0) - feeSats;
  const totalPrice = hasTrioDiscount ? listPriceSats : variant === 'buy' ? pricePlusFee : priceMinusFee;

  return (
    <div className='flex flex-col gap-4 rounded-lg bg-ob-purple-dark'>
      <div className='flex w-full flex-row text-xl font-bold text-white'>
        <div className='basis-1/3'>List Price:</div>
        <div className='basis-1/3'>{satsToBitcoin(listPriceSats || 0)} BTC</div>
        <div className='basis-1/3'>{satsToUsd(listPriceSats).formatted}</div>
      </div>
      <div className={`flex w-full flex-row text-white ${hasTrioDiscount && 'line-through'}`}>
        <div className='basis-1/3'>
          {variant === 'buy'
            ? `Taker Fee (${MARKETPLACE_TAKER_FEE_BPS / 100}%)`
            : `Marketplace Fee (${MARKETPLACE_MAKER_FEE_BPS / 100}%)`}
          :
        </div>
        <div className='basis-1/3'>{satsToBitcoin(feeSats)} BTC</div>
        <div className='basis-1/3'>{satsToUsd(feeSats).formatted}</div>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex w-full flex-row text-ob-yellow ${!hasTrioDiscount && 'line-through'}`}>
            <div className='basis-1/3'>TRIO Holder Fee (0%)</div>
            <div className='basis-1/3'>{satsToBitcoin(0)} BTC</div>
            <div className='basis-1/3'>{satsToUsd(0).formatted}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>Holders of {MARKETPLACE_TRIO_DISCOUNT_THRESHOLD}+ TRIO tokens have 0% fees.</TooltipContent>
      </Tooltip>

      <div className='flex w-full flex-row text-white'>
        <div className='basis-1/3'>{variant === 'buy' ? 'Total' : 'You receive'}:</div>
        <div className='basis-1/3'>{satsToBitcoin(totalPrice || 0)} BTC</div>
        <div className='basis-1/3'>{satsToUsd(totalPrice).formatted}</div>
      </div>
    </div>
  );
}
