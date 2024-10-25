import { NextResponse } from 'next/server';
import createClient from '..';
import { unstable_cache } from 'next/cache';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types';

// MEMO: Cache result on server for 30 seconds before firing out next db query
let supabaseClient: SupabaseClient<Database>;

const getFeeRates = unstable_cache(
  async () => supabaseClient.from('fee_rates').select().order('ts', { ascending: false }).limit(1),
  ['fee-rates'],
  {
    revalidate: 30 // 30 seconds
  }
);

export async function GET() {
  try {
    supabaseClient = await createClient();
    const feeRates = await getFeeRates();

    const response = NextResponse.json(feeRates);
    response.headers.set('Cache-Control', 's-maxage=20, stale-while-revalidate');
    return response;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to fetch fee rates' });
  }
}
