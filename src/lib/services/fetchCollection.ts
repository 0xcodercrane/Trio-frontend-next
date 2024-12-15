import { useQuery } from '@tanstack/react-query';
import { getEntireCollectionBySlug, getEntireCollectionById, getCollectionStats } from '../supabase';

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

export const useCollectionStats = (slug: string) => {
  return useQuery({
    queryKey: ['collection-stats', slug],
    queryFn: () => getCollectionStats(slug),
    enabled: !!slug,
    select: ({ data }) => (data && data[0]) || null
  });
};
