import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { BrandMark } from "@/components/public/brand-mark";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-border bg-white p-6 shadow-card">
        <div className="flex justify-center">
          <BrandMark />
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Admin Login</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-black">Masuk Dashboard</h1>
        </div>

        <AdminLoginForm />

        <Link href="/" className="mt-6 block text-center text-sm font-bold text-black">
          Kembali ke Katalog
        </Link>
      </div>
    </main>
  );
}
