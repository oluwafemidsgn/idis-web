'use client'

import Button from './Button'
const visual = '/assets/alignment/alignment-visual.webp'
const visualSm = '/assets/alignment/alignment-visual-sm.webp'
const visualMd = '/assets/alignment/alignment-visual-md.webp'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * About intro — "Marketing Built Around Your Business Goals" (client copy,
 * Nov 2026; replaces the earlier "better alignment" text).
 * Two-column block: text (eyebrow, heading, body, CTA pill) on the left,
 * square composed visual on the right.
 * On scroll: heading rises word by word, copy and CTA fade up in turn, and the
 * visual lifts in while settling from a slight zoom.
 * Figma node-id: 1925:5605
 */
export default function Alignment() {
  const [ref, inView] = useInView({ threshold: 0.25 })
  return (
    <section id="alignment">
      <div className="page-shell">
        <div ref={ref} className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-[clamp(40px,5vw,97px)]">
          {/* Left text column */}
          <div className="flex w-full max-w-[680px] flex-col items-start justify-center gap-[clamp(24px,2.4vw,40px)]">
            <Reveal as="p" show={inView} from="translate-y-4" className="text-body-lg font-normal tracking-[0.05em] text-ink">
              ABOUT IDIS DIGITAL
            </Reveal>
            <h2 className="w-full text-h2 font-semibold text-ink">
              <RevealWords text="Marketing Built Around Your Business Goals" show={inView} delay={100} stagger={60} />
            </h2>

            <Reveal as="p" show={inView} delay={400} from="translate-y-6" className="w-full text-body-lg font-normal text-[#7b8698]">
              At Idis digital, we combine strategic thinking, creative execution, and digital expertise to help
              businesses grow. We develop tailored marketing solutions that connect brands with the right audiences,
              strengthen their presence, and turn marketing efforts into measurable business results.
            </Reveal>

            <Reveal show={inView} delay={650} from="translate-y-4 scale-95">
              <Button variant="dark">Let’s talk</Button>
            </Reveal>
          </div>

          {/* Right composed visual */}
          <Reveal
            show={inView}
            delay={200}
            from="translate-y-12"
            className="w-full overflow-hidden rounded-[24px] md:rounded-[40px]"
          >
            <img
              src={visual}
              srcSet={`${visualSm} 800w, ${visualMd} 1200w, ${visual} 1600w`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="lazy"
              decoding="async"
              alt="Smiling professional surrounded by colourful geometric shapes"
              className={`h-auto w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:scale-100 ${
                inView ? 'scale-100' : 'scale-115'
              }`}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
