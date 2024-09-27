import { useQuery } from '@tanstack/react-query';
import { getFeaturedArtists } from '../supabase';

export const useFeaturedArtistsQuery = () => {
  return useQuery({
    queryKey: ['featured-artists'],
    queryFn: async () => getFeaturedArtists(),
    select: ({ data }) => data || []
  });
};
