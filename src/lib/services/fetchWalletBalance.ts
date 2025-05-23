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

export const useTokenBalanceQuery = (address?: string, ticker: string = 'TRIO') => {
  return useQuery({
    queryKey: ['wallet-token-balance', address, ticker],
    queryFn: async () => fetchTokenBalance(address!, ticker),
    placeholderData: () => ({
      error: null,
      result: [
        {
          balance: 0,
          tick: ticker,
          block_height: 0,
          overall_balance: '0',
          available_balance: '0'
        }
      ]
    }),
    enabled: !!address,
    select: ({ result }) => ({
      overallBalance: Number(result[0].available_balance) / BRC20_CONVERSION_FACTOR || 0,
      balance: Number(result[0].available_balance) / BRC20_CONVERSION_FACTOR || 0
    })
  });
};
