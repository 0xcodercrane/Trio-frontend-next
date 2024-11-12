import { ORDINALSBOT_API_KEY, ORDINALSBOT_API_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { id, takerPaymentAddress, takerPaymentPublicKey, takerOrdinalAddress, utxos, feeRate } = await req.json();

    if (!id || !takerPaymentAddress || !takerPaymentPublicKey || !takerOrdinalAddress) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }
    const response = await fetch(`${ORDINALSBOT_API_URL}/listings/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_API_KEY}`
      },
      body: JSON.stringify({
        id,
        takerPaymentAddress,
        takerPaymentPublicKey,
        takerOrdinalAddress,
        feeRate
      })
    });

    if (!response.ok) {
      console.error(await response.text());
      return NextResponse.json({ error: 'Failed to create offer' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
