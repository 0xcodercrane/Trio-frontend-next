import { ORDINALSBOT_MARKETPLACE_API_KEY, ORDINALSBOT_MARKETPLACE_API_URL } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: 'Launchpad id is required' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/launchpads/psbt/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      }
    });

    if (!response.ok) {
      const responseJson = await response.json();
      let errorMsg;
      if (responseJson?.errors.length) {
        errorMsg = responseJson?.errors.map((e: any) => e.msg).join(', ');
      }

      return NextResponse.json(
        { error: errorMsg || 'Something went wrong while fetching psbt' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
