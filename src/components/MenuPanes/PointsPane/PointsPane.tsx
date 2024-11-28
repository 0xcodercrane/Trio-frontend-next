'use client';
import { AuthContext } from '@/app/providers/AuthContext';
import { Stat } from '@/components/common';
import { PointsHistoryTable } from '@/components/Tables';
import { useTokenBalanceQuery, useTrioInfoQuery } from '@/lib/services';
import { useContext } from 'react';

export const PointsPane = () => {
  const { user, wallet } = useContext(AuthContext);

  const { data: trioInfo } = useTrioInfoQuery();
  const { data: tokenBalance } = useTokenBalanceQuery(wallet?.ordinalsAddress || '');

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 gap-8 rounded-md bg-ob-purple-dark p-8 text-white lg:grid-cols-2'>
        <div className='flex flex-col gap-8'>
          <div className='border-none bg-transparent text-white'>
            <div className='text-2xl font-bold'>My Points History</div>
            <p className='mb-2 max-w-[65ch] text-sm font-light text-white'>
              Points are rewarded to users when they complete certain actions on ordinalsbot.com. Points can be redeemed in
              our exclusive promotions.
            </p>
          </div>
          <PointsHistoryTable />
        </div>

        <div className='flex flex-col gap-8'>
          <div className='border-none bg-transparent text-white'>
            <div className='px-0'>
              <div className='text-2xl font-bold'>Trio / Points</div>
            </div>
            <div className='px-0'>
              <p className='text-sm font-light text-white'>
                The utility token behind OrdinalsBot. With the TRIO token, users are given access to exclusive mints,
                discounts, airdrops, and rewards.
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {[
              { label: 'Trio Balance', value: `${tokenBalance?.balance || 0} Δ` },
              { label: 'Circulating Supply', value: `${trioInfo?.self_reported_circulating_supply || ''} Δ` },
              { label: 'Total Supply', value: `${trioInfo?.max_supply || ''} Δ` },
              { label: 'Points Balance', value: `${user?.points || 0} XP` }
            ].map((item, index) => (
              <Stat key={index} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
