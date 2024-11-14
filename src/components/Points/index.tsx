'use client';

import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import Section from '@/components/Section';
import { AuthContext } from '@/app/providers/AuthContext';
import { useTokenBalanceQuery } from '@/lib/services';
import { Pools } from '../Pools';

enum EPointsTabs {
  REWARD_POOLS = 'Reward Pools',
  MY_POINTS = 'My Points'
}

const PointsTabsValues = Object.values(EPointsTabs);

export default function Points() {
  const [activeTab, setActiveTab] = useState(EPointsTabs.REWARD_POOLS);
  const { user, wallet } = useContext(AuthContext);
  const { data, isPending, error } = useTokenBalanceQuery(wallet?.ordinalsAddress, 'trio');

  return (
    <Section className='bg-ob-purple-darkest'>
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
                  value: `${user?.points || 0} TRIO`
                },
                {
                  label: 'My Pending Rewards',
                  value: '0 BTC | 0 TRIO'
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

          <div className='flex flex-row gap-4'>
            {PointsTabsValues.map((tab, index) => (
              <Button
                size='sm'
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </Button>
            ))}
          </div>

          <Pools />
        </div>
      </Container>
    </Section>
  );
}
