'use client';

import { useMemo } from 'react';
import { EPoolState, TLotteryPool, TProportionatePool } from '@/types';
import { mapPoolToState } from '../helpers';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';
import { formatBlock } from '@/lib/utilities';

export default function Pool({ pool, children }: { pool: TLotteryPool | TProportionatePool; children: React.ReactNode }) {
  const { data: tip } = useBlockHeight();
  const { startBlock, endBlock } = pool;
  const poolState: EPoolState = useMemo(() => mapPoolToState(pool, tip), [pool, tip]);

  return (
    <div className='relative rounded-lg bg-ob-purple-light'>
      {poolState === EPoolState.PENDING && (
        <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.80]'>
          <span className='text-lg'>Pool Pending Confirmation</span>
        </div>
      )}
      {poolState === EPoolState.UPCOMING && (
        <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.80]'>
          <span className='text-lg'>Pool Opening in {formatBlock(startBlock - tip)} blocks</span>
          <span className='text-sm italic'>(block {formatBlock(startBlock)})</span>
        </div>
      )}

      {poolState === EPoolState.ENDED && (
        <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.80]'>
          <span className='text-lg'>Pool Closed at {formatBlock(endBlock)}</span>
          <span>The winner of this pool will be announced soon</span>
          <span className='text-sm italic'>(block {formatBlock(startBlock)})</span>
        </div>
      )}

      {children}
    </div>
  );
}
