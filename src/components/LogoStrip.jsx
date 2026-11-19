'use client'

import { useInView } from '../hooks/scroll'
import { Reveal } from './Reveal'

/**
 * LogoStrip — full-bleed, single-row marquee of client/partner logos.
 * Shows the client logos supplied by IDIS (Nov 2026), spaced with an 80px gap.
 * The row is rendered twice back-to-back and slid left by exactly one copy's
 * width, so the loop is seamless. Edges fade out; it pauses on hover and
 * keeps scrolling for everyone (client request). The strip fades up as it enters.
 * A "Trusted By Leading Brands" heading sits above (client feedback, Nov 2026).
 */
// Client logos, cleaned up (backgrounds removed, trimmed) into public/assets/logos.
// `w` is the display width at desktop size, chosen so the marks look balanced
// rather than all sharing one height (wide wordmarks would otherwise dominate).
const LOGOS = [
  { id: 'duke-of-shomolu', alt: 'Duke of Shomolu Foundation', w: 104 },
  { id: 'afrilabs', alt: 'AfriLabs', w: 62 },
  { id: 'bank-of-industry', alt: 'Bank of Industry', w: 196 },
  { id: 'mothers-of-chibok', alt: 'Mothers of Chibok', w: 96 },
  { id: 'savilock', alt: 'SaviLock', w: 168 },
  { id: 'aiip', alt: 'Abia Industrial Innovation Park', w: 70 },
  { id: 'kingsway-bistro', alt: 'Kingsway Bistro', w: 120 },
  { id: 'sats-app', alt: 'Sats App', w: 60 },
  { id: 'jb-multimedia', alt: 'JB Multimedia Studios', w: 112 },
]

// Each half of the marquee repeats the set twice so it is always wider than the
// screen (even on ultra-wide monitors) — no gap ever shows as it loops.
const ROW = [...LOGOS, ...LOGOS]

function Row({ hidden = false }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-x-10 pr-10 md:gap-x-[80px] md:pr-[80px]"
    >
      {ROW.map((l, i) => (
        <li key={`${l.id}-${i}`} className="shrink-0">
          <img
            src={`/assets/logos/${l.id}.webp`}
            alt={hidden ? '' : l.alt}
            style={{ '--w': `${l.w}px` }}
            className="block h-auto w-[calc(var(--w)*0.75)] md:w-[var(--w)]"
          />
        </li>
      ))}
    </ul>
  )
}

export default function LogoStrip() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section
      id="logos"
      aria-label="Client and partner logos"
      className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <Reveal ref={ref} show={inView} from="translate-y-4">
        <p className="mb-[clamp(24px,3vw,40px)] text-center text-body-lg font-medium tracking-[0.06em] text-slate uppercase">
          Trusted By Leading Brands
        </p>
        <div className="flex w-max animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </Reveal>
    </section>
  )
}
