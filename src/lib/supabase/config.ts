export function getSupabaseConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !publishableKey) {
    throw new Error("Supabase environment variables are not configured");
  }

  return {
    url: rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, ""),
    publishableKey,
  };
}
