import { ORDINALSBOT_MARKETPLACE_API_URL, ORDINALSBOT_MARKETPLACE_API_KEY } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: { launchpadId: number; address: string } }) {
  try {
    const { launchpadId, address } = params;

    if (!launchpadId || !address) {
      return NextResponse.json({ error: 'Invalid request params' }, { status: 400 });
    }

    const response = await fetch(`${ORDINALSBOT_MARKETPLACE_API_URL}/launchpads/${launchpadId}/allocation/${address}`, {
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
        return NextResponse.json({ success: false, error: data.error });
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
      return NextResponse.json({
        success: false,
        error: `Error fetching allocation info for launchpad ${launchpadId} address ${address}`
      });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.response.data.errors[0].msg });
  }
}
