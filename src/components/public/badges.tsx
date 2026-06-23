import { cn } from "@/lib/utils";
import type { ProductStatus } from "@/lib/types";
import { getStockStatusLabel } from "@/lib/format";

export function DiscountBadge({ percentage, className }: { percentage: number; className?: string }) {
  if (!percentage) {
    return null;
  }

  return (
    <span className={cn("inline-flex w-max rounded-full bg-primary px-3 py-1 text-[0.72rem] font-black uppercase text-black", className)}>
      Diskon {percentage}%
    </span>
  );
}

export function StockBadge({ status, className }: { status: ProductStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-max rounded-full px-3 py-1 text-[0.72rem] font-black uppercase",
        status === "available" && "bg-[#DCFCE7] text-[#166534]",
        status === "limited" && "bg-[#FEF3C7] text-[#92400E]",
        status === "empty" && "bg-[#FEE2E2] text-[#991B1B]",
        className,
      )}
    >
      {getStockStatusLabel(status)}
    </span>
  );
}
