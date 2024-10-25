import { NextResponse } from 'next/server';
import { firestoreAdmin } from '@/app/api/firebase';

export async function GET() {
  try {
    const priceRef = firestoreAdmin.collection('trio-price');
    const priceSnapshot = await priceRef.orderBy('last_updated', 'desc').limit(1).get();

    if (priceSnapshot.empty) {
      return NextResponse.json({ message: 'No price data available' }, { status: 200 });
    }

    const priceData = priceSnapshot.docs[0].data();

    const response = NextResponse.json(priceData);
    response.headers.set('Cache-Control', 's-maxage=600, stale-while-revalidate');

    return response;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to fetch price data' });
  }
}
