import { useOrderFlow } from '@/lib/hooks/useOrderFlow';
import { Button } from '../../../ui/button';
import { EOrderFlowStates } from '@/types';
import { useListings, usePaddingOutputs, useWallet } from '@/lib/hooks';
import { useState } from 'react';
import { Loading, Tag } from '@/components/common';
import { useLaserEyes } from '@omnisat/lasereyes';

interface BuyNowProps {
  orderId: number | undefined;
  price: number | undefined;
  inscriptionId: string;
}

const getDisabledBuyButtonMessage = (
  ...[
    wallet,
    orderId,
    isPendingPurchase,
    isOutputsSetupInMempool,
    hasPaddingOutputs,
    isPaddingOutputsCheckFetching,
    hasEnoughBalance
  ]: boolean[]
): string | null => {
  if (!wallet) return 'Please connect your wallet.';
  if (!orderId) return 'Loading order data...';
  if (isPaddingOutputsCheckFetching) return 'Checking your padding outputs...';
  if (isPendingPurchase) return 'Purchase in progress...';
  if (isOutputsSetupInMempool)
    return 'Padding outputs setup transaction is in mempool, please wait until it gets confirmed.';
  if (!hasEnoughBalance) return 'Connected wallet does not contain enough funds to buy this item.';
  if (!hasPaddingOutputs) return 'Your payment address does not have enough paddding outputs set up.';
  return null;
};

export default function BuyNow({ orderId, inscriptionId, price }: BuyNowProps) {
  const { balance } = useLaserEyes();
  const [isPendingPurchase, setIsPendingPurchase] = useState(false);
  const { buyListing } = useListings();
  const { setOrderFlowState, setTxId } = useOrderFlow();
  const wallet = useWallet();
  const {
    hasPaddingOutputs,
    setupPaddingOutputs,
    isOutputsSetupInMempool,
    isPaddingOuputsSetupInProgress,
    isPaddingOutputsCheckFetching
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

  const disabledBuyButtonMessage = getDisabledBuyButtonMessage(
    !!wallet,
    !!orderId,
    isPendingPurchase,
    isOutputsSetupInMempool,
    !!hasPaddingOutputs,
    isPaddingOutputsCheckFetching,
    !!hasEnoughBalance
  );

  const isBuyButtonDisabled = !!disabledBuyButtonMessage;

  return (
    <div className='flex flex-col items-center gap-4'>
      {isOutputsSetupInMempool && (
        <div className='flex flex-col gap-4 rounded-xl bg-ob-purple p-4 text-white'>
          Padding outputs setup transaction for the connected wallet is in the mempool, please wait until it gets confirmed
          to be able to buy.
        </div>
      )}
      {disabledBuyButtonMessage && <div className='w-full text-center'>{disabledBuyButtonMessage}</div>}

      {!isPaddingOutputsCheckFetching && !hasPaddingOutputs && !isOutputsSetupInMempool && (
        <Button
          disabled={
            !orderId || isPendingPurchase || isPaddingOutputsCheckFetching || isPaddingOuputsSetupInProgress || !wallet
          }
          className='min-w-full rounded-lg text-lg'
          onClick={setupPaddingOutputs}
        >
          {isPaddingOuputsSetupInProgress ? <Loading className='p-2 text-ob-purple-dark' /> : 'Prepare Wallet'}
        </Button>
      )}
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        <Button disabled={isBuyButtonDisabled} className='w-full max-w-full rounded-lg text-lg' onClick={handleBuy}>
          {isPendingPurchase ? <Loading className='p-2 text-ob-purple-dark' /> : 'Buy Now'}
        </Button>
        <Tag label='+ 2000 XP' info='This order receives 2000 XP for upon completion' />
      </div>
    </div>
  );
}
