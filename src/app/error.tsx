"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-light-gray px-4">
      <div className="w-full max-w-md rounded-[20px] border border-border bg-white p-6 text-center shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-primary">Cucilagi Shop</p>
        <h1 className="mt-3 font-heading text-2xl font-black text-black">Terjadi kendala</h1>
        <p className="mt-2 text-sm leading-6 text-muted-text">Halaman belum dapat diproses. Silakan coba kembali.</p>
        <button type="button" onClick={reset} className="mt-6 min-h-11 rounded-full bg-black px-5 text-sm font-bold text-white">
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
