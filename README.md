# Cucilagi Shop

Cucilagi Shop adalah katalog produk laundry berbasis Next.js 15. Halaman publik berfokus pada katalog dan pemesanan WhatsApp. Area admin menyediakan dashboard, produk, stok, penjualan, laporan, serta backup Excel/PDF.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Geist Sans dan Geist Mono yang di-host lokal
- Supabase Auth, Database, dan Storage
- PostgreSQL dengan Row Level Security

## Jalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Route utama:

- `/` - katalog publik satu halaman
- `/admin/login` - login Supabase untuk admin allowlist
- `/admin` - dashboard admin
- `/admin/products` - manajemen produk
- `/admin/sales` - pencatatan penjualan
- `/admin/stock` - manajemen stok
- `/admin/reports` - laporan
- `/admin/backup` - backup seluruh data ke Excel atau PDF
- `/api/health` - health check lokal

## Environment

Salin `.env.example` menjadi `.env.local`, lalu isi kredensial Supabase.

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=6285210107054
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=
```

Publishable key boleh dipakai frontend karena akses tetap dibatasi RLS. `SUPABASE_SERVICE_ROLE_KEY` hanya untuk route server tepercaya, tidak boleh diberi prefix `NEXT_PUBLIC_`, dan tidak digunakan oleh browser.

## Database dan Deployment

Panduan lengkap setup GitHub, Supabase, Vercel, environment variable, custom domain, dan rollback tersedia di:

- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

Setup database singkat:

1. Buat project Supabase.
2. Jalankan `supabase/schema.sql` melalui SQL Editor atau push migration di `supabase/migrations`.
3. Jalankan `supabase/seed.sql` untuk data awal.
4. Buat user melalui Supabase Auth dan daftarkan UUID-nya pada `public.admin_users`.

Tabel utama:

- `products`: katalog produk, harga, diskon, stok, foto, status aktif.
- `sales`: transaksi penjualan manual admin.
- `stock_histories`: audit perubahan stok.

Storage bucket:

- `product-images`: foto dan thumbnail produk.

## Status Implementasi

- Katalog publik membaca produk aktif dari Supabase dan memakai seed lokal sebagai fallback.
- `/admin` diproteksi middleware, session HttpOnly, Supabase Auth, dan allowlist `admin_users`.
- Backup Excel/PDF mengambil produk, penjualan, histori stok, dan daftar admin melalui RLS.
- UI input produk, penjualan, dan stok masih perlu disambungkan ke mutation Supabase sebelum dipakai sebagai CRUD produksi.
- Secret lokal disimpan di `.env.local` yang diabaikan Git.

## Script

```bash
npm run lint
npm run build
npm run dev
```
