import { useQuery } from '@tanstack/react-query';

const fetchBlockHeight = async () => {
  console.log('Fetching block height from /api/blockHeight...');
  try {
    const response = await fetch('/api/blockHeight');

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || typeof data !== 'number') {
      throw new Error('Invalid response format. Expected a number.');
    }

    return data; // The valid block height
  } catch (e: any) {
    console.error('Error in fetchBlockHeight:', e.message);
    throw new Error('Failed to fetch block height.'); // Bubble up for React Query
  }
};

export const useBlockHeight = () => {
  return useQuery({
    queryKey: ['blockHeight'],
    queryFn: fetchBlockHeight,
    select: (data) => (data ? data : 0)
  });
};
