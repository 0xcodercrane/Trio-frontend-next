import { useAddressFromId, useOrderbookByInscriptionId, useTradeHistoryByOrderId } from '@/lib/services';
import supabase from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useEffect, useState } from 'react';
import { TEN_SECONDS, ONE_SECOND } from '@/lib/constants';

export const useInscriptionOrder = (inscriptionId: string) => {
  const { data: orders, isPending: isPendingOrderbook } = useOrderbookByInscriptionId(inscriptionId);
  const latestOrder = useMemo(() => orders?.[0], [orders]);

  const { data: tradeHistory, isPending: isPendingTradeHistory } = useTradeHistoryByOrderId(latestOrder?.id);

  // Setting this flag to be able to trigger order flow Completed state.
  const [tradeWasInMempool, setTradeWasInMempool] = useState(false);

  // MEMO: Returns confirmed transaction, if no tx is confirmed yet then return
  //       the one with the highest fee.
  const latestTrade = useMemo(() => {
    if (tradeHistory) {
      const foundConfirmation = tradeHistory.find((trade) => trade.status === 'confirmed');
      const newLatestTrade = foundConfirmation || tradeHistory[0];
      if (newLatestTrade?.status === 'mempool') {
        setTradeWasInMempool(true);
      }
      return newLatestTrade;
    }
  }, [tradeHistory]);

  const queryClient = useQueryClient();
  // Trigger inscription data refetch if the trade got confirmed in realtime.
  useEffect(() => {
    if (tradeWasInMempool && latestTrade?.status === 'confirmed') {
      // Wait for 10s to let explorer catch up with the tx confirmation on chain.
      setTimeout(
        () => queryClient.invalidateQueries({ queryKey: ['inscription-details', inscriptionId] }),
        TEN_SECONDS.as('milliseconds')
      );
    }
  }, [latestTrade?.status, tradeWasInMempool]);

  // Subscribe to changes on trade history and update accordingly -- when tx is confirmed.
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
                // MEMO: Need to check this because sometimes supabase does not contain the trade_history
                //       object before it's in mempool - e.g., when user signs the psbt faster than
                //       supabase client catches up with the trades.
                if (itemIndex >= 0) {
                  const result = [...oldData];
                  result[itemIndex] = newItem;
                  return { data: result };
                } else {
                  // MEMO: Revisit when dealing with sniped trade items.
                  return { data: [newItem, ...oldData] };
                }
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

  const { data: takerOrdinalAddress } = useAddressFromId(latestTrade?.taker_ordinal_address_id);

  return {
    latestOrder,
    latestTrade,
    tradeWasInMempool,
    takerOrdinalAddress,
    isPending: isPendingTradeHistory || isPendingOrderbook
  };
};
