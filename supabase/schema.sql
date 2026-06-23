create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Umum',
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  discount_percentage numeric(5, 2) not null default 0 check (discount_percentage >= 0 and discount_percentage <= 100),
  selling_price numeric(12, 2) generated always as (
    round(price - (price * discount_percentage / 100), 2)
  ) stored,
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  sale_date date not null default current_date,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  normal_price numeric(12, 2) not null check (normal_price >= 0),
  discount_percentage numeric(5, 2) not null default 0 check (discount_percentage >= 0 and discount_percentage <= 100),
  selling_price numeric(12, 2) not null check (selling_price >= 0),
  total numeric(12, 2) not null check (total >= 0),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.stock_histories (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  stock_before integer not null check (stock_before >= 0),
  stock_change integer not null,
  stock_after integer not null check (stock_after >= 0),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create index if not exists products_active_stock_idx on public.products (is_active, stock);
create index if not exists products_category_idx on public.products (category);
create unique index if not exists products_name_unique_idx on public.products (name);
create index if not exists sales_sale_date_idx on public.sales (sale_date desc);
create index if not exists sales_product_id_idx on public.sales (product_id);
create index if not exists stock_histories_product_id_idx on public.stock_histories (product_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.record_sale(
  p_product_id uuid,
  p_quantity integer,
  p_notes text default null,
  p_sale_date date default current_date
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_product products%rowtype;
  v_sale_id uuid;
  v_stock_after integer;
begin
  if not public.is_admin() then
    raise exception 'Admin access required';
  end if;

  if p_quantity <= 0 then
    raise exception 'Quantity must be greater than zero';
  end if;

  select *
  into v_product
  from public.products
  where id = p_product_id
  for update;

  if not found then
    raise exception 'Product not found';
  end if;

  if v_product.stock < p_quantity then
    raise exception 'Insufficient stock';
  end if;

  v_stock_after := v_product.stock - p_quantity;

  insert into public.sales (
    sale_date,
    product_id,
    quantity,
    normal_price,
    discount_percentage,
    selling_price,
    total,
    notes
  )
  values (
    p_sale_date,
    v_product.id,
    p_quantity,
    v_product.price,
    v_product.discount_percentage,
    v_product.selling_price,
    v_product.selling_price * p_quantity,
    p_notes
  )
  returning id into v_sale_id;

  update public.products
  set stock = v_stock_after
  where id = v_product.id;

  insert into public.stock_histories (
    product_id,
    stock_before,
    stock_change,
    stock_after,
    notes
  )
  values (
    v_product.id,
    v_product.stock,
    -p_quantity,
    v_stock_after,
    coalesce(p_notes, 'Penjualan produk')
  );

  return v_sale_id;
end;
$$;

revoke all on function public.record_sale(uuid, integer, text, date) from public;
grant execute on function public.record_sale(uuid, integer, text, date) to authenticated;

alter table public.products enable row level security;
alter table public.sales enable row level security;
alter table public.stock_histories enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Admins can read own role" on public.admin_users;
drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Authenticated admins can manage products" on public.products;
create policy "Authenticated admins can manage products"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Authenticated admins can read sales" on public.sales;
create policy "Authenticated admins can read sales"
on public.sales
for select
to authenticated
using (public.is_admin());

drop policy if exists "Authenticated admins can insert sales" on public.sales;
create policy "Authenticated admins can insert sales"
on public.sales
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Authenticated admins can read stock histories" on public.stock_histories;
create policy "Authenticated admins can read stock histories"
on public.stock_histories
for select
to authenticated
using (public.is_admin());

drop policy if exists "Authenticated admins can insert stock histories" on public.stock_histories;
create policy "Authenticated admins can insert stock histories"
on public.stock_histories
for insert
to authenticated
with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Authenticated admins can upload product images" on storage.objects;
create policy "Authenticated admins can upload product images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Authenticated admins can update product images" on storage.objects;
create policy "Authenticated admins can update product images"
on storage.objects
for update
to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Authenticated admins can delete product images" on storage.objects;
create policy "Authenticated admins can delete product images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'product-images' and public.is_admin());
