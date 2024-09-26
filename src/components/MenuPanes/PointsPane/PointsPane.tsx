'use client';
import { AuthContext } from '@/app/providers/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useRewardsQuery, useTokenBalanceQuery, useTrioInfoQuery } from '@/lib/services';
import { DateTime } from 'luxon';
import { useContext } from 'react';

const formatDate = (date: string | { seconds: number; nanoseconds: number }) => {
  if (typeof date === 'string') {
    return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
  } else {
    const jsDate = new Date(date.seconds * 1000);
    return DateTime.fromJSDate(jsDate).toFormat('dd/MM/yyyy');
  }
};

export const PointsPane = () => {
  // TODO handle loading
  const { user, wallet } = useContext(AuthContext);

  const { data: trioInfo } = useTrioInfoQuery();
  const { data: tokenBalance } = useTokenBalanceQuery(wallet?.ordinalsAddress || '');
  const { data: rewards, isSuccess: rewardsSuccess } = useRewardsQuery();

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 gap-8 rounded-md bg-ob-black-light px-8 py-2 text-white lg:grid-cols-2'>
        <div className='space-y-2 lg:order-2'>
          <Card className='border-none bg-transparent text-white'>
            <CardHeader className='px-0'>
              <CardTitle className='text-2xl font-bold'>My Points History</CardTitle>
            </CardHeader>
            <CardContent className='px-0'>
              <p className='mb-2 max-w-[65ch] text-sm font-light text-white'>
                Points are rewarded to users when they complete certain actions on ordinalsbot.com. Points can be redeemed in
                our exclusive promotions.
              </p>
            </CardContent>
            <CardContent className='px-0'>
              <Table>
                <TableBody>
                  {rewardsSuccess &&
                    rewards.length > 0 &&
                    rewards.map((reward, index) => (
                      <TableRow key={index} className='rounded-sm border-none text-xs text-white'>
                        <TableCell className='py-3'>{formatDate(reward.date)}</TableCell>
                        <TableCell className='py-3'>{reward.amount}</TableCell>
                        <TableCell className='py-3 capitalize'>{reward.type}</TableCell>
                        <TableCell className='py-3 font-mono'>{reward.id}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-2 lg:order-1'>
          <Card className='border-none bg-transparent text-white'>
            <CardHeader className='px-0'>
              <CardTitle className='text-2xl font-bold'>Trio / Points</CardTitle>
            </CardHeader>
            <CardContent className='px-0'>
              <p className='max-w-[65ch] text-sm font-light text-white'>
                The utility token behind OrdinalsBot. With the TRIO token, users are given access to exclusive mints,
                discounts, airdrops, and rewards.
              </p>
            </CardContent>
          </Card>
          <div className='space-y-4 pb-4'>
            {[
              { label: 'Trio Balance', value: `${tokenBalance?.balance || 0} Δ` },
              { label: 'Circulating Supply', value: `${trioInfo?.self_reported_circulating_supply || ''} Δ` },
              { label: 'Total Supply', value: `${trioInfo?.max_supply || ''} Δ` },
              { label: 'Points Balance', value: `${user?.points || 0} Δ` }
            ].map((item, index) => (
              <Card key={index} className='border-none bg-ob-grey text-white'>
                <CardContent className='flex items-center gap-5 rounded-lg p-6 font-semibold'>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
