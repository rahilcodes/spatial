import { del, get, put } from "@vercel/blob";

/** Uploads a file to the (private) Vercel Blob store and returns its URL. */
export async function uploadBlob(prefix: string, file: File): Promise<string> {
  const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(-80) || "file";
  const { url } = await put(`${prefix}/${safeName}`, file, {
    access: "private",
    addRandomSuffix: true,
  });
  return url;
}

/** Reads a private blob for streaming through an authenticated route. */
export async function getBlobStream(
  urlOrPathname: string
): Promise<{ stream: ReadableStream<Uint8Array>; contentType: string } | null> {
  const r = await get(urlOrPathname, { access: "private" });
  if (!r || r.statusCode !== 200) return null;
  return { stream: r.stream, contentType: r.blob.contentType || "application/octet-stream" };
}

export async function deleteBlob(url: string): Promise<void> {
  try {
    await del(url);
  } catch {
    // best-effort
  }
}
