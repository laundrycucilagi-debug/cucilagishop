"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/public/brand-mark";
import { cn } from "@/lib/utils";

const websiteHome = "https://www.cucilagilaundry.com/";
const websiteOrigin = "https://www.cucilagilaundry.com";

const navItems = [
  { href: `${websiteOrigin}/#beranda`, label: "Beranda" },
  { href: `${websiteOrigin}/p/profil.html`, label: "Profil" },
  { href: `${websiteOrigin}/#layanan`, label: "Layanan" },
  { href: `${websiteOrigin}/#membership`, label: "Membership" },
  { href: `${websiteOrigin}/#toko`, label: "Shop" },
  { href: `${websiteOrigin}/#outlet`, label: "Outlet" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const solidHeader = isScrolled || isOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b transition-[background,box-shadow,border-color] duration-[250ms]",
        solidHeader
          ? "border-black/10 bg-white/95 shadow-[0_14px_40px_rgba(13,13,13,0.08)] backdrop-blur-[18px]"
          : "border-white/10 bg-transparent",
      )}
    >
      <div className="mx-auto flex min-h-[76px] w-[min(var(--container),calc(100%-32px))] items-center justify-between gap-6 max-[820px]:min-h-[70px] max-[820px]:w-[min(calc(100%-24px),var(--container))]">
        <a href={websiteHome} aria-label="Cucilagi Laundry Syariah & Setrika Uap" className="inline-flex font-black">
          <div className={cn(solidHeader && "[&_p:first-of-type]:!text-black [&_p:last-of-type]:!text-muted-text")}>
            <BrandMark priority />
          </div>
        </a>

        <nav
          className={cn(
            "flex items-center gap-1 rounded-full p-1.5 max-[1100px]:hidden",
            solidHeader ? "bg-light-gray" : "bg-white/10",
          )}
          aria-label="Navigasi publik"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-2.5 py-[9px] text-[0.82rem] font-extrabold transition",
                solidHeader ? "text-black hover:bg-white" : "text-white/85 hover:bg-white/15 hover:text-white",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className={cn(
            "hidden size-11 shrink-0 items-center justify-center rounded-full border transition max-[1100px]:inline-flex",
            solidHeader ? "border-border bg-white text-black" : "border-white/20 bg-white/10 text-white",
          )}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-white max-[1100px]:block min-[1101px]:hidden">
          <nav
            className="mx-auto grid w-[min(var(--container),calc(100%-32px))] grid-cols-2 gap-2 px-0 pb-[18px] pt-3 max-[820px]:w-[min(calc(100%-24px),var(--container))]"
            aria-label="Menu mobile"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl bg-light-gray px-3.5 py-[13px] font-extrabold text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
