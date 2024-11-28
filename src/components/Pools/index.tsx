'use client';

import { firestore } from '@/lib/firebase';
import { EPoolType, TLotteryPool, TProportionatePool } from '@/types';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Loading } from '../common';
import Pool from './Pool';
import { LotteryPool } from './LotteryPool';
import { ProportionatePool } from './ProportionatePool';
import { Container } from '../Container';
import { AuthContext } from '@/app/providers/AuthContext';
import { useTokenBalanceQuery } from '@/lib/services';

const poolsRef = collection(firestore, 'pools');
export function Pools() {
  const { user, wallet } = useContext(AuthContext);
  const {
    data: balanceData,
    isPending: balanceDataIsPending,
    error: balanceDataError
  } = useTokenBalanceQuery(wallet?.ordinalsAddress, 'TRIO');
  const [poolsLoading, setPoolsLoading] = useState(true);
  const [pools, setPools] = useState<(TLotteryPool | TProportionatePool)[]>([]);

  useEffect(() => {
    const initPoolQuery = async () => {
      onSnapshot(query(poolsRef, orderBy('order', 'asc')), (snapshot) => {
        const pools: (TLotteryPool | TProportionatePool)[] = [];
        snapshot.forEach((doc) => {
          const pool = doc.data();
          if (pool.type === EPoolType.PROPORTIONATE) pools.push({ id: doc.id, ...doc.data() } as TProportionatePool);
          else pools.push({ id: doc.id, ...doc.data() } as TLotteryPool);
          setPools(pools);
        });
      });
      setPoolsLoading(false);
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
    <Container direction='col' justify='start'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row'>
          <div className='w-1/2'>
            <span className='text-4xl'>
              Boost your rewards with <span className='text-ob-yellow'>TRIO&apos;s Reward Pools</span>
            </span>
          </div>
          <div className='w-1/2'>
            <span className='text-ob-white-40'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut earum soluta vel porro, sequi nostrum, eligendi
              dignissimos laborum reiciendis, magni atque perspiciatis perferendis facilis. Perferendis quis numquam quod
              quos accusantium.
            </span>
          </div>
        </div>
        <div className='flex w-full flex-row justify-between'>
          <div className='flex flex-row justify-center gap-4'>
            {[
              {
                label: 'My TRIO',
                value: `${balanceData?.balance || 0} TRIO`
              }
            ].map(({ label, value }, index) => (
              <div key={index} className='flex flex-col border-l-2 border-l-ob-yellow pl-2'>
                <span className='text-ob-yellow'>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-col items-center justify-center'>
            <span className='text-4xl text-white'>{user?.points || 0} XP</span>
          </div>
        </div>

        <div className='grid min-h-[40vh] grid-cols-3 gap-8 rounded-b-xl bg-ob-purple-dark p-10 sm:grid-cols-1 md:grid-cols-3'>
          {poolsLoading && <Loading />}
          {pools.map((pool: TLotteryPool | TProportionatePool, index: number) => (
            <Pool pool={pool} key={pool.id}>
              {renderPool(pool)}
            </Pool>
          ))}
        </div>
      </div>
    </Container>
  );
}
