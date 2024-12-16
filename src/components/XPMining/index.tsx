'use client';

import { Database, Wallet, WandSparkles, X } from 'lucide-react';
import { Container } from '../Container';
import { AVERAGE_BLOCK_TIME, ONE_SECOND, XP_MINING_CYCLE_LENGTH } from '@/lib/constants';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '@/app/providers/AuthContext';
import { useTokenBalanceQuery } from '@/lib/services';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';
import numeral from 'numeral';
import { Dialog, DialogContent } from '../ui/dialog';
import { useDisclosure } from '@/lib/hooks';
import { DateTime } from 'luxon';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { Button } from '../ui/button';
import TrioMarkets from '../TrioMarkets';

export function XPMining() {
  const { user, wallet } = useContext(AuthContext);
  const { pointsConfig } = useContext(GlobalContext);

  const { data: tip } = useBlockHeight();
  const {
    data: balanceData,
    isPending: balanceDataIsPending,
    error: balanceDataError
  } = useTokenBalanceQuery(wallet?.ordinalsAddress, 'TRIO');

  const currentBlockInCycle = useMemo(() => (tip || 0) % XP_MINING_CYCLE_LENGTH, [tip]);
  const currentBlockProgress = useMemo(() => Math.floor(currentBlockInCycle / 12), [currentBlockInCycle]);
  const currentBlockPercent = useMemo(() => (currentBlockInCycle / XP_MINING_CYCLE_LENGTH) * 100 - 4, [currentBlockInCycle]);
  const blocksRemaining = useMemo(() => XP_MINING_CYCLE_LENGTH - currentBlockInCycle, [currentBlockInCycle]);

  const [timeRemaining, setTimeRemaining] = useState('');
  const [targetEndBlock, setTargetEndBlock] = useState<DateTime | null>(null);
  const [pointsPerSecond, setPointsPerSecond] = useState(0);
  const [tmpPoints, setTmpPoints] = useState(0);

  const { open, close, isOpen } = useDisclosure();

  useEffect(() => {
    if (!user?.syntheticBalance || !pointsConfig) return;
    const { syntheticBalance } = user;
    const { staking } = pointsConfig;
    const pointsPerBlock = syntheticBalance / staking.factor / XP_MINING_CYCLE_LENGTH;
    const pps = pointsPerBlock / AVERAGE_BLOCK_TIME / 60;
    setPointsPerSecond(pps);
    setTmpPoints(currentBlockInCycle * pointsPerBlock);
  }, [user?.syntheticBalance, currentBlockInCycle, pointsConfig]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTmpPoints((prevPoints) => prevPoints + pointsPerSecond / 2);
    }, ONE_SECOND.toMillis() / 2); // Update every half second

    return () => clearInterval(interval);
  }, [pointsPerSecond]);

  useEffect(() => {
    setTargetEndBlock(DateTime.now().plus({ seconds: blocksRemaining * AVERAGE_BLOCK_TIME * 60 }));
  }, [blocksRemaining]);

  useEffect(() => {
    if (!blocksRemaining || !targetEndBlock) return;
    const interval = setInterval(() => {
      const remaining = targetEndBlock.diff(DateTime.now());
      setTimeRemaining(remaining.toFormat(`h'HR' m'm' ss`));
    }, ONE_SECOND.toMillis());

    return () => clearInterval(interval);
  }, [blocksRemaining, targetEndBlock]);

  return (
    <Container direction='col' justify='start' className='py-[--section-vertical-padding]'>
      <div className='mb-12 flex flex-row'>
        <div className='w-1/2'>
          <span className='text-4xl'>
            Hold TRIO,
            <br />
            <span className='text-ob-yellow'>Mine XP</span>
          </span>
        </div>
        <div className='w-1/2'>
          <span className='text-ob-white-40'>
            By simply holding TRIO token, you will be mining XP points daily. No action is required on your part, other than
            holding TRIO in your non-custodial Bitcoin Wallet of your choice. Hold more TRIO to earn more XP. Earn more XP to
            spend on rewards, including more TRIO! It&apos;s that simple.
          </span>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center rounded-b-xl bg-ob-purple-dark p-12'>
        <div className='flex w-full flex-row gap-4'>
          <div className='flex h-auto w-1/2 flex-col items-center justify-between gap-4 rounded-lg bg-ob-purple p-4'>
            <div className='flex max-w-[80%] flex-col items-center justify-center'>
              <span className='py-5 text-2xl'>Hold TRIO, Earn Points (XP)</span>
            </div>
            <div className='flex max-w-[90%] flex-col items-center justify-center gap-2 text-center'>
              <span>What is XP Mining?</span>
              <span className='text-ob-white-40'>
                TRIO is the first BRC20 token to offer a &lsquo;staking-like&rsquo; reward system. No action is required on
                your part to initiate the mining process, other than connecting your wallet to one of the OrdinalsBot apps.
                Once you connect your wallet, you will automatically start mining XP.&nbsp;
                <span className='text-ob-yellow'>Every {XP_MINING_CYCLE_LENGTH} blocks</span>, your official mining balance
                will be updated based on your TRIO holdings.
              </span>
            </div>
            <div className='flex-start flex flex-col items-center justify-center gap-2'>
              <span className='mb-3'>How does it work?</span>
              <div className='flex h-auto w-full flex-row gap-2 rounded-lg'>
                {[
                  {
                    label: 'Buy Trio on an Exchange',
                    icon: <Database size={24} stroke='#D6E814' />
                  },
                  {
                    label: 'Move TRIO to a non-custodial wallet',
                    icon: <Wallet size={24} stroke='#D6E814' />
                  },
                  {
                    label: 'Earn points every day for holding TRIO',
                    icon: <WandSparkles size={24} stroke='#D6E814' />
                  }
                ].map(({ label, icon }, index) => (
                  <div
                    className='flex w-1/3 flex-col items-center justify-between gap-4 rounded-lg bg-ob-purple-dark p-4'
                    key={index}
                  >
                    <div className='h-[24px] min-h-[24px] w-[24px]'>{icon}</div>
                    <div className='flex h-full flex-col items-center justify-between gap-2'>
                      <span className='text-center text-xs'>Step {index + 1}</span>
                      <span className='text-center text-sm'>{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='flex h-auto w-1/2 flex-col items-center justify-start gap-4'>
            <div className='flex flex-col items-center gap-4 rounded-lg bg-ob-purple p-4'>
              <div className='flex max-w-[80%] flex-col items-center justify-start'>
                <span className='flex items-center py-5 text-2xl'>Earn XP Daily</span>
                <span className='text-sm text-ob-white-60'>
                  Reward cycle distributes points every{' '}
                  <span className='text-ob-yellow'>{XP_MINING_CYCLE_LENGTH} blocks</span>. We&apos;re currently on{' '}
                  <span className='text-ob-yellow'>block {currentBlockInCycle} in this cycle.</span>
                  &nbsp;The current block height is<span className='text-ob-yellow'> {tip}</span>
                </span>
              </div>

              {balanceData && balanceData?.balance < 1 && (
                <div className='mb-4 mt-4 flex w-full flex-col justify-center rounded bg-ob-purple-light p-5 text-center'>
                  <span className='font-bold text-ob-yellow'>
                    You need to hold some TRIO for at least 24 hours to start Mining XP Points.
                  </span>
                  <div className='flex w-full items-center justify-center'>
                    <Button variant='outline' className='mt-3' onClick={open}>
                      Buy Trio Now
                    </Button>
                  </div>
                </div>
              )}

              <div className='flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-purple-light p-8'>
                <span className='text-4xl'>{tmpPoints ? tmpPoints.toFixed(4) : 0} XP</span>
                <span>Next Point Cycle begins in est. {timeRemaining}</span>
              </div>

              <div className='flex w-full flex-row items-center justify-center'>
                <div className='flex w-full flex-row items-center justify-between gap-2'>
                  <span className='text-nowrap text-sm'>Block 0</span>
                  <div className='relative z-10 flex w-full flex-row items-center justify-between'>
                    <div className='absolute z-0 h-[1px] bg-ob-yellow' style={{ width: `${currentBlockPercent}%` }}></div>
                    <div className='absolute z-0 h-[1px] w-full bg-ob-white-20'></div>
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className={`z-10 h-[10px] w-[10px] rounded-[2px] ${index + 1 <= currentBlockProgress ? 'bg-ob-yellow' : 'bg-[#57337b]'} `}
                      />
                    ))}
                  </div>
                  <span className='text-nowrap text-sm'>Block {XP_MINING_CYCLE_LENGTH}</span>
                </div>
              </div>

              <div className='flex w-full flex-row justify-center'>
                <span className='max-w-[80%] text-center text-ob-white-40'>
                  The value shown above is an accurate estimation of the amount of points you will receive next cycle.
                </span>
              </div>
            </div>
            <div className='grid w-full grid-cols-3 gap-4'>
              <div className='flex flex-col items-center justify-center gap-2 rounded-lg bg-ob-purple p-4'>
                <span className='text-sm'>TRIO Balance</span>
                <div className='relative w-[96px] max-w-[96px] rounded-lg p-[1px] shadow-lg'>
                  <div className='absolute inset-0 max-h-full w-full rounded-lg bg-gradient-to-r from-ob-blue to-ob-green'></div>
                  <span className='relative flex w-full items-center justify-center text-nowrap rounded-lg bg-ob-black-lightest px-4 py-1 text-center text-sm font-bold text-white'>
                    {(balanceData && balanceData.balance.toFixed(0)) || 0} TRIO
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 rounded-lg bg-ob-purple p-4'>
                <span className='text-sm'>Synthetic Balance</span>
                <div className='relative w-[96px] max-w-[96px] rounded-lg p-[1px] shadow-lg'>
                  <div className='absolute inset-0 max-h-full w-full rounded-lg bg-gradient-to-r from-ob-blue to-ob-green'></div>
                  <span className='relative flex w-full items-center justify-center text-nowrap rounded-lg bg-ob-black-lightest px-4 py-1 text-center text-sm font-bold text-white'>
                    {(user?.syntheticBalance && user.syntheticBalance.toFixed(0)) || 0} TRIO
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 rounded-lg bg-ob-purple p-4'>
                <span className='text-sm'>Total Earnings</span>
                <div className='relative w-[96px] max-w-[96px] rounded-lg p-[1px] shadow-lg'>
                  <div className='absolute inset-0 max-h-full w-full rounded-lg bg-gradient-to-r from-ob-blue to-ob-green'></div>
                  <span className='relative flex w-full items-center justify-center text-nowrap rounded-lg bg-ob-black-lightest px-4 py-1 text-center text-sm font-bold text-white'>
                    {(user?.totalPointsFromStaking && numeral(user.totalPointsFromStaking).format('0.0a')) || 0} XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isOpen}>
          <DialogContent className='w-full sm:max-w-[425px]'>
            <div className='flex flex-col items-center justify-center gap-6 py-1 text-center'>
              <div
                onClick={close}
                className='absolute right-2 top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-ob-purple-darkest hover:cursor-pointer hover:opacity-60'
              >
                <X size={20} />
              </div>
              <h4 className='font-xl font-bold'>You can buy TRIO from any of these places:</h4>
              <TrioMarkets />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  );
}
