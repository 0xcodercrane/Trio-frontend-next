import { ORDINALSBOT_PUBLIC_API_KEY, PUBLIC_API_URL } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    searchParams.append('excludeCommonRanges', 'true');

    const response = await fetch(`${PUBLIC_API_URL}/satscanner/find-special-ranges?${searchParams.toString()}`, {
      cache: 'no-store',
      headers: {
        'x-api-key': ORDINALSBOT_PUBLIC_API_KEY
      }
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'Failed to fetch inscriptions in wallet.' });
    }
    const payload = await response.json();

    return NextResponse.json({
      success: true,
      payload: payload.result.inscriptions.map(({ inscriptions: [inscription] }: any) => inscription)
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
