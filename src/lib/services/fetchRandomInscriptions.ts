import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getRandomInscriptions } from '@/lib/supabase';
import { TPagination } from '../hooks/usePagination/pagination.types';

export const useRandomInscriptionsQuery = (pagination: TPagination) => {
  return useQuery({
    queryKey: ['inscriptions', pagination.offset, pagination.limit + pagination.offset],
    queryFn: async () => getRandomInscriptions(pagination),
    select: ({ data }) => data || [],
    placeholderData: keepPreviousData
  });
};
