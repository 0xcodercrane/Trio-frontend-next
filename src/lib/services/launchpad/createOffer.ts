/**
 * Create a buy offer.
 */
export const createBuyOffer = async (
  id: number,
  takerOrdinalAddress: string,
  takerPaymentAddress: string,
  takerPaymentPublicKey: string,
  feeRate: number | undefined
) => {
  try {
    const response = await fetch(`/api/launchpad/offer/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        takerOrdinalAddress,
        takerPaymentAddress,
        takerPaymentPublicKey,
        feeRate
      })
    });

    const data = await response.json();

    if (response.ok && data.status !== 'error') {
      return data;
    }

    return { success: false, error: data.error || 'Unknown error occurred' };
  } catch (error: any) {
    return { success: false, error: error.message || 'An unknown error occurred' };
  }
};
