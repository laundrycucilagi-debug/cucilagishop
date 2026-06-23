import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsAppButton() {
  return (
    <Link
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[22px] right-5 z-[90] grid size-[58px] place-items-center rounded-full bg-primary text-black shadow-[0_16px_38px_rgba(13,13,13,0.22)] transition hover:-translate-y-0.5 hover:bg-primary-dark"
      aria-label="Hubungi WhatsApp Cucilagi"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </Link>
  );
}
