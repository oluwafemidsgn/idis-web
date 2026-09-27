import aiMagic from '../assets/human-lead/ai-magic.svg'
import collage from '../assets/human-lead/collage.png'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * Human Lead — node 1922:2970.
 * Brand-blue card: an oversized "AI Enabled" + sparkle lockup with "Human Lead"
 * beneath, then a white panel pairing a collage with supporting copy.
 * On scroll: "AI Enabled" rises in word by word, the sparkle spins in and then
 * keeps a slow twinkle, "Human Lead" follows, then the panel lifts in with the
 * collage and copy sliding in from opposite sides.
 */
export default function HumanLead() {
  const [headRef, headIn] = useInView({ threshold: 0.35 })
  const [panelRef, panelIn] = useInView({ threshold: 0.2 })

  return (
    <section className="page-shell">
      <div className="w-full rounded-[24px] bg-brand p-4 md:rounded-[40px] md:p-10 lg:p-[64px]">
        {/* Oversized header */}
        <div ref={headRef} className="flex flex-col items-center gap-[clamp(12px,1.7vw,33px)]">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <p className="text-center text-display font-semibold text-white">
              <RevealWords text="AI Enabled" show={headIn} stagger={140} />
            </p>
            <Reveal show={headIn} delay={300} from="scale-0 -rotate-180" className="shrink-0">
              <img
                src={aiMagic}
                alt=""
                className="size-[clamp(64px,15vw,312px)] animate-[twinkle_6s_ease-in-out_1.4s_infinite] motion-reduce:animate-none"
              />
            </Reveal>
          </div>
          <p className="text-center text-h2 font-semibold text-white">
            <RevealWords text="Human Lead" show={headIn} delay={450} stagger={120} />
          </p>
        </div>

        {/* White panel */}
        <Reveal
          ref={panelRef}
          show={panelIn}
          from="translate-y-16 scale-[0.97]"
          className="mt-[clamp(32px,3vw,56px)] rounded-[24px] bg-white p-5 md:rounded-[40px] md:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-[clamp(40px,5vw,97px)]">
            <Reveal
              show={panelIn}
              delay={200}
              from="-translate-x-10"
              className="aspect-[743/706] w-full overflow-hidden rounded-[24px] md:rounded-[32px]"
            >
              <img
                src={collage}
                alt="Human and AI collaboration collage"
                className="h-full w-full object-cover"
              />
            </Reveal>

            <Reveal
              show={panelIn}
              delay={350}
              from="translate-x-10"
              className="flex w-full max-w-[680px] flex-col gap-[clamp(16px,1.4vw,24px)]"
            >
              <p className="text-h4 font-semibold text-ink">
                We use technology to accelerate marketing — not replace thinking.
              </p>
              <p className="text-body font-normal text-[#7b8698]">
                AI has transformed how quickly marketing teams can research, produce, analyse and
                iterate. But faster production doesn't automatically mean better marketing. The
                difficult decisions still come first: Who are we trying to reach? What actually
                matters to them? What should this brand stand for? Which channels deserve
                investment? What message will move someone from attention to action?
              </p>
              <p className="text-body font-normal text-[#7b8698]">
                At IDIS, we combine human strategy with modern technology, automation and
                AI-enabled workflows to help clients move faster without sacrificing judgment,
                context or creativity.
              </p>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
