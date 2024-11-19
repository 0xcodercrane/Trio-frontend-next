import { useOrderFlow } from '@/lib/hooks/useOrderFlow';
import { Button } from '../../../ui/button';
import { EOrderFlowStates } from '@/types';
import { useFeeRates, useListings } from '@/lib/hooks';

interface BuyNowProps {
  orderId: number | undefined;
}

export default function BuyNow({ orderId }: BuyNowProps) {
  const { buyListing } = useListings();
  const { setOrderFlowState, setTxId } = useOrderFlow();
  const { feeRate } = useFeeRates();

  const handleBuy = async () => {
    if (!orderId) {
      return;
    }
    const txId = await buyListing(orderId, feeRate);
    if (txId) {
      setTxId(txId);
      setOrderFlowState(EOrderFlowStates.Pending);
    }
  };

  return (
    <div className='flex flex-row items-center gap-4'>
      <Button disabled={!orderId} className='min-w-full rounded-lg text-lg' onClick={handleBuy}>
        Buy Now
      </Button>
      {/* <div className='flex h-full flex-col items-center justify-center'>
        <Tag label='+ 1,000 XP' variant={EComponentVariants.Default} />
      </div> */}
    </div>
  );
}
