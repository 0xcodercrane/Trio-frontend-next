import { TPagination } from '@/lib/hooks/usePagination/pagination.types';
import supabase from '../';

const ORDERBOOK_WITH_INSCRIPTIONS_QUERY = `
  *,
  utxos!inner (
    utxo,
    utxo_contents!inner (
      inscriptions!inner (
        *,
        collection: collections!collection_id (*)
      )
    )
  )
`;

export const getOrderbookWithInscriptions = async ({ offset, limit }: TPagination) =>
  supabase
    .from('orderbook')
    .select(ORDERBOOK_WITH_INSCRIPTIONS_QUERY)
    .eq('status', 'active')
    .range(offset, offset + limit - 1);

// Gets all orderbook items tied to the address.
export const getOrderbookByAddress = async (address: string) =>
  supabase.rpc('get_orderbook_by_address', { _address: address });

// Returns all orderbook items tied to inscription id -> full listing history
export const getOrderbookByInscriptionId = async (inscriptionId: string) =>
  supabase.rpc('get_orderbook_by_inscription_id', { _inscription_id: inscriptionId });

// Returns all inscriptions with prices based on their listings in orderbook.
export const getInscriptionsWithPriceByCollectionSlug = async (collectionSlug: string, { offset, limit }: TPagination) =>
  supabase
    .rpc('get_inscriptions_with_price_by_collection_slug', { _collection_slug: collectionSlug })
    .range(offset, offset + limit - 1);
