import { MEMPOOL_URL } from '../constants';

export const fetchBlockHeight = async () => {
  const response = await fetch(`${MEMPOOL_URL}/api/blocks/tip/height`);

  if (!response.ok) {
    throw new Error('Failed to fetch block height');
  }

  return response.json();
};
