import { keepPreviousData, useQuery } from '@tanstack/react-query';

const fetchBlockHeight = async () => {
  try {
    return (await fetch('/api/blockHeight')).json();
  } catch (e) {
    throw new Error('Failed to fetch block height.');
  }
};

export const useBlockHeight = () =>
  useQuery({
    queryKey: ['blockHeight'],
    queryFn: fetchBlockHeight,
    initialData: 0,
    select: (data) => (data ? data : 0),
    placeholderData: keepPreviousData
  });
