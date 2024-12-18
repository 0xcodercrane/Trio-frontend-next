import { EXPLORER_URL } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

// MEMO: Caching disabled -> when item is purchased cache needs to be invalidated,
//       to be implemented later.
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'Inscription ID is required' }, { status: 400 });
  }

  const response = await fetch(`${EXPLORER_URL}/inscription/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    cache: 'no-store',
    next: {
      tags: [`inscriptions-details-${id}`]
      // revalidate: INSCRIPTIONS_DETAILS_CACHE_AGE.as('seconds')
    }
  });

  // response.headers.set(
  //   'Cache-Control',
  //   `s-maxage=${INSCRIPTIONS_DETAILS_CACHE_AGE.as('seconds')}, stale-while-revalidate, stale-if-error`
  // );

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch inscription details' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
