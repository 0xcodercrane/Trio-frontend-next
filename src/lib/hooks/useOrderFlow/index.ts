import { create } from 'zustand';
import { OrderFlowState, EOrderFlowStates } from '@/types';

export const useOrderFlow = create<OrderFlowState>()((set, get) => ({
  state: EOrderFlowStates.Default,
  setOrderFlowState: (state: EOrderFlowStates) => set({ state })
}));
