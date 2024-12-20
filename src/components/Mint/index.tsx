'use client';

import { AuthContext } from '@/app/providers/AuthContext';
import { usePaddingOutputs } from '@/lib/hooks/usePaddingOutputs';
import { createBuyOffer, fetchAllocationInfo, fetchLaunchpadStatus, submitBuyOffer } from '@/lib/services';
import { useLaunchpad } from '@/lib/services/fetchLaunchpad';
import { pushPreinscribeMintOrderToFirebase } from '@/lib/services/points';
import { EMintState, TAllocation, TMetaData, TPhase } from '@/types';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import Section from '../Section';
import LaunchpadMetaData from './launchpadMetadata';
import MintAction from './MintAction';
import PhaseStatus from './PhaseStatus';
import Image from 'next/image';

export default function Mint({ slug }: { slug: string }) {
  const { wallet, isAuthenticated } = useContext(AuthContext);
  const { signPsbt } = useLaserEyes();
  const { withPaddingOutputs } = usePaddingOutputs();

  const [mintState, setMintState] = useState<EMintState>(EMintState.DEFAULT);
  const [txid, setTxid] = useState<string | null>(null);

  // Simply gets the supabase launchpad row so that we can use the ID and plug into the rest of the code
  // WARN: There is a more efficient way of doing this. Revisit this code later.
  const { data: launchpad } = useLaunchpad(slug);

  const {
    data: launchInfo,
    isPending: launchInfoPending,
    refetch: refrechLaunchInfo
  } = useQuery({
    queryKey: ['launchpad-stats', launchpad?.id],
    queryFn: () => fetchLaunchpadStatus(launchpad?.id),
    select: (data) => data.payload,
    enabled: !!launchpad?.id
  });

  const {
    data: allocationInfo,
    isPending: allocationIsPending,
    refetch: refetchAllocationInfo
  } = useQuery({
    queryKey: ['allocation-info', launchpad?.id, wallet?.ordinalsAddress],
    queryFn: () => fetchAllocationInfo(launchpad?.id, wallet?.ordinalsAddress),
    select: (data) => data.payload,
    enabled: !!launchpad?.id && isAuthenticated && !!wallet?.ordinalsAddress
  });

  const currentPhase = useMemo(() => {
    if (launchInfoPending) return null;
    return launchInfo?.phases.find((phase: TPhase) => {
      const now = Date.now();
      const start = phase.start_date * 1000;
      const end = phase.end_date ? phase.end_date * 1000 : null;
      let foundPhase: boolean = false;
      if (now > start) {
        if (end === null) foundPhase = true;
        else if (now > end) foundPhase = false;
        else if (now < end) foundPhase = true;
      } else foundPhase = false;
      return foundPhase;
    });
  }, [launchInfo, launchInfoPending]);

  const mint = useCallback(
    (feeRate: number) => {
      withPaddingOutputs(async () => {
        if (!wallet?.paymentAddress || !wallet?.paymentPublicKey) {
          return handleMintFailure('Wallet information is incomplete');
        }

        try {
          await executeMint(feeRate);
        } catch (error: any) {
          handleMintFailure(error.message || 'Cannot mint due to an unexpected error');
        }
      });
    },
    [wallet, withPaddingOutputs, currentPhase]
  );

  const executeMint = async (feeRate: number) => {
    if (!isAuthenticated) return handleMintFailure('Please connect your wallet');
    if (currentPhase === null) return handleMintFailure('No active mint phase');
    setMintState(EMintState.MINT_PROMPT);

    if (!wallet?.ordinalsAddress || !wallet?.paymentAddress || !wallet?.paymentPublicKey) {
      toast.error('Wallet is not fully configured.');
      return;
    }

    const { success, payload, error } = await createBuyOffer(
      launchInfo?.id,
      wallet?.ordinalsAddress,
      wallet?.paymentAddress,
      wallet?.paymentPublicKey,
      feeRate
    );

    if (!success) return handleMintFailure(error);

    const signedData = await signPsbt(payload.psbt, false, false);

    if (!signedData?.signedPsbtBase64) {
      return handleMintFailure('Failed to sign the PSBT');
    }

    setMintState(EMintState.MINTING);

    const confirmResult = await submitBuyOffer(payload?.id, signedData.signedPsbtBase64);

    if (confirmResult.success) {
      const { txId } = confirmResult.payload;
      refetchAllocationInfo();
      refrechLaunchInfo();
      handleMintSuccess(txId);
      pushPreinscribeMintOrderToFirebase(txId);
    } else {
      handleMintFailure(confirmResult.error);
    }
  };

  const handleMintSuccess = (txId: string) => {
    toast.success('You have minted successfully.');
    setTxid(txId);
    setMintState(EMintState.CONFIRMED);
  };

  const handleMintFailure = (error: any) => {
    if (typeof error === 'string') {
      toast.error(error);
    } else if (error.errors) {
      toast.error(error.errors[0].msg);
    }
    setMintState(EMintState.DEFAULT);
  };

  const metaData: TMetaData = useMemo(() => launchInfo && launchInfo.meta_data, [launchInfo]);

  // In both the totalInscriptions and remainingInscriptions, we are using the public phase to get the total and remaining inscriptions
  const totalInscriptions = launchInfo?.total_inscriptions || 1; // default to 1 to avoid division by zero

  const remainingInscriptions = launchInfo?.remaining_inscriptions || 0;

  const percentComplete = useMemo(
    () => Number((((totalInscriptions - remainingInscriptions) / totalInscriptions) * 100).toFixed(2)) || 0,
    [totalInscriptions, remainingInscriptions]
  );

  const hasAllocationInCurrentPhase = useMemo(() => {
    if (!allocationInfo || !currentPhase) return false;
    if (currentPhase.is_public) return true;

    const allocationForPhase: TAllocation = allocationInfo.phases.find(
      (allocation: TAllocation) => allocation.id === currentPhase.id
    );

    return allocationForPhase ? allocationForPhase.remaining_allocation > 0 : false;
  }, [allocationInfo, currentPhase]);

  useEffect(() => {
    if (wallet?.paymentAddress) refetchAllocationInfo();
  }, [wallet?.paymentAddress]);

  return (
    <Section className='bg-ob-purple-darkest'>
      <div className='grid grid-cols-1 gap-6 sm:gap-12 lg:grid-cols-2'>
        <div>
          {launchInfoPending ? (
            <div className='h-[40rem] w-full animate-pulse rounded-xl bg-ob-black-lightest'></div>
          ) : (
            <Image
              src={metaData?.icon ?? ''}
              alt='Mint Image'
              width={600}
              height={600}
              className='relative w-full overflow-hidden rounded-xl'
            />
          )}
        </div>

        <div className='h-full space-y-8'>
          <LaunchpadMetaData metaData={metaData} />

          <PhaseStatus
            launchInfo={launchInfo}
            metaData={metaData}
            allocationIsPending={allocationIsPending}
            allocationInfo={allocationInfo}
            isAuthenticated={isAuthenticated}
            currentPhase={currentPhase}
          />

          <MintAction
            mint={mint}
            mintState={mintState}
            txid={txid}
            hasLivePhase={currentPhase ? true : false}
            hasAllocationInCurrentPhase={hasAllocationInCurrentPhase}
            launchInfoPending={launchInfoPending}
            percentComplete={percentComplete}
            totalInscriptions={totalInscriptions}
            remainingInscriptions={remainingInscriptions}
          />
        </div>
      </div>
    </Section>
  );
}
