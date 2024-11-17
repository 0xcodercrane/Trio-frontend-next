'use client';
import { EPoolType, TLotteryPool } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { LotteryAdd } from './LotteryAdd';
import { LotteryDisplay } from './LotteryDisplay';

export const LotteryPool = ({ pool }: { pool: TLotteryPool }) => {
  const [poolView, setPoolView] = useState<'view' | 'add'>('view');

  const [totalUserTickets, setTotalUserTickets] = useState(0);

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
        toggleView={() => setPoolView('add')}
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
