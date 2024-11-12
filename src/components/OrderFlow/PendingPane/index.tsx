import FeesPanel from '@/components/FeesPanel';
import MempoolTx from '@/components/MempoolTx';
import { OrderFlowPaneBaseProps } from '..';
import { useInscriptionOrder } from '@/lib/hooks';

export default function PendingPane({ inscriptionId }: OrderFlowPaneBaseProps) {
  const { latestOrder } = useInscriptionOrder(inscriptionId);

  return (
    <div className='flex h-full w-full flex-col gap-8'>
      <FeesPanel listPriceSats={latestOrder?.price} takerFeeSats={latestOrder?.platform_taker_fee} />
      {/* <LeadingFee orderId={''} /> */}
      <MempoolTx />
    </div>
  );
}
