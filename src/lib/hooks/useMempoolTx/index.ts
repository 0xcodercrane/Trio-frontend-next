import { ONE_SECOND } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

const fetchMempoolTx = async (txid: string) => {
  try {
    const response = await fetch(`/api/mempool/tx/${txid}`);

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return data; // The Mempool TX
  } catch (e: any) {
    console.error('Error in fetching tx from mempool:', e.message);
    throw new Error('Failed to fetch tx from mempool.'); // Bubble up for React Query
  }
};

export const useMempoolTx = (txid: string) => {
  return useQuery({
    queryKey: ['mempool', 'tx', txid],
    queryFn: () => fetchMempoolTx(txid),
    refetchInterval: 20 * ONE_SECOND.toMillis()
  });
};
