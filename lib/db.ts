import { Pool } from "pg";
import { ARTICLES, JOBS, DOWNLOADS } from "@/lib/data";

/**
 * Neon Postgres data layer. All functions are async. Row shapes match the
 * previous SQLite layer so callers only need to `await`.
 */

// node-postgres does not support SCRAM channel binding; strip it if present.
const connectionString = (process.env.DATABASE_URL || process.env.POSTGRES_URL || "")
  .replace(/&channel_binding=require/g, "")
  .replace(/\?channel_binding=require&?/g, "?")
  .replace(/[?&]$/, "");

let pool: Pool | null = null;
function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 30000,
      // Fail fast if Neon can't be reached (Vercel functions are capped at 10s):
      // a quick error the pages can handle beats a request that hangs on TCP timeout.
      connectionTimeoutMillis: 8000,
    });
  }
  return pool;
}

const NOW = "to_char((now() AT TIME ZONE 'utc'),'YYYY-MM-DD HH24:MI:SS')";

let readyPromise: Promise<void> | null = null;
function ensureReady(): Promise<void> {
  if (!readyPromise) readyPromise = init().catch((e) => { readyPromise = null; throw e; });
  return readyPromise;
}

async function init(): Promise<void> {
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
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
      created_at TEXT NOT NULL DEFAULT ${NOW},
      updated_at TEXT NOT NULL DEFAULT ${NOW}
    );
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      office TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'Full-time',
      blurb TEXT NOT NULL,
      skills_json TEXT NOT NULL DEFAULT '[]',
      open INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT ${NOW},
      updated_at TEXT NOT NULL DEFAULT ${NOW}
    );
    CREATE TABLE IF NOT EXISTS downloads (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      kind TEXT NOT NULL DEFAULT 'PDF · RESOURCE',
      descr TEXT NOT NULL DEFAULT '',
      img TEXT NOT NULL DEFAULT '/assets/gen/terrain-hillshade.png',
      file_path TEXT,
      file_name TEXT,
      url TEXT,
      published INTEGER NOT NULL DEFAULT 1,
      sort INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT ${NOW},
      updated_at TEXT NOT NULL DEFAULT ${NOW}
    );
    CREATE TABLE IF NOT EXISTS otps (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      purpose TEXT NOT NULL,
      ref TEXT NOT NULL DEFAULT '',
      code_hash TEXT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      consumed INTEGER NOT NULL DEFAULT 0,
      expires_at BIGINT NOT NULL,
      created_at TEXT NOT NULL DEFAULT ${NOW}
    );
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      kind TEXT NOT NULL CHECK (kind IN ('contact','careers')),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      topic TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      cv_path TEXT,
      cv_name TEXT,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT ${NOW},
      updated_at TEXT NOT NULL DEFAULT ${NOW}
    );
  `);

  // Seed launch content once (idempotent via unique slug / count guard).
  const { rows: aCount } = await p.query("SELECT COUNT(*)::int AS n FROM articles");
  if (aCount[0].n === 0) {
    for (const a of ARTICLES) {
      await p.query(
        `INSERT INTO articles (slug,title,meta_title,tag,date_label,date_iso,description,reading_time,img,img_alt,body_json)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (slug) DO NOTHING`,
        [a.slug, a.title, a.metaTitle, a.tag, a.date, a.dateISO, a.description, a.readingTime, a.img, a.imgAlt, JSON.stringify(a.body)]
      );
    }
  }
  const { rows: jCount } = await p.query("SELECT COUNT(*)::int AS n FROM jobs");
  if (jCount[0].n === 0) {
    for (const j of JOBS) {
      await p.query(
        `INSERT INTO jobs (slug,title,office,type,blurb,skills_json) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (slug) DO NOTHING`,
        [j.slug, j.title, j.office, j.type, j.blurb, JSON.stringify(j.skills)]
      );
    }
  }
  const { rows: dCount } = await p.query("SELECT COUNT(*)::int AS n FROM downloads");
  if (dCount[0].n === 0) {
    let i = 0;
    for (const d of DOWNLOADS) {
      await p.query(
        `INSERT INTO downloads (title,kind,descr,img,published,sort) VALUES ($1,$2,$3,$4,1,$5)`,
        [d.title, d.kind, d.desc, d.img, i++]
      );
    }
  }
}

async function q<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  await ensureReady();
  const res = await getPool().query(text, params);
  return res.rows as T[];
}

/* ---------------- Types ---------------- */
export type ArticleRow = {
  id: number; slug: string; title: string; meta_title: string; tag: string;
  date_label: string; date_iso: string; description: string; reading_time: string;
  img: string; img_alt: string; body_json: string; published: number;
  created_at: string; updated_at: string;
};
export type JobRow = {
  id: number; slug: string; title: string; office: string; type: string;
  blurb: string; skills_json: string; open: number; created_at: string; updated_at: string;
};
export type DownloadRow = {
  id: number; title: string; kind: string; descr: string; img: string;
  file_path: string | null; file_name: string | null; url: string | null;
  published: number; sort: number; created_at: string; updated_at: string;
};
export type LeadRow = {
  id: number; kind: "contact" | "careers"; name: string; email: string; topic: string;
  message: string; cv_path: string | null; cv_name: string | null;
  status: "new" | "contacted" | "closed"; notes: string; created_at: string; updated_at: string;
};
export type OtpRow = {
  id: number; email: string; purpose: string; ref: string; code_hash: string;
  attempts: number; consumed: number; expires_at: number | string; created_at: string;
};
export type ArticleBody = { h?: string; p: string }[];

/* ---------------- Articles ---------------- */
export async function listArticles(publishedOnly = false): Promise<ArticleRow[]> {
  return q<ArticleRow>(`SELECT * FROM articles ${publishedOnly ? "WHERE published = 1" : ""} ORDER BY date_iso DESC, id DESC`);
}
export async function getArticle(slug: string): Promise<ArticleRow | undefined> {
  return (await q<ArticleRow>("SELECT * FROM articles WHERE slug = $1", [slug]))[0];
}
export async function getArticleById(id: number): Promise<ArticleRow | undefined> {
  return (await q<ArticleRow>("SELECT * FROM articles WHERE id = $1", [id]))[0];
}
export async function upsertArticle(a: Omit<ArticleRow, "id" | "created_at" | "updated_at"> & { id?: number }): Promise<number> {
  if (a.id) {
    await q(
      `UPDATE articles SET slug=$1,title=$2,meta_title=$3,tag=$4,date_label=$5,date_iso=$6,description=$7,
       reading_time=$8,img=$9,img_alt=$10,body_json=$11,published=$12,updated_at=${NOW} WHERE id=$13`,
      [a.slug, a.title, a.meta_title, a.tag, a.date_label, a.date_iso, a.description, a.reading_time, a.img, a.img_alt, a.body_json, a.published, a.id]
    );
    return a.id;
  }
  const rows = await q<{ id: number }>(
    `INSERT INTO articles (slug,title,meta_title,tag,date_label,date_iso,description,reading_time,img,img_alt,body_json,published)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
    [a.slug, a.title, a.meta_title, a.tag, a.date_label, a.date_iso, a.description, a.reading_time, a.img, a.img_alt, a.body_json, a.published]
  );
  return rows[0].id;
}
export async function deleteArticle(id: number): Promise<void> {
  await q("DELETE FROM articles WHERE id = $1", [id]);
}

