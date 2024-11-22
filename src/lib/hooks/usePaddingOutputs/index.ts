import { AuthContext } from '@/app/providers/AuthContext';
import { GenericResponse, isResponseSuccess } from '@/types';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useState } from 'react';
import { toast } from 'sonner';

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

const setupPaddingOutputs = async (
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

const usePaddingOutputs = () => {
  const { wallet } = useContext(AuthContext);
  const { signPsbt } = useLaserEyes();
  const queryClient = useQueryClient();

  const { data: hasPaddingOutputs, isPending: paddingOutputsCheckIsPending } = useQuery({
    queryKey: ['padding-outputs-check', wallet?.paymentAddress],
    queryFn: () => checkPaddingOutputs(wallet?.paymentAddress),
    select: (data) => isResponseSuccess(data) && data.payload.paddingOutputsExist,
    enabled: !!wallet?.paymentAddress
  });

  const withPaddingOutputs = useCallback(
    async (callback: () => any, feeRate: number) => {
      if (paddingOutputsCheckIsPending || !wallet) {
        return;
      }
      if (hasPaddingOutputs) {
        return callback();
      }

      const response = await setupPaddingOutputs(wallet.paymentAddress, wallet.paymentPublicKey, feeRate);

      if (response.success) {
        const result = await signPsbt(response.payload.psbt, true, true);
        toast.success(`Padding outputs setup broadcasted in ${result?.txId}`);

        return new Promise((resolve) => {
          setTimeout(async () => {
            await queryClient.invalidateQueries({ queryKey: ['padding-outputs-check', wallet?.paymentAddress] });
            const cbResult = await callback();
            resolve(cbResult);
          }, 10000); // Wait for 10s to let backend catch up with the padding setup tx in the mempool.
        });
      } else {
        toast.error(response.error);
        return;
      }
    },
    [hasPaddingOutputs, paddingOutputsCheckIsPending, wallet]
  );

  return { withPaddingOutputs };
};

export { usePaddingOutputs };
