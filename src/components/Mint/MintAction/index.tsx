import { Tag } from '@/components/common';
import { Button } from '@/components/ui/button';
import { MEMPOOL_SPACE_URL } from '@/lib/constants';
import { useFeeRates } from '@/lib/hooks';
import { shortenTxid } from '@/lib/utilities';
import { EComponentVariants } from '@/types';
import { EMintState, TMintActionProps } from '@/types/launchpad';

const mapStateToButtonText = (mintState: EMintState): string => {
  switch (mintState) {
    case EMintState.PADDING:
    case EMintState.MINT_PROMPT:
      return 'Waiting for Signature...';
    case EMintState.MINTING:
      return 'Minting...';
    default:
      return 'Mint Now';
  }
};

const MintAction = ({
  isAuthenticated,
  mintState,
  hasAllocationInCurrentPhase,
  txid,
  mint,
  launchInfoPending
}: TMintActionProps) => {
  const { data: feeRatesData } = useFeeRates();

  if (launchInfoPending) {
    return (
      <div className='flex flex-row items-center justify-between'>
        <div className='h-12 w-24 animate-pulse rounded-lg bg-ob-black-lightest'></div>
      </div>
    );
  }

  return (
    <div className='flex flex-row items-center justify-between'>
      <Button
        disabled={
          !isAuthenticated || [EMintState.MINTING, EMintState.PADDING].includes(mintState) || !hasAllocationInCurrentPhase
        }
        onClick={() => {
          if (feeRatesData?.fastest_fee) mint(feeRatesData?.fastest_fee);
        }}
        variant='secondary'
      >
        {mapStateToButtonText(mintState)}
      </Button>
      {txid && (
        <div className='flex h-full w-fit flex-col gap-4 rounded-lg bg-ob-purple p-4'>
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
  );
};

export default MintAction;
