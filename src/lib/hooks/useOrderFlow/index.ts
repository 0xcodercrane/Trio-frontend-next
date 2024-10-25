import { create } from 'zustand';
import { OrderFlowState, EOrderFlowStates } from '@/types';

export const useOrderFlow = create<OrderFlowState>()((set, get) => ({
  state: EOrderFlowStates.Default,
  setOrderFlowState: (state: EOrderFlowStates) => set({ state }),
  txVirtualSize: 110, // TODO: Update later, now set to 110 just as a placeholder.
  setTxVirtualSize: (txVirtualSize) => set({ txVirtualSize })
}));
