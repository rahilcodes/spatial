import type { ArticleBody } from "@/lib/db";

/**
 * Admin editor convention <-> stored body blocks.
 * In the editor, a line starting with "## " begins a section heading;
 * blank lines separate paragraphs.
 */
export function textToBody(text: string): ArticleBody {
  const blocks: ArticleBody = [];
  let pendingHeading: string | undefined;
  for (const raw of text.replace(/\r\n/g, "\n").split(/\n{2,}/)) {
    const chunk = raw.trim();
    if (!chunk) continue;
    if (chunk.startsWith("## ")) {
      const [first, ...rest] = chunk.split("\n");
      pendingHeading = first.slice(3).trim();
      const para = rest.join(" ").trim();
      if (para) {
        blocks.push({ h: pendingHeading, p: para });
        pendingHeading = undefined;
      }
      continue;
    }
    blocks.push({ h: pendingHeading, p: chunk.replace(/\n/g, " ") });
    pendingHeading = undefined;
  }
  return blocks;
}

export function bodyToText(body: ArticleBody): string {
  return body
    .map((b) => (b.h ? `## ${b.h}\n\n${b.p}` : b.p))
    .join("\n\n");
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
