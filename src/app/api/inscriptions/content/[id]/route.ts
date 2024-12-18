import { EXPLORER_URL } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'Inscription ID is required' }, { status: 400 });
  }

  // Fetch the content from the external API
  const response = await fetch(`${EXPLORER_URL}/content/${id}`, {
    headers: {
      Accept: '*/*' // Accept any content type
    },
    cache: 'no-store',
    next: {
      tags: [`inscriptions-content-${id}`]
    }
  });

  // response.headers.set(
  //   'Cache-Control',
  //   `s-maxage=${INSCRIPTIONS_CONTENT_CACHE_AGE.as('seconds')}, stale-while-revalidate, stale-if-error`
  // );

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch inscription content' }, { status: response.status });
  }

  // Extract content type from the response headers
  const contentType = response.headers.get('Content-Type') || '';

  // Handle text-based content
  if (contentType.includes('text/') || contentType.includes('application/json') || contentType.includes('image/svg+xml')) {
    const textData = await response.text();
    return NextResponse.json({ content: textData, contentType });
  }

  // Handle binary data (blob) content
  const blobData = await response.blob();
  const buffer = await blobData.arrayBuffer();
  return new NextResponse(Buffer.from(buffer), {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${id}"`
    }
  });
}
