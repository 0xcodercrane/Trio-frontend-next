'use client';

import { auth, firestore } from '@/lib/firebase';
import { TProportionatePool } from '@/types';
import { collection, getAggregateFromServer, onSnapshot, query, sum, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ProporationateDisplay } from './ProportionateDisplay';
import { ProportionateAdd } from './ProportionateAdd';

export function ProportionatePool({ pool }: { pool: TProportionatePool }) {
  const [poolView, setPoolView] = useState<'view' | 'add'>('view');

  const [totalUserPoints, setTotaluserPoints] = useState(0);

  useEffect(() => {
    if (!auth.currentUser) return;
    const initUserPoints = async () => {
      try {
        const q = await getAggregateFromServer(
          query(
            collection(firestore, 'pointAllocations'),
            where('poolId', '==', pool.id),
            where('userId', '==', auth.currentUser?.uid)
          ),
          { totalUserPoints: sum('amount') }
        );

        setTotaluserPoints(q.data().totalUserPoints || 0);
      } catch (error) {
        setTotaluserPoints(0);
      }
    };

    initUserPoints();
  }, []);

  if (poolView === 'view') {
    return <ProporationateDisplay pool={pool} toggleView={() => setPoolView('add')} totalUserPoints={totalUserPoints} />;
  }

  if (poolView === 'add') {
    return <ProportionateAdd pool={pool} toggleView={() => setPoolView('view')} totalUserPoints={totalUserPoints} />;
  }
}
