import { useQuery } from '@tanstack/react-query';
import { getTradeHistoryByOrderId } from '../supabase';
import { TPagination } from '../hooks/usePagination/pagination.types';
import { getTradeHistories, getTradeHistoryById } from '../supabase/tradeHistory';

const PAGINATION_LIMIT = 20;

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
