'use client';

import { useMemo } from 'react';
import { EPoolState, EPoolType, TLotteryPool, TProportionatePool } from '@/types';
import { mapPoolToState } from '../helpers';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';
import { formatBlock, shortenAddress } from '@/lib/utilities';
import { ProportionatePool } from '../ProportionatePool';
import { LotteryPool } from '../LotteryPool';

export default function Pool({ pool }: { pool: TLotteryPool | TProportionatePool }) {
  const { data: tip } = useBlockHeight();
  const { startBlock, endBlock, winners } = pool;
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

  const winner = useMemo(() => {
    if (winners) return winners[0];
    return null;
  }, [winners]);

  return (
    <div className='relative rounded-lg bg-ob-purple-light'>
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

      {poolState === EPoolState.ENDED && (
        <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.80]'>
          <span className='text-lg'>Pool Closed at {formatBlock(endBlock)}</span>
          <span>The winner of this pool will be announced soon</span>
          {/*<span className='text-sm italic'>(block {formatBlock(startBlock)})</span>*/}
        </div>
      )}

      {poolState === EPoolState.ENDED && winner && (
        <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.80]'>
          <span className='text-lg'>Pool Closed at {formatBlock(endBlock)}</span>
          <span>The winner of this pool is {shortenAddress(winners[0].address)} </span>
        </div>
      )}

      {renderPool()}
    </div>
  );
}
