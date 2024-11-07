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

export const getOrderbookById = async (id: number) =>
  supabase.from('orderbook').select(ORDERBOOK_BY_ID).eq('id', id).single();
