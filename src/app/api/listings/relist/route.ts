import { ORDINALSBOT_MARKETPLACE_API_URL, ORDINALSBOT_MARKETPLACE_API_KEY } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { makerPaymentAddress, makerPaymentPublicKey, makerOrdinalPublicKey, price, signedPsbt, listingId } =
      await req.json();

    if (!makerPaymentAddress || !makerPaymentPublicKey || !makerOrdinalPublicKey || !price || !listingId || !signedPsbt) {
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
        signedPSBT: signedPsbt,
        price
      })
    });

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
