import { AuthContext } from '@/app/providers/AuthContext';
import { InscriptionItem, IWallet } from '@/types';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext } from 'react';
import { toast } from 'sonner';

export function useListings() {
  const { wallet } = useContext(AuthContext);
  const { signPsbt } = useLaserEyes();
  const queryClient = useQueryClient();

  const listInscriptions = useCallback(
    async (inscriptions: InscriptionItem[]) => {
      try {
        const utxos = [];
        for (const inscription of inscriptions) {
          try {
            const response = await fetch(`/api/inscriptions/details/${inscription.inscription_id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch custom token');
            }
            const data = await response.json();
            const utxo = data.satpoint.split(':').slice(0, -1).join(':');
            utxos.push({
              utxo,
              price: inscription.price
            });
          } catch (error) {
            console.log(error);
          }
        }

        if (!wallet) {
          throw new Error('Please connect your wallet');
        }
        const {
          paymentAddress: makerPaymentAddress,
          paymentPublicKey: makerPaymentPublicKey,
          ordinalsPublicKey: makerOrdinalPublicKey
        } = wallet;

        const result = await fetch('/api/listings/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            makerPaymentAddress,
            makerPaymentPublicKey,
            makerOrdinalPublicKey,
            utxos
          })
        });
        if (!result.ok) {
          throw new Error('Failed to create listing');
        }

        const { psbt, listingIds } = await result.json();
        const signedPsbtResult = await signPsbt(psbt, false, false);

        if (!signedPsbtResult || !signedPsbtResult.signedPsbtBase64) {
          throw new Error('Signing psbt failed');
        }
        const confirmListingResult = await fetch('/api/listings/confirm', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            listingIds,
            signedPSBT: signedPsbtResult.signedPsbtBase64
          })
        });
        if (!confirmListingResult.ok) {
          throw new Error('Failed to confirm listing');
        }

        toast.success('Inscription listed successfully');

        // NOTE: Refetches all inscription and runes orders
        // if runes listings are handled elsewhere, edit the key here
        queryClient.invalidateQueries({ queryKey: ['orderbook'] });
        return true;
      } catch (error: any) {
        toast.error(error.message);
        console.error('Create Error: ', error);
        return false;
      }
    },
    [wallet, signPsbt]
  );

  const buyListing = useCallback(async (id: number) => {
    try {
      const {
        paymentAddress: takerPaymentAddress,
        paymentPublicKey: takerPaymentPublicKey,
        ordinalsAddress: takerOrdinalAddress
      } = wallet as IWallet;

      const result = await fetch('/api/listings/createOffer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          takerPaymentAddress,
          takerPaymentPublicKey,
          takerOrdinalAddress
        })
      });
      if (!result.ok) {
        throw new Error('Failed to create offer');
      }

      const { psbt } = await result.json();
      const signedPsbtResult = await signPsbt(psbt, false, false);
      if (!signedPsbtResult || !signedPsbtResult.signedPsbtBase64) {
        throw new Error('Signing psbt failed');
      }
      const confirmListingApiResult = await fetch(`/api/listings/submitOffer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signedPSBTBase64: signedPsbtResult.signedPsbtBase64
        })
      });
      if (!confirmListingApiResult.ok) {
        throw new Error('Failed to submit listing');
      }
      const { txId } = await confirmListingApiResult.json();
      console.log({ txId });
      // NOTE: Refetches all inscription and runes orders
      // if runes listings are handled elsewhere, edit the key here
      queryClient.invalidateQueries({ queryKey: ['orderbook'] });
      toast.success(`Transaction successful: ${txId}`);
      return txId;
    } catch (error) {
      console.error('Create Offer Error: ', error);
      return false;
    }
  }, []);

  return { listInscriptions, buyListing };
}
