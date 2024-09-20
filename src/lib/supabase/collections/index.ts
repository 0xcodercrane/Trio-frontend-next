import supabase from '../';
export const getEntireCollection = async (slug: string) =>
  supabase
    .from('collections')
    .select(
      `
        *,
        artist: artists (
          name,
          slug
        ),
        inscriptions: inscriptions (
            name,
            file_type,
            inscription_id,
            attributes: attributes (
            value,
            value_type,
            category: attribute_categories (name)
            )
        )
        `
    )
    .eq('slug', slug);