/* ---------------- Jobs ---------------- */
export async function listJobs(openOnly = false): Promise<JobRow[]> {
  return q<JobRow>(`SELECT * FROM jobs ${openOnly ? "WHERE open = 1" : ""} ORDER BY id ASC`);
}
export async function getJobById(id: number): Promise<JobRow | undefined> {
  return (await q<JobRow>("SELECT * FROM jobs WHERE id = $1", [id]))[0];
}
export async function upsertJob(j: Omit<JobRow, "id" | "created_at" | "updated_at"> & { id?: number }): Promise<number> {
  if (j.id) {
    await q(
      `UPDATE jobs SET slug=$1,title=$2,office=$3,type=$4,blurb=$5,skills_json=$6,open=$7,updated_at=${NOW} WHERE id=$8`,
      [j.slug, j.title, j.office, j.type, j.blurb, j.skills_json, j.open, j.id]
    );
    return j.id;
  }
  const rows = await q<{ id: number }>(
    `INSERT INTO jobs (slug,title,office,type,blurb,skills_json,open) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [j.slug, j.title, j.office, j.type, j.blurb, j.skills_json, j.open]
  );
  return rows[0].id;
}
export async function deleteJob(id: number): Promise<void> {
  await q("DELETE FROM jobs WHERE id = $1", [id]);
}

/* ---------------- Downloads ---------------- */
export async function listDownloads(publishedOnly = false): Promise<DownloadRow[]> {
  return q<DownloadRow>(`SELECT * FROM downloads ${publishedOnly ? "WHERE published = 1" : ""} ORDER BY sort ASC, id ASC`);
}
export async function getDownloadById(id: number): Promise<DownloadRow | undefined> {
  return (await q<DownloadRow>("SELECT * FROM downloads WHERE id = $1", [id]))[0];
}
export async function upsertDownload(d: Omit<DownloadRow, "id" | "created_at" | "updated_at"> & { id?: number }): Promise<number> {
  if (d.id) {
    await q(
      `UPDATE downloads SET title=$1,kind=$2,descr=$3,img=$4,file_path=$5,file_name=$6,url=$7,published=$8,sort=$9,updated_at=${NOW} WHERE id=$10`,
      [d.title, d.kind, d.descr, d.img, d.file_path, d.file_name, d.url, d.published, d.sort, d.id]
    );
    return d.id;
  }
  const rows = await q<{ id: number }>(
    `INSERT INTO downloads (title,kind,descr,img,file_path,file_name,url,published,sort)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
    [d.title, d.kind, d.descr, d.img, d.file_path, d.file_name, d.url, d.published, d.sort]
  );
  return rows[0].id;
}
export async function deleteDownload(id: number): Promise<void> {
  await q("DELETE FROM downloads WHERE id = $1", [id]);
}

