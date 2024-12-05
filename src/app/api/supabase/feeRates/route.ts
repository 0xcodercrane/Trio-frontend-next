import { NextResponse } from 'next/server';
import createClient from '..';
import { unstable_cache } from 'next/cache';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types';
import { FEE_RATES_CACHE_AGE } from '@/lib/constants';

// MEMO: Cache result on server for 30 seconds before firing out next db query
let supabaseClient: SupabaseClient<Database>;

const getFeeRates = unstable_cache(async () => supabaseClient.rpc('get_latest_fee_rate'), ['fee-rates'], {
  revalidate: FEE_RATES_CACHE_AGE.as('seconds')
});

export async function GET() {
  try {
    supabaseClient = await createClient();
    const feeRates = await getFeeRates();

    const response = NextResponse.json(feeRates);
    response.headers.set('Cache-Control', `s-maxage=${FEE_RATES_CACHE_AGE.as('seconds')}, stale-while-revalidate`);
    return response;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to fetch fee rates' });
  }
}
