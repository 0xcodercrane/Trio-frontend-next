'use client';

import { firestore } from '@/lib/firebase';
import { EPoolType, TLotteryPool, TProportionatePool } from '@/types';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useState } from 'react';

const poolsRef = collection(firestore, 'pools');

export const usePoolsQuery = () => {
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState<(TLotteryPool | TProportionatePool)[]>([]);

  onSnapshot(query(poolsRef, orderBy('order', 'asc')), (snapshot) => {
    const pools: (TLotteryPool | TProportionatePool)[] = [];
    snapshot.forEach((doc) => {
      const pool = doc.data();
      if (pool.type === EPoolType.PROPORTIONATE) pools.push({ id: doc.id, ...doc.data() } as TProportionatePool);
      else pools.push({ id: doc.id, ...doc.data() } as TLotteryPool);
      setPools(pools);
      setLoading(false);
    });
  });

  return { pools, loading };
};
