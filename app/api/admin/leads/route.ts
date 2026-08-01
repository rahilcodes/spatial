import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth";
import { deleteLead, updateLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const data = await req.formData();
  const action = String(data.get("_action") || "update");
  const id = Number(data.get("id") || 0);
  const back = String(data.get("_back") || "/admin/leads");

  if (id) {
    if (action === "delete") {
      deleteLead(id);
    } else {
      updateLead(id, {
        status: String(data.get("status") || "") || undefined,
        notes: data.has("notes") ? String(data.get("notes")).slice(0, 5000) : undefined,
      });
    }
  }
  return NextResponse.redirect(new URL(back, req.url), 303);
}
