import CustomFeeInput from '@/components/Inputs/CustomFeeInput';
import { UserOrdersTable } from '@/components/Tables';
import { Button } from '@/components/ui/button';

// Replace this with actual data when implementing logic here.
const TX_VIRTUAL_SIZE_PLACEHOLDER = 21;

export default function OrdersPane() {
  return (
    <div className='flex flex-col gap-4'>
      <UserOrdersTable />
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <CustomFeeInput txVirtualSize={TX_VIRTUAL_SIZE_PLACEHOLDER} />
          <Button className='w-full min-w-full max-w-full' variant='secondary'>
            Increase All Losing Bids
          </Button>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <CustomFeeInput txVirtualSize={TX_VIRTUAL_SIZE_PLACEHOLDER} />
          <Button className='w-full min-w-full max-w-full' variant='secondary'>
            Increase All Max Fees
          </Button>
        </div>
      </div>
    </div>
  );
}
