import { TPagination } from '@/lib/hooks/usePagination/pagination.types';
import supabase from '../';

const COLLECTION_QUERY = `
  *,
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

const COLLECTION_ITEM_QUERY = `
  *,
  collection: collections!collection_id (
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
  )`;

const INSCRIPTIONS_BY_COLLECTION_ID_QUERY = `
    *, 
    collection: collections!collection_id (
      name,
      slug
    ),
    attributes: attributes (
      value,
      value_type,
      category: attribute_categories (name)
    )
  `;

export const getEntireCollectionBySlug = async (slug: string) =>
  supabase.from('collections').select(COLLECTION_QUERY).eq('slug', slug);
export const getEntireCollectionById = async (id: number) =>
  supabase.from('collections').select(COLLECTION_QUERY).eq('id', id);

export const getInscriptionsByCollectionId = async (collectionId: number, pagination: TPagination) =>
  supabase
    .from('inscriptions')
    .select(INSCRIPTIONS_BY_COLLECTION_ID_QUERY)
    .eq('collection_id', collectionId)
    .range(pagination.offset, pagination.offset + pagination.limit - 1);

export const getInscriptionsByCollectionSlug = async (slug: string, pagination: TPagination) =>
  supabase
    .from('collections')
    .select(COLLECTION_QUERY)
    .eq('slug', slug)
    .range(pagination.offset, pagination.offset + pagination.limit - 1);

export const getInscriptionWithCollectionData = async (id: string) =>
  supabase.from('inscriptions').select(COLLECTION_ITEM_QUERY).eq('inscription_id', id);

export const getCollectionIdFromSlug = async (slug: string) => supabase.from('collections').select('id').eq('slug', slug);

export const getCollections = async () => supabase.rpc('get_collections'); //.range(pagination.offset, pagination.offset + pagination.limit - 1);
