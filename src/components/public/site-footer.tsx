import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { logoUrl } from "@/components/public/brand-mark";

const websiteHome = "https://www.cucilagilaundry.com/";

export function SiteFooter() {
  return (
    <footer id="kontak" className="bg-black px-4 py-16 pb-[116px] text-white md:px-6">
      <div className="mx-auto grid w-[min(var(--container),calc(100%-32px))] items-start gap-[34px] md:grid-cols-[minmax(0,1.4fr)_minmax(240px,0.6fr)]">
        <div className="max-w-[390px]">
          <a href={websiteHome} className="inline-flex items-center gap-3 font-black">
            <Image
              src={logoUrl}
              alt=""
              width={48}
              height={48}
              loading="lazy"
              aria-hidden="true"
              sizes="52px"
              className="size-[52px] object-contain"
            />
            <span className="text-primary">Cucilagi Laundry</span>
          </a>

          <p className="mt-4 max-w-[390px] text-sm leading-7 text-white/70">
            Laundry syariah profesional dengan layanan pickup, 1 mesin 1 pelanggan, dan customer support responsif.
          </p>

          <div className="mt-[22px] flex max-w-[390px] flex-wrap gap-2.5" aria-label="Media sosial">
            <SocialLink href="https://www.instagram.com/cucilagi/" label="Instagram Cucilagi">
              <InstagramIcon />
              <span>Instagram</span>
            </SocialLink>
            <SocialLink href="https://www.facebook.com/cucilagilaundry/" label="Facebook Cucilagi">
              <FacebookIcon />
              <span>Facebook</span>
            </SocialLink>
            <SocialLink href="https://www.tiktok.com/@cucilagibandaaceh" label="TikTok Cucilagi">
              <TikTokIcon />
              <span>TikTok</span>
            </SocialLink>
          </div>
        </div>

        <div className="min-w-60 md:justify-self-end">
          <h3 className="mb-[18px] font-heading text-base font-black text-primary">Kontak</h3>
          <FooterIconLink href="https://wa.me/6285210107054">
            <MessageCircle className="size-4 shrink-0 text-primary" aria-hidden="true" />
            +62 852-1010-7054
          </FooterIconLink>
          <FooterIconLink href="https://www.google.com/maps/search/?api=1&query=Cucilagi+Laundry+Banda+Aceh">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
            Banda Aceh & Aceh Besar sekitar
          </FooterIconLink>
        </div>
      </div>

      <div className="mx-auto mt-11 flex w-[min(var(--container),calc(100%-32px))] justify-start gap-5 border-t border-white/10 pt-6">
        <p className="text-sm text-white/70">© 2026 Cucilagi Laundry. All rights reserved.</p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-white/10 px-3 py-[9px] text-[0.82rem] font-bold text-white/80 transition hover:text-primary"
    >
      {children}
    </a>
  );
}

function FooterIconLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-2.5 flex items-center gap-2 font-bold text-white/80 transition hover:text-primary"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg className="size-4 shrink-0 text-primary" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="size-4 shrink-0 text-primary" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14 8h3V4h-3c-3.4 0-5.2 2-5.2 5.3V11H6v4h2.8v7H13v-7h3.3l.7-4h-4V9.4C13 8.5 13.4 8 14 8Z"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="size-4 shrink-0 text-primary" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M15.1 3c.3 2.5 1.8 4 4.4 4.4v4.1c-1.6 0-3.1-.5-4.4-1.4v5.1c0 3.2-2.4 5.5-5.5 5.5A5.1 5.1 0 0 1 4.5 15.6c0-3 2.3-5.2 5.2-5.2.4 0 .8 0 1.2.1v4.1a2 2 0 0 0-1.1-.3c-.9 0-1.6.6-1.6 1.5s.7 1.5 1.6 1.5 1.6-.6 1.6-1.6V3h3.7Z"
      />
    </svg>
  );
}
