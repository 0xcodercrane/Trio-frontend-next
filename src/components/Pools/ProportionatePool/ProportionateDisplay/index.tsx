'use client';

import { EPoolState, TLotteryPool, TProportionatePool } from '@/types';
import numeral from 'numeral';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BlockCountdown } from '@/components/common/BlockCountdown';
import { mapPoolToState, mapPoolTypeToLabel } from '../../helpers';
import { DataItem } from '@/components/common';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';
import { useMemo } from 'react';

export const ProporationateDisplay = ({
  pool,
  toggleView,
  totalUserPoints,
  totalPayout
}: {
  pool: TLotteryPool | TProportionatePool;
  toggleView: () => void;
  totalUserPoints: number;
  totalPayout: number;
}) => {
  const { data: tip } = useBlockHeight();

  const { title, type } = pool;

  const { typeText, additionalInfo } = mapPoolTypeToLabel(type);

  const { totalPointsAllocated, minPointsAllocation } = pool as TProportionatePool;

  const poolState = useMemo(() => mapPoolToState(pool, tip), [pool, tip]);

  return (
    <div className='relative flex h-full flex-col justify-between gap-4 p-4'>
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        <BlockCountdown startBlock={pool.startBlock} endBlock={pool.endBlock} format='time' />

        <div className='flex-end flex w-1/2 gap-2'>
          <DataItem label='Your Pool Balance' value={`${numeral(totalUserPoints).format('0a')} XP`} />
          {/* <DataItem label='Total Points Allocated' value={`${numeral(totalPointsAllocated).format('0a')} XP`} /> */}
          <DataItem label='Current Payout' value={`${numeral(totalPayout).format('0.00')}`} />
        </div>
      </div>

      <div className='flex w-full items-center justify-center p-4'>
        <Image
          src={`${pool?.img ? pool.img : '/img/ob-tokens.png'}`}
          alt='ob-tokens'
          className='max-h-[200px] max-w-[200px] rounded-lg'
          width={500}
          height={500}
        />
      </div>

      <div className='flex h-full flex-col justify-between gap-4'>
        <div className='flex flex-col gap-8'>
          <span className='text-4xl font-semibold text-white'>{title}</span>
          <div className='flex flex-row items-center justify-start'>
            <span className='text-sm'>{typeText}</span>
            <span className='text-sm italic'>&nbsp;- {additionalInfo}</span>
          </div>
        </div>
        <div className='flex h-1/2 w-full flex-row justify-start gap-4'>
          <DataItem
            label='Rewards'
            value={`${numeral(pool.rewards[0].amount).format('0.0a')} ${pool.rewards[0].asset}`}
          ></DataItem>
        </div>
      </div>

      <div className='flex w-full flex-row items-end justify-between'>
        {minPointsAllocation && (
          <div className='w-full'>
            {minPointsAllocation !== -1 && (
              <div className='rounded-md bg-ob-purple-lighter px-3 py-1 text-sm font-semibold text-white'>
                min. {minPointsAllocation} XP Req
              </div>
            )}
          </div>
        )}

        <div className='flex w-full flex-row justify-end gap-4'>
          <Button className='rounded-md' onClick={toggleView} disabled={poolState !== EPoolState.LIVE}>
            Spend Points
          </Button>
        </div>
      </div>
    </div>
  );
};
