import FeesPanel from '@/components/FeesPanel';
import PurchaseComplete from '@/components/PurchaseComplete';
import { OrderFlowPaneBaseProps } from '..';
import { useInscriptionOrder } from '@/lib/hooks';

export default function CompletePane({ inscriptionId }: OrderFlowPaneBaseProps) {
  const { latestOrder } = useInscriptionOrder(inscriptionId);

  return (
    <div className='flex h-full w-full flex-col gap-8'>
      <FeesPanel listPriceSats={latestOrder?.price} feeSats={latestOrder?.platform_taker_fee} />
      <PurchaseComplete />
    </div>
  );
}
