'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Reader engagement for blog posts and case studies:
 *  - useReadTracking: records a view, how far the reader scrolls through the
 *    content and how long they stay (sent to /api/engage)
 *  - EngageBar: views count, a like button and a share menu
 * Readers get an anonymous random id in localStorage; nothing personal is sent.
 */

const ENDPOINT = '/api/engage'

function visitorId() {
  try {
    let id = localStorage.getItem('idis_vid')
    if (!id) {
      id = crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
      localStorage.setItem('idis_vid', id)
    }
    return id
  } catch {
    return null
  }
}

// Automated browsers (link previews, test runners) are not counted in production.
const isAutomated = () => process.env.NODE_ENV === 'production' && typeof navigator !== 'undefined' && navigator.webdriver

function send(body, { beacon = false } = {}) {
  const payload = JSON.stringify(body)
  if (beacon && navigator.sendBeacon) return navigator.sendBeacon(ENDPOINT, payload)
  return fetch(ENDPOINT, { method: 'POST', body: payload, keepalive: true }).then((r) => r.json()).catch(() => null)
}

// One view per page load: if the effect re-runs within a few seconds for the
// same item (React dev re-mounts, fast re-renders) the existing visit is reused.
const recent = new Map()
function startVisit(kind, slug, visitor) {
  const key = `${kind}:${slug}`
  const hit = recent.get(key)
  if (hit && Date.now() - hit.at < 5000) return hit.promise
  const promise = send({ type: 'view', kind, slug, visitor }).then((r) => r?.visitId ?? null)
  recent.set(key, { at: Date.now(), promise })
  return promise
}

/** Tracks one reading session of `targetRef` (the article / case study body). */
export function useReadTracking(kind, slug, targetRef) {
  useEffect(() => {
    const visitor = visitorId()
    if (!visitor || isAutomated()) return
    let visitId = null
    let maxScroll = 0
    let sentScroll = -1
    let seconds = 0
    let sentSeconds = -1

    startVisit(kind, slug, visitor).then((id) => (visitId = id))

    const measure = () => {
      const el = targetRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const read = window.innerHeight - rect.top
      const pct = rect.height > 0 ? Math.min(100, Math.max(0, (read / rect.height) * 100)) : 0
      if (pct > maxScroll) maxScroll = pct
    }
    const flush = (beacon) => {
      if (!visitId || (Math.round(maxScroll) === sentScroll && seconds === sentSeconds)) return
      sentScroll = Math.round(maxScroll)
      sentSeconds = seconds
      send({ type: 'progress', kind, slug, visitor, visitId, scroll: maxScroll, seconds }, { beacon })
    }

    // Count only time the tab is actually visible.
    const tick = setInterval(() => {
      if (document.visibilityState === 'visible') seconds += 1
      if (seconds % 10 === 0) flush(false)
    }, 1000)
    const onHide = () => document.visibilityState === 'hidden' && flush(true)
    const onLeave = () => flush(true)

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', onLeave)
    return () => {
      flush(true)
      clearInterval(tick)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', onLeave)
    }
  }, [kind, slug, targetRef])
}

/* ---------------------------------- Icons ---------------------------------- */

const Heart = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="size-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.3 4.5 6.9 4.5c2 0 3.4 1.1 5.1 3 1.7-1.9 3.1-3 5.1-3 3.6 0 5.5 3.5 4.2 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
  </svg>
)
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" />
  </svg>
)
export const Eye = ({ className = 'size-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
export const HeartSmall = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.3 4.5 6.9 4.5c2 0 3.4 1.1 5.1 3 1.7-1.9 3.1-3 5.1-3 3.6 0 5.5 3.5 4.2 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
  </svg>
)

const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n))

/* ------------------------------- Like + share ------------------------------ */

// Keeps every like button for the same item on the page in sync.
const LIKE_EVENT = 'idis-like'
const announce = (key, liked, count) => window.dispatchEvent(new CustomEvent(LIKE_EVENT, { detail: { key, liked, count } }))

