import { useQuery } from '@tanstack/react-query';
import { getEntireCollection } from '../supabase';
import { isSuccess } from '../utilities';

export const useCollectionQuery = (slug: string) => {
  return useQuery({
    queryKey: ['collection', slug],
    queryFn: () => getEntireCollection(slug),
    enabled: !!slug,
    select: ({ status, data, error }) => {
      if (isSuccess(status)) {
        if (!data) return null;
        return data[0];
      } else {
        if (error) {
          throw new Error(error.message);
        } else {
          throw new Error('Error fetching collection');
        }
      }
    }
  });
};
