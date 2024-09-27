import supabase from '../';

const COLLECTION_QUERY = `*,
        artist: artists (
          name,
          slug
        ),
        inscriptions: inscriptions!fk_collection_id (
            name,
            file_type,
            inscription_id,
            attributes: attributes (
            value,
            value_type,
            category: attribute_categories (name)
            )
        )`;
export const getEntireCollectionBySlug = async (slug: string) =>
  supabase.from('collections').select(COLLECTION_QUERY).eq('slug', slug);
export const getEntireCollectionById = async (id: number) =>
  supabase.from('collections').select(COLLECTION_QUERY).eq('id', id);

export const getCollectionItem = async (id: string) =>
  supabase
    .from('inscriptions')
    .select(
      `
          *,
          collection: collections!fk_collection_id (
            name,
            slug,
            artist: artists (
              name,
              slug
            )
          ),
          attributes: attributes (
            value,
            value_type,
            category: attribute_categories (name)
          )
        `
    )
    .eq('inscription_id', id);
