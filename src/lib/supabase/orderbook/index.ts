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

const ORDERBOOK_WITH_RUNES_QUERY = `
  *,
  utxos!inner (
    utxo,
    utxo_contents!inner (
      token_balances!inner (
        *,
        runes!inner (*)
      )
    )
  )
`;

const ORDERBOOK_WITH_SPECIAL_RANGES_QUERY = `
  *,
  utxos!inner (
    utxo,
    utxo_contents!inner (
      rare_sat_ranges!inner (*)
    )
  )
`;

const ORDERBOOK_BY_ID = `
  *,
  utxos!inner (
    utxo,
    is_spent,
    utxo_contents (
      utxo_id,
      token_balance_id,
      rare_sat_range_id,
      inscription_id,
      inscriptions (*),
      rare_sat_ranges (*),
      token_balances (
        *,
        runes (*)
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

export const getOrderbookWithRunes = async ({ offset, limit }: TPagination) =>
  supabase
    .from('orderbook')
    .select(ORDERBOOK_WITH_RUNES_QUERY)
    .eq('status', 'active')
    .range(offset, offset + limit - 1);

export const getOrderbookWithSpecialRanges = async ({ offset, limit }: TPagination) =>
  supabase
    .from('orderbook')
    .select(ORDERBOOK_WITH_SPECIAL_RANGES_QUERY)
    .eq('status', 'active')
    .range(offset, offset + limit - 1);

// Gets all orderbook items tied to the address.
export const getOrderbookByAddress = async (address: string) =>
  supabase.rpc('get_orderbook_by_address', { _address: address });

// Returns all orderbook items tied to inscription id -> full listing history
export const getOrderbookByInscriptionId = async (inscriptionId: string) =>
  supabase.rpc('get_orderbook_by_inscription_id', { _inscription_id: inscriptionId });

// Returns all orderbook items tied to inscription id -> full listing history
export const getOrderbookByCollectionSlug = async (collectionSlug: string) =>
  supabase.rpc('get_orderbook_by_collection_slug', { _collection_slug: collectionSlug });

export const getOrderbookById = async (id: number) =>
  supabase.from('orderbook').select(ORDERBOOK_BY_ID).eq('id', id).single();
