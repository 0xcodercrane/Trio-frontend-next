import { ORDINALSBOT_MARKETPLACE_API_KEY, ORDINALSBOT_MARKETPLACE_API_URL } from '@/lib/constants';
import { parseMarketplaceApiError } from '@/lib/utilities';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/inscriptions/confirm-padding`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({ address }),
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: await parseMarketplaceApiError(response) }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, payload: data });
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
