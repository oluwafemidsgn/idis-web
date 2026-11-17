'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/lib/router'
const poster = '/assets/pages/showreel-poster.webp'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * "See IDIS in action" — the showreel preview from Homepage V2.
 * Heading row (eyebrow + title left, intro right) above a large rounded video
 * card: poster image, centred play button, title + tags bottom-left and the
 * running time bottom-right. The card scales up slightly as it enters.
 *
 * Set SHOWREEL_URL to an embeddable video (YouTube/Vimeo embed or .mp4) once
 * the showreel is ready; until then the play button opens a short note.
 */
const SHOWREEL_URL = ''

export default function VideoPreview() {
  const [headRef, headIn] = useInView({ threshold: 0.4 })
  const [cardRef, cardIn] = useInView({ threshold: 0.2 })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="page-shell">
      <div ref={headRef} className="content-cap flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="flex max-w-[860px] flex-col gap-4">
          <Reveal show={headIn} from="translate-y-4" className="flex items-center gap-[10px] text-[15px] font-medium tracking-[0.1em] text-ink">
            <span className="size-[10px] rounded-full bg-coral" />
            SEE IDIS IN ACTION
          </Reveal>
          <h2 className="text-h2 font-semibold text-ink">
            <RevealWords text="A showcase of work that speaks for itself" show={headIn} stagger={50} />
          </h2>
        </div>
        <Reveal as="p" show={headIn} delay={350} from="translate-y-6" className="max-w-[440px] text-body-lg text-slate">
          A look at some of the brands, campaigns and projects we’ve had the opportunity to work on.
        </Reveal>
      </div>

      <Reveal
        ref={cardRef}
        show={cardIn}
        from="translate-y-12 scale-[0.96]"
        className="content-cap mt-[clamp(28px,3vw,48px)]"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play the IDIS Digital showreel"
          className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[24px] text-left sm:aspect-[16/10] md:rounded-[40px] lg:aspect-[1336/760]"
        >
          <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-gradient-to-b from-ink/0 from-45% to-ink/80" />

          {/* Play button */}
          <span className="absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_16px_40px_rgba(4,9,23,0.25)] transition-transform duration-300 group-hover:scale-110 md:size-[104px]">
            <svg viewBox="0 0 24 24" className="ml-1 size-7 text-ink md:size-9" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.05-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>

          {/* Caption */}
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white md:p-10">
            <span className="flex flex-col gap-2">
              <span className="text-h4 font-semibold">IDIS Digital — Showreel 2026</span>
              <span className="text-body text-white/75">Strategy · Brand · Digital · Performance</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[15px] font-medium backdrop-blur">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" />
              </svg>
              2:14
            </span>
          </span>
        </button>
      </Reveal>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="IDIS Digital showreel"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[1100px]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute -top-14 right-0 grid size-11 place-items-center rounded-full bg-white text-ink"
            >
              ✕
            </button>
            {SHOWREEL_URL ? (
              SHOWREEL_URL.endsWith('.mp4') ? (
                <video src={SHOWREEL_URL} controls autoPlay className="aspect-video w-full rounded-[24px] bg-black" />
              ) : (
                <iframe src={SHOWREEL_URL} title="IDIS Digital showreel" allow="autoplay; fullscreen" allowFullScreen className="aspect-video w-full rounded-[24px] bg-black" />
              )
            ) : (
              <div className="flex flex-col items-center gap-5 rounded-[24px] bg-white p-8 text-center md:rounded-[40px] md:p-14">
                <p className="text-h3 font-semibold text-ink">Our 2026 showreel is almost ready.</p>
                <p className="max-w-[520px] text-body-lg text-slate">
                  While we put the finishing touches on it, take a look at the work behind it.
                </p>
                <Link to="/projects" className="rounded-full bg-brand px-8 py-4 text-body-lg font-medium text-white">
                  See our projects →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
