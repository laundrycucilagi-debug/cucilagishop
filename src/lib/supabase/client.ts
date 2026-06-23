import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { getSupabaseConfig } from "@/lib/supabase/config";

let client: SupabaseClient<Database> | null = null;

export function getSupabaseClient() {
  if (client) {
    return client;
  }

  const { url, publishableKey } = getSupabaseConfig();

  client = createClient<Database>(url, publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return client;
}
