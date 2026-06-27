"use client";

import { DatabaseBackup, FileSpreadsheet, FileText, LoaderCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";

type BackupFormat = "excel" | "pdf";

export function AdminBackupClient() {
  const [activeFormat, setActiveFormat] = useState<BackupFormat | null>(null);
  const [message, setMessage] = useState("");

  async function downloadBackup(format: BackupFormat) {
    setActiveFormat(format);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/backup?format=${format}`, {
        credentials: "same-origin",
      });

      if (!response.ok) {
        setMessage("Backup belum dapat dibuat. Periksa koneksi dan sesi admin.");
        return;
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition") || "";
      const filename = disposition.match(/filename="([^"]+)"/)?.[1] || `cucilagi-backup.${format === "excel" ? "xls" : "pdf"}`;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setMessage(`Backup ${format === "excel" ? "Excel" : "PDF"} berhasil dibuat.`);
    } catch {
      setMessage("Backup belum dapat dibuat. Silakan coba kembali.");
    } finally {
      setActiveFormat(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Keamanan Data</p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold text-black">Backup Semua Data</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-text">
          Backup mengambil produk, penjualan, dan riwayat stok langsung dari Supabase setelah sesi admin valid.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BackupCard
          title="Backup Excel"
          description="File .xls kompatibel dengan Microsoft Excel dan berisi satu sheet untuk setiap tabel."
          icon={FileSpreadsheet}
          isLoading={activeFormat === "excel"}
          disabled={activeFormat !== null}
          onClick={() => downloadBackup("excel")}
        />
        <BackupCard
          title="Backup PDF"
          description="Dokumen PDF berhalaman yang merangkum seluruh record untuk arsip dan pemeriksaan."
          icon={FileText}
          isLoading={activeFormat === "pdf"}
          disabled={activeFormat !== null}
          onClick={() => downloadBackup("pdf")}
        />
      </div>

      <div className="rounded-[20px] border border-border bg-white p-5 shadow-card">
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-success/10 text-success">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-extrabold text-black">Akses Terproteksi</h3>
            <p className="mt-1 text-sm leading-6 text-muted-text">
              Endpoint backup memverifikasi sesi admin. File tidak disimpan di server.
            </p>
          </div>
        </div>
      </div>

      {message ? <p role="status" className="rounded-2xl bg-black px-4 py-3 text-sm font-bold text-white">{message}</p> : null}
    </div>
  );
}

function BackupCard({
  title,
  description,
  icon: Icon,
  isLoading,
  disabled,
  onClick,
}: {
  title: string;
  description: string;
  icon: typeof DatabaseBackup;
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <article className="flex flex-col rounded-[20px] border border-border bg-white p-5 shadow-card">
      <div className="grid size-12 place-items-center rounded-2xl bg-primary text-black">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-heading text-xl font-extrabold text-black">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-text">{description}</p>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-bold text-white transition hover:bg-black-soft disabled:cursor-wait disabled:opacity-60"
      >
        {isLoading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Icon className="size-4" aria-hidden="true" />}
        {isLoading ? "Membuat backup..." : title}
      </button>
    </article>
  );
}
