-- Supabase Auth is the only access rule for the admin application.
-- Existing RLS policies call is_admin(), so replacing this function updates
-- products, sales, stock histories, and product image permissions together.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null;
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
