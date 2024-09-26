import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: 'Inscription ID is required' }, { status: 400 });
  }

  const response = await fetch(`${process.env.ORDINALSBOT_EXPLORER_URL}/inscription/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch inscription details' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
