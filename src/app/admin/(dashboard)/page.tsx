import { BarChart3, Boxes, Home, LayoutGrid, Package, PackagePlus, PackageX, ReceiptText, ShoppingBag, Store, Wallet } from "lucide-react";
import Link from "next/link";
import { AdminSection } from "@/components/admin/admin-section";
import { StatCard } from "@/components/admin/stat-card";
import { SalesTable } from "@/components/admin/admin-table";
import { formatRupiah } from "@/lib/format";
import { getDashboardSummary } from "@/lib/dashboard";
import { products, sales } from "@/lib/products";

export default function AdminDashboardPage() {
  const summary = getDashboardSummary();
  const maxStock = Math.max(...products.map((product) => product.stock));
  const quickMenuItems = [
    { href: "/admin/products", label: "Produk", icon: Package, color: "bg-yellow-50 text-accent" },
    { href: "/admin/products", label: "Tambah", icon: PackagePlus, color: "bg-blue-50 text-blue-600" },
    { href: "/admin/sales", label: "Penjualan", icon: ReceiptText, color: "bg-purple-50 text-purple-600" },
    { href: "/admin/stock", label: "Stok", icon: Boxes, color: "bg-emerald-50 text-emerald-600" },
    { href: "/admin/reports", label: "Laporan", icon: BarChart3, color: "bg-orange-50 text-orange-600" },
    { href: "/", label: "Katalog", icon: Store, color: "bg-rose-50 text-rose-600" },
    { href: "/admin", label: "Home", icon: Home, color: "bg-yellow-50 text-accent" },
    { href: "/admin/reports", label: "Semua", icon: LayoutGrid, color: "bg-black text-white" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Dashboard</p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold text-black">Ringkasan Operasional</h2>
      </div>

      <section className="rounded-[28px] bg-white p-5 shadow-soft lg:hidden">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-2xl font-black text-black">Menu Utama</h3>
            <p className="mt-1 text-sm font-semibold text-muted-text">Akses modul dari dashboard.</p>
          </div>
          <span className="text-xs font-black uppercase tracking-[0.12em] text-primary">Cucilagi</span>
        </div>
        <div className="grid grid-cols-4 gap-x-3 gap-y-7">
          {quickMenuItems.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} className="grid justify-items-center gap-2 text-center">
              <span className={`grid size-[58px] place-items-center rounded-[20px] ${item.color}`}>
                <item.icon className="size-7" aria-hidden="true" />
              </span>
              <span className="text-xs font-black leading-tight text-black">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Total Produk" value={`${summary.totalProducts}`} helper="Seluruh produk di katalog." icon={Package} />
        <StatCard label="Produk Aktif" value={`${summary.activeProducts}`} helper="Tampil di halaman publik." icon={ShoppingBag} />
        <StatCard label="Produk Habis" value={`${summary.emptyProducts}`} helper="Tombol publik otomatis nonaktif." icon={PackageX} />
        <StatCard
          label="Omzet Bulan Ini"
          value={formatRupiah(summary.monthRevenue)}
          helper={`${summary.monthSales} transaksi tercatat.`}
          icon={Wallet}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <AdminSection title="Grafik Stok Produk" description="Monitoring cepat untuk produk habis dan stok terbatas.">
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="font-bold text-slate-800">{product.name}</span>
                  <span className="font-semibold text-muted-text">{product.stock}</span>
                </div>
                <div className="h-3 rounded-full bg-light-gray">
                  <div
                    className="h-3 rounded-full bg-accent"
                    style={{ width: `${Math.max((product.stock / maxStock) * 100, 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="Penjualan Terbaru" description="Riwayat transaksi terakhir untuk audit cepat.">
          <SalesTable sales={sales.slice().reverse().slice(0, 5)} />
        </AdminSection>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Penjualan Hari Ini" value={`${summary.todaySales}`} helper="Berdasarkan tanggal lokal." icon={ReceiptText} />
        <StatCard label="Penjualan Bulanan" value={`${summary.monthSales}`} helper="Akumulasi transaksi bulan berjalan." icon={BarChart3} />
      </div>
    </div>
  );
}
