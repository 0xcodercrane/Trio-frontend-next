import { TPagination } from '@/lib/hooks/usePagination/pagination.types';
import supabase from '../';

const TRADE_HISTORIES = `
  *,
  orderbook:orderbook!order_id (*),
  taker_payment:addresses!taker_payment_address_id (*),
  taker_ordinal:addresses!taker_ordinal_address_id (*)
`;

export const getTradeHistories = async ({ offset, limit }: TPagination) =>
  supabase
    .from('trade_history')
    .select(TRADE_HISTORIES)
    .order('timestamp', { ascending: false })
    .range(offset, offset + limit - 1);

export const getTradeHistoryById = async (id: number) =>
  supabase.from('trade_history').select(TRADE_HISTORIES).eq('id', id).single();
