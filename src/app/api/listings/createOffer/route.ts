import { ORDINALSBOT_MARKETPLACE_API_KEY, ORDINALSBOT_MARKETPLACE_API_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { id, takerPaymentAddress, takerPaymentPublicKey, takerOrdinalAddress, feeRate } = await req.json();
    if (!id || !takerPaymentAddress || !takerPaymentPublicKey || !takerOrdinalAddress) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/listings/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({
        id,
        takerPaymentAddress,
        takerPaymentPublicKey,
        takerOrdinalAddress,
        feeRate
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
