import FeesPanel from '@/components/FeesPanel';
import MempoolTx from '@/components/OrderFlow/DefaultPane/MempoolTx';
import { OrderFlowPaneBaseProps } from '..';
import { useInscriptionOrder } from '@/lib/hooks';

export default function PendingPane({ inscriptionId }: OrderFlowPaneBaseProps) {
  const { latestOrder } = useInscriptionOrder(inscriptionId);

  return (
    <div className='flex h-full w-full flex-col gap-8 rounded-lg sm:bg-ob-purple-dark sm:p-4'>
      <FeesPanel listPriceSats={latestOrder?.price} />
      {/* <LeadingFee orderId={''} /> */}
      <MempoolTx />
    </div>
  );
}
