'use client';

import { AuthContext } from '@/app/providers/AuthContext';
import { usePaddingOutputs } from '@/lib/hooks/usePaddingOutputs';
import { createBuyOffer, fetchAllocationInfo, fetchLaunchpadStatus, submitBuyOffer } from '@/lib/services';
import { useLaunchpad } from '@/lib/services/fetchLaunchpad';
import { pushPreinscribeMintOrderToFirebase } from '@/lib/services/points';
import { EMediaType, EMintState, EOrientation, TAllocation, TMetaData, TPhase } from '@/types';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Container } from '../Container';
import { SplashPageLayout } from '../Layouts';
import { PaddingPrompt } from '../PaddingPrompt';
import Section from '../Section';
import LaunchpadMetaData from './launchpadMetadata';
import MintAction from './MintAction';
import MintProcess from './MintProcess';
import PhaseStatus from './PhaseStatus';

export default function Mint({ slug }: { slug: string }) {
  const { wallet, isAuthenticated } = useContext(AuthContext);
  const { signPsbt } = useLaserEyes();
  const { withPaddingOutputs } = usePaddingOutputs();

  const [mintState, setMintState] = useState<EMintState>(EMintState.DEFAULT);
  const [txid, setTxid] = useState<string | null>(null);

  // Simply gets the supabaes launchpad row so that we can use the ID and plug into the rest of the code
  // WARN: There is a more efficient way of doing this. Revisit this code later.
  const { data: launchpad, isPending: launchpadPending, error: launchpadError } = useLaunchpad(slug);

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
    return (
      launchInfo?.phases.find((phase: TPhase) => {
        const now = Date.now();
        const start = phase.start_date * 1000;
        const end = phase.end_date ? phase.end_date * 1000 : null;
        return now >= start && (!end || now <= end);
      }) || null
    );
  }, [launchInfo]);

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
    [wallet, withPaddingOutputs]
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

  const handleMintFailure = (error: string) => {
    toast.error(error);
    setMintState(EMintState.DEFAULT);
  };

  const metaData: TMetaData = useMemo(() => launchInfo && launchInfo.meta_data, [launchInfo]);

  // In both the totalInscriptions and remainingInscriptions, we are using the public phase to get the total and remaining inscriptions
  const totalInscriptions = useMemo(() => {
    if (launchInfo) {
      const publicPhase = launchInfo.phases.find((phase: TPhase) => phase.is_public);
      return publicPhase?.total_inscriptions || 0;
    } else {
      return 0;
    }
  }, [launchInfo]);

  const remainingInscriptions = useMemo(() => {
    if (launchInfo) {
      const publicPhase = launchInfo.phases.find((phase: TPhase) => phase.is_public);
      return publicPhase?.remaining_inscriptions || 0;
    } else {
      return 0;
    }
  }, [launchInfo]);

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
      <Container>
        <SplashPageLayout
          className='mt-16 gap-12'
          orientation={EOrientation.LTR}
          media={{ type: EMediaType.IMG, src: metaData && metaData?.icon ? metaData.icon : undefined }}
        >
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

            <MintProcess
              percentComplete={percentComplete}
              launchInfoPending={launchInfoPending}
              totalInscriptions={totalInscriptions}
              remainingInscriptions={remainingInscriptions}
            />

            <MintAction
              mint={mint}
              mintState={mintState}
              txid={txid}
              hasAllocationInCurrentPhase={hasAllocationInCurrentPhase}
              launchInfoPending={launchInfoPending}
            />

            <PaddingPrompt />
          </div>
        </SplashPageLayout>
      </Container>
    </Section>
  );
}
