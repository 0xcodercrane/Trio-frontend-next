import { MARKETPLACE_API_KEY, MARKETPLACE_API_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { address, publicKey, feeRate } = await req.json();
    const response = await fetch(`${MARKETPLACE_API_URL}/inscriptions/setup-padding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({ address, publicKey, numOfOutPuts: 3, feeRate })
    });
    if (!response.ok) {
      console.error(await response.text());
      return NextResponse.json({ success: false, error: `Error setting up padding outputs for ${address}` });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, payload: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.toString() });
  }
}
