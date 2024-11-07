import { useQuery } from '@tanstack/react-query';
import { getEntireCollectionBySlug, getEntireCollectionById, getCollectionsWithOrderbooks } from '../supabase';
import { TPagination } from '../hooks/usePagination/pagination.types';

export const useCollectionBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ['collection', slug],
    queryFn: () => getEntireCollectionBySlug(slug),
    enabled: !!slug,
    select: ({ data }) => (data && data[0]) || null
  });
};

export const useCollectionByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => getEntireCollectionById(id),
    enabled: !!id,
    select: ({ data }) => (data && data[0]) || null
  });
};

export const useCollectionsWithOrderbookQuery = ({ offset, limit }: TPagination) => {
  return useQuery({
    queryKey: ['collections-with-orderbook', offset, limit + offset],
    queryFn: async () => await getCollectionsWithOrderbooks({ offset, limit }),
    select: ({ data }) => (data && data) || []
  });
};
