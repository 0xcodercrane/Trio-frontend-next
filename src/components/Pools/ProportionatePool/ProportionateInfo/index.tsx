import { TProportionatePool } from '@/types';
import numeral from 'numeral';

export const ProportionateInfo = ({ pool, totalUserPoints }: { pool: TProportionatePool; totalUserPoints: number }) => {
  const { totalPointsAllocated } = pool;
  return (
    <div className='grid grid-cols-3'>
      <div className='flex flex-col'>
        <span className='text-center text-base text-ob-yellow'>Win %</span>
        <span className='text-base-xl text-center'>
          {((totalUserPoints / (totalPointsAllocated === 0 ? 1 : totalPointsAllocated)) * 100).toFixed(2)}
        </span>
      </div>

      <div className='flex flex-col'>
        <span className='text-center text-base text-ob-yellow'>Your # Of Tickets</span>
        <span className='text-base-xl text-center'>{totalUserPoints}</span>
      </div>
    </div>
  );
};
