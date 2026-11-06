import 'server-only'
import { getReadyDb } from './db'

/**
 * Engagement analytics for blog posts (kind 'post') and case studies
 * (kind 'case'): views, how far people scroll, whether they finish, time
 * spent, likes and shares. Readers are identified only by an anonymous
 * random id stored in their browser — no names, emails or IP addresses.
 */

export const KINDS = ['post', 'case']
export const SHARE_CHANNELS = ['copy', 'linkedin', 'x', 'facebook', 'whatsapp', 'email', 'native']
// A visit counts as "finished" once the reader has scrolled through 90% of it.
export const FINISHED_AT = 90

const TABLE = { post: 'posts', case: 'case_studies' }

/** True if a published post / case study with this slug exists. */
export async function itemExists(kind, slug) {
  const db = await getReadyDb()
  const r = await db.execute({ sql: `SELECT 1 FROM ${TABLE[kind]} WHERE slug = ? AND published = 1`, args: [slug] })
  return r.rows.length > 0
}

export async function recordView(kind, slug, visitor) {
  const db = await getReadyDb()
  const r = await db.execute({
    sql: `INSERT INTO visits (kind, slug, visitor, started_at) VALUES (?, ?, ?, ?)`,
    args: [kind, slug, visitor, Date.now()],
  })
  return Number(r.lastInsertRowid)
}

/** Only ever raises a visit's scroll depth and time; ignores other visitors' ids. */
export async function recordProgress(visitId, visitor, scroll, seconds) {
  const db = await getReadyDb()
  const s = Math.max(0, Math.min(100, Math.round(scroll)))
  const t = Math.max(0, Math.min(60 * 60 * 3, Math.round(seconds)))
  await db.execute({
    sql: `UPDATE visits SET max_scroll = MAX(max_scroll, ?), seconds = MAX(seconds, ?), finished = MAX(finished, ?)
          WHERE id = ? AND visitor = ?`,
    args: [s, t, s >= FINISHED_AT ? 1 : 0, visitId, visitor],
  })
}

export async function setLike(kind, slug, visitor, liked) {
  const db = await getReadyDb()
  await db.execute(
    liked
      ? { sql: `INSERT OR IGNORE INTO likes (kind, slug, visitor, created_at) VALUES (?, ?, ?, ?)`, args: [kind, slug, visitor, Date.now()] }
      : { sql: `DELETE FROM likes WHERE kind = ? AND slug = ? AND visitor = ?`, args: [kind, slug, visitor] },
  )
  return likeCount(kind, slug)
}

export async function recordShare(kind, slug, channel) {
  const db = await getReadyDb()
  await db.execute({ sql: `INSERT INTO shares (kind, slug, channel, created_at) VALUES (?, ?, ?, ?)`, args: [kind, slug, channel, Date.now()] })
}

async function likeCount(kind, slug) {
  const db = await getReadyDb()
  const r = await db.execute({ sql: `SELECT COUNT(*) AS n FROM likes WHERE kind = ? AND slug = ?`, args: [kind, slug] })
  return Number(r.rows[0].n)
}

/** Public counters for one item: total views and likes. */
export async function getCounts(kind, slug) {
  const db = await getReadyDb()
  const [v, l] = await Promise.all([
    db.execute({ sql: `SELECT COUNT(*) AS n FROM visits WHERE kind = ? AND slug = ?`, args: [kind, slug] }),
    db.execute({ sql: `SELECT COUNT(*) AS n FROM likes WHERE kind = ? AND slug = ?`, args: [kind, slug] }),
  ])
  return { views: Number(v.rows[0].n), likes: Number(l.rows[0].n) }
}

/** `{ [slug]: { views, likes } }` for every item of a kind (listing pages). */
export async function getCountsMap(kind) {
  const db = await getReadyDb()
  const [v, l] = await Promise.all([
    db.execute({ sql: `SELECT slug, COUNT(*) AS n FROM visits WHERE kind = ? GROUP BY slug`, args: [kind] }),
    db.execute({ sql: `SELECT slug, COUNT(*) AS n FROM likes WHERE kind = ? GROUP BY slug`, args: [kind] }),
  ])
  const map = {}
  for (const r of v.rows) map[r.slug] = { views: Number(r.n), likes: 0 }
  for (const r of l.rows) (map[r.slug] ??= { views: 0, likes: 0 }).likes = Number(r.n)
  return map
}

const since = (days) => (days ? Date.now() - days * 86_400_000 : 0)

/**
 * Per-item stats for the admin dashboard over the last `days` (0 = all time):
 * views, unique readers, average scroll %, finish rate, average time, likes
 * and shares.
 */
