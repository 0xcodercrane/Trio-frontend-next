import supabase from '..';

export const getTradeHistoryByOrderId = (orderId: number) =>
  supabase.rpc('get_trade_history_by_order_id', { _order_id: orderId });
