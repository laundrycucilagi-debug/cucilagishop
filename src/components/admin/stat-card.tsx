import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, helper, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-[20px] border border-border bg-white p-4 shadow-soft md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="order-2 md:order-1">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.08em] text-muted-text md:text-sm md:normal-case md:tracking-normal">{label}</p>
          <p className="mt-2 break-words font-heading text-2xl font-extrabold leading-tight text-black md:mt-3 md:text-3xl">{value}</p>
        </div>
        <div className="order-1 flex size-11 items-center justify-center rounded-[16px] bg-primary/18 text-black md:order-2 md:size-12 md:bg-primary">
          <Icon className="size-5 md:size-6" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-3 hidden text-sm leading-6 text-muted-text md:block">{helper}</p>
    </div>
  );
}
