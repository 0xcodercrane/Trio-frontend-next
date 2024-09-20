import { useQuery } from '@tanstack/react-query';
import { AddressInfoApiResponse } from '../../types/services/opi/getWalletBalance.types';
import { BRC20_CONVERSION_FACTOR } from '../constants';

export const fetchTokenBalance = async (address: string, ticker: string = 'TRIO'): Promise<AddressInfoApiResponse> => {
  const response = await fetch(
    `/api/walletBalance?address=${encodeURIComponent(address)}&ticker=${encodeURIComponent(ticker)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token balance');
  }

  return response.json();
};
export const useTokenBalanceQuery = (address: string, ticker: string = 'TRIO') => {
  return useQuery({
    queryKey: ['wallet-token-balance', address, ticker],
    queryFn: async () => fetchTokenBalance(address, ticker),
    enabled: !!address,
    select: ({ result }) => ({
      ...result[0],
      balance: Number(result[0].available_balance) / BRC20_CONVERSION_FACTOR || 0
    })
  });
};
