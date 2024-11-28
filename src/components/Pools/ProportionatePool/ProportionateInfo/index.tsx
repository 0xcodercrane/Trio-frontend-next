import { DataItem } from '@/components/common';
import { TProportionatePool } from '@/types';
import numeral from 'numeral';

export const ProportionateInfo = ({
  pool,
  totalUserPoints,
  totalPayout
}: {
  pool: TProportionatePool;
  totalUserPoints: number;
  totalPayout: number;
}) => {
  const { totalPointsAllocated } = pool;
  return (
    <div className='grid grid-cols-3'>
      <DataItem label='your payout' value={`${numeral(totalPayout).format('0.00')} ${pool.rewards[0].asset}`} />
      <DataItem label='your pool balance' value={totalUserPoints.toString()} />
      <DataItem label='total pool balance' value={totalPointsAllocated.toString()} />
    </div>
  );
};
