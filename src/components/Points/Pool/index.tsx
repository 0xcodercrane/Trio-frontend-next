import { AddToPoolInput } from '@/components/Inputs';
import { Button } from '@/components/ui/button';
import { numberWithCommas } from '@/lib/utilities';
import { TPool } from '@/types';
import Image from 'next/image';
import * as luxon from 'luxon';

export default function Pool({ pool }: { pool: TPool }) {
  const { name, description, poolPointsBalance, rewards, startDate, endDate, img } = pool;
  return (
    <div className='flex flex-col gap-4 rounded-xl bg-ob-black-light p-8'>
      <Image src={img} alt={name} width={100} height={100} className='w-full rounded-xl' />
      <div className='flex flex-row'>
        <div className='flex flex-col'>
          <h3>{name}</h3>
          <p className='text-sm font-bold text-ob-grey-lighter'>{description}</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4 rounded-xl bg-ob-grey-light p-4'>
          <div className='flex flex-col'>
            <span className='text-sm font-bold text-ob-grey-lighter'>Pool Balance</span>
            <span>{numberWithCommas(poolPointsBalance)} XP</span>
          </div>

          <div className='flex flex-col'>
            <span className='text-sm font-bold text-ob-grey-lighter'>Points Rewards</span>
            <span>
              {numberWithCommas(rewards[0].amount)} {rewards[0].token}
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-4 rounded-xl bg-ob-grey-light p-4'>
          <div className='flex flex-col'>
            <span className='text-sm font-bold text-ob-grey-lighter'>Est. Earnings</span>
            <span>{0.00054342} BTC</span>
          </div>

          <div className='flex flex-col'>
            <span className='text-sm font-bold text-ob-grey-lighter'>Payout Date</span>
            <span>{luxon.DateTime.fromJSDate(endDate.toDate()).toFormat('LLL dd, yyyy T')}</span>
          </div>

          <div className='flex flex-col'>
            <span className='text-sm font-bold text-ob-grey-lighter'>Share of Pool</span>
            <span>{0.04} %</span>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-between gap-4'>
        <div className='flex w-full flex-col'>
          <span className='text-sm font-bold text-ob-grey-lighter'>Input Points (XP)</span>
          <AddToPoolInput />
        </div>

        <div className='flex h-full w-full flex-col items-center justify-end'>
          <Button variant='secondary' className='w-full min-w-full'>
            Add to Pool
          </Button>
        </div>
      </div>
    </div>
  );
}
