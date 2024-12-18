'use client';

import { EPoolState, TLotteryPool, TProportionatePool } from '@/types';
import { useContext, useState } from 'react';
import { Loading } from '../common';
import Pool from './Pool';
import { AuthContext } from '@/app/providers/AuthContext';
import { useTokenBalanceQuery } from '@/lib/services';
import Section from '../Section';
import { usePoolsQuery } from '@/lib/services/fetchRewardPools';
import { Button } from '../ui/button';
import { mapPoolToState } from './helpers';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';

enum ETabs {
  All = 'all',
  Live = 'live',
  Previous = 'previous',
  Future = 'future'
}
const TabValues = Object.values(ETabs);

export function Pools() {
  const { user, wallet } = useContext(AuthContext);
  const {
    data: balanceData,
    isPending: balanceDataIsPending,
    error: balanceDataError
  } = useTokenBalanceQuery(wallet?.ordinalsAddress, 'TRIO');

  const { pools, loading } = usePoolsQuery();
  const { data: tip } = useBlockHeight();
  const [activeTab, setActiveTab] = useState(ETabs.All);

  return (
    <Section>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row'>
          <div className='w-1/2'>
            <span className='text-6xl'>
              Earn rewards with
              <br />
              <span className='text-ob-yellow'>TRIO&apos;s Reward Pools</span>
            </span>
          </div>
          <div className='w-1/2'>
            <span className='text-ob-white-40'>
              Spend points (XP) in Trio Reward Pools. The Trio Points system is designed to give back to you, our loyal
              customers. By engaging with the Trio ecosystem, you receive XP for completing orders, minting, inscribe, and of
              course buying and holding Trio in your wallet (XP Mining).
            </span>
          </div>
        </div>
        <div className='flex w-full flex-row justify-between'>
          <div className='flex flex-row justify-center gap-4'>
            {[
              {
                label: 'My TRIO',
                value: `${balanceData?.balance || 0} TRIO`,
                loading: balanceDataIsPending
              }
            ].map(({ label, value, loading }, index) => (
              <div key={index} className='flex flex-col border-l-2 border-l-ob-yellow pl-2'>
                <span className='text-sm uppercase text-ob-yellow'>{label}</span>
                <span className='text-lg'>{loading ? <Loading size={24} /> : value}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-col items-center justify-center'>
            <span className='text-4xl text-white'>{user?.points || 0} XP</span>
          </div>
        </div>

        <div className='flex min-h-[40vh] flex-col gap-4 rounded-md bg-ob-purple-dark p-10'>
          <div className='flex flex-row gap-4'>
            {TabValues.map((tab: ETabs) => (
              <Button
                key={tab}
                size='sm'
                variant='tab'
                onClick={() => setActiveTab(tab)}
                className={`bg-ob-purple-light capitalize hover:bg-white hover:text-black ${activeTab === tab ? 'bg-white text-black' : ''}`}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className='grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-3'>
            {loading && <Loading />}
            {pools.map((pool: TLotteryPool | TProportionatePool) => {
              let showPool = true;
              const poolState = mapPoolToState(pool, tip);

              switch (activeTab) {
                case ETabs.Live: {
                  if (poolState !== EPoolState.LIVE) showPool = false;
                  break;
                }
                case ETabs.Future: {
                  if (poolState !== EPoolState.UPCOMING) showPool = false;
                  break;
                }
                case ETabs.Previous: {
                  if (poolState !== EPoolState.ENDED) showPool = false;
                  break;
                }
                case ETabs.All:
                default:
                  break;
              }

              if (!showPool) return null;

              return <Pool pool={pool} key={pool.id} />;
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
