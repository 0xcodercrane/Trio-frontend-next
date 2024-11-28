import { GenericResponse, isResponseError, isResponseSuccess } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGINATION_LIMIT = 20;

export const fetchWalletInscriptions = async (
  address: string,
  wallet: string = 'xverse',
  pageParam: number
): Promise<GenericResponse<any>> => {
  const response = await fetch(
    `/api/inscriptions/wallet/${wallet}/${address}?offset=${pageParam * PAGINATION_LIMIT}&limit=${PAGINATION_LIMIT}`,
    {
      cache: 'no-store'
    }
  );
  if (!response.ok) {
    return { success: false, error: 'Failed to fetch inscriptions in wallet.' };
  }
  return { success: true, payload: await response.json() };
};

export const useWalletInscriptions = (address: string, wallet: string = 'xverse') => {
  return useInfiniteQuery({
    queryKey: ['wallet-token-balance', address, wallet],
    queryFn: async ({ pageParam }) => fetchWalletInscriptions(address, wallet, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (isResponseError(lastPage)) {
        return null;
      }
      const inscriptionsFetchedCount = PAGINATION_LIMIT * (lastPageParam + 1);
      if (lastPage.payload.total_inscriptions > inscriptionsFetchedCount) {
        return lastPageParam + 1;
      }
      return null;
    },
    select: (data) => data.pages.map((page) => (isResponseSuccess(page) ? page.payload.results : [])).flat()
  });
};
