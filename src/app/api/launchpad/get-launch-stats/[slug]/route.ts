import { ORDINALSBOT_MARKETPLACE_API_URL, ORDINALSBOT_MARKETPLACE_API_KEY } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/launchpads/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ORDINALSBOT_MARKETPLACE_API_KEY
      },
      cache: 'no-store'
    });

    const data = await response.json();

    if (response.ok) {
      if (data.status === 'error') {
        return NextResponse.json(
          { success: false, error: data.error },
          {
            headers: {
              cache: 'no-store'
            }
          }
        );
      }
      return NextResponse.json({ success: true, payload: data });
    } else {
      return NextResponse.json({ success: false, error: `Error fetching collection stats` });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.response.data.errors[0].msg });
  }
}
