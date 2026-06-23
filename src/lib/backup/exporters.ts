import type { BackupPayload } from "@/lib/backup/data";

export function createExcelBackup(payload: BackupPayload) {
  const worksheets = [
    createWorksheet("Metadata", [
      { key: "generated_at", value: payload.generatedAt },
      { key: "generated_by", value: payload.generatedBy },
    ]),
    ...Object.entries(payload.tables).map(([name, rows]) => createWorksheet(name, rows)),
  ].join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Styles>
  <Style ss:ID="Header"><Font ss:Bold="1"/><Interior ss:Color="#FFBB10" ss:Pattern="Solid"/></Style>
 </Styles>
 ${worksheets}
</Workbook>`;

  return new TextEncoder().encode(xml);
}

export function createPdfBackup(payload: BackupPayload) {
  const lines = buildPdfLines(payload);
  const pages = chunk(lines, 56);
  const objects: Record<number, string> = {};
  const pageIds = pages.map((_, index) => 4 + index * 2);

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  pages.forEach((pageLines, index) => {
    const pageId = pageIds[index];
    const contentId = pageId + 1;
    const stream = [
      "BT",
      "/F1 8 Tf",
      "38 808 Td",
      "11 TL",
      ...pageLines.map((line) => `(${escapePdfText(line)}) Tj T*`),
      "ET",
    ].join("\n");

    objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${Buffer.byteLength(stream, "ascii")} >>\nstream\n${stream}\nendstream`;
  });

  return serializePdf(objects);
}

function createWorksheet(name: string, rows: Array<Record<string, unknown>>) {
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const headerRow = headers.length
    ? `<Row>${headers.map((header) => `<Cell ss:StyleID="Header"><Data ss:Type="String">${escapeXml(header)}</Data></Cell>`).join("")}</Row>`
    : "";
  const bodyRows = rows
    .map(
      (row) =>
        `<Row>${headers.map((header) => createExcelCell(row[header])).join("")}</Row>`,
    )
    .join("");

  return `<Worksheet ss:Name="${escapeXml(name.slice(0, 31))}"><Table>${headerRow}${bodyRows}</Table></Worksheet>`;
}

function createExcelCell(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `<Cell><Data ss:Type="Number">${value}</Data></Cell>`;
  }

  if (typeof value === "boolean") {
    return `<Cell><Data ss:Type="Boolean">${value ? 1 : 0}</Data></Cell>`;
  }

  const raw = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  const safeValue = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `<Cell><Data ss:Type="String">${escapeXml(safeValue)}</Data></Cell>`;
}

function buildPdfLines(payload: BackupPayload) {
  const lines = [
    "CUCILAGI SHOP - BACKUP DATA",
    `Dibuat: ${payload.generatedAt}`,
    `Admin: ${payload.generatedBy}`,
    "",
  ];

  Object.entries(payload.tables).forEach(([name, rows]) => {
    lines.push(`=== ${name.toUpperCase()} (${rows.length} data) ===`);
    if (!rows.length) {
      lines.push("Tidak ada data.", "");
      return;
    }

    rows.forEach((row, index) => {
      const summary = Object.entries(row)
        .map(([key, value]) => `${key}=${formatPdfValue(value)}`)
        .join(" | ");
      lines.push(...wrapLine(`${index + 1}. ${summary}`, 96));
    });
    lines.push("");
  });

  return lines;
}

function serializePdf(objects: Record<number, string>) {
  const objectIds = Object.keys(objects).map(Number).sort((a, b) => a - b);
  let output = "%PDF-1.4\n%CUCILAGI\n";
  const offsets: number[] = [0];

  objectIds.forEach((id) => {
    offsets[id] = Buffer.byteLength(output, "ascii");
    output += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(output, "ascii");
  const size = Math.max(...objectIds) + 1;
  output += `xref\n0 ${size}\n`;
  output += "0000000000 65535 f \n";

  for (let id = 1; id < size; id += 1) {
    output += `${String(offsets[id] || 0).padStart(10, "0")} 00000 n \n`;
  }

  output += `trailer\n<< /Size ${size} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Uint8Array(Buffer.from(output, "ascii"));
}

function wrapLine(value: string, maxLength: number) {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    if (`${current} ${word}`.trim().length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

function formatPdfValue(value: unknown) {
  if (value == null) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapePdfText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function chunk<T>(values: T[], size: number) {
  const result: T[][] = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result.length ? result : [[]];
}
