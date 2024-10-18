'use client';

import { useState } from 'react';
import { Stat } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import Section from '@/components/Section';
import Pools from './Pools';

enum EPointsTabs {
  REWARD_POOLS = 'Reward Pools',
  MY_POINTS = 'My Points'
}

const PointsTabsValues = Object.values(EPointsTabs);

export default function Points() {
  const [activeTab, setActiveTab] = useState(EPointsTabs.REWARD_POOLS);
  return (
    <Section className='bg-ob-black'>
      <Container direction='col' justify='start'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-row items-center justify-center'>
            <h2>My Balances</h2>
          </div>

          <div className='flex flex-row justify-center gap-4'>
            {[
              {
                label: 'TRIO Balance',
                value: `${100} ∆`
              },
              {
                label: 'My Staked TRIO',
                value: `${100} ∆`
              },
              {
                label: 'Points Balance',
                value: `${100000} XP`
              }
            ].map((item, index) => (
              <Stat key={index} label={item.label} value={item.value} />
            ))}
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
