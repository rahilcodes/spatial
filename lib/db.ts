import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { ARTICLES, JOBS } from "@/lib/data";

const DATA_DIR = join(process.cwd(), "data");
mkdirSync(join(DATA_DIR, "uploads"), { recursive: true });

const db = new Database(join(DATA_DIR, "site.db"));
// Build workers and the server can open this file concurrently — wait for
// locks (up to 5s) instead of throwing SQLITE_BUSY.
db.pragma("busy_timeout = 5000");
db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  tag TEXT NOT NULL,
  date_label TEXT NOT NULL,
  date_iso TEXT NOT NULL,
  description TEXT NOT NULL,
  reading_time TEXT NOT NULL,
  img TEXT NOT NULL DEFAULT '/assets/gen/terrain-hillshade.png',
  img_alt TEXT NOT NULL DEFAULT '',
  body_json TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  office TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Full-time',
  blurb TEXT NOT NULL,
  skills_json TEXT NOT NULL DEFAULT '[]',
  open INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL CHECK (kind IN ('contact','careers')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  cv_path TEXT,
  cv_name TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

// Seed once from the launch content in lib/data.ts (INSERT OR IGNORE keeps this idempotent).
const seedArticles = db.prepare(`
  INSERT OR IGNORE INTO articles (slug, title, meta_title, tag, date_label, date_iso, description, reading_time, img, img_alt, body_json)
  VALUES (@slug, @title, @metaTitle, @tag, @date, @dateISO, @description, @readingTime, @img, @imgAlt, @body)
`);
const seedJobs = db.prepare(`
  INSERT OR IGNORE INTO jobs (slug, title, office, type, blurb, skills_json)
  VALUES (@slug, @title, @office, @type, @blurb, @skills)
`);
db.transaction(() => {
  if ((db.prepare("SELECT COUNT(*) AS n FROM articles").get() as { n: number }).n === 0) {
    for (const a of ARTICLES) seedArticles.run({ ...a, body: JSON.stringify(a.body) });
  }
  if ((db.prepare("SELECT COUNT(*) AS n FROM jobs").get() as { n: number }).n === 0) {
    for (const j of JOBS) seedJobs.run({ ...j, skills: JSON.stringify(j.skills) });
  }
})();

/* ---------------- Types ---------------- */
export type ArticleRow = {
  id: number;
  slug: string;
  title: string;
  meta_title: string;
  tag: string;
  date_label: string;
  date_iso: string;
  description: string;
  reading_time: string;
  img: string;
  img_alt: string;
  body_json: string;
  published: number;
  created_at: string;
  updated_at: string;
};
export type JobRow = {
  id: number;
  slug: string;
  title: string;
  office: string;
  type: string;
  blurb: string;
  skills_json: string;
  open: number;
  created_at: string;
  updated_at: string;
};
export type LeadRow = {
  id: number;
  kind: "contact" | "careers";
  name: string;
  email: string;
  topic: string;
  message: string;
  cv_path: string | null;
  cv_name: string | null;
  status: "new" | "contacted" | "closed";
  notes: string;
  created_at: string;
  updated_at: string;
};
export type ArticleBody = { h?: string; p: string }[];

/* ---------------- Articles ---------------- */
export function listArticles(publishedOnly = false): ArticleRow[] {
  return db
    .prepare(`SELECT * FROM articles ${publishedOnly ? "WHERE published = 1" : ""} ORDER BY date_iso DESC, id DESC`)
    .all() as ArticleRow[];
}
export function getArticle(slug: string): ArticleRow | undefined {
  return db.prepare("SELECT * FROM articles WHERE slug = ?").get(slug) as ArticleRow | undefined;
}
export function getArticleById(id: number): ArticleRow | undefined {
  return db.prepare("SELECT * FROM articles WHERE id = ?").get(id) as ArticleRow | undefined;
}
export function upsertArticle(a: Omit<ArticleRow, "id" | "created_at" | "updated_at"> & { id?: number }): number {
  if (a.id) {
    db.prepare(
      `UPDATE articles SET slug=@slug, title=@title, meta_title=@meta_title, tag=@tag, date_label=@date_label,
       date_iso=@date_iso, description=@description, reading_time=@reading_time, img=@img, img_alt=@img_alt,
       body_json=@body_json, published=@published, updated_at=datetime('now') WHERE id=@id`
    ).run(a);
    return a.id;
  }
  const res = db
    .prepare(
      `INSERT INTO articles (slug, title, meta_title, tag, date_label, date_iso, description, reading_time, img, img_alt, body_json, published)
       VALUES (@slug, @title, @meta_title, @tag, @date_label, @date_iso, @description, @reading_time, @img, @img_alt, @body_json, @published)`
    )
    .run(a);
  return Number(res.lastInsertRowid);
}
export function deleteArticle(id: number) {
  db.prepare("DELETE FROM articles WHERE id = ?").run(id);
}

/* ---------------- Jobs ---------------- */
export function listJobs(openOnly = false): JobRow[] {
  return db.prepare(`SELECT * FROM jobs ${openOnly ? "WHERE open = 1" : ""} ORDER BY id ASC`).all() as JobRow[];
}
export function getJobById(id: number): JobRow | undefined {
  return db.prepare("SELECT * FROM jobs WHERE id = ?").get(id) as JobRow | undefined;
}
export function upsertJob(j: Omit<JobRow, "id" | "created_at" | "updated_at"> & { id?: number }): number {
  if (j.id) {
    db.prepare(
      `UPDATE jobs SET slug=@slug, title=@title, office=@office, type=@type, blurb=@blurb,
       skills_json=@skills_json, open=@open, updated_at=datetime('now') WHERE id=@id`
    ).run(j);
    return j.id;
  }
  const res = db
    .prepare(
      `INSERT INTO jobs (slug, title, office, type, blurb, skills_json, open)
       VALUES (@slug, @title, @office, @type, @blurb, @skills_json, @open)`
    )
    .run(j);
  return Number(res.lastInsertRowid);
}
export function deleteJob(id: number) {
  db.prepare("DELETE FROM jobs WHERE id = ?").run(id);
}

/* ---------------- Leads ---------------- */
export function createLead(l: {
  kind: "contact" | "careers";
  name: string;
  email: string;
  topic: string;
  message: string;
  cv_path?: string;
  cv_name?: string;
}): number {
  const res = db
    .prepare(
      `INSERT INTO leads (kind, name, email, topic, message, cv_path, cv_name)
       VALUES (@kind, @name, @email, @topic, @message, @cv_path, @cv_name)`
    )
    .run({ cv_path: null, cv_name: null, ...l });
  return Number(res.lastInsertRowid);
}
export function listLeads(filter?: { status?: string; kind?: string }): LeadRow[] {
  const clauses: string[] = [];
  const params: Record<string, string> = {};
  if (filter?.status && ["new", "contacted", "closed"].includes(filter.status)) {
    clauses.push("status = @status");
    params.status = filter.status;
  }
  if (filter?.kind && ["contact", "careers"].includes(filter.kind)) {
    clauses.push("kind = @kind");
    params.kind = filter.kind;
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return db.prepare(`SELECT * FROM leads ${where} ORDER BY id DESC`).all(params) as LeadRow[];
}
export function getLeadById(id: number): LeadRow | undefined {
  return db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as LeadRow | undefined;
}
export function updateLead(id: number, fields: { status?: string; notes?: string }) {
  const lead = getLeadById(id);
  if (!lead) return;
  db.prepare("UPDATE leads SET status = @status, notes = @notes, updated_at = datetime('now') WHERE id = @id").run({
    id,
    status: fields.status && ["new", "contacted", "closed"].includes(fields.status) ? fields.status : lead.status,
    notes: fields.notes ?? lead.notes,
  });
}
export function deleteLead(id: number) {
  db.prepare("DELETE FROM leads WHERE id = ?").run(id);
}
export function leadCounts(): { total: number; fresh: number; contact: number; careers: number } {
  const total = (db.prepare("SELECT COUNT(*) AS n FROM leads").get() as { n: number }).n;
  const fresh = (db.prepare("SELECT COUNT(*) AS n FROM leads WHERE status = 'new'").get() as { n: number }).n;
  const contact = (db.prepare("SELECT COUNT(*) AS n FROM leads WHERE kind = 'contact'").get() as { n: number }).n;
  const careers = (db.prepare("SELECT COUNT(*) AS n FROM leads WHERE kind = 'careers'").get() as { n: number }).n;
  return { total, fresh, contact, careers };
}

export default db;
