import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../constants';
export * from './collections';
export * from './artists';
export * from './inscriptions';

export default createClient<Database>(SUPABASE_URL!, SUPABASE_ANON_KEY!);
