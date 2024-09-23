import supabase from '../';
export const getArtist = async (slug: string) =>
  supabase
    .from('artists')
    .select(
      `
      *,
      collections: collections (
          name
        )`
    )
    .eq('slug', slug);

export const getFeaturedArtists = async () =>
  supabase.from('artists').select('*').order('feature_rank', { ascending: true }).limit(4);
