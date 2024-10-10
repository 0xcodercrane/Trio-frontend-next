import { useQuery } from '@tanstack/react-query';
import { getArtistBySlug } from '../supabase/artists';

export const useArtistQuery = (slug: string) => {
  return useQuery({
    queryKey: ['artist', slug],
    queryFn: () => getArtistBySlug(slug),
    enabled: !!slug,
    select: ({ data }) => (data && data[0]) || null
  });
};
