'use client';

import { XP_MINING_CYCLE_LENGTH } from '@/lib/constants';
import { auth, firestore } from '@/lib/firebase';
import { TStakedBalance } from '@/types';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
export default function XPMiningChart() {
  const [stakingData, setStakingData] = useState<TStakedBalance[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, `users/${auth?.currentUser?.uid}/stakedBalance`), orderBy('block', 'asc')),
      (snapshot) => {
        if (snapshot.empty) return;

        const data: TStakedBalance[] = snapshot.docs.map((doc) => doc.data() as TStakedBalance);

        // Detect missing blocks
        const startBlock = data[0].block; // Start block
        const endBlock = data[data.length - 1].block; // End block
        const filledData: TStakedBalance[] = [];

        // Fill in every block in 144 increments
        for (let block = startBlock; block <= endBlock; block += XP_MINING_CYCLE_LENGTH) {
          const existingData = data.find((entry) => entry.block === block);

          if (existingData) {
            filledData.push(existingData); // Add existing data
          } else {
            filledData.push({ block, balance: 0 }); // Add missing data as 0
          }
        }

        // Set the filled data to state
        setStakingData(filledData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        data={stakingData} // Use your pre-filtered dataset
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20
        }}
      >
        <XAxis
          dataKey='block'
          min={stakingData[0]?.block}
          interval='equidistantPreserveStart'
          label={{ value: 'Block', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis label={{ value: 'Balance', angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='balance' fill='#D6E814' barSize={12} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ payload, label, active }: any) => {
  if (active) {
    return (
      <div className='flex flex-col items-center bg-ob-purple-darkest p-4 text-white'>
        <span>Block {label}</span>
        <span>{payload[0]?.payload.balance || 0} TRIO</span>
      </div>
    );
  }

  return null;
};
