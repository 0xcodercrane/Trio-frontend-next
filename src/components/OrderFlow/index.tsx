import { useState } from 'react';
import DefaultPane from './DefaultPane';
import PendingPane from './PendingPane';
import CompletePane from './CompletePane';
import { EOrderFlowStates } from '@/types';
import { useOrderFlow } from '@/lib/hooks/useOrderFlow';

const OrderFlowConfig = {
  [EOrderFlowStates.Default]: <DefaultPane />,
  [EOrderFlowStates.Pending]: <PendingPane />,
  [EOrderFlowStates.Complete]: <CompletePane />
};
export default function OrderFlow() {
  const { state } = useOrderFlow();

  return <div className='flex h-full w-full'>{OrderFlowConfig[state]}</div>;
}
