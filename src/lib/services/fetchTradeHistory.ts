import { useQuery } from '@tanstack/react-query';
import { TPagination } from '../hooks/usePagination/pagination.types';
import { getTradeHistories, getTradeHistoryById } from '../supabase/tradeHistory';

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
