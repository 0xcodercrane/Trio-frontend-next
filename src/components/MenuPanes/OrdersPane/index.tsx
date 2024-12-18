import { UserOrdersTable } from '@/components/Tables';
import { Button } from '@/components/ui/button';

export default function OrdersPane() {
  return (
    <div className='flex flex-col gap-4'>
      <UserOrdersTable />
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          {/* <CustomFeeInput txVirtualSize={TX_VIRTUAL_SIZE_PLACEHOLDER} /> */}
          <Button className='w-full min-w-full max-w-full' variant='secondary'>
            Increase All Losing Bids
          </Button>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {/* <CustomFeeInput txVirtualSize={TX_VIRTUAL_SIZE_PLACEHOLDER} /> */}
          <Button className='w-full min-w-full max-w-full' variant='secondary'>
            Increase All Max Fees
          </Button>
        </div>
      </div>
    </div>
  );
}
