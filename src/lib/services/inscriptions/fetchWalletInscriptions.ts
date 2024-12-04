import { PUBLIC_API_URL } from '@/lib/constants';
import { GenericResponse, isResponseSuccess } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

const PAGINATION_LIMIT = 20;

const fetchWalletInscriptions = async (address: string): Promise<GenericResponse<string[]>> => {
  const searchParams = new URLSearchParams({
    address,
    excludeCommonRanges: 'true'
  }).toString();

  const response = await fetch(`${PUBLIC_API_URL}/satscanner/find-special-ranges?${searchParams}`, {
    cache: 'no-store'
  });
  if (!response.ok) {
    return { success: false, error: 'Failed to fetch inscriptions in wallet.' };
  }
  const payload = await response.json();
  console.log(payload);
  return { success: true, payload: payload.result.inscriptions.map(({ inscriptions: [inscription] }: any) => inscription) };
};

// MEMO: Fetches all inscription but ready for infinite scroll integration.
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

  return { data: paginatedResult, hasNextPage, fetchNextPage };
};