/* ---------------- Leads ---------------- */
export async function createLead(l: {
  kind: "contact" | "careers"; name: string; email: string; topic: string; message: string;
  cv_path?: string | null; cv_name?: string | null;
}): Promise<number> {
  const rows = await q<{ id: number }>(
    `INSERT INTO leads (kind,name,email,topic,message,cv_path,cv_name) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [l.kind, l.name, l.email, l.topic, l.message, l.cv_path ?? null, l.cv_name ?? null]
  );
  return rows[0].id;
}
export async function listLeads(filter?: { status?: string; kind?: string }): Promise<LeadRow[]> {
  const clauses: string[] = [];
  const params: unknown[] = [];
  if (filter?.status && ["new", "contacted", "closed"].includes(filter.status)) {
    params.push(filter.status);
    clauses.push(`status = $${params.length}`);
  }
  if (filter?.kind && ["contact", "careers"].includes(filter.kind)) {
    params.push(filter.kind);
    clauses.push(`kind = $${params.length}`);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return q<LeadRow>(`SELECT * FROM leads ${where} ORDER BY id DESC`, params);
}
export async function getLeadById(id: number): Promise<LeadRow | undefined> {
  return (await q<LeadRow>("SELECT * FROM leads WHERE id = $1", [id]))[0];
}
export async function updateLead(id: number, fields: { status?: string; notes?: string }): Promise<void> {
  const lead = await getLeadById(id);
  if (!lead) return;
  const status = fields.status && ["new", "contacted", "closed"].includes(fields.status) ? fields.status : lead.status;
  const notes = fields.notes ?? lead.notes;
  await q(`UPDATE leads SET status=$1, notes=$2, updated_at=${NOW} WHERE id=$3`, [status, notes, id]);
}
export async function deleteLead(id: number): Promise<void> {
  await q("DELETE FROM leads WHERE id = $1", [id]);
}
export async function leadCounts(): Promise<{ total: number; fresh: number; contact: number; careers: number }> {
  const rows = await q<{ total: number; fresh: number; contact: number; careers: number }>(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE status='new')::int AS fresh,
            COUNT(*) FILTER (WHERE kind='contact')::int AS contact,
            COUNT(*) FILTER (WHERE kind='careers')::int AS careers
     FROM leads`
  );
  return rows[0];
}

/* ---------------- OTPs ---------------- */
export async function insertOtp(o: { email: string; purpose: string; ref: string; code_hash: string; expires_at: number }): Promise<number> {
  await q("DELETE FROM otps WHERE email=$1 AND purpose=$2 AND ref=$3 AND consumed=0", [o.email, o.purpose, o.ref]);
  const rows = await q<{ id: number }>(
    `INSERT INTO otps (email,purpose,ref,code_hash,expires_at) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
    [o.email, o.purpose, o.ref, o.code_hash, o.expires_at]
  );
  return rows[0].id;
}
export async function latestOtp(email: string, purpose: string, ref: string): Promise<OtpRow | undefined> {
  return (await q<OtpRow>(
    "SELECT * FROM otps WHERE email=$1 AND purpose=$2 AND ref=$3 AND consumed=0 ORDER BY id DESC LIMIT 1",
    [email, purpose, ref]
  ))[0];
}
export async function bumpOtpAttempts(id: number): Promise<void> {
  await q("UPDATE otps SET attempts = attempts + 1 WHERE id = $1", [id]);
}
export async function consumeOtp(id: number): Promise<void> {
  await q("UPDATE otps SET consumed = 1 WHERE id = $1", [id]);
}
export async function recentOtpCount(email: string, secondsWindow: number): Promise<number> {
  const rows = await q<{ n: number }>(
    `SELECT COUNT(*)::int AS n FROM otps
     WHERE email=$1 AND created_at >= to_char((now() AT TIME ZONE 'utc') - ($2 || ' seconds')::interval,'YYYY-MM-DD HH24:MI:SS')`,
    [email, String(secondsWindow)]
  );
  return rows[0].n;
}
