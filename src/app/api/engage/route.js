import { NextResponse } from 'next/server'
import { KINDS, SHARE_CHANNELS, itemExists, recordProgress, recordShare, recordView, setLike } from '@/lib/analytics'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Engagement events from blog posts and case studies:
 *   { type: 'view' }                      → { visitId }
 *   { type: 'progress', visitId, scroll, seconds }
 *   { type: 'like', liked }               → { likes }
 *   { type: 'share', channel }
 * Every event carries { kind: 'post' | 'case', slug, visitor }.
 * Requests from crawlers are ignored so they don't inflate the numbers.
 */
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|lighthouse|headless/i
const VISITOR = /^[a-z0-9-]{8,64}$/i

export async function POST(req) {
  if (BOT.test(req.headers.get('user-agent') || '')) return NextResponse.json({ ignored: true })
  let b
  try {
    // sendBeacon posts text/plain, so parse the body ourselves.
    b = JSON.parse(await req.text())
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }
  const { type, kind, slug, visitor } = b ?? {}
  if (!KINDS.includes(kind) || typeof slug !== 'string' || slug.length > 120 || !VISITOR.test(visitor ?? '')) {
    return NextResponse.json({ error: 'Invalid event' }, { status: 400 })
  }

  if (type === 'progress') {
    const visitId = Number(b.visitId)
    if (!Number.isInteger(visitId) || visitId <= 0) return NextResponse.json({ error: 'Invalid visit' }, { status: 400 })
    await recordProgress(visitId, visitor, Number(b.scroll) || 0, Number(b.seconds) || 0)
    return NextResponse.json({ ok: true })
  }

  if (!(await itemExists(kind, slug))) return NextResponse.json({ error: 'Unknown item' }, { status: 404 })

  if (type === 'view') return NextResponse.json({ visitId: await recordView(kind, slug, visitor) })
  if (type === 'like') return NextResponse.json({ likes: await setLike(kind, slug, visitor, Boolean(b.liked)) })
  if (type === 'share') {
    if (!SHARE_CHANNELS.includes(b.channel)) return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })
    await recordShare(kind, slug, b.channel)
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ error: 'Unknown event' }, { status: 400 })
}