export async function getItemStats(days = 30) {
  const db = await getReadyDb()
  const from = since(days)
  const [visits, likes, shares] = await Promise.all([
    db.execute({
      sql: `SELECT kind, slug, COUNT(*) AS views, COUNT(DISTINCT visitor) AS readers, AVG(max_scroll) AS scroll,
                   SUM(finished) AS finished, AVG(seconds) AS seconds
            FROM visits WHERE started_at >= ? GROUP BY kind, slug`,
      args: [from],
    }),
    db.execute({ sql: `SELECT kind, slug, COUNT(*) AS n FROM likes WHERE created_at >= ? GROUP BY kind, slug`, args: [from] }),
    db.execute({ sql: `SELECT kind, slug, COUNT(*) AS n FROM shares WHERE created_at >= ? GROUP BY kind, slug`, args: [from] }),
  ])
  const key = (r) => `${r.kind}:${r.slug}`
  const out = {}
  const blank = (r) => ({ kind: r.kind, slug: r.slug, views: 0, readers: 0, scroll: 0, finished: 0, finishRate: 0, seconds: 0, likes: 0, shares: 0 })
  for (const r of visits.rows) {
    const views = Number(r.views)
    out[key(r)] = {
      ...blank(r),
      views,
      readers: Number(r.readers),
      scroll: Math.round(Number(r.scroll) || 0),
      finished: Number(r.finished) || 0,
      finishRate: views ? Math.round(((Number(r.finished) || 0) / views) * 100) : 0,
      seconds: Math.round(Number(r.seconds) || 0),
    }
  }
  for (const r of likes.rows) (out[key(r)] ??= blank(r)).likes = Number(r.n)
  for (const r of shares.rows) (out[key(r)] ??= blank(r)).shares = Number(r.n)
  return out
}

/** Site-wide totals plus a views-per-day series for the dashboard header. */
export async function getTotals(days = 30) {
  const db = await getReadyDb()
  const from = since(days)
  const [v, l, s, daily, channels] = await Promise.all([
    db.execute({
      sql: `SELECT COUNT(*) AS views, COUNT(DISTINCT visitor) AS readers, AVG(max_scroll) AS scroll, SUM(finished) AS finished, AVG(seconds) AS seconds
            FROM visits WHERE started_at >= ?`,
      args: [from],
    }),
    db.execute({ sql: `SELECT COUNT(*) AS n FROM likes WHERE created_at >= ?`, args: [from] }),
    db.execute({ sql: `SELECT COUNT(*) AS n FROM shares WHERE created_at >= ?`, args: [from] }),
    db.execute({
      sql: `SELECT date(started_at / 1000, 'unixepoch') AS day, COUNT(*) AS n FROM visits WHERE started_at >= ? GROUP BY day ORDER BY day`,
      args: [days ? from : Date.now() - 90 * 86_400_000],
    }),
    db.execute({ sql: `SELECT channel, COUNT(*) AS n FROM shares WHERE created_at >= ? GROUP BY channel ORDER BY n DESC`, args: [from] }),
  ])
  const t = v.rows[0]
  const views = Number(t.views)
  return {
    views,
    readers: Number(t.readers),
    scroll: Math.round(Number(t.scroll) || 0),
    finishRate: views ? Math.round(((Number(t.finished) || 0) / views) * 100) : 0,
    seconds: Math.round(Number(t.seconds) || 0),
    likes: Number(l.rows[0].n),
    shares: Number(s.rows[0].n),
    daily: daily.rows.map((r) => ({ day: r.day, n: Number(r.n) })),
    channels: channels.rows.map((r) => ({ channel: r.channel, n: Number(r.n) })),
  }
}

/** How far readers got on one item: share of visits reaching 25/50/75/100%. */
export async function getScrollDepth(kind, slug, days = 30) {
  const db = await getReadyDb()
  const r = await db.execute({
    sql: `SELECT COUNT(*) AS n,
                 SUM(max_scroll >= 25) AS q1, SUM(max_scroll >= 50) AS q2, SUM(max_scroll >= 75) AS q3, SUM(max_scroll >= ${FINISHED_AT}) AS q4
          FROM visits WHERE kind = ? AND slug = ? AND started_at >= ?`,
    args: [kind, slug, since(days)],
  })
  const row = r.rows[0]
  const n = Number(row.n) || 0
  const pct = (x) => (n ? Math.round((Number(x) / n) * 100) : 0)
  return { n, depth: [['25%', pct(row.q1)], ['50%', pct(row.q2)], ['75%', pct(row.q3)], ['Finished', pct(row.q4)]] }
}

/** Views per day and share channels for one item. */
export async function getItemDetail(kind, slug, days = 30) {
  const db = await getReadyDb()
  const from = days ? since(days) : Date.now() - 90 * 86_400_000
  const [daily, channels] = await Promise.all([
    db.execute({
      sql: `SELECT date(started_at / 1000, 'unixepoch') AS day, COUNT(*) AS n FROM visits WHERE kind = ? AND slug = ? AND started_at >= ? GROUP BY day ORDER BY day`,
      args: [kind, slug, from],
    }),
    db.execute({
      sql: `SELECT channel, COUNT(*) AS n FROM shares WHERE kind = ? AND slug = ? AND created_at >= ? GROUP BY channel ORDER BY n DESC`,
      args: [kind, slug, since(days)],
    }),
  ])
  return { daily: daily.rows.map((r) => ({ day: r.day, n: Number(r.n) })), channels: channels.rows.map((r) => ({ channel: r.channel, n: Number(r.n) })) }
}

/** Fills gaps so a daily series has one entry per day (UTC), oldest first. */
export function fillDays(series, days) {
  const n = days || 90
  const by = Object.fromEntries(series.map((d) => [d.day, d.n]))
  const out = []
  for (let i = n - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10)
    out.push({ label: new Date(`${day}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }), n: by[day] ?? 0 })
  }
  return out
}

export const CHANNEL_LABELS = { copy: 'Copied link', linkedin: 'LinkedIn', x: 'X (Twitter)', facebook: 'Facebook', whatsapp: 'WhatsApp', email: 'Email', native: 'Phone share' }
