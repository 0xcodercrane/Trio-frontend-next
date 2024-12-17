'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Chit } from '@/components/common';
import { EComponentVariants, EOrderFlowStates } from '@/types';
import { Button } from '../ui/button';
import CustomFeeInput from '../Inputs/CustomFeeInput';
import { useOrderFlow } from '@/lib/hooks/useOrderFlow';

export default function LeadingFee({ orderId }: { orderId: string }) {
  const { setOrderFlowState } = useOrderFlow();

  const { data } = useQuery({
    queryKey: ['transaction', orderId],
    queryFn: () => 'sniped'
  });

  const transactionStatus: string = useMemo(() => data || 'leading', [data]);

  return (
    <div className='relative flex h-full w-full flex-col gap-4 rounded-lg bg-ob-grey p-4'>
      {transactionStatus === 'leading' ? (
        <div className='flex h-full flex-col'>
          <div className='flex w-full flex-row items-center justify-between'>
            <span className='text-2xl font-bold text-white'>You have the leading bid</span>
            <Chit variant={EComponentVariants.Success} label={transactionStatus} />
          </div>
          <div className='flex w-2/3 flex-col gap-2'>
            <span className='text-ob-grey-lightest'>
              You are currently leading the bid on this purchase, we will notify you if anything changes.
            </span>
          </div>
        </div>
      ) : (
        <div className='flex h-full flex-col'>
          <div className='flex w-full flex-row items-center justify-between'>
            <span className='text-2xl font-bold text-white'>You are being sniped</span>
            <Chit variant={EComponentVariants.Error} label={transactionStatus} />
          </div>
          <div className='flex w-2/3 flex-col gap-2'>
            <span className='text-ob-grey-lightest'>
              You had a pending order, but the item you wish to purchase is currently being bid on by another user
            </span>
          </div>
        </div>
      )}

      <div className='flex h-full w-full flex-row items-center justify-between gap-4'>
        {/* <CustomFeeInput txVirtualSize={21} /> */}
        <Button variant='secondary' onClick={() => setOrderFlowState(EOrderFlowStates.Complete)}>
          Increase Fee
        </Button>
      </div>
    </div>
  );
}
