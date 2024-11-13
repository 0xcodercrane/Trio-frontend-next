import { MARKETPLACE_API_KEY, MARKETPLACE_API_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    const response = await fetch(`${MARKETPLACE_API_URL}/inscriptions/confirm-padding`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({ address })
    });
    if (!response.ok) {
      console.error(await response.text());
      return NextResponse.json({ success: false, error: 'Failed to check padding outputs.' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, payload: data });
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
