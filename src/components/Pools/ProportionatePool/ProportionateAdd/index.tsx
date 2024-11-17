import { TProportionatePool } from '@/types';
import { X } from 'lucide-react';
import { ProportionateInfo } from '../ProportionateInfo';
import { ProportionateAddForm } from '../ProportionateAddForm';

export const ProportionateAdd = ({
  pool,
  toggleView,
  totalUserPoints
}: {
  pool: TProportionatePool;
  toggleView: () => void;
  totalUserPoints: number;
}) => {
  return (
    <div className='relative flex h-full min-h-[180px] grow flex-col justify-between gap-4 p-4'>
      <div className='w-full rounded-md border bg-ob-purple px-4 py-2'>
        <ProportionateInfo pool={pool} totalUserPoints={totalUserPoints} />
      </div>
      <div className='relative flex w-full grow flex-row items-center justify-center rounded-md border bg-ob-purple p-2'>
        <div
          onClick={toggleView}
          className='absolute right-2 top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-ob-white-20 hover:cursor-pointer hover:opacity-60'
        >
          <X size={20} />
        </div>
        <ProportionateAddForm pool={pool} finish={() => toggleView()} />
      </div>
    </div>
  );
};
