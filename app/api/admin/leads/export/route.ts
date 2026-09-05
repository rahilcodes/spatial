import { requireAdminApi } from "@/lib/auth";
import { listLeads } from "@/lib/db";

function csvCell(v: string | null): string {
  const s = v ?? "";
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const rows = await listLeads();
  const header = "id,kind,name,email,topic,message,status,notes,cv_name,created_at";
  const body = rows
    .map((l) =>
      [String(l.id), l.kind, l.name, l.email, l.topic, l.message, l.status, l.notes, l.cv_name ?? "", l.created_at]
        .map(csvCell)
        .join(",")
    )
    .join("\n");

  return new Response(`${header}\n${body}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="spatial-alphabet-leads.csv"`,
    },
  });
}
