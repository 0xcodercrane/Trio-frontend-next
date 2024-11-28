'use client';
import { useContext, useEffect, useState } from 'react';
import { firestore } from '@/lib/firebase';
import { collection, getAggregateFromServer, onSnapshot, query, sum, where } from 'firebase/firestore';
import { DataItem } from '@/components/common';
import { EOrderSubType, ERewardType } from '@/types';
import { adminMetricsRef } from '@/lib/firebase/references';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GlobalContext } from '@/app/providers/GlobalContext';

export function PointsAdmin() {
  const { pointsConfig } = useContext(GlobalContext);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [totalPointsSpent, setTotalPointsSpent] = useState<number>(0);
  const [pointsFromStaking, setPointsFromStaking] = useState<number>(0);

  useEffect(() => {
    const initTotalPointsData = async () => {
      try {
        onSnapshot(adminMetricsRef, (adminMetrics) => {
          if (adminMetrics.exists()) {
            const { totalPoints, totalPointsSpent } = adminMetrics.data();
            setTotalPoints(totalPoints);
            setTotalPointsSpent(totalPointsSpent);
          }
        });

        const stakingPoints = await getAggregateFromServer(
          query(collection(firestore, 'rewards'), where('type', '==', ERewardType.Stake)),
          {
            amount: sum('amount')
          }
        );

        if (stakingPoints.data()) {
          setPointsFromStaking(stakingPoints.data().amount);
        }
      } catch (error: any) {
        console.error('Error fetching total points data', error);
      }
    };

    initTotalPointsData();
  }, []);

  return (
    <div className='flex w-full flex-col gap-8 rounded-md border border-ob-purple-lighter bg-ob-purple p-4'>
      <span className='text-2xl text-ob-yellow'>Points</span>
      <div className='flex flex-row justify-start gap-4'>
        <DataItem label='total points' value={totalPoints.toString()} />
        <DataItem label='total points spent' value={totalPointsSpent.toString()} />
        <DataItem label='points from XP Mining' value={pointsFromStaking.toString()} />
      </div>

      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Point Value</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pointsConfig &&
            Object.keys(pointsConfig.orders).map((key, index) => (
              <TableRow key={index}>
                <TableCell>{key}</TableCell>
                <TableCell>{pointsConfig.orders[key as EOrderSubType]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table> */}
    </div>
  );
}
