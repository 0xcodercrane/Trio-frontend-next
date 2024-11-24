import { useOrderbookByInscriptionId, useTradeHistoryByOrderId } from '@/lib/services';
import supabase from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useEffect } from 'react';

export const useInscriptionOrder = (inscriptionId: string) => {
  const { data: orders, isPending: isPendingOrderbook } = useOrderbookByInscriptionId(inscriptionId);
  const latestOrder = useMemo(() => orders?.[0], [orders]);

  const { data: tradeHistory, isPending: isPendingTradeHistory } = useTradeHistoryByOrderId(latestOrder?.id);
  // MEMO: Returns confirmed transaction, if no tx is confirmed yet then return
  //       the one with the highest fee.
  const latestTrade = useMemo(() => {
    if (tradeHistory) {
      const foundConfirmation = tradeHistory.find((trade) => trade.status === 'confirmed');
      return foundConfirmation || tradeHistory[0];
    }
  }, [tradeHistory]);

  const queryClient = useQueryClient();

  // Listen to changes on trade history and update accordingly -- when tx is confirmed.
  useEffect(() => {
    let channel = null;
    if (latestOrder?.id) {
      channel = supabase
        .channel(`trade-history-orderId-${latestOrder.id}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'trade_history',
            filter: `order_id=eq.${latestOrder.id}`
          },
          (payload) => {
            const newItem = payload.new;
            queryClient.setQueryData(
              ['trade-history-by-order-id', latestOrder.id],
              ({ data: oldData }: { data: Array<any> }) => {
                const itemIndex = oldData.findIndex((item) => item.id === newItem.id);
                const result = [...oldData];
                result[itemIndex] = newItem;
                return { data: result };
              }
            );
          }
        )
        .subscribe();
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [supabase, latestOrder]);
  console.log('lo', latestOrder, 'lt', latestTrade, 't', tradeHistory, 'o', orders);

  return { latestOrder, latestTrade, isPending: isPendingTradeHistory || isPendingOrderbook };
};
