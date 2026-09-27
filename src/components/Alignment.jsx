import Button from './Button'
import visual from '../assets/alignment/alignment-visual.png'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * Alignment — "Great marketing isnt more activity, its better alignment"
 * Two-column block: text (heading, body, CTA pill) on the left,
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
            <h2 className="w-full text-h2 font-semibold text-ink">
              <RevealWords text="Great marketing isnt more activity, its better alignment" show={inView} stagger={50} />
            </h2>

            <Reveal show={inView} delay={350} from="translate-y-6" className="w-full text-body-lg font-normal text-[#7b8698]">
              <p>Your brand may look good but struggle to convert.</p>
              <p>Your team may be creating content without a clear strategy.</p>
              <p>Your campaigns may generate impressions without moving the business.</p>
              <p>
                Your website, social channels, paid media and sales conversations may
                all be communicating slightly different things.
              </p>
              <p>The problem isn't always that you need more marketing.</p>
              <p>Sometimes, you need the pieces you already have to work together.</p>
              <p>That's where IDIS comes in.</p>
            </Reveal>

            <Reveal as="p" show={inView} delay={500} from="translate-y-6" className="w-full text-body-lg font-normal text-[#7b8698]">
              We connect strategy, creativity, technology and performance into one
              coherent marketing system — so every channel has a purpose, every
              campaign has a direction and every decision moves towards a clear
              business objective.
            </Reveal>

            <Reveal show={inView} delay={650} from="translate-y-4 scale-95">
              <Button variant="dark">Lets talk</Button>
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
