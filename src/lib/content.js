import 'server-only'
import { getReadyDb } from './db'

/**
 * Read/write helpers for the three content types the admin manages:
 * blog posts, Works & Campaigns case studies, and testimonials.
 * Public pages only ever see published rows.
 */

/* ---------------------------------- Posts ---------------------------------- */

const postFromRow = (r) => ({
  id: Number(r.id),
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  category: r.category,
  cover: r.cover,
  coverAlt: r.cover_alt,
  author: r.author,
  publishedAt: r.published_at,
  readMins: Number(r.read_mins),
  body: r.body,
  featured: Boolean(r.featured),
  published: Boolean(r.published),
})

/** Published posts, featured first then newest. Pass `all` for the admin list. */
export async function listPosts({ all = false } = {}) {
  const db = await getReadyDb()
  const r = await db.execute(
    `SELECT * FROM posts ${all ? '' : 'WHERE published = 1'} ORDER BY featured DESC, published_at DESC, id DESC`,
  )
  return r.rows.map(postFromRow)
}

export async function getPostBySlug(slug, { all = false } = {}) {
  const db = await getReadyDb()
  const r = await db.execute({ sql: `SELECT * FROM posts WHERE slug = ? ${all ? '' : 'AND published = 1'}`, args: [slug] })
  return r.rows[0] ? postFromRow(r.rows[0]) : null
}

export async function getPostById(id) {
  const db = await getReadyDb()
  const r = await db.execute({ sql: `SELECT * FROM posts WHERE id = ?`, args: [id] })
  return r.rows[0] ? postFromRow(r.rows[0]) : null
}

