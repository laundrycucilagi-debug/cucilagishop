import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin-session";
import { getBackupPayload } from "@/lib/backup/data";
import { createExcelBackup, createPdfBackup } from "@/lib/backup/exporters";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const format = new URL(request.url).searchParams.get("format");
  if (format !== "excel" && format !== "pdf") {
    return NextResponse.json({ error: "Format backup tidak didukung." }, { status: 400 });
  }

  try {
    const payload = await getBackupPayload(admin);
    const timestamp = payload.generatedAt.replace(/[:.]/g, "-");
    const isExcel = format === "excel";
    const file = isExcel ? createExcelBackup(payload) : createPdfBackup(payload);
    const extension = isExcel ? "xls" : "pdf";

    return new Response(file, {
      headers: {
        "Content-Type": isExcel ? "application/vnd.ms-excel; charset=utf-8" : "application/pdf",
        "Content-Disposition": `attachment; filename="cucilagi-shop-backup-${timestamp}.${extension}"`,
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Backup belum dapat dibuat." }, { status: 500 });
  }
}
