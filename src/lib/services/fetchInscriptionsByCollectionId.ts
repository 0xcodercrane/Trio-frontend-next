import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getFeaturedArtists, getInscriptionsByCollectionId } from '../supabase';
import { TPagination } from '../hooks/usePagination/pagination.types';

export const useInscriptionsByCollectionId = (id: number, pagination: TPagination) => {
  return useQuery({
    queryKey: ['inscriptions', id, pagination.offset, pagination.offset + pagination.limit],
    queryFn: async () => getInscriptionsByCollectionId(id, pagination),
    select: ({ data }) => data || [],
    enabled: !!id,
    placeholderData: keepPreviousData
  });
};
