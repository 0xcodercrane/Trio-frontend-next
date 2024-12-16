import { GenericResponse, isResponseSuccess } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

const PAGINATION_LIMIT = 20;

const fetchWalletInscriptions = async (address: string): Promise<GenericResponse<string[]>> => {
  const response = await fetch(`/api/walletInscriptions?address=${address}`, {
    cache: 'no-store'
  });
  if (!response.ok) {
    return { success: false, error: 'Failed to fetch inscriptions in wallet.' };
  }
  return response.json();
};

export const useWalletInscriptions = (address: string | undefined) => {
  const queryResult = useQuery({
    queryKey: ['inscriptions-by-address', address],
    queryFn: () => fetchWalletInscriptions(address || ''),
    enabled: !!address,
    select: (data) => (isResponseSuccess(data) ? data.payload : [])
  });

  // MEMO: Simulating pagination here because API returns all the results at once.
  const [lastPage, setLastPage] = useState(1);

  const paginatedResult = useMemo(
    () => (queryResult?.data ? queryResult.data.slice(0, PAGINATION_LIMIT * lastPage) : []),
    [queryResult.data, lastPage]
  );

  const hasNextPage = (queryResult.data?.length || 0) > PAGINATION_LIMIT * lastPage;
  const fetchNextPage = useCallback(() => setLastPage((currentPage) => currentPage + 1), []);

  return { data: paginatedResult, isPending: queryResult.isPending, hasNextPage, fetchNextPage };
};
