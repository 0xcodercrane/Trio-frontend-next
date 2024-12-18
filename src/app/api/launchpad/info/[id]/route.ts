import { ORDINALSBOT_MARKETPLACE_API_KEY, ORDINALSBOT_MARKETPLACE_API_URL } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: 'Launchpad id is required' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/launchpads/${id}?timestamp=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_MARKETPLACE_API_KEY}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const responseJson = await response.json();
      let errorMsg;
      if (responseJson?.errors.length) {
        errorMsg = responseJson?.errors.map((e: any) => e.msg).join(', ');
      }

      return NextResponse.json(
        { error: errorMsg || 'Something went wrong while fetching collection info' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        cache: 'no-store'
      }
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
