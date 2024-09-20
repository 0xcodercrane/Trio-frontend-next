import { useQuery } from '@tanstack/react-query';
import { getEntireCollection } from '../supabase';
import { isSuccess } from '../utilities';

export const useCollectionQuery = (slug: string) => {
  return useQuery({
    queryKey: ['collection', slug],
    queryFn: () => getEntireCollection(slug),
    enabled: !!slug,
    select: ({ data }) => (data && data[0]) || null
  });
};
