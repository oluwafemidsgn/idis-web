import { useRef } from 'react'
import { usePrefersReducedMotion, useInView, useStackEffect } from '../hooks/scroll'

/**
 * Testimonials — node 1931:17052.
 * Brand-blue card: an oversized "Testimonials" word, heading, then the three
 * quote cards as a sticky stack — each card pins a little lower than the last,
 * so as you scroll they pile up on one another (slightly tilted, like cards on
 * a table, with the covered ones easing back) before the section leaves the
 * frame. Avatar circles are solid peach (#f4a57e), as authored in Figma.
 */
const CARDS = [
  {
    quote:
      '“Working with IDIS felt seamless from the start. They balanced efficiency, professionalism and adaptability, delivering on-brand graphics and videos for AAG 2024 with impressive turnaround times while remaining collaborative and responsive to feedback.”',
    author: 'AfriLabs',
    tilt: -2,
  },
  {
    quote:
      '“IDIS Digital played an important role in supporting the cinema release of Mothers of Chibok. Their team brought a thoughtful, well-executed approach that helped us build awareness and connect the film with the right audience.”',
    author: 'Mothers of Chibok',
    tilt: 1.5,
  },
  {
    quote:
      "“IDIS' dedication, expertise and attention to detail made a real difference throughout the project. Their responsiveness and quality of work were outstanding.”",
    author: 'Duke of Shomolu Foundation',
    tilt: -0.5,
  },
]

// Sticky offsets (px): each card pins STEP below the previous one.
const TOP = 96
const STEP = 28

// Shared reveal transition for the heading; `shown` toggles the end state.
const reveal = (shown) =>
  `transition-[opacity,translate,scale] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
    shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-16 opacity-0'
  }`

export default function Testimonials() {
  const [headRef, headIn] = useInView({ threshold: 0.3 })
  const cards = useRef([])
  const reduced = usePrefersReducedMotion()

  useStackEffect(cards, (i) => TOP + i * STEP, { scale: 0.06, dim: 0.04, enabled: !reduced })

  return (
    <section className="page-shell">
      {/* overflow-clip (not hidden) so the sticky cards pin to the viewport */}
      <div className="relative h-auto w-full overflow-clip rounded-[24px] bg-brand p-4 md:rounded-[40px] md:p-10 lg:p-[64px]">
        {/* Oversized section word */}
        <p
          ref={headRef}
          aria-hidden="true"
          className={`pointer-events-none select-none whitespace-nowrap text-center text-display font-semibold text-white max-[400px]:text-[12.5vw] ${reveal(headIn)} ${headIn ? '' : 'scale-95'}`}
        >
          Testimonials
        </p>

        {/* Heading */}
        <h2
          style={{ transitionDelay: '150ms' }}
          className={`relative z-10 mx-auto mt-[clamp(12px,2vw,33px)] max-w-[569px] text-center text-h2 font-semibold text-white ${reveal(headIn)}`}
        >
          Good partnerships leave evidence.
        </h2>

        {/* Sticky card stack */}
        <ul className="relative z-10 mx-auto mt-[clamp(40px,5vw,96px)] flex max-w-[880px] flex-col gap-[40vh] pb-[8vh]">
          {CARDS.map((c, i) => (
            <li
              key={c.author}
              ref={(el) => (cards.current[i] = el)}
              className="sticky"
              style={{ top: `calc(${TOP}px + ${i * STEP}px)` }}
            >
              <figure
                data-card
                style={{ scale: 'var(--stack-scale, 1)', rotate: reduced ? '0deg' : `${c.tilt}deg` }}
                className="origin-top rounded-[24px] bg-white p-5 shadow-[0_-16px_48px_rgba(4,9,23,0.18)] will-change-transform md:rounded-[40px] md:p-[clamp(28px,3vw,56px)]"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="size-[56px] shrink-0 rounded-full bg-[#f4a57e] md:size-[80px]" />
                  <figcaption className="text-h4 font-semibold text-ink">{c.author}</figcaption>
                </div>
                <blockquote className="mt-[clamp(20px,2.4vw,40px)] text-h5 font-normal leading-[1.5] tracking-normal [text-wrap:pretty] text-[#7b8698]">
                  {c.quote}
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
