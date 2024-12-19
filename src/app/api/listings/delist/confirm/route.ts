import { ORDINALSBOT_MARKETPLACE_API_URL, ORDINALSBOT_MARKETPLACE_API_KEY } from '@/lib/constants';
import { parseMarketplaceApiError } from '@/lib/utilities';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const { signedPSBT, listingId, makerPaymentAddress } = await req.json();

    if (!signedPSBT || !listingId || !makerPaymentAddress) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }
    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/listings/${listingId}/confirm-delist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({
        signedPSBT,
        makerPaymentAddress
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
