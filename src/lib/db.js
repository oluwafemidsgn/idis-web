import 'server-only'
import { createClient } from '@libsql/client'
import { SEED_CASE_STUDIES, SEED_POSTS, SEED_TESTIMONIALS } from './seed'

/**
 * libSQL connection (Turso in production, a local SQLite file otherwise —
 * the same setup as the oduneye portfolio). The schema is created on first
 * use and empty tables are filled from ./seed, so a fresh database comes up
 * with the current site content.
 *
 * Production env: TURSO_DATABASE_URL + TURSO_AUTH_TOKEN.
 */

const g = globalThis

export function getDb() {
  if (!g.__idisDb) {
    g.__idisDb = createClient({
      // Without Turso (e.g. a preview with no database attached) fall back to a
      // throwaway file in /tmp on Vercel, where the project folder is read-only.
      url: process.env.TURSO_DATABASE_URL ?? (process.env.VERCEL ? 'file:/tmp/idis.db' : 'file:./data/idis.db'),
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  }
  return g.__idisDb
}

export async function getReadyDb() {
  if (!g.__idisSchemaReady) {
    g.__idisSchemaReady = applySchema()
    g.__idisSchemaReady.catch(() => (g.__idisSchemaReady = undefined))
  }
  await g.__idisSchemaReady
  return getDb()
}

async function applySchema() {
  const db = getDb()
  await db.batch(
    [
      `CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT 'Strategy',
        cover TEXT,
        cover_alt TEXT NOT NULL DEFAULT '',
        author TEXT NOT NULL DEFAULT 'IDIS Digital',
        published_at TEXT NOT NULL,
        read_mins INTEGER NOT NULL DEFAULT 4,
        body TEXT NOT NULL DEFAULT '',
        featured INTEGER NOT NULL DEFAULT 0,
        published INTEGER NOT NULL DEFAULT 1,
        updated_at INTEGER NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS case_studies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        data TEXT NOT NULL,
        display_order INTEGER NOT NULL DEFAULT 0,
        published INTEGER NOT NULL DEFAULT 1,
        updated_at INTEGER NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        quote TEXT NOT NULL,
        accent TEXT NOT NULL DEFAULT 'bg-sun',
        display_order INTEGER NOT NULL DEFAULT 0,
        published INTEGER NOT NULL DEFAULT 1
      )`,
      `CREATE TABLE IF NOT EXISTS login_attempts (ip TEXT NOT NULL, attempted_at INTEGER NOT NULL)`,
    ],
    'write',
  )
  await seed(db)
}

async function count(db, table) {
  const r = await db.execute(`SELECT COUNT(*) AS n FROM ${table}`)
  return Number(r.rows[0].n)
}

async function seed(db) {
  const now = Date.now()
  if ((await count(db, 'posts')) === 0) {
    await db.batch(
      SEED_POSTS.map((p) => ({
        sql: `INSERT OR IGNORE INTO posts (slug, title, excerpt, category, cover, cover_alt, author, published_at, read_mins, body, featured, published, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1, ?)`,
        args: [p.slug, p.title, p.excerpt, p.category, p.cover, p.coverAlt, p.author, p.publishedAt, p.readMins, p.body, now],
      })),
      'write',
    )
  }
  if ((await count(db, 'case_studies')) === 0) {
    await db.batch(
      SEED_CASE_STUDIES.map(({ slug, ...data }, i) => ({
        sql: `INSERT OR IGNORE INTO case_studies (slug, data, display_order, published, updated_at) VALUES (?, ?, ?, 1, ?)`,
        args: [slug, JSON.stringify(data), i, now],
      })),
      'write',
    )
  }
  if ((await count(db, 'testimonials')) === 0) {
    await db.batch(
      SEED_TESTIMONIALS.map((t, i) => ({
        sql: `INSERT INTO testimonials (author, quote, accent, display_order, published) VALUES (?, ?, ?, ?, 1)`,
        args: [t.author, t.quote, t.accent, i],
      })),
      'write',
    )
  }
}
