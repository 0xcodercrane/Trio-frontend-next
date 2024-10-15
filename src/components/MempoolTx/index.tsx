import { Button } from '@/components/ui/button';
import { shortenTxid } from '@/lib/utilities';

interface IMempoolTx {
  txid?: string;
}

export default function MempoolTx({
  txid = 'e7d4d1800211295aefe73d7cc8408854a8aa706fd0a2d0998fa47a85a04d1149'
}: IMempoolTx) {
  return (
    <div className='flex h-full w-full flex-col gap-4 rounded-lg bg-ob-grey p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <span className='text-2xl font-bold text-white'>Pending Transaction</span>
          <div className='flex flex-row gap-2'>
            <span className='text-ob-grey-lightest'>Transaction ID</span>
            <span className='text-ob-grey-lightest'>{shortenTxid(txid)}</span>
          </div>
        </div>
        <Button variant='secondary'>Cancel</Button>
      </div>
    </div>
  );
}
