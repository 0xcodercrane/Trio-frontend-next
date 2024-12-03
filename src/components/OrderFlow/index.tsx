import { useEffect } from 'react';
import DefaultPane from './DefaultPane';
import PendingPane from './PendingPane';
import CompletePane from './CompletePane';
import { EOrderFlowStates } from '@/types';
import { useOrderFlow } from '@/lib/hooks/useOrderFlow';
import { useInscriptionOrder } from '@/lib/hooks';

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

  const OrderFlowState = OrderFlowConfig[state];

  const { latestTrade, latestOrder } = useInscriptionOrder(inscriptionId);

  useEffect(() => {
    setOrderFlowState(EOrderFlowStates.Default);
  }, []);

  useEffect(() => {
    if (latestTrade && latestOrder) {
      if (latestTrade.status === 'mempool' && (latestOrder.status === 'broadcast' || latestOrder.status === 'active')) {
        setOrderFlowState(EOrderFlowStates.Pending);
        if (latestTrade.transaction_id) {
          setTxId(latestTrade.transaction_id);
        }
      }
      if (latestTrade.status === 'confirmed') {
        setOrderFlowState(EOrderFlowStates.Default);
      }
    }
  }, [latestTrade, latestOrder]);

  return (
    <div className='flex h-full w-full'>
      <OrderFlowState inscriptionId={inscriptionId} collectionSlug={collectionSlug} />
    </div>
  );
}
