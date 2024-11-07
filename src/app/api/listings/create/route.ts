import { ORDINALSBOT_API_URL, ORDINALSBOT_API_KEY } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { makerPaymentAddress, makerPaymentPublicKey, makerOrdinalPublicKey, utxos } = await req.json();

    if (!makerPaymentAddress || !makerPaymentPublicKey || !makerOrdinalPublicKey || !utxos) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_API_URL}/listings/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_API_KEY}`
      },
      body: JSON.stringify({
        makerPaymentAddress,
        makerPaymentPublicKey,
        makerOrdinalPublicKey,
        utxos
      })
    });

    if (!response.ok) {
      console.error(await response.text());
      return NextResponse.json({ error: 'Failed to create listing' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
