import { BadgePercent, MapPin, MessageCircle, PackageCheck, Truck } from "lucide-react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const websiteOrigin = "https://www.cucilagilaundry.com";

const bottomMenuItems = [
  { href: getWhatsAppUrl(), label: "WhatsApp", icon: MessageCircle, external: true },
  { href: `${websiteOrigin}/#pickup`, label: "Pickup", icon: Truck, external: false },
  { href: "https://app.cucilagilaundry.com/tracking", label: "Tracking", icon: PackageCheck, external: true },
  { href: `${websiteOrigin}/#membership`, label: "Membership", icon: BadgePercent, external: false },
  { href: `${websiteOrigin}/#outlet`, label: "Outlet", icon: MapPin, external: false },
];

export function FloatingWhatsAppButton() {
  return (
    <nav
      className="fixed bottom-3 left-1/2 z-[90] grid w-[calc(100%-24px)] max-w-[560px] -translate-x-1/2 grid-cols-5 items-center rounded-[28px] border border-white/80 bg-white px-2.5 py-2.5 shadow-[0_18px_40px_rgba(13,13,13,0.18)] lg:hidden"
      aria-label="Navigasi publik Cucilagi"
    >
      {bottomMenuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="grid min-h-[58px] justify-items-center gap-1 rounded-[18px] px-1 py-1 text-center text-[0.6rem] font-black leading-none text-muted-text transition hover:bg-light-gray hover:text-black sm:text-[0.68rem]"
        >
          <item.icon className="size-5 text-black sm:size-6" aria-hidden="true" />
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
