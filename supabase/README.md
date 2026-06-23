# Supabase Cucilagi Shop

File database:

- `migrations/20260623000000_initial_schema.sql`: migration untuk Supabase CLI.
- `schema.sql`: versi idempotent untuk dijalankan lewat SQL Editor.
- `seed.sql`: data awal produk; aman dijalankan ulang karena memakai upsert berdasarkan nama produk.

Urutan setup paling sederhana:

1. Jalankan `schema.sql` di Supabase SQL Editor.
2. Jalankan `seed.sql`.
3. Buat pengguna di Authentication > Users.
4. Daftarkan UUID pengguna tersebut ke `public.admin_users`.

```sql
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where email = 'admin@cucilagi.com'
on conflict (user_id) do update set email = excluded.email;
```

Jangan pernah memasukkan `service_role` atau secret key ke variabel `NEXT_PUBLIC_*`.

Panduan lengkap tersedia di `docs/DEPLOYMENT.md`.
