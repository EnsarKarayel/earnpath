import { createBrowserSupabaseClient, requireEnv } from "@earnpath/db";

export function createSupabaseBrowserClient() {
  return createBrowserSupabaseClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

