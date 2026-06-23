"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/public/product-card";
import type { Product } from "@/lib/types";

const MOBILE_PAGE_SIZE = 6;
const DESKTOP_PAGE_SIZE = 8;

function getPageSize() {
  if (typeof window === "undefined") {
    return MOBILE_PAGE_SIZE;
  }

  return window.matchMedia("(min-width: 1024px)").matches ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE;
}

export function ProductGrid({ products }: { products: Product[] }) {
  const [pageSize, setPageSize] = useState(MOBILE_PAGE_SIZE);
  const [visibleCount, setVisibleCount] = useState(MOBILE_PAGE_SIZE);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const syncPageSize = () => {
      const nextPageSize = getPageSize();
      setPageSize(nextPageSize);
      setVisibleCount((current) => {
        const safeCurrent = Math.max(current, nextPageSize);
        const pagesShown = Math.max(1, Math.ceil(safeCurrent / nextPageSize));
        return Math.min(products.length, pagesShown * nextPageSize);
      });
    };

    syncPageSize();
    media.addEventListener("change", syncPageSize);

    return () => media.removeEventListener("change", syncPageSize);
  }, [products.length]);

  const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
  const canShowMore = visibleCount < products.length;

  const handleShowMore = () => {
    setVisibleCount((current) => Math.min(products.length, current + pageSize));
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 rounded-[20px] border border-border bg-light-gray px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.06em] text-muted-text sm:mb-5 sm:px-4 sm:text-xs">
        <span>Produk Dilihat</span>
        <span className="text-black">
          {visibleProducts.length} dari {products.length} produk
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {canShowMore ? (
        <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8">
          <p className="text-xs font-bold text-muted-text sm:text-sm">
            Menampilkan {visibleProducts.length} dari {products.length} produk
          </p>
          <button
            type="button"
            onClick={handleShowMore}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.08em] text-primary shadow-card transition hover:-translate-y-0.5 hover:bg-primary hover:text-black sm:px-7 sm:text-sm"
          >
            Lihat Produk Selanjutnya
            <ChevronDown className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <p className="mt-6 text-center text-xs font-bold text-muted-text sm:text-sm">
          Semua produk sudah ditampilkan.
        </p>
      )}
    </div>
  );
}
