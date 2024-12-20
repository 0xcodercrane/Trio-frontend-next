'use client';

import { usePaddingOutputs } from '@/lib/hooks';
import { Button } from '../ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/app/providers/AuthContext';

export function PaddingPrompt() {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    hasPaddingOutputs,
    isOutputsSetupInMempool,
    isPaddingOutputsCheckFetching,
    isPaddingOuputsSetupInProgress,
    setupPaddingOutputs
  } = usePaddingOutputs();

  if (isOutputsSetupInMempool) {
    return (
      <div className='flex flex-col gap-4 rounded-xl bg-ob-purple p-4 text-white'>
        Padding outputs setup transaction for the connected wallet is in the mempool, please wait until it gets confirmed to
        mint.
      </div>
    );
  }

  if (isOutputsSetupInMempool || hasPaddingOutputs || !isAuthenticated || isPaddingOutputsCheckFetching) return null;

  return (
    <div className='flex flex-col bg-ob-purple-dark p-4'>
      <div className='flex flex-col gap-4 bg-ob-purple p-4'>
        <p>You need padding outputs to participate in this mint. Please use the button below to set up your wallet.</p>
        <Button className='w-full min-w-full' onClick={setupPaddingOutputs} disabled={isPaddingOuputsSetupInProgress}>
          Prepare Wallet for Mint
        </Button>
      </div>
    </div>
  );
}
