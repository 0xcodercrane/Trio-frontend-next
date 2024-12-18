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
import { Skeleton } from '../ui/skeleton';
import { ReactNode } from 'react';

interface FeesPanelProps {
  listPriceSats: number | undefined;
  variant?: 'buy' | 'listing';
}

const getFee = (priceInSats: number, feeMultiplier: number, variant: 'buy' | 'listing') => {
  const fee = priceInSats * feeMultiplier;
  return fee < MIN_UTXO_VALUE && variant === 'buy' ? MIN_UTXO_VALUE : fee;
};

const FeeRow = ({
  className,
  label,
  satsValue,
  isPending
}: {
  className: string;
  label: ReactNode;
  satsValue: number | undefined;
  isPending: boolean;
}) => {
  const { satsToUsd } = usePrices();
  return (
    <div className={`${className} flex w-full flex-row gap-2`}>
      <div className='flex h-6 basis-1/2 items-center gap-4'>
        {isPending ? <Skeleton className='h-full w-full' /> : label}
      </div>
      <div className='basis-1/4 text-right'>
        {isPending ? <Skeleton className='h-full w-full' /> : <>{satsToBitcoin(satsValue || 0)} BTC</>}
      </div>
      <div className='basis-1/4 text-right'>
        {isPending ? <Skeleton className='h-full w-full' /> : satsToUsd(satsValue).formatted}
      </div>
    </div>
  );
};

export default function FeesPanel({ listPriceSats, variant = 'buy' }: FeesPanelProps) {
  const wallet = useWallet();
  const { isPending: isPendingPrices } = usePrices();

  const { data: tokenBalance, isPending: isPendingTrioBalance } = useTokenBalanceQuery(
    wallet?.ordinalsAddress || '',
    'TRIO'
  );
  const hasTrioDiscount = tokenBalance && tokenBalance.overallBalance >= MARKETPLACE_TRIO_DISCOUNT_THRESHOLD;

  const feeMultiplier = bpsToDecimal(variant === 'buy' ? MARKETPLACE_TAKER_FEE_BPS : MARKETPLACE_MAKER_FEE_BPS);
  const feeSats = getFee(listPriceSats || 0, feeMultiplier, variant);
  const pricePlusFee = feeSats + (listPriceSats || 0);
  const priceMinusFee = (listPriceSats || 0) - feeSats;
  const totalPrice = hasTrioDiscount ? listPriceSats : variant === 'buy' ? pricePlusFee : priceMinusFee;

  const isPending = isPendingPrices || isPendingTrioBalance;
  return (
    <div className='flex flex-col gap-4 rounded-lg bg-ob-purple-dark'>
      <FeeRow label='List Price' satsValue={listPriceSats} className='text-xl font-bold text-white' isPending={isPending} />
      <FeeRow
        label={
          <>
            {variant === 'buy'
              ? `Taker Fee (${hasTrioDiscount ? 0 : bpsToPercentage(MARKETPLACE_TAKER_FEE_BPS)}%)`
              : `Maker Fee (${hasTrioDiscount ? 0 : bpsToPercentage(MARKETPLACE_MAKER_FEE_BPS)}%)`}
            {!hasTrioDiscount && variant === 'buy' && <ZeroFeeDialog />}
          </>
        }
        satsValue={hasTrioDiscount ? 0 : feeSats}
        className='text-white/60'
        isPending={isPending}
      />
      <FeeRow
        label={variant === 'buy' ? 'Total' : 'You receive'}
        satsValue={totalPrice}
        className='text-white/60'
        isPending={isPending}
      />
    </div>
  );
}
