import type { Product, Sale, StockHistory } from "@/lib/types";
import { getSellingPrice } from "@/lib/format";

export const products: Product[] = [
  {
    id: "prd_001",
    slug: "deterjen-premium",
    name: "Deterjen Laundry Premium",
    category: "Deterjen",
    description: "Deterjen cair konsentrat untuk hasil cucian bersih, wangi, dan hemat takaran.",
    price: 50000,
    discountPercentage: 10,
    stock: 28,
    imageUrl: "/products/deterjen-premium.png",
    isActive: true,
    createdAt: "2026-06-01T08:00:00+07:00",
    updatedAt: "2026-06-18T10:00:00+07:00",
  },
  {
    id: "prd_002",
    slug: "parfum-laundry",
    name: "Parfum Laundry Fresh Blue",
    category: "Parfum Laundry",
    description: "Parfum laundry aroma segar tahan lama untuk kebutuhan rumah tangga dan usaha.",
    price: 65000,
    discountPercentage: 0,
    stock: 17,
    imageUrl: "/products/parfum-laundry.png",
    isActive: true,
    createdAt: "2026-06-01T08:30:00+07:00",
    updatedAt: "2026-06-18T10:00:00+07:00",
  },
  {
    id: "prd_003",
    slug: "pewangi-anti-bau",
    name: "Pewangi Anti Bau",
    category: "Pewangi",
    description: "Pewangi pakaian dengan formula anti bau untuk kain harian, kos, hotel, dan laundry.",
    price: 45000,
    discountPercentage: 8,
    stock: 8,
    imageUrl: "/products/pewangi-anti-bau.png",
    isActive: true,
    createdAt: "2026-06-02T09:00:00+07:00",
    updatedAt: "2026-06-18T10:00:00+07:00",
  },
  {
    id: "prd_004",
    slug: "softener-kain",
    name: "Softener Kain Lembut",
    category: "Softener",
    description: "Pelembut kain untuk menjaga tekstur pakaian tetap nyaman dan mudah disetrika.",
    price: 42000,
    discountPercentage: 0,
    stock: 0,
    imageUrl: "/products/softener.png",
    isActive: true,
    createdAt: "2026-06-02T09:30:00+07:00",
    updatedAt: "2026-06-18T10:00:00+07:00",
  },
  {
    id: "prd_005",
    slug: "pemutih-pakaian",
    name: "Pemutih Pakaian",
    category: "Pemutih",
    description: "Pemutih untuk noda membandel pada kain putih dengan penggunaan terukur.",
    price: 38000,
    discountPercentage: 5,
    stock: 12,
    imageUrl: "/products/pemutih.png",
    isActive: true,
    createdAt: "2026-06-03T08:15:00+07:00",
    updatedAt: "2026-06-18T10:00:00+07:00",
  },
  {
    id: "prd_006",
    slug: "plastik-kemasan-laundry",
    name: "Plastik Kemasan Laundry",
    category: "Plastik Kemasan",
    description: "Plastik bening rapi untuk packing cucian kiloan, satuan, dan laundry hotel.",
    price: 30000,
    discountPercentage: 0,
    stock: 40,
    imageUrl: "/products/plastik-kemasan.png",
    isActive: true,
    createdAt: "2026-06-03T08:45:00+07:00",
    updatedAt: "2026-06-18T10:00:00+07:00",
  },
  {
    id: "prd_007",
    slug: "spot-remover",
    name: "Spot Remover",
    category: "Spot Remover",
    description: "Cairan bantu untuk noda khusus sebelum proses pencucian utama.",
    price: 55000,
    discountPercentage: 12,
    stock: 6,
    imageUrl: "/products/spot-remover.png",
    isActive: true,
    createdAt: "2026-06-04T10:00:00+07:00",
    updatedAt: "2026-06-18T10:00:00+07:00",
  },
  {
    id: "prd_008",
    slug: "starter-kit-usaha-laundry",
    name: "Starter Kit Usaha Laundry",
    category: "Peralatan Laundry",
    description: "Paket produk pendukung untuk usaha laundry baru, kos, homestay, dan kebutuhan bulk.",
    price: 175000,
    discountPercentage: 15,
    stock: 5,
    imageUrl: "/products/starter-kit.png",
    isActive: true,
    createdAt: "2026-06-04T10:30:00+07:00",
    updatedAt: "2026-06-18T10:00:00+07:00",
  },
];

export const sales: Sale[] = [
  makeSale("sale_001", "2026-06-17", "prd_001", 4, "Pembelian pelanggan rumah tangga"),
  makeSale("sale_002", "2026-06-17", "prd_002", 2, "Parfum laundry"),
  makeSale("sale_003", "2026-06-18", "prd_008", 1, "Calon usaha laundry"),
  makeSale("sale_004", "2026-06-18", "prd_003", 3, "Repeat order"),
  makeSale("sale_005", "2026-06-19", "prd_007", 2, "Stok menipis"),
];

export const stockHistories: StockHistory[] = [
  {
    id: "stk_001",
    productId: "prd_001",
    stockBefore: 32,
    stockChange: -4,
    stockAfter: 28,
    notes: "Penjualan 4 pcs",
    createdAt: "2026-06-17T15:30:00+07:00",
  },
  {
    id: "stk_002",
    productId: "prd_003",
    stockBefore: 11,
    stockChange: -3,
    stockAfter: 8,
    notes: "Penjualan 3 pcs",
    createdAt: "2026-06-18T11:20:00+07:00",
  },
  {
    id: "stk_003",
    productId: "prd_007",
    stockBefore: 8,
    stockChange: -2,
    stockAfter: 6,
    notes: "Penjualan 2 pcs",
    createdAt: "2026-06-19T09:40:00+07:00",
  },
  {
    id: "stk_004",
    productId: "prd_006",
    stockBefore: 20,
    stockChange: 20,
    stockAfter: 40,
    notes: "Restock plastik kemasan",
    createdAt: "2026-06-19T10:10:00+07:00",
  },
];

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

function makeSale(id: string, saleDate: string, productId: string, quantity: number, notes: string): Sale {
  const product = getProductById(productId);

  if (!product) {
    throw new Error(`Product ${productId} is not available in local seed data`);
  }

  const sellingPrice = getSellingPrice(product);

  return {
    id,
    saleDate,
    productId,
    quantity,
    normalPrice: product.price,
    discountPercentage: product.discountPercentage,
    sellingPrice,
    total: sellingPrice * quantity,
    notes,
  };
}
