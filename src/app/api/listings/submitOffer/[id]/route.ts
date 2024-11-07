import { ORDINALSBOT_API_KEY, ORDINALSBOT_API_URL } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { signedPSBTBase64 } = await request.json();

    if (!signedPSBTBase64) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }
    const response = await fetch(`${ORDINALSBOT_API_URL}/listings/offers/${id}/submit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${ORDINALSBOT_API_KEY}`
      },
      body: JSON.stringify({
        signedPSBTBase64
      })
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to submit offer' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}
