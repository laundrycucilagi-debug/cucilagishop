import type { AdminIdentity } from "@/lib/auth/verify-admin";
import { getSupabaseConfig } from "@/lib/supabase/config";

export type BackupPayload = {
  generatedAt: string;
  generatedBy: string;
  tables: {
    products: Array<Record<string, unknown>>;
    sales: Array<Record<string, unknown>>;
    stock_histories: Array<Record<string, unknown>>;
    admin_users: Array<Record<string, unknown>>;
  };
};

export async function getBackupPayload(admin: AdminIdentity): Promise<BackupPayload> {
  const [products, sales, stockHistories, adminUsers] = await Promise.all([
    fetchTable("products", admin.accessToken),
    fetchTable("sales", admin.accessToken),
    fetchTable("stock_histories", admin.accessToken),
    fetchTable("admin_users", admin.accessToken),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    generatedBy: admin.email,
    tables: {
      products,
      sales,
      stock_histories: stockHistories,
      admin_users: adminUsers,
    },
  };
}

async function fetchTable(table: string, accessToken: string) {
  const { url, publishableKey } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${table}?select=*&order=created_at.asc`, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to read backup table: ${table}`);
  }

  return (await response.json()) as Array<Record<string, unknown>>;
}
