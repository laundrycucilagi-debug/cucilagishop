import Image from "next/image";

type BrandMarkProps = {
  inverted?: boolean;
  priority?: boolean;
  tone?: "light" | "dark";
};

export const logoUrl = "https://plain-apac-prod-public.komododecks.com/202605/07/AyzBMdfYK05cZFfg0XnP/image.png";

export function BrandMark({ inverted = false, priority = false, tone }: BrandMarkProps) {
  const darkText = tone === "dark";

  return (
    <div className="flex items-center gap-3">
      <Image
        src={logoUrl}
        alt=""
        width={56}
        height={56}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        aria-hidden="true"
        sizes="52px"
        className="size-[52px] shrink-0 object-contain max-[820px]:size-[46px]"
      />
      <div>
        <p className={`font-heading text-[1.05rem] font-black leading-tight ${darkText ? "text-black" : inverted ? "text-primary" : "text-white"}`}>
          Cucilagi
        </p>
        <p
          className={`mt-0.5 whitespace-nowrap text-[0.72rem] font-bold leading-[1.3] max-[820px]:text-[0.62rem] ${
            darkText ? "text-muted-text" : inverted ? "text-white/70" : "text-white/75"
          }`}
        >
          Laundry Syariah & Setrika Uap
        </p>
      </div>
    </div>
  );
}
