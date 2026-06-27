# Tutorial GitHub, Supabase, dan Vercel

Panduan ini menyiapkan Cucilagi Shop dari project lokal sampai online. Jalankan langkah sesuai urutan agar database, environment variable, dan deployment tidak tertukar.

## 1. Status Integrasi Saat Ini

- Halaman publik `/` membaca produk aktif dari Supabase ketika `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` tersedia.
- Jika Supabase belum dikonfigurasi, bermasalah, atau belum berisi produk, katalog memakai fallback dari `src/lib/products.ts`.
- Schema PostgreSQL, RLS, fungsi transaksi, dan bucket `product-images` tersedia di folder `supabase`.
- Login admin memakai satu akun dari environment server: `ADMIN_EMAIL` dan `ADMIN_PASSWORD`.
- `/admin/backup` mengekspor seluruh tabel aplikasi ke Excel atau PDF tanpa menyimpan file di server.
- Form CRUD produk, stok, dan penjualan masih perlu disambungkan ke mutation Supabase pada tahap backend berikutnya.

## 2. Persiapan Lokal

Pastikan Node.js 20 atau lebih baru tersedia.

```powershell
node --version
npm ci
Copy-Item .env.example .env.local
npm run check
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Buka `http://127.0.0.1:3000/` dan cek `http://127.0.0.1:3000/api/health`.

## 3. Membuat Project Supabase

