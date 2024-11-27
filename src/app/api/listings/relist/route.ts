import { ORDINALSBOT_MARKETPLACE_API_URL, ORDINALSBOT_MARKETPLACE_API_KEY } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { makerPaymentAddress, makerPaymentPublicKey, makerOrdinalPublicKey, price, listingId } = await req.json();

    if (!makerPaymentAddress || !makerPaymentPublicKey || !makerOrdinalPublicKey || !price || !listingId) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/listings/${listingId}/relist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({
        makerPaymentAddress,
        makerPaymentPublicKey,
        makerOrdinalPublicKey,
        price
      })
    });

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: response.status });
    }

    const { psbt } = await response.json();
    return NextResponse.json(psbt);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
