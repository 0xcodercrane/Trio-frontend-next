import { create } from 'zustand';
import { OrderFlowState, EOrderFlowStates } from '@/types';

export const useOrderFlow = create<OrderFlowState>()((set) => ({
  state: EOrderFlowStates.Default,
  setOrderFlowState: (state: EOrderFlowStates) => set({ state }),
  txId: null,
  setTxId: (txId) => set({ txId })
}));