1. Masuk ke [Supabase Dashboard](https://supabase.com/dashboard).
2. Pilih **New project**.
3. Isi nama project, password database yang kuat, region terdekat, lalu buat project.
4. Simpan password database di password manager. Jangan commit ke GitHub.
5. Buka **Project Settings > API**.
6. Catat **Project URL** dan **Publishable/anon key**.
7. Jangan gunakan `service_role` atau secret key pada kode browser.

Isi `.env.local`:

```dotenv
NEXT_PUBLIC_APP_URL=http://127.0.0.1:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=6285210107054
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=PASTE_PUBLISHABLE_OR_ANON_KEY
ADMIN_EMAIL=admin@cucilagi.com
ADMIN_PASSWORD=PASTE_ADMIN_PASSWORD
ADMIN_SESSION_SECRET=PASTE_LONG_RANDOM_SECRET
SUPABASE_SERVICE_ROLE_KEY=PASTE_SERVICE_ROLE_KEY
```

Restart `npm run dev` setelah mengubah env.

Publishable key boleh tersedia di browser, tetapi hanya aman jika seluruh tabel memakai RLS. `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, dan secret/service-role key wajib server-only. Login tidak memakai Supabase Auth; backup memakai route server admin dan service-role key.

## 4. Membuat Database

### Opsi A: SQL Editor

1. Buka **SQL Editor** di Supabase.
2. Salin seluruh isi `supabase/schema.sql`, lalu klik **Run**.
3. Salin seluruh isi `supabase/seed.sql`, lalu klik **Run**.
4. Buka **Table Editor** dan pastikan tabel berikut tersedia:
   - `products`
   - `sales`
   - `stock_histories`
5. Buka **Storage** dan pastikan bucket publik `product-images` tersedia.

### Opsi B: Supabase CLI

Gunakan migration yang sudah disiapkan:

```powershell
npx supabase@latest login
npx supabase@latest init
npx supabase@latest link --project-ref PROJECT_REF
npx supabase@latest db push
```

Setelah migration selesai, jalankan `supabase/seed.sql` melalui SQL Editor untuk mengisi data awal. Migration akses login terbaru tersedia di `supabase/migrations/20260624000000_authenticated_users_access.sql`.

Referensi resmi: [database migrations](https://supabase.com/docs/guides/deployment/database-migrations) dan [Supabase CLI](https://supabase.com/docs/reference/cli/introduction).

## 5. Mengatur Login Admin Tunggal

1. Tentukan email admin. Default aplikasi adalah `admin@cucilagi.com`.
2. Buat password admin kuat dan simpan di password manager.
3. Isi `ADMIN_EMAIL`, `ADMIN_PASSWORD`, dan `ADMIN_SESSION_SECRET` di `.env.local`.
4. Login di `/admin/login` memakai email dan password tersebut. Tidak diperlukan user Supabase Auth atau insert ke tabel lain.

Shop hanya memiliki satu admin. Jika ingin mengganti admin, ubah environment variable lalu redeploy.

## 6. Memeriksa Database

Jalankan melalui SQL Editor:

```sql
select id, name, price, discount_percentage, selling_price, stock, is_active
from public.products
order by created_at;
```

Kemudian restart aplikasi. Endpoint health harus menampilkan:

```json
{
  "status": "ok",
  "mode": "supabase",
  "databaseConfigured": true
}
```

## 7. Menyiapkan GitHub

Jangan push `.env.local`, `.vercel`, `.next`, `node_modules`, `.codex`, password, atau token apa pun.

1. Buat repository kosong di [GitHub](https://github.com/new), misalnya `cucilagishop`.
2. Jangan buat README atau `.gitignore` baru dari GitHub karena file tersebut sudah ada lokal.
3. Jalankan:

```powershell
git status
git branch -M main
git add .
git status
git commit -m "feat: prepare Cucilagi Shop for deployment"
git remote add origin https://github.com/laundrycucilagi-debug/cucilagishop.git
git push -u origin main
```

Jika remote `origin` sudah ada:

```powershell
git remote set-url origin https://github.com/laundrycucilagi-debug/cucilagishop.git
git push -u origin main
```

Workflow `.github/workflows/ci.yml` menjalankan `npm ci`, lint, dan build pada push ke `main` serta pull request.

### Pengaturan keamanan GitHub wajib

1. Buka **Settings > Code security and analysis**.
2. Aktifkan **Secret scanning**, **Push protection**, **Dependency graph**, dan **Dependabot alerts**.
3. Aktifkan **Dependabot security updates**. Jadwal update rutin sudah tersedia di `.github/dependabot.yml`.
4. Buka **Settings > Branches > Add branch protection rule** untuk `main`.
5. Wajibkan pull request, minimal satu approval, status check `quality`, conversation resolution, dan larang force push/deletion.
6. Jika repository organisasi mendukung Rulesets, gunakan ruleset untuk `main` dengan aturan yang sama.

Referensi resmi: [menambahkan project lokal ke GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/adding-locally-hosted-code-to-github).

## 8. Deploy ke Vercel

1. Masuk ke [Vercel](https://vercel.com/).
2. Pilih **Add New > Project**.
3. Hubungkan GitHub dan pilih repository `cucilagi-shop`.
4. Framework preset harus terdeteksi sebagai **Next.js**.
5. Root Directory biarkan `./`.
6. Build Command biarkan `npm run build` dan Install Command `npm install` atau default.
7. Tambahkan environment variable untuk **Production**, **Preview**, dan **Development**:

| Variable | Nilai |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | URL produksi, sementara dapat memakai URL Vercel |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `6285210107054` |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable/anon key Supabase |
| `ADMIN_EMAIL` | Email admin, default `admin@cucilagi.com` |
| `ADMIN_PASSWORD` | Password admin tunggal |
| `ADMIN_SESSION_SECRET` | String acak panjang untuk tanda tangan cookie |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key Supabase untuk route server backup |

Untuk setiap variable, pilih target **Development**, **Preview**, dan **Production** secara terpisah. Gunakan nilai project Supabase development untuk Development/Preview dan project production untuk Production jika tersedia. Tandai `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, dan `SUPABASE_SERVICE_ROLE_KEY` sebagai **Sensitive** agar nilainya tidak dapat dibaca ulang. Jangan pernah mengeksposnya ke browser.

8. Klik **Deploy**.
9. Setelah status **Ready**, buka URL deployment dan cek halaman publik serta `/api/health`.

Di **Project Settings > Firewall**, tambahkan rate limit untuk `POST /api/auth/login`, misalnya 10 request per menit per IP. Header CSP, HSTS, X-Frame-Options, nosniff, Permissions-Policy, dan Referrer-Policy sudah dikonfigurasi di `next.config.ts`.

Vercel otomatis membuat preview deployment untuk branch dan pull request ketika Git integration aktif. Referensi resmi: [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs), [Git deployments](https://vercel.com/docs/deployments/git), dan [environment variables](https://vercel.com/docs/environment-variables).

## 9. Custom Domain

Rekomendasi domain aplikasi toko: `shop.cucilagilaundry.com`.

1. Buka Vercel **Project Settings > Domains**.
2. Tambahkan `shop.cucilagilaundry.com`.
3. Ikuti record DNS yang ditampilkan Vercel pada pengelola DNS domain.
4. Setelah domain aktif, ubah `NEXT_PUBLIC_APP_URL` menjadi `https://shop.cucilagilaundry.com`.
5. Redeploy production.
6. Ubah link menu **Shop** pada website utama agar menuju domain tersebut.

## 10. Checklist Setelah Deploy

- `/` menampilkan produk dan gambar.
- `/api/health` mengembalikan `status: ok`, `mode: supabase`, dan `databaseConfigured: true`.
- Tombol **Beli Sekarang** membuka WhatsApp dengan produk dan harga yang benar.
- Produk nonaktif tidak tampil di katalog.
- Email/password admin dari environment dapat login; `/admin` mengarah ke `/admin/login` tanpa session valid.
- Backup Excel dan PDF hanya dapat diunduh setelah login admin.
- RLS aktif pada seluruh tabel.
- Bucket `product-images` dapat dibaca publik, tetapi upload/update/delete hanya untuk user `authenticated`.
- Tidak ada `.env.local` atau secret key di GitHub.
- GitHub Actions berstatus hijau.

## 11. Update Berikutnya

Untuk deploy perubahan berikutnya:

```powershell
git add .
git commit -m "fix: describe the change"
git push
```

Push ke `main` memicu deployment production jika konfigurasi Vercel menggunakan default production branch. Branch lain menghasilkan preview deployment.

## 12. Rollback

Jika deployment terbaru bermasalah:

1. Buka tab **Deployments** di Vercel.
2. Pilih deployment stabil sebelumnya.
3. Gunakan menu **Promote to Production** atau rollback dari dashboard.
4. Untuk database, buat migration per perubahan; jangan mengedit migration yang sudah pernah diterapkan ke production.

## 13. Keamanan dan Batasan Saat Ini

- Katalog publik sudah dapat membaca Supabase menggunakan anon key dan RLS.
- Login memverifikasi `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di server, lalu membuat cookie HttpOnly bertanda tangan.
- Middleware dan layout server memverifikasi ulang session untuk route `/admin`.
- Export Excel/PDF memakai route server admin dan service-role key. Service-role key tidak pernah dipakai di browser.
- Error produksi ditampilkan secara generik tanpa detail internal.
- Tombol simpan produk, penjualan, upload gambar, dan perubahan stok belum melakukan mutation ke Supabase.

Sebelum memakai dashboard untuk operasi harian, lanjutkan CRUD server-side, upload Storage, validasi schema pada route, rate limiting, dan audit log. Setelah secret pernah dibagikan melalui kanal komunikasi, rotasi secret tersebut dari Supabase Dashboard lalu perbarui hanya di `.env.local` dan Vercel Environment Variables.
