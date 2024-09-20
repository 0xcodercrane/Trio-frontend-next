import { useQuery } from '@tanstack/react-query';
import { isSuccess } from '../utilities';
import { getArtist } from '../supabase/artists';

export const useArtistQuery = (slug: string) => {
  return useQuery({
    queryKey: ['artist', slug],
    queryFn: () => getArtist(slug),
    enabled: !!slug,
    select: ({ status, data, error }) => {
      if (isSuccess(status)) {
        if (!data) return null;
        return data[0];
      } else {
        if (error) {
          throw new Error(error.message);
        } else {
          throw new Error('Error fetching artist');
        }
      }
    }
  });
};
