import { FxRateResponse, Prices } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

const PRICES_FRESHNESS_PERIOD = 600 * 1000; // 10 minutes

const fetchPrices = async (): Promise<Prices> => {
  try {
    const fxRatePrices: FxRateResponse = await (await fetch('/api/prices')).json();
    // MEMO: workaround for trio price until it is added to `/fxrate` endpoint
    const trioInfo = await (await fetch('/api/trioInfo')).json();

    return {
      ...fxRatePrices,
      trio: {
        usd: trioInfo.quote.USD.price
      }
    };
  } catch (e) {
    throw new Error('Failed to fetch prices.');
  }
};

export const usePrices = () => {
  const queryResult = useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    staleTime: PRICES_FRESHNESS_PERIOD,
    refetchOnWindowFocus: false,
    refetchInterval: PRICES_FRESHNESS_PERIOD
  });

  /**
   * Helper function that converts bitcoin amount to USD based on current price.
   */
  const bitcoinToUsd = useCallback(
    (bitcoinAmount: number) => {
      if (!!queryResult.data?.bitcoin.usd) {
        return bitcoinAmount * queryResult.data?.bitcoin.usd;
      }
      return undefined;
    },
    [queryResult.data?.bitcoin.usd]
  );

  /**
   * Helper function that converts sats amount to USD based on current price.
   */
  const satsToUsd = useCallback((satsAmount: number) => bitcoinToUsd(satsAmount / 100000000), [bitcoinToUsd]);

  return { ...queryResult, bitcoinToUsd, satsToUsd };
};
