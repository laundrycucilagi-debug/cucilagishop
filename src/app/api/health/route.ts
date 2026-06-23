import { NextResponse } from "next/server";

export function GET() {
  const databaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return NextResponse.json({
    status: "ok",
    app: "cucilagi-shop",
    mode: databaseConfigured ? "supabase" : "local-fallback",
    databaseConfigured,
    stack: {
      frontend: "Next.js 15",
      backend: "Supabase",
      database: "PostgreSQL",
    },
    timestamp: new Date().toISOString(),
  });
}
