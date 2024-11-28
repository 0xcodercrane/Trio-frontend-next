'use client';

import { auth, firestore } from '@/lib/firebase';
import { TProportionatePool } from '@/types';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { ProporationateDisplay } from './ProportionateDisplay';
import { ProportionateAdd } from './ProportionateAdd';

export function ProportionatePool({ pool }: { pool: TProportionatePool }) {
  const [poolView, setPoolView] = useState<'view' | 'add'>('view');

  const [totalUserPoints, setTotaluserPoints] = useState(0);

  const totalPayout = useMemo(() => {
    if (!pool.totalPointsAllocated) return 0;
    const share = totalUserPoints / pool.totalPointsAllocated;
    const reward = pool.rewards[0].amount;
    return reward * share;
  }, [totalUserPoints, pool]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const initUserPoints = async () => {
      if (!auth.currentUser) return;

      const pointsRef = collection(firestore, 'pointAllocations');
      const q = query(pointsRef, where('poolId', '==', pool.id), where('userId', '==', auth.currentUser?.uid));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        try {
          let totalPoints = 0;

          // Sum the 'amount' field of all matching documents
          snapshot.forEach((doc) => {
            totalPoints += doc.data().amount || 0;
          });

          setTotaluserPoints(totalPoints);
        } catch (error) {
          console.log('Error processing snapshot:', error);
          setTotaluserPoints(0);
        }
      });

      // Cleanup subscription when component unmounts
      return () => unsubscribe();
    };

    initUserPoints();
  }, []);

  if (poolView === 'view') {
    return (
      <ProporationateDisplay
        pool={pool}
        toggleView={() => setPoolView('add')}
        totalUserPoints={totalUserPoints}
        totalPayout={totalPayout}
      />
    );
  }

  if (poolView === 'add') {
    return (
      <ProportionateAdd
        pool={pool}
        toggleView={() => setPoolView('view')}
        totalUserPoints={totalUserPoints}
        totalPayout={totalPayout}
      />
    );
  }
}
