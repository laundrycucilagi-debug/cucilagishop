# Security Policy

## Supported Version

Gunakan versi terbaru pada branch `main`.

## Melaporkan Kerentanan

Jangan membuat issue publik yang berisi credential, token, data pelanggan, atau langkah eksploitasi aktif. Laporkan melalui GitHub private vulnerability reporting pada repository.

## Aturan Credential

- Jangan commit `.env`, `.env.local`, password, token Vercel, atau Supabase secret/service-role key.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` hanya boleh digunakan bersama RLS yang aktif.
- Secret server harus disimpan sebagai Sensitive Environment Variable di Vercel.
- Rotasi credential segera bila Secret Scanning atau Dependabot memberi peringatan.
