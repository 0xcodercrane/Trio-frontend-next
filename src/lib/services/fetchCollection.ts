import { useQuery } from '@tanstack/react-query';
import { getEntireCollection } from '../supabase';
import { isSuccess } from '../utilities';

export const useCollectionQuery = (slug: string) => {
  return useQuery({
    queryKey: ['collection', slug],
    queryFn: async () => {
      const { data, status } = await getEntireCollection(slug);
      if (isSuccess(status) && data) {
        return data[0];
      }
    }
  });
};
