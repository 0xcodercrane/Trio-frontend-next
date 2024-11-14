'use client';

import { firestore } from '@/lib/firebase';
import { EPoolType, TLotteryPool, TProportionatePool } from '@/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Loading } from '../common';
import Pool from './Pool';
import { LotteryPool } from './LotteryPool';
import { ProportionatePool } from './ProportionatePool';

const poolsRef = collection(firestore, 'pools');
export function Pools() {
  const [poolsLoading, setPoolsLoading] = useState(true);
  const [pools, setPools] = useState<(TLotteryPool | TProportionatePool)[]>([]);

  useEffect(() => {
    const initPoolQuery = async () => {
      const snapshot = await getDocs(query(poolsRef, orderBy('order', 'asc')));
      const pools: (TLotteryPool | TProportionatePool)[] = [];
      snapshot.forEach((doc) => {
        const pool = doc.data();
        if (pool.type === EPoolType.PROPORTIONATE) pools.push({ id: doc.id, ...doc.data() } as TProportionatePool);
        else pools.push({ id: doc.id, ...doc.data() } as TLotteryPool);
        setPools(pools);
        setPoolsLoading(false);
      });
      return pools;
    };

    initPoolQuery();
  }, []);

  const renderPool = (pool: TLotteryPool | TProportionatePool) => {
    switch (pool.type) {
      case EPoolType.WINNER_TAKES_ALL:
      case EPoolType.N_WINNERS:
        return <LotteryPool pool={pool as TLotteryPool} />;
      default:
        return <ProportionatePool pool={pool as TProportionatePool} />;
    }
  };

  return (
    <div className='grid min-h-[40vh] grid-cols-3 gap-8 rounded-b-xl bg-ob-purple-dark p-10 sm:grid-cols-1 md:grid-cols-3'>
      {poolsLoading && <Loading />}
      {pools.map((pool: TLotteryPool | TProportionatePool, index: number) => (
        <Pool pool={pool} key={pool.id}>
          {renderPool(pool)}
        </Pool>
      ))}
    </div>
  );
}
