import { MEMPOOL_URL, ORDINALSBOT_PUBLIC_API_KEY } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const blockHeight = await fetch(`${MEMPOOL_URL}/api/blocks/tip/height`, {
      headers: {
        'x-api-key': ORDINALSBOT_PUBLIC_API_KEY
      },
      cache: 'no-store'
    });
    const response = NextResponse.json(blockHeight);

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('CDN-Cache-Control', 'no-store');
    response.headers.set('Pragma', 'no-cache');

    return response;
  } catch (err: any) {
    console.error('Error in /api/blockHeight:', err.message);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch block height', data: null },
      { status: 500 } // Internal Server Error
    );
  }
}
