import Image from "next/image";
import type { Product, Sale, StockHistory } from "@/lib/types";
import { formatRupiah, getSellingPrice, getStockStatus } from "@/lib/format";
import { getProductById } from "@/lib/products";
import { StockBadge } from "@/components/public/badges";

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <article key={product.id} className="rounded-[20px] border border-border bg-background p-3 shadow-soft">
            <div className="flex gap-3">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-[18px] bg-light-gray">
                <Image src={product.imageUrl} alt={`Foto ${product.name}`} fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="line-clamp-2 font-heading text-sm font-black text-black">{product.name}</p>
                    <p className="mt-1 text-xs font-bold text-muted-text">{product.category}</p>
                  </div>
                  <StockBadge status={getStockStatus(product.stock)} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <ProductMobileMetric label="Harga" value={formatRupiah(product.price)} />
                  <ProductMobileMetric label="Jual" value={formatRupiah(getSellingPrice(product))} />
                  <ProductMobileMetric label="Diskon" value={`${product.discountPercentage}%`} />
                  <ProductMobileMetric label="Stok" value={`${product.stock}`} />
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <button className="min-h-11 rounded-[16px] bg-primary px-4 text-sm font-black text-black">Edit</button>
              <button className="min-h-11 rounded-[16px] bg-[#FEE2E2] px-4 text-sm font-black text-[#991B1B]">Hapus</button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="bg-background text-xs uppercase tracking-[0.08em] text-muted-text">
            <th className="rounded-l-2xl px-4 py-3">Foto</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Harga</th>
            <th className="px-4 py-3">Diskon</th>
            <th className="px-4 py-3">Harga Jual</th>
            <th className="px-4 py-3">Stok</th>
            <th className="px-4 py-3">Status</th>
            <th className="rounded-r-2xl px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border transition hover:bg-slate-50">
              <td className="px-4 py-4">
                <div className="relative size-14 overflow-hidden rounded-[16px] bg-light-gray">
                  <Image src={product.imageUrl} alt={`Foto ${product.name}`} fill sizes="56px" className="object-cover" />
                </div>
              </td>
              <td className="px-4 py-4 font-bold text-slate-900">{product.name}</td>
              <td className="px-4 py-4 text-slate-700">{product.category}</td>
              <td className="px-4 py-4 text-slate-700">{formatRupiah(product.price)}</td>
              <td className="px-4 py-4 text-slate-700">{product.discountPercentage}%</td>
              <td className="px-4 py-4 font-bold text-black">{formatRupiah(getSellingPrice(product))}</td>
              <td className="px-4 py-4 text-slate-700">{product.stock}</td>
              <td className="px-4 py-4">
                <StockBadge status={getStockStatus(product.stock)} />
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button className="min-h-10 rounded-full bg-light-gray px-4 text-sm font-bold text-black">Edit</button>
                  <button className="min-h-10 rounded-full bg-[#FEE2E2] px-4 text-sm font-bold text-[#991B1B]">
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export function SalesTable({ sales }: { sales: Sale[] }) {
  return (
    <>
    <div className="space-y-3 md:hidden">
      {sales.map((sale) => {
        const product = getProductById(sale.productId);

        return (
          <article key={sale.id} className="rounded-[20px] border border-border bg-background p-4 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-accent">{sale.saleDate}</p>
                <h3 className="mt-1 line-clamp-2 font-heading text-base font-black text-black">{product?.name ?? "-"}</h3>
              </div>
              <span className="rounded-full bg-primary/18 px-3 py-1 text-xs font-black text-black">{sale.quantity} pcs</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <ProductMobileMetric label="Harga Jual" value={formatRupiah(sale.sellingPrice)} />
              <ProductMobileMetric label="Total" value={formatRupiah(sale.total)} />
            </div>
            {sale.notes ? <p className="mt-3 rounded-[16px] bg-white px-3 py-2 text-xs font-semibold text-muted-text">{sale.notes}</p> : null}
          </article>
        );
      })}
    </div>

    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="bg-background text-xs uppercase tracking-[0.08em] text-muted-text">
            <th className="rounded-l-2xl px-4 py-3">Tanggal</th>
            <th className="px-4 py-3">Produk</th>
            <th className="px-4 py-3">Jumlah</th>
            <th className="px-4 py-3">Harga Jual</th>
            <th className="px-4 py-3">Total</th>
            <th className="rounded-r-2xl px-4 py-3">Catatan</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => {
            const product = getProductById(sale.productId);

            return (
              <tr key={sale.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-4 text-slate-700">{sale.saleDate}</td>
                <td className="px-4 py-4 font-bold text-slate-900">{product?.name ?? "-"}</td>
                <td className="px-4 py-4 text-slate-700">{sale.quantity}</td>
                <td className="px-4 py-4 text-slate-700">{formatRupiah(sale.sellingPrice)}</td>
                <td className="px-4 py-4 font-bold text-black">{formatRupiah(sale.total)}</td>
                <td className="px-4 py-4 text-muted-text">{sale.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}

export function StockHistoryTable({ histories }: { histories: StockHistory[] }) {
  return (
    <>
    <div className="space-y-3 md:hidden">
      {histories.map((history) => {
        const product = getProductById(history.productId);

        return (
          <article key={history.id} className="rounded-[20px] border border-border bg-background p-4 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.08em] text-accent">
                  {new Date(history.createdAt).toLocaleDateString("id-ID")}
                </p>
                <h3 className="mt-1 line-clamp-2 font-heading text-base font-black text-black">{product?.name ?? "-"}</h3>
              </div>
              <span className="rounded-full bg-black px-3 py-1 text-xs font-black text-primary">{history.stockChange}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <ProductMobileMetric label="Sebelum" value={`${history.stockBefore}`} />
              <ProductMobileMetric label="Perubahan" value={`${history.stockChange}`} />
              <ProductMobileMetric label="Sesudah" value={`${history.stockAfter}`} />
            </div>
            <p className="mt-3 rounded-[16px] bg-white px-3 py-2 text-xs font-semibold text-muted-text">{history.notes}</p>
          </article>
        );
      })}
    </div>

    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="bg-background text-xs uppercase tracking-[0.08em] text-muted-text">
            <th className="rounded-l-2xl px-4 py-3">Tanggal</th>
            <th className="px-4 py-3">Produk</th>
            <th className="px-4 py-3">Sebelum</th>
            <th className="px-4 py-3">Perubahan</th>
            <th className="px-4 py-3">Sesudah</th>
            <th className="rounded-r-2xl px-4 py-3">Catatan</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => {
            const product = getProductById(history.productId);

            return (
              <tr key={history.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-4 text-slate-700">{new Date(history.createdAt).toLocaleDateString("id-ID")}</td>
                <td className="px-4 py-4 font-bold text-slate-900">{product?.name ?? "-"}</td>
                <td className="px-4 py-4 text-slate-700">{history.stockBefore}</td>
                <td className="px-4 py-4 font-bold text-black">{history.stockChange}</td>
                <td className="px-4 py-4 text-slate-700">{history.stockAfter}</td>
                <td className="px-4 py-4 text-muted-text">{history.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}

function ProductMobileMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] bg-white px-3 py-2">
      <p className="font-black uppercase tracking-[0.08em] text-muted-text">{label}</p>
      <p className="mt-1 truncate font-heading text-sm font-black text-black">{value}</p>
    </div>
  );
}
