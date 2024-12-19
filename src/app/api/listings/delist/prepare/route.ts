import { ORDINALSBOT_MARKETPLACE_API_URL, ORDINALSBOT_MARKETPLACE_API_KEY } from '@/lib/constants';
import { parseMarketplaceApiError } from '@/lib/utilities';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const { makerPaymentAddress, makerPaymentPublicKey, listingId } = await req.json();

    if (!makerPaymentAddress || !makerPaymentPublicKey || !listingId) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/listings/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({
        makerPaymentAddress,
        makerPaymentPublicKey
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: await parseMarketplaceApiError(response) }, { status: response.status });
    }

    const { psbtBase64 } = await response.json();
    return NextResponse.json(psbtBase64);
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
