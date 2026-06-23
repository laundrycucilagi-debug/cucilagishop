import { ProductGrid } from "@/components/public/product-grid";
import { WhatsAppButton } from "@/components/public/buttons";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

export function ProductSection({ products }: { products: Product[] }) {
  const activeProducts = products.filter((product) => product.isActive);

  return (
    <section id="produk" className="bg-white py-8 md:py-14">
      <div className="mx-auto w-[min(var(--container),calc(100%-32px))]">
        <div className="mx-auto mb-5 max-w-[760px] text-center md:mb-8">
          <p className="mb-2 text-[0.68rem] font-black uppercase text-primary md:text-[0.78rem]">Toko Laundry</p>
          <h2 className="font-heading text-2xl font-black leading-[1.05] text-black md:text-[clamp(2rem,4.2vw,3.1rem)]">
            Belanja Bahan Baku & Peralatan Laundry
          </h2>
          <p className="mt-3 text-sm text-muted-text md:text-base">
            Pilih produk sesuai kebutuhan, cek harga dan stok, lalu pesan langsung melalui WhatsApp Admin Cucilagi.
          </p>
        </div>

        {activeProducts.length > 0 ? (
          <ProductGrid products={activeProducts} />
        ) : (
          <div className="mx-auto max-w-xl rounded-[20px] border border-border bg-white p-8 text-center shadow-card">
            <h3 className="font-heading text-xl font-black text-black">Produk belum tersedia</h3>
            <p className="mt-2 text-muted-text">
              Silakan hubungi admin Cucilagi melalui WhatsApp untuk informasi produk terbaru.
            </p>
            <WhatsAppButton href={getWhatsAppUrl()} className="mt-5">
              Chat Admin
            </WhatsAppButton>
          </div>
        )}
      </div>
    </section>
  );
}