function LikeButton({ kind, slug, initial, tone }) {
  const key = `idis_like:${kind}:${slug}`
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(initial)
  const [pop, setPop] = useState(false)
  useEffect(() => {
    try {
      setLiked(localStorage.getItem(key) === '1')
    } catch {}
    const onLike = (e) => {
      if (e.detail.key !== key) return
      setLiked(e.detail.liked)
      setCount(e.detail.count)
    }
    window.addEventListener(LIKE_EVENT, onLike)
    return () => window.removeEventListener(LIKE_EVENT, onLike)
  }, [key])

  const toggle = async () => {
    const visitor = visitorId()
    if (!visitor) return
    const next = !liked
    const optimistic = Math.max(0, count + (next ? 1 : -1))
    announce(key, next, optimistic)
    if (next) {
      setPop(true)
      setTimeout(() => setPop(false), 400)
    }
    try {
      localStorage.setItem(key, next ? '1' : '0')
    } catch {}
    const r = await send({ type: 'like', kind, slug, visitor, liked: next })
    if (typeof r?.likes === 'number') announce(key, next, r.likes)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike' : 'Like'}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors ${
        liked ? 'bg-pink text-ink' : tone === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-blush-200 text-ink hover:bg-pink/40'
      }`}
    >
      <span className={`transition-transform duration-300 ${pop ? 'scale-125' : 'scale-100'}`}>
        <Heart filled={liked} />
      </span>
      {fmt(count)}
      <span className="sr-only"> likes</span>
    </button>
  )
}

function ShareMenu({ kind, slug, title, tone }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [canNative, setCanNative] = useState(false)
  const [alignRight, setAlignRight] = useState(false)
  const ref = useRef(null)
  useEffect(() => setCanNative(typeof navigator !== 'undefined' && !!navigator.share), [])
  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const track = (channel) => {
    const visitor = visitorId()
    if (visitor) send({ type: 'share', kind, slug, visitor, channel })
  }
  const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : ''
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    ['linkedin', 'LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ['x', 'X (Twitter)', `https://twitter.com/intent/tweet?url=${u}&text=${t}`],
    ['whatsapp', 'WhatsApp', `https://wa.me/?text=${t}%20${u}`],
    ['facebook', 'Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['email', 'Email', `mailto:?subject=${t}&body=${u}`],
  ]

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          // Open towards whichever side has room for the 224px menu.
          const r = ref.current?.getBoundingClientRect()
          setAlignRight(Boolean(r && r.left + 240 > window.innerWidth))
          setOpen((o) => !o)
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors ${
          tone === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-blush-200 text-ink hover:bg-sun/50'
        }`}
      >
        <ShareIcon />
        Share
      </button>
      {open && (
        <div role="menu" className={`absolute top-full z-50 mt-2 w-56 ${alignRight ? 'right-0' : 'left-0'} rounded-[20px] bg-white p-2 shadow-[0_20px_50px_rgba(4,9,23,0.18)]`}>
          {canNative && (
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                track('native')
                navigator.share({ title, url }).catch(() => {})
                setOpen(false)
              }}
              className="block w-full rounded-[14px] px-3 py-2.5 text-left text-[15px] font-medium text-ink hover:bg-blush"
            >
              Share via…
            </button>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              track('copy')
              navigator.clipboard?.writeText(url)
              setCopied(true)
              setTimeout(() => setCopied(false), 1600)
            }}
            className="block w-full rounded-[14px] px-3 py-2.5 text-left text-[15px] font-medium text-ink hover:bg-blush"
          >
            {copied ? 'Link copied ✓' : 'Copy link'}
          </button>
          {links.map(([channel, label, href]) => (
            <a
              key={channel}
              role="menuitem"
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                track(channel)
                setOpen(false)
              }}
              className="block rounded-[14px] px-3 py-2.5 text-[15px] font-medium text-ink hover:bg-blush"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/** Views · Like · Share. `tone="dark"` for use on navy / blue backgrounds. */
export function EngageBar({ kind, slug, title, views = 0, likes = 0, tone = 'light', className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className={`inline-flex items-center gap-2 px-2 text-[15px] font-medium ${tone === 'dark' ? 'text-white/70' : 'text-slate'}`}>
        <Eye />
        {fmt(views)} {views === 1 ? 'view' : 'views'}
      </span>
      <LikeButton kind={kind} slug={slug} initial={likes} tone={tone} />
      <ShareMenu kind={kind} slug={slug} title={title} tone={tone} />
    </div>
  )
}
