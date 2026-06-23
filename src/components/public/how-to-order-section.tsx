import { MessageCircle, PackageCheck, ShoppingBag, Truck } from "lucide-react";

const steps = [
  { icon: ShoppingBag, title: "Pilih Produk" },
  { icon: MessageCircle, title: "Chat Admin" },
  { icon: PackageCheck, title: "Cek Stok" },
  { icon: Truck, title: "Ambil/Kirim" },
];

export function HowToOrderSection() {
  return (
    <section id="cara-pesan" className="bg-black py-8 text-white md:py-14">
      <div className="mx-auto w-[min(var(--container),calc(100%-32px))]">
        <div className="mx-auto mb-5 max-w-[760px] text-center md:mb-8">
          <p className="mb-2 text-[0.68rem] font-black uppercase text-primary md:text-[0.78rem]">Cara Pesan</p>
          <h2 className="font-heading text-2xl font-black leading-[1.05] text-white md:text-[clamp(2rem,4.2vw,3.1rem)]">
            Pesan Produk Tanpa Ribet
          </h2>
          <p className="mt-3 text-sm text-white/68 md:text-base">
            Alur pemesanan dibuat ringkas seperti proses laundry Cucilagi: pilih, chat, konfirmasi, lalu atur pengambilan atau pengiriman.
          </p>
        </div>

        <div className="grid grid-cols-4 rounded-[20px] border border-white/15 bg-white/[0.07] px-2 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur md:px-5 md:py-7" aria-label="Alur proses pemesanan">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative grid min-w-0 justify-items-center gap-2 text-center text-white/80 md:gap-3 ${
                index < steps.length - 1
                  ? "after:absolute after:left-[calc(50%+25px)] after:right-[calc(-50%+25px)] after:top-5 after:h-1 after:rounded-full after:bg-white/18 md:after:left-[calc(50%+36px)] md:after:right-[calc(-50%+36px)] md:after:top-[30px]"
                  : ""
              }`}
            >
              <span
                className={`relative z-10 grid size-10 place-items-center rounded-full border-[3px] md:size-[60px] md:border-4 ${
                  index === 0
                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_0_8px_rgba(255,187,16,0.12)] md:shadow-[0_0_0_12px_rgba(255,187,16,0.12)]"
                    : "border-white/18 bg-white/[0.08] text-white/58"
                }`}
              >
                <step.icon className="size-4 md:size-6" aria-hidden="true" />
              </span>
              <strong className={`max-w-[74px] break-words font-heading text-[0.62rem] font-black leading-tight md:max-w-[130px] md:text-base ${index === 0 ? "text-primary" : "text-white/58"}`}>
                {step.title}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
