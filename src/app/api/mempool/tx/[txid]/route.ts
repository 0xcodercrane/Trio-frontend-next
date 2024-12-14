import { MEMPOOL_URL, ORDINALSBOT_PUBLIC_API_KEY } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest, context: { params: { txid: string } }) {
  const { txid } = context.params;

  if (!txid) {
    return NextResponse.json({ error: 'txid is required' }, { status: 400 });
  }

  const apiUrl = new URL(`${MEMPOOL_URL}/api/tx/${txid}`);
  apiUrl.searchParams.append('txid', txid);

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'x-api-key': ORDINALSBOT_PUBLIC_API_KEY
      }
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching mempool tx:', error);
    return NextResponse.json({ error: 'Failed to tx from mempool', details: error }, { status: 500 });
  }
}
