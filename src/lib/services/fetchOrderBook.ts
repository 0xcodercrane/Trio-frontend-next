import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getOrderbookByAddress,
  getOrderbookByInscriptionId,
  getOrderbookWithInscriptions,
  getInscriptionsWithPriceByCollectionSlug
} from '../supabase/orderbook';

const PAGINATION_LIMIT = 20;

export const useOrderbookByInscriptionId = (inscriptionId: string | undefined) =>
  useQuery({
    queryKey: ['orderbook-by-inscription-id', inscriptionId],
    queryFn: async () => (inscriptionId ? await getOrderbookByInscriptionId(inscriptionId) : undefined),
    enabled: !!inscriptionId,
    select: (result) => result?.data
  });

export const useOrderbookByAddress = (address: string | undefined) => {
  return useQuery({
    queryKey: ['orderbook-by-address', address],
    queryFn: async () => address && (await getOrderbookByAddress(address)),
    enabled: !!address
    // select: ({ data }) => (data && data) || []
  });
};

export const useInscriptionsWithPricesByCollection = (collectionSlug: string | undefined) =>
  useInfiniteQuery({
    queryKey: ['inscriptions-with-prices-by-collection-slug', collectionSlug],
    queryFn: async ({ pageParam }) =>
      collectionSlug
        ? await getInscriptionsWithPriceByCollectionSlug(collectionSlug, {
            offset: PAGINATION_LIMIT * pageParam,
            limit: PAGINATION_LIMIT
          })
        : undefined,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage?.data && lastPage.data.length === PAGINATION_LIMIT) {
        return lastPageParam + 1;
      }
      return null;
    },
    enabled: !!collectionSlug,
    select: (data) => data.pages.map((page) => page?.data || []).flat()
  });

export const useActiveOrderbookWithInscriptionsQuery = () => {
  return useInfiniteQuery({
    queryKey: ['orderbook', 'inscriptions'],
    queryFn: async ({ pageParam }) =>
      await getOrderbookWithInscriptions({ offset: PAGINATION_LIMIT * pageParam, limit: PAGINATION_LIMIT }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.data && lastPage.data.length === PAGINATION_LIMIT) {
        return lastPageParam + 1;
      }
      return null;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => (firstPageParam > 0 ? firstPageParam - 1 : null)
  });
};
