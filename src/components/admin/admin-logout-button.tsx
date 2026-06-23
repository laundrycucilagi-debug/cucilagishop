"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AdminLogoutButton({ iconOnly = false }: { iconOnly?: boolean }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={isLoading}
      aria-label="Logout admin"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-bold transition disabled:cursor-wait disabled:opacity-60",
        iconOnly
          ? "size-14 shrink-0 rounded-[20px] bg-white/40 text-black shadow-soft"
          : "mt-4 min-h-10 w-full rounded-full bg-white/12 text-sm text-white hover:bg-white/18",
      )}
    >
      <LogOut className={iconOnly ? "size-6" : "size-4"} aria-hidden="true" />
      {iconOnly ? null : isLoading ? "Keluar..." : "Logout"}
    </button>
  );
}
