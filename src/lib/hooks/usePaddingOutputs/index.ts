import { GenericResponse, isResponseSuccess } from '@/types';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useFeeRates } from '../useFeeRates';
import { useWallet } from '../useWallet';
import { useLocalStorage } from 'usehooks-ts';

interface PaddingOutputsCheckDataResponse {
  paddingOutputsExist: boolean;
}

interface PaddingOutputsSetupDataResponse {
  psbt: string;
  inputIndices: Array<number>;
}

const checkPaddingOutputs = async (address?: string): Promise<GenericResponse<PaddingOutputsCheckDataResponse>> => {
  try {
    const response = await fetch(`/api/padding-outputs/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address })
    });

    return response.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

const getPaddingOutputsSetupPsbt = async (
  address: string,
  publicKey: string,
  feeRate: number
): Promise<GenericResponse<PaddingOutputsSetupDataResponse>> => {
  try {
    const response = await fetch(`/api/padding-outputs/setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address, publicKey, feeRate })
    });

    return response.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

const LOCAL_STORE_OUTPUTS_SETUP_MEMPOOL = 'OUTPUTS_SETUP_MEMPOOL';

const usePaddingOutputs = () => {
  const wallet = useWallet();
  const { signPsbt } = useLaserEyes();
  const queryClient = useQueryClient();
  const { data, feeRate } = useFeeRates();
  const [isOutputsSetupInMempool, setOutputsSetupInMempool] = useLocalStorage(
    `${LOCAL_STORE_OUTPUTS_SETUP_MEMPOOL}_${wallet?.paymentAddress}`,
    false
  );

  const { data: hasPaddingOutputs, isPending: isPaddingOutputsCheckPending } = useQuery({
    queryKey: ['padding-outputs-check', wallet?.paymentAddress],
    queryFn: () => checkPaddingOutputs(wallet?.paymentAddress),
    select: (data) => isResponseSuccess(data) && data.payload.paddingOutputsExist,
    enabled: !!wallet
  });

  const [isPaddingOuputsSetupInProgress, setIsPaddingOutputsSetupInProgess] = useState(false);

  useEffect(() => {
    if (hasPaddingOutputs) {
      setOutputsSetupInMempool(false);
    }
  }, [hasPaddingOutputs]);

  // MEMO: Wrapper around any call that needs to be checked.
  const withPaddingOutputs = useCallback(
    async (callback: () => any) => {
      if (isPaddingOutputsCheckPending || !wallet) {
        return;
      }
      if (hasPaddingOutputs) {
        return callback();
      }
      setIsPaddingOutputsSetupInProgess(true);

      // MEMO: Workaround to not allow user to submit multiple output setup txs.
      if (isOutputsSetupInMempool) {
        toast.info('Padding outputs setup transaction was broadcasted, wait until it gets confirmed.');
        return;
      }

      const response = await getPaddingOutputsSetupPsbt(
        wallet.paymentAddress,
        wallet.paymentPublicKey,
        data?.fastest_fee || feeRate
      );

      if (response.success) {
        try {
          const result = await signPsbt(response.payload.psbt, true, true);
          toast.success(`Padding outputs setup broadcasted in ${result?.txId}`);
          setOutputsSetupInMempool(true);
          return new Promise((resolve) => {
            setTimeout(async () => {
              await queryClient.invalidateQueries({ queryKey: ['padding-outputs-check', wallet?.paymentAddress] });
              const cbResult = await callback();
              setIsPaddingOutputsSetupInProgess(false);
              resolve(cbResult);
            }, 10000); // Wait for 10s to let backend catch up with the padding setup tx in the mempool.
          });
        } catch (_error) {
          toast.error('Signing padding outputs setup failed.');
        }
      } else {
        console.error('Setting up padding outputs failed:', response.error);
        toast.error('Setting up padding outputs failed.');
        setIsPaddingOutputsSetupInProgess(false);
        return;
      }
    },
    [hasPaddingOutputs, isPaddingOutputsCheckPending, wallet, feeRate]
  );

  const setupPaddingOutputs = useCallback(() => withPaddingOutputs(() => {}), [withPaddingOutputs]);

  return {
    hasPaddingOutputs,
    isPaddingOutputsCheckPending,
    isPaddingOuputsSetupInProgress,
    isOutputsSetupInMempool,
    withPaddingOutputs,
    setupPaddingOutputs
  };
};

export { usePaddingOutputs };
