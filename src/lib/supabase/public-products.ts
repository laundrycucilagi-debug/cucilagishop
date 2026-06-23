import { createClient } from "@supabase/supabase-js";
import { products as localProducts } from "@/lib/products";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/database.types";
import type { Product } from "@/lib/types";

export async function getPublicProducts(): Promise<Product[]> {
  let config;
  try {
    config = getSupabaseConfig();
  } catch {
    return localProducts;
  }

  const supabase = createClient<Database>(config.url, config.publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error || !data?.length) {
    console.warn("Supabase products unavailable; using local fallback data.", error?.message);
    return localProducts;
  }

  return data.map(mapProductRow);
}

function mapProductRow(row: Database["public"]["Tables"]["products"]["Row"]): Product {
  return {
    id: row.id,
    slug: toSlug(row.name),
    name: row.name,
    category: row.category,
    description: row.description,
    price: Number(row.price),
    discountPercentage: Number(row.discount_percentage),
    stock: row.stock,
    imageUrl: row.image_url || "/products/deterjen-premium.png",
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
