import { ORDINALSBOT_PUBLIC_API_KEY, PUBLIC_API_URL } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const ticker = searchParams.get('ticker') || 'TRIO';

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  const apiUrl = new URL(`${PUBLIC_API_URL}/opi/v1/brc20/get_current_balance_of_wallet`);
  apiUrl.searchParams.append('address', address);
  apiUrl.searchParams.append('ticker', ticker);

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'x-api-key': ORDINALSBOT_PUBLIC_API_KEY
      }
    });

    const data = await response.json();

    if (response.status === 400 && data.error === 'no balance found') {
      // Return 0 balance without an error
      return NextResponse.json({
        error: null,
        result: [{ overall_balance: '0', available_balance: '0', block_height: 0, tick: ticker }]
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching wallet balance:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet balance', details: error }, { status: 500 });
  }
}
