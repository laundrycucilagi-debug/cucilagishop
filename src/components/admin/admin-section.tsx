type AdminSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminSection({ title, description, children }: AdminSectionProps) {
  return (
    <section className="rounded-[18px] border border-border bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="font-heading text-xl font-extrabold text-black">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-muted-text">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
