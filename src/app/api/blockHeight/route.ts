import { MEMPOOL_URL, ORDINALSBOT_PUBLIC_API_KEY } from '@/lib/constants';
import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

const CACHING_PERIOD_SECONDS = 600;
const fetchBlockHeight = unstable_cache(
  async () => {
    try {
      const blockHeight = await (
        await fetch(`${MEMPOOL_URL}/api/blocks/tip/height`, {
          headers: {
            'x-api-key': ORDINALSBOT_PUBLIC_API_KEY
          }
        })
      ).json();
      return blockHeight;
    } catch (e) {
      throw new Error('Fetching block height from OrdinalsBot API failed.');
    }
  },
  ['blockHeight'],
  { revalidate: CACHING_PERIOD_SECONDS }
);

export async function GET() {
  try {
    const blockHeight = await fetchBlockHeight();
    const response = NextResponse.json(blockHeight);
    response.headers.set('Cache-Control', `s-maxage=${CACHING_PERIOD_SECONDS}, stale-while-revalidate`);

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch block height' });
  }
}
