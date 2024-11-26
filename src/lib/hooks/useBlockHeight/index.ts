import { create } from 'zustand';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ONE_SECOND } from '@/lib/constants';
import { fetchBlockHeight } from '@/lib/services';
import { BlockHeightState } from '@/types';

const useBlockHeightState = create<BlockHeightState>()((set, get) => ({
  tip: 0,
  setTip: (tip: number) => set({ tip })
}));

export const useBlockHeight = () => {
  const queryResult = useQuery({
    queryKey: ['blockHeight', 'tip'],
    queryFn: fetchBlockHeight,
    initialData: 0,
    select: (data) => (data ? data : 0),
    placeholderData: keepPreviousData,
    refetchInterval: 20 * ONE_SECOND.as('milliseconds') // 20 seconds
  });

  const blockHeightState = useBlockHeightState();

  return { ...queryResult, ...blockHeightState };
};
