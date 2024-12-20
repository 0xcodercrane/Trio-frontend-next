'use client';

import { AuthContext } from '@/app/providers/AuthContext';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { Tag } from '@/components/common';
import { Button } from '@/components/ui/button';
import { MEMPOOL_SPACE_URL } from '@/lib/constants';
import { useFeeRates, usePaddingOutputs } from '@/lib/hooks';
import { shortenTxid } from '@/lib/utilities';
import { EComponentVariants, EMenuType } from '@/types';
import { EMintState, TMintActionProps } from '@/types/launchpad';
import { useContext } from 'react';
import MintProcess from '../MintProcess';

const getButtonState = (
  mintState: EMintState,
  hasPaddingOutputs: boolean | undefined,
  isAuthenticated: boolean,
  hasAllocationInCurrentPhase: boolean,
  hasLivePhase: boolean,
  isOutputsSetupInMempool: boolean,
  launchInfoPending: boolean
) => {
  if (launchInfoPending) {
    return { text: 'Loading...', disabled: true };
  }

  if (!isAuthenticated) {
    return { text: 'Please connect your wallet', disabled: false };
  }

  if (isOutputsSetupInMempool) {
    return { text: 'Padding in Progress...', disabled: true };
  }

  if (!hasPaddingOutputs) {
    return { text: 'Prepare Wallet for Mint', disabled: false };
  }

  if ([EMintState.MINTING, EMintState.PADDING].includes(mintState)) {
    return { text: 'Processing...', disabled: true };
  }

  if (hasLivePhase) {
    if (hasAllocationInCurrentPhase) {
      return { text: 'Mint Now', disabled: false };
    }
    return { text: 'Prepare Wallet for Next Phase', disabled: false };
  }

  return { text: 'Prepare Wallet Ahead of Mint', disabled: false };
};

const getPaddingState = (isAuthenticated: boolean, isOutputsSetupInMempool: boolean) => {
  if (!isAuthenticated || !isOutputsSetupInMempool) return null;

  return (
    <p className='text-sm text-ob-grey-lightest'>
      Padding outputs setup transaction for the connected wallet is in the mempool. Please wait for confirmation before
      minting.
    </p>
  );
};

const MintAction = ({
  mint,
  txid,
  mintState,
  hasLivePhase,
  hasAllocationInCurrentPhase,
  launchInfoPending,
  percentComplete,
  totalInscriptions,
  remainingInscriptions
}: TMintActionProps) => {
  const { setMenuType, menuDisclosure } = useContext(GlobalContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { data: feeRatesData } = useFeeRates();
  const { hasPaddingOutputs, isOutputsSetupInMempool, setupPaddingOutputs } = usePaddingOutputs();

  const openWalletMenu = () => {
    setMenuType(EMenuType.WALLET);
    menuDisclosure.open();
  };

  const { text: buttonText, disabled: buttonDisabled } = getButtonState(
    mintState,
    hasPaddingOutputs,
    isAuthenticated,
    hasAllocationInCurrentPhase,
    hasLivePhase,
    isOutputsSetupInMempool,
    launchInfoPending
  );

  const handleButtonClick = () => {
    if (!isAuthenticated) return openWalletMenu();
    if (!hasPaddingOutputs) return setupPaddingOutputs();
    if (feeRatesData?.fastest_fee) return mint(feeRatesData.fastest_fee);
  };

  return (
    <div>
      {launchInfoPending ? (
        <div className='rounded-xl bg-ob-black-lightest/30 p-4'>
          <div className='h-28 space-y-4 rounded-xl bg-ob-black-lightest/40 p-4'>
            <div className='h-14 animate-pulse rounded-xl bg-ob-black-lightest'></div>
            <div className='h-[6px] w-full animate-pulse rounded-sm bg-ob-black-lightest'></div>
          </div>
        </div>
      ) : (
        <>
          <div className='flex flex-col items-center justify-between gap-6 rounded-lg bg-ob-purple-light/20 p-5'>
            <div className='w-full space-y-4 rounded-lg bg-ob-purple p-4'>
              {getPaddingState(isAuthenticated, isOutputsSetupInMempool)}

              <Button
                disabled={buttonDisabled}
                onClick={handleButtonClick}
                className={`w-full max-w-full ${buttonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {buttonText}
              </Button>

              <MintProcess
                percentComplete={percentComplete}
                launchInfoPending={launchInfoPending}
                totalInscriptions={totalInscriptions}
                remainingInscriptions={remainingInscriptions}
              />
            </div>

            {txid && (
              <div className='flex h-full w-full flex-col gap-4 rounded-lg bg-ob-purple p-4'>
                <div className='flex flex-row items-center justify-between gap-4'>
                  <div className='flex flex-col gap-2'>
                    <span className='text-2xl font-bold text-white'>Pending Transaction</span>
                    <a target='_blank' href={`${MEMPOOL_SPACE_URL}/tx/${txid}`} className='flex flex-row gap-2'>
                      <span className='text-ob-grey-lightest'>Transaction ID</span>
                      <span className='text-ob-grey-lightest'>{txid && shortenTxid(txid)}</span>
                    </a>
                  </div>
                  <div className='flex h-full flex-col items-center justify-center'>
                    <Tag label='Pending Buy' variant={EComponentVariants.Info} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-end'>
            <Tag className='mt-4 flex w-fit' label='+ 2000 XP' info='This order receives 2000 XP for upon completion' />
          </div>
        </>
      )}
    </div>
  );
};

export default MintAction;
