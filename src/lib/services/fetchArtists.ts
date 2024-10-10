import { useQuery } from '@tanstack/react-query';
import { getArtistBySlug, getArtists } from '../supabase/artists';
import { TPagination } from '../hooks/usePagination/pagination.types';

export const useRandomArtistsQuery = (pagination: TPagination) => {
  return useQuery({
    queryKey: ['artists', pagination.offset, pagination.limit + pagination.offset],
    queryFn: () => getArtists(pagination),
    select: ({ data }) => (data && data) || null
  });
};
