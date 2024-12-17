import { ORDINALSBOT_MARKETPLACE_API_URL, ORDINALSBOT_MARKETPLACE_API_KEY } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { id, takerOrdinalAddress, takerPaymentAddress, takerPaymentPublicKey, feeRate } = await req.json();

    if (!id || !takerOrdinalAddress || !takerPaymentAddress || !takerPaymentPublicKey || !feeRate) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/launchpads/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ORDINALSBOT_MARKETPLACE_API_KEY
      },
      body: JSON.stringify({ id, takerOrdinalAddress, takerPaymentAddress, takerPaymentPublicKey, feeRate })
    });

    const data = await response.json();

    if (response.ok) {
      if (data.status === 'error') {
        return NextResponse.json({ success: false, error: data.message });
      }
      return NextResponse.json(
        { success: true, payload: data },
        {
          headers: {
            cache: 'no-store'
          }
        }
      );
    } else {
      console.log('------ Detailed Error');
      console.error(data);
      return NextResponse.json({ success: false, error: 'Error creating buy offer' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.response.data.errors[0].msg || 'An unknown error occurred' });
  }
}
