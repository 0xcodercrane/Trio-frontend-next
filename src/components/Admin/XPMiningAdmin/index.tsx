'use client';
import { DataItem } from '@/components/common';
import { firestore } from '@/lib/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
export const XPMiningAdmin = () => {
  const [pointsPerDayNumber, setPointsPerDayNumber] = useState<number>(0);
  useEffect(() => {
    const initPointsConfigValue = async () => {
      const pointsConfig = await getDocs(query(collection(firestore, 'pointsConfig'), limit(1)));
      setPointsPerDayNumber(100 / pointsConfig.docs[0].data().config.staking.factor);
    };

    initPointsConfigValue();
  }, []);
  return (
    <div className='flex w-full flex-col gap-8 rounded-md border border-ob-purple-lighter bg-ob-purple p-4'>
      <span className='text-2xl text-ob-yellow'>XP Mining</span>
      <div className='grid grid-cols-2'>
        <DataItem label='XP/Day/100 TRIO' value={pointsPerDayNumber.toString()} />
      </div>
    </div>
  );
};
