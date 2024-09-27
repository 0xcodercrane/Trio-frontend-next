import { useQuery } from '@tanstack/react-query';
import { getCollectionItem } from '../supabase';

export const useCollectionItemQuery = (slug: string, id: string) => {
  return useQuery({
    queryKey: ['collection', slug, id],
    queryFn: () => getCollectionItem(id),
    enabled: !!slug && !!id,
    select: ({ data }) => (data && data[0]) || null
  });
};
