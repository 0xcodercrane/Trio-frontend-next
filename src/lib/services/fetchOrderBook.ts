import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getOrderbookByAddress,
  getOrderbookByInscriptionId,
  getOrderbookById,
  getOrderbookWithInscriptions,
  getOrderbookWithRunes,
  getOrderbookWithSpecialRanges,
  getInscriptionsWithPriceByCollectionSlug
} from '../supabase/orderbook';
import { TPagination } from '../hooks/usePagination/pagination.types';

const PAGINATION_LIMIT = 20;

export const useOrderbookByInscriptionId = (inscriptionId: string | undefined) =>
  useQuery({
    queryKey: ['orderbook-by-inscription-id', inscriptionId],
    queryFn: async () => (inscriptionId ? await getOrderbookByInscriptionId(inscriptionId) : undefined),
    enabled: !!inscriptionId,
    select: (result) => result?.data
  });

export const useOrderbookByAddress = (address: string | undefined) => {
  const { data } = useQuery({
    queryKey: ['orderbook-by-address', address],
    queryFn: async () => address && (await getOrderbookByAddress(address)),
    enabled: !!address
    // select: ({ data }) => (data && data) || []
  });
  return;
};

export const useInscriptionsWithPricesByCollection = (collectionSlug: string | undefined) =>
  useQuery({
    queryKey: ['inscriptions-with-prices-by-collection-slug', collectionSlug],
    queryFn: async () => (collectionSlug ? await getInscriptionsWithPriceByCollectionSlug(collectionSlug) : undefined),
    enabled: !!collectionSlug,
    select: (result) => result?.data
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

export const useActiveOrderbookWithRunesQuery = ({ offset, limit }: TPagination) => {
  return useQuery({
    queryKey: ['orderbook', 'runes', offset, limit + offset],
    queryFn: async () => await getOrderbookWithRunes({ offset, limit }),
    select: ({ data }) => (data && data) || []
  });
};

export const useActiveOrderbookWithSpecialRangesQuery = ({ offset, limit }: TPagination) => {
  return useQuery({
    queryKey: ['orderbook', 'special', offset, limit + offset],
    queryFn: async () => await getOrderbookWithSpecialRanges({ offset, limit }),
    select: ({ data }) => (data && data) || []
  });
};

export const useOrderbookByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ['orderbook-by-id', id],
    queryFn: async () => await getOrderbookById(id),
    select: ({ data }) => (data && data) || {}
  });
};