export async function savePost(id, p) {
  const db = await getReadyDb()
  const args = [p.slug, p.title, p.excerpt, p.category, p.cover || null, p.coverAlt, p.author, p.publishedAt, p.readMins, p.body, p.featured ? 1 : 0, p.published ? 1 : 0, Date.now()]
  if (id) {
    await db.execute({
      sql: `UPDATE posts SET slug=?, title=?, excerpt=?, category=?, cover=?, cover_alt=?, author=?, published_at=?, read_mins=?, body=?, featured=?, published=?, updated_at=? WHERE id=?`,
      args: [...args, id],
    })
    return id
  }
  const r = await db.execute({
    sql: `INSERT INTO posts (slug, title, excerpt, category, cover, cover_alt, author, published_at, read_mins, body, featured, published, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args,
  })
  return Number(r.lastInsertRowid)
}

export async function deletePost(id) {
  const db = await getReadyDb()
  await db.execute({ sql: `DELETE FROM posts WHERE id = ?`, args: [id] })
}

/* ------------------------------ Case studies ------------------------------ */

/** Every field a case study can have, so pages never trip over a blank one. */
export const EMPTY_CASE_STUDY = {
  client: '',
  nav: '',
  title: '',
  tags: [],
  meta: [],
  hero: { src: '', alt: '', bg: 'bg-blush-200' },
  results: [],
  labels: ['', '', ''],
  challenge: { lead: '', body: '' },
  approach: { lead: '', tactics: [] },
  gallery: { src: '', alt: '', bg: 'bg-sun' },
  quoteFrom: '',
  highlight: ['', ''],
  impact: { lead: '', items: [] },
  card: { label: '', title: '', desc: '', results: [], image: '', filterTag: 'Brand', cta: 'View case study' },
}

const withDefaults = (d) => {
  const out = { ...EMPTY_CASE_STUDY, ...d }
  for (const k of ['hero', 'challenge', 'approach', 'gallery', 'impact', 'card']) out[k] = { ...EMPTY_CASE_STUDY[k], ...d[k] }
  return out
}

const caseFromRow = (r) => ({
  id: Number(r.id),
  slug: r.slug,
  published: Boolean(r.published),
  order: Number(r.display_order),
  ...withDefaults(JSON.parse(r.data)),
})

export async function listCaseStudies({ all = false } = {}) {
  const db = await getReadyDb()
  const r = await db.execute(`SELECT * FROM case_studies ${all ? '' : 'WHERE published = 1'} ORDER BY display_order, id`)
  return r.rows.map(caseFromRow)
}

export async function getCaseStudyBySlug(slug) {
  const db = await getReadyDb()
  const r = await db.execute({ sql: `SELECT * FROM case_studies WHERE slug = ? AND published = 1`, args: [slug] })
  return r.rows[0] ? caseFromRow(r.rows[0]) : null
}

export async function getCaseStudyById(id) {
  const db = await getReadyDb()
  const r = await db.execute({ sql: `SELECT * FROM case_studies WHERE id = ?`, args: [id] })
  return r.rows[0] ? caseFromRow(r.rows[0]) : null
}

export async function saveCaseStudy(id, { slug, published, ...data }) {
  const db = await getReadyDb()
  const json = JSON.stringify(data)
  if (id) {
    await db.execute({
      sql: `UPDATE case_studies SET slug=?, data=?, published=?, updated_at=? WHERE id=?`,
      args: [slug, json, published ? 1 : 0, Date.now(), id],
    })
    return id
  }
  const max = await db.execute(`SELECT COALESCE(MAX(display_order), -1) + 1 AS n FROM case_studies`)
  const r = await db.execute({
    sql: `INSERT INTO case_studies (slug, data, display_order, published, updated_at) VALUES (?,?,?,?,?)`,
    args: [slug, json, Number(max.rows[0].n), published ? 1 : 0, Date.now()],
  })
  return Number(r.lastInsertRowid)
}

export async function deleteCaseStudy(id) {
  const db = await getReadyDb()
  await db.execute({ sql: `DELETE FROM case_studies WHERE id = ?`, args: [id] })
}

/** Swap a row's display_order with its neighbour (`dir` = -1 up, 1 down). */
async function move(table, id, dir) {
  const db = await getReadyDb()
  const rows = (await db.execute(`SELECT id, display_order FROM ${table} ORDER BY display_order, id`)).rows
  const i = rows.findIndex((r) => Number(r.id) === id)
  const j = i + dir
  if (i < 0 || j < 0 || j >= rows.length) return
  const ordered = rows.map((r) => Number(r.id))
  ;[ordered[i], ordered[j]] = [ordered[j], ordered[i]]
  await db.batch(
    ordered.map((rid, k) => ({ sql: `UPDATE ${table} SET display_order = ? WHERE id = ?`, args: [k, rid] })),
    'write',
  )
}

export const moveCaseStudy = (id, dir) => move('case_studies', id, dir)

/* ------------------------------ Testimonials ------------------------------ */

const testimonialFromRow = (r) => ({
  id: Number(r.id),
  author: r.author,
  quote: r.quote,
  accent: r.accent,
  published: Boolean(r.published),
})

export async function listTestimonials({ all = false } = {}) {
  const db = await getReadyDb()
  const r = await db.execute(`SELECT * FROM testimonials ${all ? '' : 'WHERE published = 1'} ORDER BY display_order, id`)
  return r.rows.map(testimonialFromRow)
}

export async function saveTestimonial(id, t) {
  const db = await getReadyDb()
  if (id) {
    await db.execute({
      sql: `UPDATE testimonials SET author=?, quote=?, accent=?, published=? WHERE id=?`,
      args: [t.author, t.quote, t.accent, t.published ? 1 : 0, id],
    })
    return id
  }
  const max = await db.execute(`SELECT COALESCE(MAX(display_order), -1) + 1 AS n FROM testimonials`)
  const r = await db.execute({
    sql: `INSERT INTO testimonials (author, quote, accent, display_order, published) VALUES (?,?,?,?,?)`,
    args: [t.author, t.quote, t.accent, Number(max.rows[0].n), t.published ? 1 : 0],
  })
  return Number(r.lastInsertRowid)
}

export async function deleteTestimonial(id) {
  const db = await getReadyDb()
  await db.execute({ sql: `DELETE FROM testimonials WHERE id = ?`, args: [id] })
}

export const moveTestimonial = (id, dir) => move('testimonials', id, dir)
