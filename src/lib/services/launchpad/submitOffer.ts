/**
 * Submit a buy offer.
 */
export const submitBuyOffer = async (id: number, signedPsbt: string) => {
  try {
    const response = await fetch(`/api/launchpad/offer/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        signedPsbt
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
