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

export const getTradeHistoryByOrderId = (orderId: number) =>
  supabase.rpc('get_trade_history_by_order_id', { _order_id: orderId });

export const getLatestTrades = (interval: string, slug: string | undefined, limit = 100) =>
  supabase.rpc('fetch_activity', { want_interval: interval, want_slug: slug }).limit(limit);
