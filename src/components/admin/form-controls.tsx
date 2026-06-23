type FieldProps = {
  label: string;
  children: React.ReactNode;
};

export function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function TextInput({ className = "", ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={`h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10 ${className}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="min-h-[120px] w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
    />
  );
}

export function AdminButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="min-h-11 rounded-full bg-black px-5 text-sm font-bold text-white transition hover:bg-black-soft">
      {children}
    </button>
  );
}
