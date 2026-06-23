"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Download, Filter, PackageCheck, ReceiptText, Tags, Wallet } from "lucide-react";
import { AdminSection } from "@/components/admin/admin-section";
import { SelectInput, TextInput } from "@/components/admin/form-controls";
import { StatCard } from "@/components/admin/stat-card";
import { formatRupiah, getDiscountValue, getSellingPrice, getStockStatus } from "@/lib/format";
import type { Product, Sale } from "@/lib/types";

type FilterMode = "tanggal" | "rentang" | "bulanan";

type AdminReportsClientProps = {
  products: Product[];
  sales: Sale[];
};

export function AdminReportsClient({ products, sales }: AdminReportsClientProps) {
  const [mode, setMode] = useState<FilterMode>("bulanan");
  const [date, setDate] = useState("2026-06-19");
  const [startDate, setStartDate] = useState("2026-06-17");
  const [endDate, setEndDate] = useState("2026-06-19");
  const [month, setMonth] = useState("2026-06");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))).sort(), [products]);

  const report = useMemo(() => {
    const productMap = new Map(products.map((product) => [product.id, product]));
    const scopedProducts = category === "all" ? products : products.filter((product) => product.category === category);
    const scopedProductIds = new Set(scopedProducts.map((product) => product.id));

    const filteredSales = sales.filter((sale) => {
      const product = productMap.get(sale.productId);
      const matchesCategory = category === "all" || scopedProductIds.has(sale.productId) || product?.category === category;
      if (!matchesCategory) {
        return false;
      }

      if (mode === "tanggal") {
        return sale.saleDate === date;
      }

      if (mode === "rentang") {
        return sale.saleDate >= startDate && sale.saleDate <= endDate;
      }

      return sale.saleDate.startsWith(month);
    });

    const totalTransactions = filteredSales.length;
    const totalSold = filteredSales.reduce((total, sale) => total + sale.quantity, 0);
    const totalRevenue = filteredSales.reduce((total, sale) => total + sale.total, 0);
    const totalDiscount = filteredSales.reduce((total, sale) => {
      const product = productMap.get(sale.productId);
      return total + (product ? getDiscountValue(product) * sale.quantity : 0);
    }, 0);

    const productSales = scopedProducts
      .map((product) => {
        const relatedSales = filteredSales.filter((sale) => sale.productId === product.id);
        const quantity = relatedSales.reduce((total, sale) => total + sale.quantity, 0);

        return {
          product,
          quantity,
          total: quantity * getSellingPrice(product),
        };
      })
      .sort((a, b) => b.quantity - a.quantity);

    const stock = scopedProducts.reduce(
      (summary, product) => {
        const status = getStockStatus(product.stock);
        summary[status] += 1;
        return summary;
      },
      { available: 0, limited: 0, empty: 0 },
    );

    return {
      totalTransactions,
      totalSold,
      totalRevenue,
      totalDiscount,
      productSales,
      stock,
      filteredSales,
      scopedProducts,
    };
  }, [category, date, endDate, mode, month, products, sales, startDate]);

  const periodLabel = getPeriodLabel(mode, date, startDate, endDate, month);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Laporan</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-black">Ringkasan Penjualan</h2>
          <p className="mt-2 text-sm font-semibold text-muted-text">{periodLabel}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-light-gray px-4 text-sm font-bold text-black">
            <Download className="size-4" aria-hidden="true" />
            Export Excel
          </button>
          <button className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-black px-4 text-sm font-bold text-white">
            <Download className="size-4" aria-hidden="true" />
            Export PDF
          </button>
        </div>
      </div>

      <AdminSection title="Filter Laporan" description="Pilih periode dan kategori produk untuk melihat ringkasan penjualan yang lebih spesifik.">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { value: "tanggal", label: "Tanggal" },
            { value: "rentang", label: "Rentang" },
            { value: "bulanan", label: "Bulanan" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setMode(item.value as FilterMode)}
              className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-sm font-black transition ${
                mode === item.value ? "bg-black text-primary" : "bg-light-gray text-black"
              }`}
            >
              <CalendarDays className="size-4" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {mode === "tanggal" ? (
            <TextInput type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Filter tanggal laporan" />
          ) : null}

          {mode === "rentang" ? (
            <>
              <TextInput type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} aria-label="Tanggal awal laporan" />
              <TextInput type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} aria-label="Tanggal akhir laporan" />
            </>
          ) : null}

          {mode === "bulanan" ? (
            <TextInput type="month" value={month} onChange={(event) => setMonth(event.target.value)} aria-label="Filter bulan laporan" />
          ) : null}

          <SelectInput value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter kategori produk">
            <option value="all">Semua Kategori</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectInput>

          <div className="flex min-h-11 items-center gap-2 rounded-xl bg-light-gray px-3 text-sm font-bold text-black">
            <Filter className="size-4 text-accent" aria-hidden="true" />
            {report.filteredSales.length} transaksi, {report.scopedProducts.length} produk
          </div>
        </div>
      </AdminSection>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Total Transaksi" value={`${report.totalTransactions}`} helper="Jumlah transaksi tercatat." icon={ReceiptText} />
        <StatCard label="Produk Terjual" value={`${report.totalSold}`} helper="Total unit dari filter aktif." icon={PackageCheck} />
        <StatCard label="Total Omzet" value={formatRupiah(report.totalRevenue)} helper="Akumulasi harga jual." icon={Wallet} />
        <StatCard label="Total Diskon" value={formatRupiah(report.totalDiscount)} helper="Estimasi nilai diskon." icon={Tags} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminSection title="Produk Terlaris">
          <div className="space-y-4">
            {report.productSales.slice(0, 6).map((item) => (
              <div key={item.product.id} className="rounded-[20px] border border-border bg-background p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">{item.product.name}</p>
                    <p className="mt-1 text-sm text-muted-text">{item.quantity} produk terjual</p>
                  </div>
                  <p className="font-heading text-lg font-extrabold text-black">{formatRupiah(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="Status Stok">
          <div className="space-y-4">
            <StockSummary label="Produk Tersedia" value={report.stock.available} color="bg-success" />
            <StockSummary label="Produk Menipis" value={report.stock.limited} color="bg-warning" />
            <StockSummary label="Produk Habis" value={report.stock.empty} color="bg-danger" />
          </div>
        </AdminSection>
      </div>
    </div>
  );
}

function getPeriodLabel(mode: FilterMode, date: string, startDate: string, endDate: string, month: string) {
  if (mode === "tanggal") {
    return `Periode tanggal ${formatDate(date)}`;
  }

  if (mode === "rentang") {
    return `Periode ${formatDate(startDate)} sampai ${formatDate(endDate)}`;
  }

  const monthDate = new Date(`${month}-01T00:00:00+07:00`);
  return `Periode bulan ${monthDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}`;
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function StockSummary({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-[20px] border border-border bg-background p-4">
      <div className="flex items-center gap-3">
        <span className={`size-3 rounded-full ${color}`} />
        <span className="font-bold text-slate-800">{label}</span>
      </div>
      <span className="font-heading text-xl font-extrabold text-black">{value}</span>
    </div>
  );
}
