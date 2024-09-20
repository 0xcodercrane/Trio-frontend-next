import { useQuery } from '@tanstack/react-query';
import { isSuccess } from '../utilities';
import { getArtist } from '../supabase/artists';

export const useArtistQuery = (slug: string) => {
  return useQuery({
    queryKey: ['artist', slug],
    queryFn: () => getArtist(slug),
    enabled: !!slug,
    select: ({ data }) => (data && data[0]) || null
  });
};
