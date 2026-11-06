import { useEffect, useRef, useState } from 'react'

/**
 * True while the media query matches (e.g. "(min-width: 1024px)").
 * Starts false on every render pass (the server can't know the answer) and
 * updates right after mount, so server and browser HTML always match.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Returns [ref, inView]; flips to true once the element scrolls into view. */
export function useInView({ threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, inView])
  return [ref, inView]
}

/** Calls onScroll once per animation frame while the page scrolls or resizes. */
export function useScrollFrame(onScroll, enabled = true) {
  const cb = useRef(onScroll)
  cb.current = onScroll
  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const tick = () => {
      raf = 0
      cb.current()
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled])
}

/**
 * Stacked-deck effect for a list of sticky cards. As card i+1 slides up over
 * card i, card i's inner `[data-card]` element eases back (scale + slight dim).
 * `pinnedTop(i)` must return the sticky `top` (px) of card i.
 */
export function useStackEffect(cards, pinnedTop, { scale = 0.05, dim = 0.05, enabled = true } = {}) {
  useScrollFrame(() => {
    cards.current.forEach((el, i) => {
      const inner = el?.querySelector('[data-card]')
      if (!inner) return
      const next = cards.current[i + 1]
      let t = 0
      if (next) {
        const start = window.innerHeight
        const end = pinnedTop(i)
        t = Math.min(1, Math.max(0, (start - next.getBoundingClientRect().top) / (start - end)))
      }
      inner.style.setProperty('--stack-scale', String(1 - t * scale))
      inner.style.filter = t ? `brightness(${1 - t * dim})` : ''
    })
  }, enabled)
}

/** False on first paint, true one frame later — for on-load entrances. */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)))
    return () => cancelAnimationFrame(id)
  }, [])
  return mounted
}
