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
