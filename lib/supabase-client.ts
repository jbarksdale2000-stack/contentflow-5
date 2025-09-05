import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '../../../lib/supabase-client';
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
