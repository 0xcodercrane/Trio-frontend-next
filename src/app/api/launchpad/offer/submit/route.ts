import { ORDINALSBOT_MARKETPLACE_API_KEY, ORDINALSBOT_MARKETPLACE_API_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { id, signedPsbt } = await req.json();

    if (!id || !signedPsbt) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/launchpads/offers/${id}/submit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ORDINALSBOT_MARKETPLACE_API_KEY
      },
      body: JSON.stringify({ signedPSBT: signedPsbt })
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
      return NextResponse.json({ success: false, error: 'Error confirming buy offer' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.response.data.errors[0].msg || 'An unknown error occurred' });
  }
}
