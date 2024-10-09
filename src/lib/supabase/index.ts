import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
export * from './collections';
export * from './artists';
export * from './inscriptions';

export default createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
