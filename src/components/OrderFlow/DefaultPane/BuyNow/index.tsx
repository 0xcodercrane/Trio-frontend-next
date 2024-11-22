import { useOrderFlow } from '@/lib/hooks/useOrderFlow';
import { Button } from '../../../ui/button';
import { EOrderFlowStates } from '@/types';
import { useFeeRates, useListings } from '@/lib/hooks';
import { useState } from 'react';
import { Loading } from '@/components/common';

interface BuyNowProps {
  orderId: number | undefined;
}

export default function BuyNow({ orderId }: BuyNowProps) {
  const [isPendingPurchase, setIsPendingPurchase] = useState(false);
  const { buyListing } = useListings();
  const { setOrderFlowState, setTxId } = useOrderFlow();
  const { feeRate } = useFeeRates();

  const handleBuy = async () => {
    if (!orderId) {
      return;
    }

    setIsPendingPurchase(true);
    const txId = await buyListing(orderId, feeRate);
    setIsPendingPurchase(false);
    if (txId) {
      setTxId(txId);
      setOrderFlowState(EOrderFlowStates.Pending);
    }
  };

  return (
    <div className='flex flex-row items-center gap-4'>
      <Button disabled={!orderId || isPendingPurchase} className='min-w-full rounded-lg text-lg' onClick={handleBuy}>
        {isPendingPurchase ? <Loading className='p-2 text-ob-purple-dark' /> : 'Buy Now'}
      </Button>
      {/* <div className='flex h-full flex-col items-center justify-center'>
        <Tag label='+ 1,000 XP' variant={EComponentVariants.Default} />
      </div> */}
    </div>
  );
}
