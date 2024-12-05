import { create } from 'zustand';
import { FeeRateState } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchFeeRates } from '@/lib/services';
import { DEFAULT_FEE_RATE, FEE_RATES_CACHE_AGE } from '@/lib/constants';

const useFeeRate = create<FeeRateState>()((set, get) => ({
  feeRate: DEFAULT_FEE_RATE,
  setFeeRate: (feeRate) => set({ feeRate })
}));

export const useFeeRates = () => {
  const queryResult = useQuery({
    queryKey: ['fee-rates'],
    queryFn: fetchFeeRates,
    select: ({ data }) => (data ? data[0] : null),
    placeholderData: keepPreviousData,
    refetchInterval: FEE_RATES_CACHE_AGE.as('milliseconds')
  });

  const feeRateState = useFeeRate();

  return { ...queryResult, ...feeRateState };
};
