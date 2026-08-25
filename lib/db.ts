import Database from "better-sqlite3";
import { mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { ARTICLES, JOBS, DOWNLOADS } from "@/lib/data";

function getDbPath(): string {
  // If running on Vercel or read-only environment, use /tmp
  if (process.env.VERCEL) {
    const tmp = join(tmpdir(), "spatial_data");
    try {
      mkdirSync(join(tmp, "uploads"), { recursive: true });
      const seedDbPath = join(process.cwd(), "data", "site.db");
      const targetDbPath = join(tmp, "site.db");
      if (!existsSync(targetDbPath) && existsSync(seedDbPath)) {
        try {
          copyFileSync(seedDbPath, targetDbPath);
        } catch {
          // ignore copy error
        }
      }
      return targetDbPath;
    } catch {
      return ":memory:";
    }
  }

  try {
    const dataDir = join(process.cwd(), "data");
    mkdirSync(join(dataDir, "uploads"), { recursive: true });
    return join(dataDir, "site.db");
  } catch {
    const tmp = join(tmpdir(), "spatial_data");
    try {
      mkdirSync(join(tmp, "uploads"), { recursive: true });
      return join(tmp, "site.db");
    } catch {
      return ":memory:";
    }
  }
}

let db: InstanceType<typeof Database>;

try {
  const dbPath = getDbPath();
  db = new Database(dbPath);
  if (dbPath !== ":memory:") {
    db.pragma("busy_timeout = 10000");
    try {
      db.pragma("journal_mode = WAL");
    } catch {
      // WAL mode may fail on some temporary filesystems
    }
  }
} catch {
  db = new Database(":memory:");
}

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
CREATE TABLE IF NOT EXISTS downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'PDF · RESOURCE',
  descr TEXT NOT NULL DEFAULT '',
  img TEXT NOT NULL DEFAULT '/assets/gen/terrain-hillshade.png',
  file_path TEXT,
  file_name TEXT,
  url TEXT,
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS otps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  purpose TEXT NOT NULL,
  ref TEXT NOT NULL DEFAULT '',
  code_hash TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  consumed INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
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
const seedDownloads = db.prepare(`
  INSERT INTO downloads (title, kind, descr, img, published, sort)
  VALUES (@title, @kind, @descr, @img, 1, @sort)
`);
const seedAll = db.transaction(() => {
  if ((db.prepare("SELECT COUNT(*) AS n FROM articles").get() as { n: number }).n === 0) {
    for (const a of ARTICLES) seedArticles.run({ ...a, body: JSON.stringify(a.body) });
  }
  if ((db.prepare("SELECT COUNT(*) AS n FROM jobs").get() as { n: number }).n === 0) {
    for (const j of JOBS) seedJobs.run({ ...j, skills: JSON.stringify(j.skills) });
  }
  if ((db.prepare("SELECT COUNT(*) AS n FROM downloads").get() as { n: number }).n === 0) {
    DOWNLOADS.forEach((d, i) => seedDownloads.run({ title: d.title, kind: d.kind, descr: d.desc, img: d.img, sort: i }));
  }
});
try {
  // IMMEDIATE takes the write lock up front, avoiding SQLITE_BUSY_SNAPSHOT when
  // several build workers open the DB at once. If another worker is already
  // seeding, we simply skip — the data will be present either way.
  seedAll.immediate();
} catch (err) {
  const code = (err as { code?: string }).code;
  if (code !== "SQLITE_BUSY" && code !== "SQLITE_BUSY_SNAPSHOT") throw err;
}

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
export type DownloadRow = {
  id: number;
  title: string;
  kind: string;
  descr: string;
  img: string;
  file_path: string | null;
  file_name: string | null;
  url: string | null;
  published: number;
  sort: number;
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

/* ---------------- Downloads ---------------- */
export function listDownloads(publishedOnly = false): DownloadRow[] {
  return db
    .prepare(`SELECT * FROM downloads ${publishedOnly ? "WHERE published = 1" : ""} ORDER BY sort ASC, id ASC`)
    .all() as DownloadRow[];
}
export function getDownloadById(id: number): DownloadRow | undefined {
  return db.prepare("SELECT * FROM downloads WHERE id = ?").get(id) as DownloadRow | undefined;
}
export function upsertDownload(d: Omit<DownloadRow, "id" | "created_at" | "updated_at"> & { id?: number }): number {
  if (d.id) {
    db.prepare(
      `UPDATE downloads SET title=@title, kind=@kind, descr=@descr, img=@img, file_path=@file_path,
       file_name=@file_name, url=@url, published=@published, sort=@sort, updated_at=datetime('now') WHERE id=@id`
    ).run(d);
    return d.id;
  }
  const res = db
    .prepare(
      `INSERT INTO downloads (title, kind, descr, img, file_path, file_name, url, published, sort)
       VALUES (@title, @kind, @descr, @img, @file_path, @file_name, @url, @published, @sort)`
    )
    .run(d);
  return Number(res.lastInsertRowid);
}
export function deleteDownload(id: number) {
  db.prepare("DELETE FROM downloads WHERE id = ?").run(id);
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

/* ---------------- OTPs ---------------- */
export type OtpRow = {
  id: number;
  email: string;
  purpose: string;
  ref: string;
  code_hash: string;
  attempts: number;
  consumed: number;
  expires_at: number;
  created_at: string;
};
export function insertOtp(o: { email: string; purpose: string; ref: string; code_hash: string; expires_at: number }): number {
  // Clear any prior unconsumed codes for this exact target.
  db.prepare("DELETE FROM otps WHERE email = @email AND purpose = @purpose AND ref = @ref AND consumed = 0").run(o);
  const res = db
    .prepare("INSERT INTO otps (email, purpose, ref, code_hash, expires_at) VALUES (@email, @purpose, @ref, @code_hash, @expires_at)")
    .run(o);
  return Number(res.lastInsertRowid);
}
export function latestOtp(email: string, purpose: string, ref: string): OtpRow | undefined {
  return db
    .prepare("SELECT * FROM otps WHERE email = ? AND purpose = ? AND ref = ? AND consumed = 0 ORDER BY id DESC LIMIT 1")
    .get(email, purpose, ref) as OtpRow | undefined;
}
export function bumpOtpAttempts(id: number) {
  db.prepare("UPDATE otps SET attempts = attempts + 1 WHERE id = ?").run(id);
}
export function consumeOtp(id: number) {
  db.prepare("UPDATE otps SET consumed = 1 WHERE id = ?").run(id);
}
export function recentOtpCount(email: string, secondsWindow: number): number {
  return (
    db
      .prepare(`SELECT COUNT(*) AS n FROM otps WHERE email = ? AND created_at >= datetime('now', ?)`)
      .get(email, `-${secondsWindow} seconds`) as { n: number }
  ).n;
}

export default db;
