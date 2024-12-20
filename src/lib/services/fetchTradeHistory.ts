import { useQuery } from '@tanstack/react-query';
import { TPagination } from '../hooks/usePagination/pagination.types';
import { getLatestTrades, getTradeHistories, getTradeHistoryById, getTradeHistoryByOrderId } from '../supabase';

// TODO: This should be subscribed to the supabase changes.
export const useTradeHistoryByOrderId = (orderId: number | undefined) =>
  useQuery({
    queryKey: ['trade-history-by-order-id', orderId],
    queryFn: async () => (orderId ? await getTradeHistoryByOrderId(orderId) : { data: [] }),
    select: ({ data }) => data
  });

export const useTradeHistoriesQuery = ({ offset, limit }: TPagination) => {
  return useQuery({
    queryKey: ['trade-history', offset, limit + offset],
    queryFn: async () => await getTradeHistories({ offset, limit }),
    select: ({ data }) => (data && data) || []
  });
};

export const useTradeHistoryByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ['trade-history-by-id', id],
    queryFn: async () => await getTradeHistoryById(id),
    select: ({ data }) => (data && data) || {}
  });
};

export const useLatestTrades = (interval: string = '1 day', limit = 100, slug?: string) => {
  return useQuery({
    queryKey: ['latest-trades', interval, slug],
    queryFn: async () => await getLatestTrades(interval, limit, slug),
    select: ({ data }) => data
  });
};
