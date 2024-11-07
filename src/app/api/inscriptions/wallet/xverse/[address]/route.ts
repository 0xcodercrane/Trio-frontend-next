import { NETWORK } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    const xverseOrdinalApi =
      NETWORK == 'mainnet' ? 'https://api-3.xverse.app/v1/address' : 'https://api-testnet.xverse.app/v1/address';
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || 50;
    const offset = searchParams.get('offset') || 0;

    const address = params.address;
    if (!address) {
      throw new Error('Ordinals address is required');
    }

    const url = `${xverseOrdinalApi}/${address}/ordinals/collections?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch inscriptions list' }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
  }
}
