import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export function WhatsAppButton({ href, children = "Pesan via WhatsApp", className, disabled }: WhatsAppButtonProps) {
  if (disabled) {
    return (
      <span
        className={cn(
          "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-slate-200 px-6 py-3 text-sm font-black text-muted-text",
          className,
        )}
        aria-disabled="true"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        Stok Habis
      </span>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black leading-none text-black shadow-[0_14px_30px_rgba(255,187,16,0.24)] transition hover:-translate-y-0.5 hover:bg-primary-dark",
        className,
      )}
      aria-label="Pesan produk melalui WhatsApp"
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      {children}
    </Link>
  );
}

type PrimaryLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function PrimaryLink({ href, children, className }: PrimaryLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-[50px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-black leading-none text-black shadow-[0_14px_30px_rgba(255,187,16,0.24)] transition hover:-translate-y-0.5 hover:bg-primary-dark",
        className,
      )}
    >
      {children}
    </Link>
  );
}
