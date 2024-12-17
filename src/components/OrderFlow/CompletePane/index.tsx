import FeesPanel from '@/components/FeesPanel';
import PurchaseComplete from '@/components/PurchaseComplete';
import { OrderFlowPaneBaseProps } from '..';
import { useInscriptionOrder } from '@/lib/hooks';

export default function CompletePane({ inscriptionId }: OrderFlowPaneBaseProps) {
  const { latestOrder } = useInscriptionOrder(inscriptionId);

  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='rounded-lg bg-ob-purple-dark p-4'>
        {' '}
        <FeesPanel listPriceSats={latestOrder?.price} />
      </div>

      <PurchaseComplete inscriptionId={inscriptionId} />
    </div>
  );
}
