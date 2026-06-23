import type { Product } from "@/lib/types";
import { formatRupiah, getSellingPrice } from "@/lib/format";

export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6285210107054";

export function getWhatsAppUrl(product?: Product) {
  const message = product
    ? [
        "Halo Admin Cucilagi,",
        "",
        "Saya ingin memesan produk berikut:",
        `Nama Produk: ${product.name}`,
        `Harga: ${formatRupiah(getSellingPrice(product))}`,
        "",
        "Mohon informasi stok dan cara pembayarannya.",
        "Terima kasih.",
      ].join("\n")
    : [
        "Halo Admin Cucilagi,",
        "",
        "Saya ingin bertanya tentang produk Cucilagi Shop.",
        "Mohon informasi stok dan cara pemesanannya.",
        "",
        "Terima kasih.",
      ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
