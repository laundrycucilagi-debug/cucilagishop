import { MessageCircle } from "lucide-react";
import { PrimaryLink, WhatsAppButton } from "@/components/public/buttons";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative isolate flex min-h-[clamp(420px,56svh,560px)] items-center overflow-hidden text-white"
    >
      <div
        className="absolute inset-0 z-[-2] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(13, 13, 13, 0.94) 0%, rgba(13, 13, 13, 0.78) 48%, rgba(13, 13, 13, 0.34) 100%), url('https://images.unsplash.com/photo-1610305401607-8745a10c75dd?auto=format&fit=crop&w=1800&q=82')",
        }}
      />
      <div className="absolute bottom-[5%] right-[8%] z-[-1] size-[240px] rounded-full bg-primary/25 blur-[42px]" />
      <div className="absolute inset-x-0 bottom-0 z-[-1] h-24 bg-[linear-gradient(0deg,rgba(13,13,13,0.72),transparent)]" />

      <div className="mx-auto w-[min(var(--container),calc(100%-32px))] pb-10 pt-28 md:pb-14 md:pt-32">
        <div className="max-w-[760px]">
          <p className="mb-3 inline-flex max-w-full rounded-full border border-primary/40 bg-primary/15 px-3 py-2 text-[0.65rem] font-black uppercase text-primary md:text-[0.78rem]">
            Laundry Syariah Profesional di Banda Aceh dan Aceh Besar Sekitar
          </p>

          <h1 className="font-heading text-[clamp(2.15rem,7vw,4rem)] font-black leading-[0.98] text-white">
            Belanja Produk <span className="text-primary">Cucilagi</span> Lebih Mudah
          </h1>
          <p className="mt-4 max-w-[650px] text-sm leading-7 text-white/85 md:text-base">
            Pilih produk laundry, cek stok, lalu pesan langsung melalui WhatsApp Admin Cucilagi.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="#produk" className="w-full sm:w-auto">
              Lihat Produk
            </PrimaryLink>
            <WhatsAppButton
              href={getWhatsAppUrl()}
              className="w-full bg-white text-black shadow-[0_14px_30px_rgba(0,0,0,0.12)] hover:bg-white sm:w-auto"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Chat Admin
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
