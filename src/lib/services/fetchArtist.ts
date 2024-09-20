import { useQuery } from '@tanstack/react-query';
import { isSuccess } from '../utilities';
import { getArtist } from '../supabase/artists';

export const useArtistQuery = (id: string) => {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: async () => {
      const { data, status, error } = await getArtist(id);
      if (isSuccess(status) && data) {
        return data[0];
      }
    }
  });
};
