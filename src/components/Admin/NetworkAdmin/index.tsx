'use client';

import { DataItem } from '@/components/common';
import { NETWORK } from '@/lib/constants';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';

export function NetworkAdmin() {
  const { data: tip } = useBlockHeight();

  return (
    <div className='flex w-full flex-col gap-8 rounded-md border border-ob-purple-lighter bg-ob-purple p-4'>
      <span className='text-2xl text-ob-yellow'>Network</span>
      <div className='flex flex-row justify-start gap-4'>
        <DataItem label='network' value={NETWORK} />
        <DataItem label='block height' value={tip ? tip.toString() : '0'} />
      </div>
    </div>
  );
}
