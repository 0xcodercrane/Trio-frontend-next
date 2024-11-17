import { useQuery } from '@tanstack/react-query';
import { getInscriptionWithCollectionData } from '../supabase';

export const useInscriptionWithCollectionData = (id: string) => {
  return useQuery({
    queryKey: ['inscription-with-collection-data', id],
    queryFn: () => getInscriptionWithCollectionData(id),
    enabled: !!id,
    select: ({ data }) => (data && data[0]) || null
  });
};
