'use client'

import { useRef } from 'react'
import Button from './Button'
import { Reveal, RevealWords } from './Reveal'
import { useMounted, usePrefersReducedMotion, useScrollFrame } from '../hooks/scroll'
const collage = '/assets/hero-collage.webp'
const collageSm = '/assets/hero-collage-sm.webp'
const personLeft = '/assets/hero/person-left.webp'
const personCenter = '/assets/hero/person-center.webp'
const personRight = '/assets/hero/person-right.webp'
/**
 * Hero — node 1910:383, copy per client feedback (Nov 2026).
 * A rounded light off-white frame holding the headline and CTA,
 * above a "stage": the collage graphic plus three cut-out portraits
 * (Figma "image 10" left, "image 4" centre, "image 9" right) clipped by the
 * frame's bottom edge.
 *
 * The stage mirrors Figma's geometry: it spans the 1807px frame width from
 * y=424 (under the CTA) to the frame bottom (y=1014), i.e. 1807×590, and every
 * layer is positioned in % of that box so the composition scales as one.
 * On phones the stage is widened (180%, 150% from sm) so the people stay a readable size;
 * the outer portraits crop at the frame edges.
 *
 * Motion: on load the headline rises in word by word, then the subtitle and
 * CTA; the collage lifts in and the three portraits rise up from below the
 * frame one after another. While scrolling away, each layer drifts at its
 * own speed (parallax) for depth.
 */
const pct = (v, of) => `${(v / of) * 100}%`
const STAGE_W = 1807
const STAGE_H = 590
const STAGE_Y = 424

// Figma frame coordinates (x, y, width) → CSS % of the stage.
const place = (x, y, w) => ({
  left: pct(x, STAGE_W),
  top: pct(y - STAGE_Y, STAGE_H),
  width: pct(w, STAGE_W),
})

// `depth` = parallax speed (px of drift per px scrolled); `delay` = entrance order.
const PEOPLE = [
  // Paint order follows Figma's layer order: centre, then left, then right.
  { src: personCenter, alt: 'Smiling woman in a pink top', depth: 0.1, delay: 1000, ...place(620, 470, 533) },
  { src: personLeft, alt: 'Woman in a beret looking at her phone', depth: 0.16, delay: 700, ...place(-148, 277, 736) },
  { src: personRight, alt: 'Smiling man in glasses with arms crossed', depth: 0.13, delay: 850, ...place(1256, 413, 584) },
]

export default function Hero() {
  const ready = useMounted()
  const reduced = usePrefersReducedMotion()
  const stage = useRef(null)

  // Parallax: expose how far the page has scrolled past the hero as --scroll.
  useScrollFrame(() => {
    const el = stage.current
    if (!el) return
    el.style.setProperty('--scroll', String(Math.min(window.scrollY, window.innerHeight)))
  }, !reduced)

  const drift = (depth) => ({ translate: `0 calc(var(--scroll, 0) * ${-depth}px)` })

  return (
    <section id="home" className="page-shell">
      <div className="relative overflow-hidden rounded-[24px] bg-blush-200 pt-12 md:rounded-[40px] md:pt-[80px]">
        {/* Headline block */}
        <div className="relative z-10 mx-auto flex w-[1335px] max-w-full flex-col items-center gap-6 px-4 text-center md:gap-[33px]">
          <h1 className="max-w-[1180px] text-h1 font-semibold text-ink">
            <RevealWords
              text="Drive your Business Forward With Our Expert Digital Marketing Services"
              show={ready}
              delay={100}
              stagger={55}
            />
          </h1>
          <Reveal show={ready} delay={650} from="translate-y-4 scale-95">
            <Button variant="dark">Let’s talk</Button>
          </Reveal>
        </div>

        {/* Stage: collage + portraits, flush with the frame's bottom edge */}
        <div
          ref={stage}
          className="pointer-events-none relative -ml-[40%] mt-4 aspect-[1807/590] w-[180%] sm:-ml-[25%] sm:w-[150%] md:ml-0 md:mt-0 md:w-full"
        >
          <Reveal
            show={ready}
            delay={450}
            from="translate-y-16 scale-95"
            className="absolute bottom-0 origin-bottom duration-[1200ms]!"
            style={{ left: pct(3, STAGE_W), width: pct(1800, STAGE_W) }}
          >
            <img
              src={collage}
              srcSet={`${collageSm} 1200w, ${collage} 2400w`}
              sizes="(min-width: 768px) 100vw, 180vw"
              alt=""
              className="h-auto w-full"
              style={drift(0.04)}
            />
          </Reveal>
          {PEOPLE.map((p) => (
            <Reveal
              key={p.alt}
              show={ready}
              delay={p.delay}
              from="translate-y-[35%]"
              className="absolute duration-[1300ms]!"
              style={{ left: p.left, top: p.top, width: p.width }}
            >
              <img src={p.src} alt={p.alt} className="h-auto w-full max-w-none" style={drift(p.depth)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
