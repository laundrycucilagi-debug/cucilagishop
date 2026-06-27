import type { AuthenticatedUser } from "@/lib/auth/session";
import { getSupabaseConfig } from "@/lib/supabase/config";

export type BackupPayload = {
  generatedAt: string;
  generatedBy: string;
  tables: {
    products: Array<Record<string, unknown>>;
    sales: Array<Record<string, unknown>>;
    stock_histories: Array<Record<string, unknown>>;
  };
};

export async function getBackupPayload(user: AuthenticatedUser): Promise<BackupPayload> {
  const [products, sales, stockHistories] = await Promise.all([
    fetchTable("products"),
    fetchTable("sales"),
    fetchTable("stock_histories"),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    generatedBy: user.email,
    tables: {
      products,
      sales,
      stock_histories: stockHistories,
    },
  };
}

async function fetchTable(table: string) {
  const { url } = getSupabaseConfig();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for admin backup");
  }

  const response = await fetch(`${url}/rest/v1/${table}?select=*&order=created_at.asc`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to read backup table: ${table}`);
  }

  return (await response.json()) as Array<Record<string, unknown>>;
}
