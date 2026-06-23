import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { DiscountBadge, StockBadge } from "@/components/public/badges";
import { formatRupiah, getSellingPrice, getStockStatus } from "@/lib/format";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const sellingPrice = getSellingPrice(product);
  const hasDiscount = product.discountPercentage > 0;
  const stockStatus = getStockStatus(product.stock);
  const isEmpty = stockStatus === "empty";

  return (
    <article className="flex h-full flex-col rounded-[20px] border border-black/10 bg-white p-2.5 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-strong sm:p-3.5 lg:p-[22px]">
      <div className="relative mb-3 aspect-video overflow-hidden rounded-[14px] bg-light-gray sm:mb-4 lg:rounded-[18px]">
        <Image
          src={product.imageUrl}
          alt={`Foto ${product.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2">
        <DiscountBadge
          percentage={product.discountPercentage}
          className="px-1.5 py-0.5 text-[0.48rem] leading-none sm:px-2 sm:text-[0.62rem] lg:px-3 lg:py-1 lg:text-[0.72rem]"
        />
        <StockBadge
          status={stockStatus}
          className="px-1.5 py-0.5 text-[0.48rem] leading-none sm:px-2 sm:text-[0.62rem] lg:px-3 lg:py-1 lg:text-[0.72rem]"
        />
      </div>

      <p className="mt-2 line-clamp-1 text-[0.5rem] font-black uppercase leading-none tracking-[0.08em] text-primary sm:text-[0.62rem] lg:mt-4 lg:text-[0.72rem]">
        {product.category}
      </p>

      <h3 className="mt-1 line-clamp-2 min-h-[2.4em] break-words font-heading text-[0.78rem] font-black leading-[1.2] text-black sm:text-[0.9rem] lg:mt-2 lg:text-[1.18rem]">
        {product.name}
      </h3>

      <p className="mt-1 line-clamp-2 min-h-[2.8em] text-[0.68rem] leading-[1.4] text-muted-text sm:text-[0.76rem] lg:mt-2 lg:min-h-[3em] lg:text-base lg:leading-[1.5]">
        {product.description}
      </p>

      <div className="mt-2 lg:mt-4">
        {hasDiscount ? (
          <p className="text-[0.64rem] font-bold leading-none text-muted-text line-through sm:text-xs lg:text-sm">{formatRupiah(product.price)}</p>
        ) : null}
        <p className="mt-0.5 truncate font-heading text-[0.86rem] font-black leading-tight text-black sm:text-base lg:text-xl">
          {formatRupiah(sellingPrice)}
        </p>
        <p className="mt-1 text-[0.58rem] font-black uppercase leading-none text-muted-text sm:text-[0.68rem] lg:text-xs">
          Stok {product.stock}
        </p>
      </div>

      <div className="mt-auto w-full pt-3 lg:pt-[18px]">
        {isEmpty ? (
          <span className="inline-flex min-h-8 w-full items-center justify-center rounded-full bg-slate-200 px-2 text-[0.58rem] font-black text-muted-text sm:min-h-9 sm:text-[0.68rem] lg:min-h-10 lg:px-3.5 lg:text-[0.88rem]">
            Habis
          </span>
        ) : (
          <a
            href={getWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pesan ${product.name} melalui WhatsApp`}
            className="inline-flex min-h-8 w-full items-center justify-center gap-1 whitespace-nowrap rounded-full bg-primary px-1.5 text-[0.52rem] font-black text-black transition hover:bg-primary-dark sm:min-h-9 sm:px-2 sm:text-[0.68rem] lg:min-h-10 lg:px-3.5 lg:text-[0.88rem]"
          >
            <ShoppingCart className="size-3 lg:size-4" aria-hidden="true" />
            Beli Sekarang
          </a>
        )}
      </div>
    </article>
  );
}
