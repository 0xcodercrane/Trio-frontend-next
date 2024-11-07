import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { FxRateResponse } from '@/types';
import { PUBLIC_API_URL } from '@/lib/constants';

const CACHING_PERIOD_SECONDS = 600;
const fetchBitcoinPrice = unstable_cache(
  async () => {
    try {
      const prices: FxRateResponse = await (await fetch(`${PUBLIC_API_URL}/fxrate`)).json();
      return prices;
    } catch (e) {
      throw new Error('Fetching BTC price from OrdinalsBot API failed.');
    }
  },
  ['prices', 'btc'],
  { revalidate: CACHING_PERIOD_SECONDS }
);

export async function GET() {
  try {
    const prices = await fetchBitcoinPrice();

    const response = NextResponse.json(prices);
    response.headers.set('Cache-Control', `s-maxage=${CACHING_PERIOD_SECONDS}, stale-while-revalidate`);

    return response;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to fetch price data' });
  }
}
