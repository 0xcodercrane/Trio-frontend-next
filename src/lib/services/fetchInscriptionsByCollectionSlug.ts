import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { TPagination } from '../hooks/usePagination/pagination.types';
import { getInscriptionsByCollectionId } from '../supabase';
import { getCollectionIdFromSlug } from '../supabase';

export const useInscriptionsByCollectionSlug = (slug: string, pagination: TPagination) => {
  const { data } = useQuery({
    queryKey: ['collectionId', slug],
    queryFn: async () => getCollectionIdFromSlug(slug)
  });

  const collectionId = data?.data?.[0]?.id;

  return useQuery({
    queryKey: ['inscriptions', slug, pagination.offset, pagination.offset + pagination.limit],
    queryFn: async () => getInscriptionsByCollectionId(collectionId!, pagination),
    select: ({ data }) => data || [],
    enabled: !!collectionId,
    placeholderData: keepPreviousData
  });
};
