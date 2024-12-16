import { NextResponse } from 'next/server';
import createClient from '..';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types';

let supabaseClient: SupabaseClient<Database>;

const getFeeRates = async () => supabaseClient.rpc('get_latest_fee_rate');

export async function GET() {
  try {
    supabaseClient = await createClient();
    const feeRates = await getFeeRates();

    const response = NextResponse.json(feeRates);
    response.headers.set('Cache-Control', 'no-store');
    return response;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to fetch fee rates' });
  }
}
