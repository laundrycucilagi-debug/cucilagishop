import Link from "next/link";
import {
  BarChart3,
  Bell,
  Boxes,
  DatabaseBackup,
  Home,
  LayoutDashboard,
  Package,
  Plus,
  ReceiptText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { BrandMark } from "@/components/public/brand-mark";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produk", icon: Package },
  { href: "/admin/sales", label: "Penjualan", icon: ReceiptText },
  { href: "/admin/stock", label: "Stok", icon: Boxes },
  { href: "/admin/reports", label: "Laporan", icon: BarChart3 },
  { href: "/admin/backup", label: "Backup", icon: DatabaseBackup },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F3F7] text-slate-900 lg:bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col bg-black px-5 py-6 text-white lg:flex">
        <BrandMark inverted />
        <nav className="mt-8 space-y-2" aria-label="Navigasi admin">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center gap-3 rounded-2xl px-4 text-sm font-bold text-white/82 transition hover:bg-white/12 hover:text-white"
            >
              <item.icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-[18px] border border-white/12 bg-white/8 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-black">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold">Admin Cucilagi</p>
              <p className="text-xs text-white/60">Protected panel</p>
            </div>
          </div>
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="relative z-30 rounded-b-[34px] bg-primary px-4 pb-7 pt-5 shadow-[0_20px_42px_rgba(13,13,13,0.16)] lg:hidden">
          <div className="pointer-events-none absolute right-0 top-0 size-40 rounded-full bg-white/12 blur-0" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid size-[68px] shrink-0 place-items-center rounded-[22px] border-2 border-white/80 bg-black font-heading text-2xl font-black text-white shadow-soft">
                FS
              </div>
              <div className="min-w-0">
                <p className="truncate font-heading text-lg font-black text-black">Admin Cucilagi</p>
                <p className="text-sm font-bold text-black/70">Owner</p>
                <p className="truncate text-sm font-semibold text-black/70">Cucilagi Shop Admin</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="grid size-14 place-items-center rounded-[20px] bg-white/40 text-black shadow-soft" aria-label="Notifikasi admin">
                <Bell className="size-6" aria-hidden="true" />
              </button>
              <AdminLogoutButton iconOnly />
            </div>
          </div>

          <div className="relative mt-6 rounded-[24px] bg-white px-5 py-4 shadow-[0_18px_32px_rgba(13,13,13,0.12)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-text">Panel Admin</p>
                <p className="mt-2 font-heading text-2xl font-black text-black">Cucilagi Shop</p>
              </div>
              <span className="rounded-full bg-success/10 px-4 py-2 text-sm font-black text-success">Aktif</span>
            </div>
          </div>
        </header>

        <header className="sticky top-0 z-30 hidden border-b border-border bg-white/92 px-4 py-4 backdrop-blur-xl md:px-6 lg:block">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">Admin Panel</p>
              <h1 className="font-heading text-xl font-extrabold text-black md:text-2xl">Cucilagi Shop</h1>
            </div>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-white px-4 text-sm font-bold text-black shadow-soft transition hover:bg-light-gray"
            >
              Lihat Katalog
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-[1180px] px-4 py-6 pb-32 md:px-6 md:py-8 md:pb-36 lg:pb-8">{children}</main>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-50 grid w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2 grid-cols-5 items-center rounded-[28px] border border-white/80 bg-white px-3 py-3 shadow-[0_18px_40px_rgba(13,13,13,0.16)] lg:hidden" aria-label="Navigasi cepat admin">
        <MobileNavItem href="/admin" label="Home" icon={Home} />
        <MobileNavItem href="/admin/sales" label="Transaksi" icon={ReceiptText} />
        <Link href="/admin/products" className="mx-auto grid size-14 -translate-y-3 place-items-center rounded-full bg-primary text-black shadow-[0_12px_28px_rgba(255,187,16,0.38)]" aria-label="Tambah produk">
          <Plus className="size-7" aria-hidden="true" />
        </Link>
        <MobileNavItem href="/admin/reports" label="Laporan" icon={BarChart3} />
        <MobileNavItem href="/admin/backup" label="Backup" icon={DatabaseBackup} />
      </nav>
    </div>
  );
}

function MobileNavItem({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  return (
    <Link href={href} className="grid justify-items-center gap-1 text-[0.68rem] font-bold text-muted-text">
      <Icon className="size-6 text-black" aria-hidden="true" />
      {label}
    </Link>
  );
}
