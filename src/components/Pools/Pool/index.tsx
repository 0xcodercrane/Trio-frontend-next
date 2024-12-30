'use client';

import { useBlockHeight } from '@/lib/hooks/useBlockHeight';
import { formatBlock } from '@/lib/utilities';
import { EPoolState, EPoolType, TLotteryPool, TProportionatePool } from '@/types';
import { useMemo } from 'react';
import { mapPoolToState } from '../helpers';
import { LotteryPool } from '../LotteryPool';
import { PoolEnded } from '../PoolEnded';
import { ProportionatePool } from '../ProportionatePool';

export default function Pool({ pool }: { pool: TLotteryPool | TProportionatePool }) {
  const { data: tip } = useBlockHeight();
  const { startBlock } = pool;
  const poolState: EPoolState = useMemo(() => mapPoolToState(pool, tip || 0), [pool, tip]);

  const renderPool = () => {
    switch (pool.type) {
      case EPoolType.WINNER_TAKES_ALL:
      case EPoolType.N_WINNERS:
        return <LotteryPool pool={pool as TLotteryPool} />;
      default:
        return <ProportionatePool pool={pool as TProportionatePool} />;
    }
  };

  return (
    <div className='relative w-full rounded-lg bg-ob-purple-light'>
      {poolState === EPoolState.PENDING && (
        <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.80]'>
          <span className='text-lg'>Pool Pending Confirmation</span>
        </div>
      )}
      {poolState === EPoolState.UPCOMING && (
        <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.80]'>
          <span className='text-lg'>Pool Opening in {formatBlock(startBlock - (tip || 0))} blocks</span>
          <span className='text-sm italic'>(block {formatBlock(startBlock)})</span>
        </div>
      )}

      {poolState === EPoolState.ENDED && <PoolEnded pool={pool} />}

      {renderPool()}
    </div>
  );
}
