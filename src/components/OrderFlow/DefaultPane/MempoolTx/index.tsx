import { Button } from '@/components/ui/button';
import { useOrderFlow } from '@/lib/hooks';
import { shortenTxid } from '@/lib/utilities';
import { Tag } from '../../../common';
import { EComponentVariants } from '@/types';

export default function MempoolTx() {
  const { txId } = useOrderFlow();
  return (
    <div className='flex h-full w-full flex-col gap-4 rounded-lg bg-ob-purple p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <span className='text-2xl font-bold text-white'>Pending Transaction</span>
          <a target='_blank' href={`https://mempool.space/tx/${txId}`} className='flex flex-row gap-2'>
            <span className='text-ob-grey-lightest'>Transaction ID</span>
            <span className='text-ob-grey-lightest'>{txId && shortenTxid(txId)}</span>
          </a>
        </div>
        <div className='flex h-full flex-col items-center justify-center'>
          <Tag label='Pending Buy' variant={EComponentVariants.Info} />
        </div>
        {/* <Button variant='secondary'>Cancel</Button>  */}
      </div>
    </div>
  );
}
