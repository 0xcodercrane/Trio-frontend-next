export enum EOrderFlowStates {
  Default = 'default',
  Pending = 'pending',
  Complete = 'complete'
}
export interface OrderFlowState {
  state: EOrderFlowStates;
  setOrderFlowState: (state: EOrderFlowStates) => void;
}
