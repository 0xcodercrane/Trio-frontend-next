import { AuthContext } from '@/app/providers/AuthContext';
import { InscriptionItem, IWallet } from '@/types';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext } from 'react';
import { toast } from 'sonner';
import { usePaddingOutputs } from '../usePaddingOutputs';

// TODO: Add Pending states while async functions are being executed
export function useListings() {
  const { wallet } = useContext(AuthContext);
  const { signPsbt } = useLaserEyes();
  const queryClient = useQueryClient();

  const { withPaddingOutputs } = usePaddingOutputs();

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

        // MEMO: Adds 1000ms delay for supabase to catch up with the changes.
        setTimeout(
          () =>
            // MEMO: This invalidates only single orderbook-by-inscription-id queries, if we decide
            //        to refresh queries that fetch orders for multiple items, this needs to be extended.
            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey[0] === 'orderbook-by-inscription-id' &&
                inscriptions.some((i) => i.inscription_id === query.queryKey[1])
            }),
          1000
        );
        return true;
      } catch (error: any) {
        toast.error(error.message);
        console.error('Create Error: ', error);
        return false;
      }
    },
    [wallet, signPsbt]
  );

  const updateListingPrice = useCallback(
    async (inscriptionId: string, listingId: number, newPriceSats: number) => {
      try {
        if (!wallet) {
          throw new Error('Please connect your wallet.');
        }
        const {
          paymentAddress: makerPaymentAddress,
          paymentPublicKey: makerPaymentPublicKey,
          ordinalsPublicKey: makerOrdinalPublicKey
        } = wallet;

        const result = await fetch('/api/listings/relist/prepare', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            makerPaymentAddress,
            makerPaymentPublicKey,
            makerOrdinalPublicKey,
            price: newPriceSats,
            listingId
          })
        });
        if (!result.ok) {
          throw new Error('Failed to get psbt to update listing.');
        }
        const { psbt } = await result.json();

        const signedPsbtResult = await signPsbt(psbt, false, false);

        if (!signedPsbtResult || !signedPsbtResult.signedPsbtBase64) {
          throw new Error('Signing psbt failed.');
        }
        const confirmRelistingResult = await fetch('/api/listings/relist/confirm', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            listingId,
            signedPSBT: signedPsbtResult.signedPsbtBase64
          })
        });
        if (!confirmRelistingResult.ok) {
          throw new Error('Failed to update listing price.');
        }

        toast.success('Inscription price updated successfully.');

        // MEMO: Adds 1000ms delay for supabase to catch up with the changes.
        setTimeout(
          () =>
            // MEMO: This invalidates only single orderbook-by-inscription-id queries, if we decide
            //        to refresh queries that fetch orders for multiple items, this needs to be extended.
            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey[0] === 'orderbook-by-inscription-id' && inscriptionId === query.queryKey[1]
            }),
          1000
        );
        return true;
      } catch (error: any) {
        toast.error(error.message);
        console.error('Listing update failed: ', error);
        return false;
      }
    },
    [wallet, signPsbt]
  );

  const cancelListing = useCallback(
    async (inscriptionId: string, listingId: number) => {
      try {
        if (!wallet) {
          throw new Error('Please connect your wallet.');
        }
        const { paymentAddress: makerPaymentAddress, paymentPublicKey: makerPaymentPublicKey } = wallet;

        const result = await fetch('/api/listings/delist/prepare', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            makerPaymentAddress,
            makerPaymentPublicKey,
            listingId
          })
        });
        if (!result.ok) {
          throw new Error('Failed to get psbt to cancel the listing.');
        }
        const psbt = await result.json();
        // TODO: Test this once BE is fixed.
        console.log('Delisting result >> ', psbt);
        const signedPsbtResult = await signPsbt(psbt, false, false);

        if (!signedPsbtResult || !signedPsbtResult.signedPsbtBase64) {
          throw new Error('Signing psbt failed.');
        }
        const confirmDelistingResult = await fetch('/api/listings/delist/confirm', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            listingId,
            signedPSBT: signedPsbtResult.signedPsbtBase64
          })
        });
        if (!confirmDelistingResult.ok) {
          throw new Error('Failed to delist the item..');
        }

        toast.success('Inscription delisted successfully.');

        // MEMO: Adds 1000ms delay for supabase to catch up with the changes.
        setTimeout(
          () =>
            // MEMO: This invalidates only single orderbook-by-inscription-id queries, if we decide
            //        to refresh queries that fetch orders for multiple items, this needs to be extended.
            queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey[0] === 'orderbook-by-inscription-id' && inscriptionId === query.queryKey[1]
            }),
          1000
        );
        return true;
      } catch (error: any) {
        toast.error(error.message);
        console.error('Delisting failed: ', error);
        return false;
      }
    },
    [wallet, signPsbt]
  );

  const buyListing = useCallback(
    (id: number, feeRate: number): Promise<string | undefined> =>
      withPaddingOutputs(async () => {
        try {
          if (!wallet) {
            console.error('useListings: No connected wallet found.');
            return;
          }
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
              takerOrdinalAddress,
              feeRate
            })
          });
          if (!result.ok) {
            console.error('Failed to buy listing', await result.text());
            toast.error('Failed to buy listing.');
            return;
          }

          const { psbt } = await result.json();
          const signedPsbtResult = await signPsbt(psbt, false, false);
          if (!signedPsbtResult || !signedPsbtResult.signedPsbtBase64) {
            console.error('Failed to sign psbt', JSON.stringify(signedPsbtResult));
            toast.error('Failed to buy listing.');
            return;
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
          // NOTE: Refetches all inscription and runes orders
          // if runes listings are handled elsewhere, edit the key here
          queryClient.invalidateQueries({ queryKey: ['orderbook'] });
          toast.success(`Transaction broadcasted: ${txId}`);
          return txId;
        } catch (error) {
          console.error('Buying inscription failed: ', error);
          return;
        }
      }, feeRate),
    [wallet, withPaddingOutputs]
  );

  return { listInscriptions, updateListingPrice, cancelListing, buyListing };
}
