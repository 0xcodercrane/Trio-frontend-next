import { EPoolState, TLotteryPool } from '@/types';
import numeral from 'numeral';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BlockCountdown } from '@/components/common/BlockCountdown';
import { mapPoolToState, mapPoolTypeToLabel } from '../../helpers';
import { DataItem } from '@/components/common';
import { useMemo } from 'react';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';

export const LotteryDisplay = ({
  pool,
  toggleView,
  totalEstimatedValue,
  totalUserTickets
}: {
  pool: TLotteryPool;
  toggleView: () => void;
  totalEstimatedValue: number;
  totalUserTickets: number;
}) => {
  const { data: tip } = useBlockHeight();
  const { title, type, rewards } = pool;

  const { typeText, additionalInfo } = mapPoolTypeToLabel(type);

  const { totalTicketsSold, ticketPrice } = pool;

  const poolState = useMemo(() => mapPoolToState(pool, tip), [pool, tip]);

  return (
    <div className='relative flex h-full flex-col justify-between gap-4 p-4'>
      <div className='flex w-full flex-row items-center justify-between gap-4'>
        <BlockCountdown startBlock={pool.startBlock} endBlock={pool.endBlock} format='time' />

        <div className='flex-end flex w-1/2 gap-2'>
          <DataItem label='Your Tickets' value={`${totalUserTickets}`} />
          <DataItem label='Total Tickets' value={(totalTicketsSold || 0).toString()} />
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
          <DataItem label='Rewards' value={rewards[0].name} />
          <DataItem label='Est. Value' value={`$${numeral(totalEstimatedValue).format('0,0.00')}`} />
        </div>
      </div>

      <div className='flex w-full flex-row items-end justify-between'>
        <div className='w-auto'>
          <div className='rounded-md bg-ob-purple-lighter px-3 py-1 text-sm font-semibold text-white'>
            {ticketPrice} XP Per Ticket
          </div>
        </div>

        <div className='flex flex-row justify-end gap-4'>
          <Button className='rounded-md' onClick={toggleView} disabled={poolState !== EPoolState.LIVE}>
            Spend Points
          </Button>
        </div>
      </div>
    </div>
  );
};
