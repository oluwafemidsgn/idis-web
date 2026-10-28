import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView, usePrefersReducedMotion, useScrollFrame } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * CTA — node 1931:18088.
 * Brand-blue card: a two-column intro at top, then a large white panel with a
 * big centered headline and two action pills (Start a Conversation / email).
 * Motion: the intro headline rises in word by word and the paragraph fades up;
 * the white panel grows from 90% to full size as it scrolls into view
 * (scroll-linked), then its headline, subtext and buttons rise in.
 */
export default function Cta() {
  const [introRef, introIn] = useInView({ threshold: 0.4 })
  const [headRef, headIn] = useInView({ threshold: 0.5 })
  const panel = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [grow, setGrow] = useState(1)

  // 0 when the panel's top enters the viewport bottom → 1 once it is 60% up.
  useScrollFrame(() => {
    const el = panel.current
    if (!el) return
    const vh = window.innerHeight
    const t = (vh - el.getBoundingClientRect().top) / (vh * 0.6)
    setGrow(Math.min(1, Math.max(0, t)))
  }, !reduced)

  return (
    <section id="get-in-touch" className="page-shell">
      <div className="rounded-[24px] bg-brand p-4 md:rounded-[40px] md:p-10 lg:p-[56px]">
        {/* Top two-column intro */}
        <div
          ref={introRef}
          className="grid grid-cols-1 gap-6 text-white lg:grid-cols-2 lg:items-end lg:gap-[clamp(40px,6vw,183px)]"
        >
          <h2 className="w-full max-w-[640px] text-h2 font-semibold">
            <RevealWords text="Your marketing should be doing more for your business." show={introIn} stagger={50} />
          </h2>
          <Reveal
            as="p"
            show={introIn}
            delay={400}
            from="translate-y-6"
            className="w-full max-w-[743px] text-body-lg font-normal lg:justify-self-end"
          >
            Whether you're repositioning a brand, entering a new market, building a stronger
            digital presence, launching a campaign or trying to understand why your current
            marketing isn't performing, it starts with the right conversation.
          </Reveal>
        </div>

        {/* White panel */}
        <div
          ref={panel}
          style={{ scale: reduced ? 1 : 0.9 + grow * 0.1 }}
          className="mt-[clamp(32px,3vw,56px)] origin-top rounded-[24px] bg-white px-4 py-10 md:rounded-[40px] md:p-10 lg:py-[clamp(56px,5vw,95px)]"
        >
          <div
            ref={headRef}
            className="mx-auto flex w-full max-w-[1387px] flex-col items-center gap-[clamp(20px,2vw,32px)] text-center"
          >
            <p className="max-w-[1100px] text-display-sm font-semibold text-ink">
              <RevealWords text="Tell us where you're trying to go." show={headIn} stagger={70} />
            </p>
            <Reveal as="p" show={headIn} delay={450} from="translate-y-6" className="text-body-lg font-normal text-[#7b8698]">
              We'll help you determine what marketing needs to do to get you there.
            </Reveal>

            <Reveal
              show={headIn}
              delay={600}
              from="translate-y-6"
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-[24px]"
            >
              <Link
                to="/contact"
                className="rounded-[99px] bg-brand px-8 py-4 text-body-lg font-medium text-[#fffbfb] transition-[opacity,translate] hover:-translate-y-0.5 hover:opacity-90"
              >
                Start a Conversation →
              </Link>
              <a
                href="mailto:Info@idisdigital.com"
                className="rounded-[99px] border border-[#7b8698] bg-white px-8 py-4 text-body-lg font-medium text-ink transition-[background-color,translate] hover:-translate-y-0.5 hover:bg-[#f7f8fa]"
              >
                Info@idisdigital.com
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
