# Supabase Cucilagi Shop

File database:

- `migrations/20260623000000_initial_schema.sql`: migration untuk Supabase CLI.
- `migrations/20260624000000_authenticated_users_access.sql`: menjadikan Supabase Auth sebagai satu-satunya aturan akses admin.
- `schema.sql`: versi idempotent untuk dijalankan lewat SQL Editor.
- `seed.sql`: data awal produk; aman dijalankan ulang karena memakai upsert berdasarkan nama produk.

Urutan setup paling sederhana:

1. Jalankan `schema.sql` di Supabase SQL Editor.
2. Jalankan `seed.sql`.
3. Buat pengguna di Authentication > Users.

Tidak diperlukan allowlist atau insert tambahan. Setiap email/password yang valid di Supabase Auth dapat login dan mengakses data aplikasi sebagai role `authenticated`.

Jangan pernah memasukkan `service_role` atau secret key ke variabel `NEXT_PUBLIC_*`.

Panduan lengkap tersedia di `docs/DEPLOYMENT.md`.
