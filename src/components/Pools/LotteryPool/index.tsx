'use client';
import { EPoolType, TLotteryPool } from '@/types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { LotteryAdd } from './LotteryAdd';
import { LotteryDisplay } from './LotteryDisplay';
import { AuthContext } from '@/app/providers/AuthContext';
import { toast } from 'sonner';

export const LotteryPool = ({ pool }: { pool: TLotteryPool }) => {
  const [poolView, setPoolView] = useState<'view' | 'add'>('view');
  const [totalUserTickets, setTotalUserTickets] = useState(0);
  const { user } = useContext(AuthContext);

  const totalEstimatedValue = useMemo(() => {
    if (pool.type === EPoolType.PROPORTIONATE) return 0;
    return pool.rewards.reduce((acc, reward) => acc + (reward?.estimatedValue || 0), 0);
  }, [pool.rewards]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const initTicketInfo = async () => {
      onSnapshot(
        query(
          collection(firestore, 'tickets'),
          where('poolId', '==', pool.id),
          where('userId', '==', auth.currentUser?.uid)
        ),
        (snapshot) => {
          let amount: number = 0;
          if (snapshot.docs.length > 0) amount = snapshot.docs[0].data().amount;
          setTotalUserTickets(amount);
        }
      );
    };

    initTicketInfo();
  }, []);

  if (poolView === 'view') {
    return (
      <LotteryDisplay
        pool={pool}
        toggleView={() => {
          if (user) {
            setPoolView('add');
          } else toast.info('Please connect your wallet');
        }}
        totalEstimatedValue={totalEstimatedValue}
        totalUserTickets={totalUserTickets}
      />
    );
  }

  if (poolView === 'add') {
    return (
      <LotteryAdd
        pool={pool}
        toggleView={() => {
          setPoolView('view');
        }}
        totalUserTickets={totalUserTickets}
        totalEstimatedValue={totalEstimatedValue}
      />
    );
  }

  return <div></div>;
};
