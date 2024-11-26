'use client';

import { auth } from '@/lib/firebase';
import { TLotteryPool } from '@/types';
import { useContext, useMemo, useState } from 'react';
import { toast } from 'sonner';
import numeral from 'numeral';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/app/providers/AuthContext';
import createPointAllocation from '@/lib/firebase/functions/createPointAllocation';

export const LotteryAddForm = ({ pool, finish }: { pool: TLotteryPool; finish: () => void }) => {
  const { user } = useContext(AuthContext);
  const { points } = user;
  const { ticketPrice, maxTicketsPerUser } = pool;

  const [numTickets, setNumTickets] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [buyTicketsLoading, setBuyTicketsLoading] = useState(false);

  const totalPrice = useMemo(() => numTickets * (ticketPrice || 0), [numTickets, ticketPrice]);
  const canBuyTickets = useMemo(
    () => !buyTicketsLoading || (points >= totalPrice && !buyTicketsLoading),
    [points, totalPrice, buyTicketsLoading]
  );
  const notEnoughPoints = useMemo(() => points < totalPrice, [points, totalPrice]);

  const increment = () => {
    if (maxTicketsPerUser === -1) return setNumTickets(numTickets + 1); // Unlimited Tickets
    if (maxTicketsPerUser && numTickets >= maxTicketsPerUser) return;
    setNumTickets(numTickets + 1);
  };

  const decrement = () => {
    if (numTickets > 1) {
      setNumTickets(numTickets - 1);
    }
  };

  const buyTickets = async () => {
    if (!auth.currentUser) return;
    setBuyTicketsLoading(true);
    try {
      await createPointAllocation({
        userId: auth.currentUser.uid,
        poolId: pool.id,
        amount: totalPrice
      });

      toast.success(`Bought ${numTickets} ticket${numTickets > 1 ? 's' : ''} for ${numeral(totalPrice).format('0,0')} XP`);
      setBuyTicketsLoading(false);
      setShowConfirm(false);
      finish();
    } catch (error: any) {
      setBuyTicketsLoading(false);
      toast.error(error.message);
    }
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
            {numTickets} Ticket{numTickets > 1 ? 's' : ''} - {numeral(totalPrice).format('0,0')} XP
          </div>
          <div
            onClick={increment}
            className='flex h-[24px] w-[24px] items-center justify-center rounded-sm bg-ob-grey-lighter hover:cursor-pointer hover:opacity-80'
          >
            +
          </div>
        </div>
        <div>
          {notEnoughPoints && (
            <span className='text-sm text-ob-red-lighter'>
              You do not have enough points to purchase {numTickets} ticket{numTickets > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className='flex w-full flex-row justify-end'>
          {!showConfirm ? (
            <Button onClick={() => setShowConfirm(true)} disabled={!canBuyTickets}>
              Buy Tickets
            </Button>
          ) : (
            <div className='flex flex-row gap-2'>
              <Button onClick={buyTickets} disabled={!canBuyTickets}>
                {buyTicketsLoading ? 'Loading' : 'Confirm'}
              </Button>
              <Button variant='destructive' onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
      <span className='text-sm italic text-ob-white-40'>
        Spending points in a pool is an irreversible action. Please double check your action before clicking Confirm.
      </span>
    </div>
  );
};
