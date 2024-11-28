import { MEMPOOL_URL, ORDINALSBOT_PUBLIC_API_KEY } from '../constants';

export const fetchBlockHeight = async () => {
  const response = await fetch(`${MEMPOOL_URL}/api/blocks/tip/height`, {
    headers: {
      'x-api-key': ORDINALSBOT_PUBLIC_API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch block height');
  }

  return response.json();
};
