import { useOrderFlow } from '@/lib/hooks/useOrderFlow';
import { Button } from '../../../ui/button';
import { EOrderFlowStates } from '@/types';
import { useListings, usePaddingOutputs } from '@/lib/hooks';
import { useState } from 'react';
import { Loading, Tag } from '@/components/common';
import { useLaserEyes } from '@omnisat/lasereyes';

interface BuyNowProps {
  orderId: number | undefined;
  price: number | undefined;
  inscriptionId: string;
}

export default function BuyNow({ orderId, inscriptionId, price }: BuyNowProps) {
  const { balance } = useLaserEyes();
  const [isPendingPurchase, setIsPendingPurchase] = useState(false);
  const { buyListing } = useListings();
  const { setOrderFlowState, setTxId } = useOrderFlow();
  const {
    hasPaddingOutputs,
    setupPaddingOutputs,
    isOutputsSetupInMempool,
    isPaddingOuputsSetupInProgress,
    isPaddingOutputsCheckPending
  } = usePaddingOutputs();

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

  const hasEnoughBalance = balance && price && balance > price;

  return (
    <div className='flex flex-col items-center gap-4'>
      {!isPaddingOutputsCheckPending && !hasPaddingOutputs && !isOutputsSetupInMempool && (
        <Button
          disabled={!orderId || isPendingPurchase || isPaddingOutputsCheckPending || isPaddingOuputsSetupInProgress}
          className='min-w-full rounded-lg text-lg'
          onClick={setupPaddingOutputs}
        >
          {isPaddingOuputsSetupInProgress ? <Loading className='p-2 text-ob-purple-dark' /> : 'Prepare Wallet'}
        </Button>
      )}
      {isOutputsSetupInMempool && (
        <div className='flex flex-col gap-4 rounded-xl bg-ob-purple p-4 text-white'>
          Padding outputs setup transaction for the connected wallet is in the mempool, please wait until it gets confirmed
          to be able to buy.
        </div>
      )}
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        <Button
          disabled={
            !orderId ||
            isPendingPurchase ||
            isOutputsSetupInMempool ||
            !hasPaddingOutputs ||
            isPaddingOutputsCheckPending ||
            !hasEnoughBalance
          }
          className='w-full max-w-full rounded-lg text-lg'
          onClick={handleBuy}
        >
          {isPendingPurchase ? <Loading className='p-2 text-ob-purple-dark' /> : 'Buy Now'}
        </Button>
        <Tag label='+ 2000 XP' info='This order receives 2000 XP for upon completion' />
      </div>
    </div>
  );
}
