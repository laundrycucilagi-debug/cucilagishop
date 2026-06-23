import type { Product, ProductStatus } from "@/lib/types";

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getSellingPrice(product: Pick<Product, "price" | "discountPercentage">) {
  if (!product.discountPercentage) {
    return product.price;
  }

  return Math.round(product.price - product.price * (product.discountPercentage / 100));
}

export function getStockStatus(stock: number): ProductStatus {
  if (stock <= 0) {
    return "empty";
  }

  if (stock <= 10) {
    return "limited";
  }

  return "available";
}

export function getStockStatusLabel(status: ProductStatus) {
  const labels: Record<ProductStatus, string> = {
    available: "Tersedia",
    limited: "Stok Terbatas",
    empty: "Habis",
  };

  return labels[status];
}

export function getDiscountValue(product: Pick<Product, "price" | "discountPercentage">) {
  return product.price - getSellingPrice(product);
}
