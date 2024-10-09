import { TPagination } from '@/lib/hooks/usePagination/pagination.types';
import supabase from '..';
import { Database } from '@/types/database';

type InscriptionRow = Database['public']['Tables']['inscriptions']['Row'];
type CollectionRow = Pick<Database['public']['Tables']['collections']['Row'], 'name' | 'slug'>;
type AttributeRow = Database['public']['Tables']['attributes']['Row'];
type AttributeCategoryRow = Pick<Database['public']['Tables']['attribute_categories']['Row'], 'name'>;

export type RandomInscriptionRow = InscriptionRow & {
  collection: CollectionRow | null;
  attributes: Array<
    Pick<AttributeRow, 'value' | 'value_type'> & {
      category: Pick<AttributeCategoryRow, 'name'> | null;
    }
  >;
};

const INSCRIPTION_QUERY = `
    *,
    collection: collections!fk_collection_id (
      name,
      slug
    ),
    attributes: attributes (
      value,
      value_type,
      category: attribute_categories (name)
    )
  `;

export const getRandomInscriptions = async ({ offset, limit }: TPagination) =>
  supabase
    .from('inscriptions')
    .select(INSCRIPTION_QUERY)
    .range(offset, offset + limit);
