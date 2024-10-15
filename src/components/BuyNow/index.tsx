import { useOrderFlow } from '@/lib/hooks/useOrderFlow';
import { Tag } from '../common';
import { Button } from '../ui/button';
import { EComponentVariants } from '@/types/styles';
import { EOrderFlowStates } from '@/types';

export default function BuyNow() {
  const { setOrderFlowState } = useOrderFlow();
  return (
    <div className='flex flex-row items-center gap-4'>
      <Button size='lg' variant='secondary' onClick={() => setOrderFlowState(EOrderFlowStates.Pending)}>
        Buy Now
      </Button>
      <div className='flex h-full flex-col items-center justify-center'>
        <Tag label='+ 1,000 XP' variant={EComponentVariants.Default} />
      </div>
    </div>
  );
}
