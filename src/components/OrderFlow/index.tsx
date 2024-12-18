import { useEffect } from 'react';
import DefaultPane from './DefaultPane';
import PendingPane from './PendingPane';
import CompletePane from './CompletePane';
import { EOrderFlowStates } from '@/types';
import { useOrderFlow } from '@/lib/hooks/useOrderFlow';
import { useInscriptionOrder, useWallet } from '@/lib/hooks';

export interface OrderFlowPaneBaseProps {
  inscriptionId: string;
  collectionSlug: string | undefined;
}

const OrderFlowConfig = {
  [EOrderFlowStates.Default]: DefaultPane,
  [EOrderFlowStates.Pending]: PendingPane,
  [EOrderFlowStates.Complete]: CompletePane
};

export default function OrderFlow({ inscriptionId, collectionSlug }: OrderFlowPaneBaseProps) {
  const { state, setOrderFlowState, setTxId } = useOrderFlow();
  const wallet = useWallet();
  const OrderFlowState = OrderFlowConfig[state];

  const { latestTrade, latestOrder, tradeWasInMempool, takerOrdinalAddress } = useInscriptionOrder(inscriptionId);

  useEffect(() => {
    if (latestOrder) {
      if (latestTrade?.status === 'mempool') {
        setOrderFlowState(EOrderFlowStates.Pending);
        if (latestTrade.transaction_id) {
          setTxId(latestTrade.transaction_id);
        }
      }
      if (latestTrade?.status === 'confirmed') {
        if (tradeWasInMempool && wallet?.ordinalsAddress === takerOrdinalAddress?.address) {
          setOrderFlowState(EOrderFlowStates.Complete);
        } else {
          setOrderFlowState(EOrderFlowStates.Default);
        }
      }
    }
    return () => {
      setOrderFlowState(EOrderFlowStates.Default);
    };
  }, [latestTrade, latestOrder, wallet?.ordinalsAddress, takerOrdinalAddress]);

  return (
    <div className='flex h-full w-full'>
      <OrderFlowState inscriptionId={inscriptionId} collectionSlug={collectionSlug} />
    </div>
  );
}
