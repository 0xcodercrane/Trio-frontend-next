'use client';

import { MEMPOOL_SPACE_URL } from '@/lib/constants';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';
import { shortenAddress } from '@/lib/utilities';
import { Check, XIcon } from 'lucide-react';
import { useMemo } from 'react';
import Loading from '../Loading';
import { useMempoolTx } from '@/lib/hooks/useMempoolTx';
import Link from 'next/link';

interface MempoolTxProps {
  txid: string;
}

export const MempoolTx = ({ txid }: MempoolTxProps) => {
  const { data: tip } = useBlockHeight();
  const { data: tx, isPending: txPending, error: txError } = useMempoolTx(txid);

  const confirmations = useMemo(() => {
    if (tx === null || !tip) return 0;
    const { block_height: confirmationHeight, confirmed } = tx.status;
    if (!confirmed || !confirmationHeight) return 0;
    if (tip === confirmationHeight) return 1;
    return tip - confirmationHeight + 1;
  }, [tip, tx]);

  const renderStatus = () => {
    if (!tx)
      return (
        <div className='bg-light flex flex-row items-center justify-between gap-4 p-4'>
          <XIcon size={12} />
          <span>No transaction found</span>
        </div>
      );
    if (tx.status.confirmed) {
      // Confirmed
      return (
        <div
          className={`bg-light flex flex-row items-center justify-between gap-4 rounded-md p-4 ${confirmations > 0 ? 'border border-ob-green-light/[0.80]' : ''}`}
        >
          <Check size={12} />
          <div className='flex flex-col'>
            <span className='bold'>
              Transaction Confirmed:&nbsp;
              <Link href={`https://mempool.space/tx/${txid}`} target='_blank' className='text-ob-yellow'>
                {shortenAddress(txid)}
              </Link>
            </span>
            <span className='small uppercase'>{confirmations} confirmations</span>
          </div>
        </div>
      );
    } else {
      // Unconfirmed
      return (
        <div
          className={`bg-light flex flex-row items-center justify-between gap-4 rounded-md p-4 ${confirmations > 0 ? 'border border-ob-green-light/[0.20]' : ''}`}
        >
          <Loading />
          <span className='bold'>
            Transaction Found:&nbsp;
            <a href={`${MEMPOOL_SPACE_URL}/tx/${txid}`} target='_blank'>
              {shortenAddress(txid)}
            </a>
          </span>
          <span className='small uppercase'>{confirmations} confirmations</span>
        </div>
      );
    }
  };

  if (tx === null)
    return (
      <a href={`${MEMPOOL_SPACE_URL}/tx/${txid}`} target='_blank'>
        {shortenAddress(txid)}
      </a>
    );
  return <div className='flex flex-row items-center'>{renderStatus()}</div>;
};
