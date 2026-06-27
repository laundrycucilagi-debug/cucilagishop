"use client";

import { LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error || "Email atau password admin salah.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Login belum dapat diproses. Silakan coba kembali.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-sm font-bold text-slate-700">Email</span>
        <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-slate-300 px-3 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
          <Mail className="size-4 text-muted-text" aria-hidden="true" />
          <input
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="username"
            placeholder="admin@cucilagi.com"
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </label>
      <label className="block">
        <span className="text-sm font-bold text-slate-700">Password</span>
        <div className="mt-2 flex h-11 items-center gap-3 rounded-xl border border-slate-300 px-3 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
          <LockKeyhole className="size-4 text-muted-text" aria-hidden="true" />
          <input
            name="password"
            type="password"
            required
            maxLength={512}
            autoComplete="current-password"
            placeholder="Password"
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </label>

      {error ? <p role="alert" className="rounded-xl bg-danger/10 px-3 py-2 text-sm font-bold text-danger">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-11 w-full rounded-full bg-black px-5 text-sm font-bold text-white transition hover:bg-black-soft disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Memeriksa..." : "Login"}
      </button>
    </form>
  );
}
