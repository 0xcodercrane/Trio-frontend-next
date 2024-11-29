import { useOrderFlow } from '@/lib/hooks/useOrderFlow';
import { Button } from '../../../ui/button';
import { EOrderFlowStates } from '@/types';
import { useListings, usePaddingOutputs } from '@/lib/hooks';
import { useState } from 'react';
import { Loading } from '@/components/common';

interface BuyNowProps {
  orderId: number | undefined;
  inscriptionId: string;
}

export default function BuyNow({ orderId, inscriptionId }: BuyNowProps) {
  const [isPendingPurchase, setIsPendingPurchase] = useState(false);
  const { buyListing } = useListings();
  const { setOrderFlowState, setTxId } = useOrderFlow();
  const { hasPaddingOutputs, setupPaddingOutputs, isPaddingOuputsSetupInProgress, isPaddingOutputsCheckPending } =
    usePaddingOutputs();

  const handleBuy = async () => {
    if (!orderId) {
      return;
    }

    setIsPendingPurchase(true);
    const txId = await buyListing(orderId, inscriptionId);
    setIsPendingPurchase(false);
    if (txId) {
      setTxId(txId);
      setOrderFlowState(EOrderFlowStates.Pending);
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      {!isPaddingOutputsCheckPending && !hasPaddingOutputs && (
        <Button
          disabled={!orderId || isPendingPurchase || isPaddingOutputsCheckPending || isPaddingOuputsSetupInProgress}
          className='min-w-full rounded-lg text-lg'
          onClick={setupPaddingOutputs}
        >
          {isPaddingOuputsSetupInProgress ? <Loading className='p-2 text-ob-purple-dark' /> : 'Prepare Wallet'}
        </Button>
      )}
      <Button
        disabled={!orderId || isPendingPurchase || !hasPaddingOutputs || isPaddingOutputsCheckPending}
        className='min-w-full rounded-lg text-lg'
        onClick={handleBuy}
      >
        {isPendingPurchase ? <Loading className='p-2 text-ob-purple-dark' /> : 'Buy Now'}
      </Button>
      {/* <div className='flex h-full flex-col items-center justify-center'>
        <Tag label='+ 1,000 XP' variant={EComponentVariants.Default} />
      </div> */}
    </div>
  );
}
