import { NextResponse } from 'next/server';
import { FxRateResponse } from '@/types';
import { PUBLIC_API_URL } from '@/lib/constants';

const fetchBitcoinPrice = async () => {
  try {
    const prices: FxRateResponse = await (await fetch(`${PUBLIC_API_URL}/fxrate`)).json();
    return prices;
  } catch (e) {
    throw new Error('Fetching BTC price from OrdinalsBot API failed.');
  }
};

export async function GET() {
  try {
    const prices = await fetchBitcoinPrice();

    const response = NextResponse.json(prices);
    response.headers.set('Cache-Control', 'no-store');

    return response;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to fetch price data' });
  }
}
