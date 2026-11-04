import 'server-only'
import { cookies, headers } from 'next/headers'
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { getReadyDb } from './db'

/**
 * Password-based admin session (same approach as the oduneye portfolio).
 * One credential — the ADMIN_PASSWORD env var — and a successful login sets
 * an HMAC-signed cookie carrying its issue time. Failed logins are rate
 * limited per IP in the database so the limit holds across serverless
 * instances.
 *
 * Production requires: ADMIN_PASSWORD and ADMIN_SESSION_SECRET (32+ chars).
 */

const COOKIE_NAME = 'idis_admin_session'
const SESSION_MAX_AGE_S = 60 * 60 * 24 * 14 // 14 days
const MAX_FAILED_ATTEMPTS = 5
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000

const isProd = process.env.NODE_ENV === 'production'

function requireEnv(value, name, devFallback) {
  if (value) return value
  if (isProd) throw new Error(`${name} is not set. Refusing to run the admin with a default value in production.`)
  return devFallback
}

const getSecret = () => requireEnv(process.env.ADMIN_SESSION_SECRET, 'ADMIN_SESSION_SECRET', 'dev-only-session-secret-change-me')
const getPassword = () => requireEnv(process.env.ADMIN_PASSWORD, 'ADMIN_PASSWORD', 'admin')
const sign = (value) => createHmac('sha256', getSecret()).update(value).digest('hex')

/** Constant-time compare (false on length mismatch). */
function safeEqual(a, b) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

async function clientIp() {
  const h = await headers()
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
}

async function recentFailures(ip) {
  const db = await getReadyDb()
  const since = Date.now() - ATTEMPT_WINDOW_MS
  await db.execute({ sql: `DELETE FROM login_attempts WHERE attempted_at < ?`, args: [since] })
  const r = await db.execute({ sql: `SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND attempted_at >= ?`, args: [ip, since] })
  return Number(r.rows[0].n)
}

/** Returns 'ok' | 'invalid' | 'locked' and sets the session cookie on success. */
export async function signIn(password) {
  const ip = await clientIp()
  if ((await recentFailures(ip)) >= MAX_FAILED_ATTEMPTS) return 'locked'

  const digest = (s) => createHash('sha256').update(s).digest('hex')
  const db = await getReadyDb()
  if (!safeEqual(digest(password), digest(getPassword()))) {
    await db.execute({ sql: `INSERT INTO login_attempts (ip, attempted_at) VALUES (?, ?)`, args: [ip, Date.now()] })
    return 'invalid'
  }
  await db.execute({ sql: `DELETE FROM login_attempts WHERE ip = ?`, args: [ip] })

  const issuedAt = Date.now().toString()
  const store = await cookies()
  store.set(COOKIE_NAME, `${issuedAt}.${sign(issuedAt)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge: SESSION_MAX_AGE_S,
  })
  return 'ok'
}

export async function signOut() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

/** True if the request carries a valid, unexpired session. */
export async function isAuthed() {
  const store = await cookies()
  const raw = store.get(COOKIE_NAME)?.value
  if (!raw) return false
  const [issuedAt, signature] = raw.split('.')
  if (!issuedAt || !signature || !safeEqual(sign(issuedAt), signature)) return false
  const age = Date.now() - Number(issuedAt)
  return Number.isFinite(age) && age >= 0 && age < SESSION_MAX_AGE_S * 1000
}
