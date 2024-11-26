'use client';

import { auth } from '@/lib/firebase';
import { TProportionatePool } from '@/types';
import { useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/app/providers/AuthContext';
import createPointAllocation from '@/lib/firebase/functions/createPointAllocation';

export const ProportionateAddForm = ({ pool, finish }: { pool: TProportionatePool; finish: () => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [spendPointsLoading, setSpendPointsLoading] = useState(false);
  const [pointsToAllocate, setPointsToAllocate] = useState(pool.minPointsAllocation === -1 ? 0 : pool.minPointsAllocation);

  const { user } = useContext(AuthContext);
  const { points } = user;

  const canAllocate = useMemo(
    () => !spendPointsLoading && points >= pointsToAllocate && !spendPointsLoading,
    [points, pointsToAllocate]
  );
  const notEnoughPoints = useMemo(() => points < pointsToAllocate, [points, pointsToAllocate]);

  const buyTickets = async () => {
    if (!auth.currentUser) return;
    setSpendPointsLoading(true);
    try {
      await createPointAllocation({
        userId: auth.currentUser.uid,
        poolId: pool.id,
        amount: pointsToAllocate
      });
      toast.success(`Allocated ${pointsToAllocate} XP`);
      setSpendPointsLoading(false);
      setShowConfirm(false);
      finish();
    } catch (err: any) {
      setSpendPointsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className='flex w-full flex-col gap-4 px-4'>
      <span className='text-2xl text-white'>Buy Tickets</span>
      <div className='flex w-full flex-col items-center justify-between gap-2 rounded-sm border border-ob-white-20 p-4'>
        <div className='space-between flex w-full flex-row items-center gap-2'>
          <Input
            min={pool.minPointsAllocation === -1 ? undefined : pool.minPointsAllocation}
            className='grow rounded-sm bg-ob-blue-lighter/[0.20] px-2 py-1 text-white'
            type='number'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPointsToAllocate(Number(e.target.value))}
            value={pointsToAllocate}
          />
        </div>
        <div>
          {notEnoughPoints && <span className='text-sm text-ob-red-lighter'>You do not have {pointsToAllocate} XP</span>}
        </div>
        <div className='flex w-full flex-row justify-end'>
          {!showConfirm ? (
            <Button onClick={() => setShowConfirm(true)} disabled={!canAllocate}>
              Spend Points
            </Button>
          ) : (
            <div className='flex flex-row gap-2'>
              <Button onClick={buyTickets} disabled={!canAllocate}>
                {spendPointsLoading ? 'Loading' : 'Confirm'}
              </Button>
              <Button variant='destructive' onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
      <span className='text-sm italic text-ob-white-40'>
        Spending XP in a pool is an irreversible action. Please double check your action before clicking Confirm.
      </span>
    </div>
  );
};
