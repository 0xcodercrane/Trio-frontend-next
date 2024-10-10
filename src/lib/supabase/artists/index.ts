import { TPagination } from '@/lib/hooks/usePagination/pagination.types';
import supabase from '../';
export const getArtistBySlug = async (slug: string) =>
  supabase
    .from('artists')
    .select(
      `
      *,
      collections: collections (
          name,
          inscriptions: inscriptions!fk_collection_id (
            inscription_id
          )
        )`
    )
    .eq('slug', slug);

export const getArtists = async (paginate: TPagination) => {
  return supabase
    .from('artists')
    .select('*, collections: collections!fk_artist_id (name, inscriptions: inscriptions!fk_collection_id (inscription_id))')
    .range(paginate.offset, paginate.offset + paginate.limit - 1);
};

export const getFeaturedArtists = async () =>
  supabase.from('artists').select('*').order('feature_rank', { ascending: true }).limit(4);
