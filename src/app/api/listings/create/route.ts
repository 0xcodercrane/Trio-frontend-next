import { ORDINALSBOT_MARKETPLACE_API_URL, ORDINALSBOT_MARKETPLACE_API_KEY } from '@/lib/constants';
import { parseMarketplaceApiError } from '@/lib/utilities';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { makerPaymentAddress, makerPaymentPublicKey, makerOrdinalPublicKey, makerOrdinalAddress, utxos } =
      await req.json();

    if (!makerPaymentAddress || !makerPaymentPublicKey || !makerOrdinalPublicKey || !makerOrdinalAddress || !utxos) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/listings/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({
        makerPaymentAddress,
        makerPaymentPublicKey,
        makerOrdinalPublicKey,
        makerOrdinalAddress,
        utxos
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: await parseMarketplaceApiError(response) }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
