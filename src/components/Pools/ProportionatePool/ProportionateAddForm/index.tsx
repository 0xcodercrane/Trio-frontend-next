'use client';

import { auth } from '@/lib/firebase';
import { TProportionatePool } from '@/types';
import { firestore } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import numeral from 'numeral';
import { Button } from '@/components/ui/button';

export const ProportionateAddForm = ({ pool, finish }: { pool: TProportionatePool; finish: () => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [buyTicketsLoading, setBuyTicketsLoading] = useState(false);
  const [pointsToAllocate, setPointsToAllocate] = useState(0);
  const pointsBalance = 0;

  const totalPrice = useMemo(() => 0, [pointsToAllocate]);
  const canAllocate = useMemo(() => pointsBalance >= totalPrice && !buyTicketsLoading, [pointsBalance, totalPrice]);
  const notEnoughPoints = useMemo(() => pointsBalance < totalPrice, [pointsBalance, totalPrice]);

  const increment = () => {};

  const decrement = () => {};

  const buyTickets = async () => {
    setBuyTicketsLoading(true);
    try {
      await addDoc(collection(firestore, 'pointAllocations'), {
        userId: auth.currentUser?.uid,
        poolId: pool.id,
        amount: totalPrice
      });
      toast.success(`Allocated ${pointsToAllocate} XP`);
      setShowConfirm(false);
      finish();
    } catch (error: any) {
      toast.error('Error buying tickets');
    }

    //
    // We set the loading state to false after 2 second to give our backend enough time to trigger all the side effects of buying a ticket
    // This is a hacky and non-ideal way of handling the issue where the user can double click the button and confuse our system
    //
    setTimeout(() => setBuyTicketsLoading(false), 2 * 1000);
  };

  return (
    <div className='flex w-full flex-col gap-4 px-4'>
      <span className='text-2xl text-white'>Buy Tickets</span>
      <div className='flex w-full flex-col items-center justify-between gap-2 rounded-sm border border-ob-white-20 p-4'>
        <div className='space-between flex w-full flex-row items-center gap-2'>
          <div
            onClick={decrement}
            className='flex h-[24px] w-[24px] items-center justify-center rounded-sm bg-ob-grey-lighter hover:cursor-pointer hover:opacity-80'
          >
            -
          </div>
          <div className='grow rounded-sm bg-ob-blue-lighter/[0.20] px-2 py-1 text-center text-white'>
            {pointsToAllocate} Ticket{pointsToAllocate > 1 ? 's' : ''} - {numeral(totalPrice).format('0,0')} XP
          </div>
          <div
            onClick={increment}
            className='flex h-[24px] w-[24px] items-center justify-center rounded-sm bg-ob-grey-lighter hover:cursor-pointer hover:opacity-80'
          >
            +
          </div>
        </div>
        <div>
          {notEnoughPoints && <span className='text-sm text-ob-red-lighter'>You do not have {pointsToAllocate} XP</span>}
        </div>
        <div className='flex w-full flex-row justify-end'>
          {!showConfirm ? (
            <Button variant='success' onClick={() => setShowConfirm(true)} disabled={!canAllocate}>
              Spend XP
            </Button>
          ) : (
            <div className='flex flex-row gap-2'>
              <Button variant='success' onClick={buyTickets}>
                Confirm
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
