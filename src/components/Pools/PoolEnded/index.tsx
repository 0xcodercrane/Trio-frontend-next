import { useWallet } from '@/lib/hooks';
import { formatBlock, shortenAddress } from '@/lib/utilities';
import { EPoolType, TPool } from '@/types';
import { useMemo } from 'react';

export const PoolEnded = ({ pool }: { pool: TPool }) => {
  const wallet = useWallet();
  const { endBlock, winners, type } = pool;

  const isUserWinner = useMemo(() => {
    if (!wallet || !winners || winners.length === 0) return null;
    return winners.some((winner) => winner.address === wallet?.ordinalsAddress);
  }, [winners, wallet]);

  if (!winners) {
    return (
      <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.90]'>
        <span className='text-lg'>Pool Closed at {formatBlock(endBlock)}</span>
        <span>The winner of this pool will be announced soon</span>
      </div>
    );
  }

  if (type === EPoolType.WINNER_TAKES_ALL) {
    <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.90]'>
      <span className='text-lg'>Pool Closed at {formatBlock(endBlock)}</span>
      <span>The winner of this pool is {shortenAddress(winners[0].address)}</span>
    </div>;
  }

  if (type === EPoolType.N_WINNERS && isUserWinner) {
    return (
      <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.90]'>
        <span className='text-lg'>Pool Closed at {formatBlock(endBlock)}</span>
        <span className='font-bold text-ob-green'>You are a winner!</span>
        <span>Please reach out to the Trio team for your reward</span>
      </div>
    );
  } else {
    return (
      <div className='absolute left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-ob-black/[0.90] py-8'>
        <span className='text-lg'>Pool Closed at {formatBlock(endBlock)}</span>

        <div className='flex max-h-[50%] flex-col gap-2 overflow-scroll'>
          {winners.map((winner, index) => (
            <span key={index}>
              {index + 1}: {shortenAddress(winner.address)}
            </span>
          ))}
        </div>
        {!wallet && <span>Please connect your wallet to check if you are a winner</span>}
      </div>
    );
  }
};
