import { ORDINALSBOT_MARKETPLACE_API_KEY, ORDINALSBOT_MARKETPLACE_API_URL } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const { signedPsbt } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/launchpads/psbt/${id}/confirm`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      },
      body: JSON.stringify({ signedPSBT: signedPsbt })
    });

    if (!response.ok) {
      const responseJson = await response.json();
      let errorMsg;
      if (responseJson?.errors.length) {
        errorMsg = responseJson?.errors.map((e: any) => e.msg).join(', ');
      }

      return NextResponse.json(
        { error: errorMsg || 'Something went wrong while signing PSBT' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
