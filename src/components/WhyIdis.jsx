import sparkle from '../assets/human-lead/ai-magic.svg'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * Why IDIS — node 1925:5602.
 * Centered header + an even 3×2 grid (2×3 on tablet, stacked on mobile) of five
 * value-prop cards and one solid peach accent tile, inside an off-white panel.
 * Every tile shares the same padding and height; the icon sits top-left and
 * the copy is anchored to the bottom so titles line up across a row.
 * On scroll the heading rises in word by word, then the tiles lift and scale
 * in one after another and each icon pops.
 */
const CARDS = [
  {
    title: 'Business-first thinking',
    desc: 'Marketing decisions are connected to the objectives the organisation is actually trying to achieve.',
  },
  {
    title: 'Strategy before activity',
    desc: 'We define the problem, audience and direction before adding more campaigns, channels or content.',
  },
  {
    title: 'Connected execution',
    desc: 'Brand, content, digital, performance and technology work from the same strategy rather than operating as separate pieces.',
  },
  {
    title: 'Decisions backed by data',
    desc: 'We use performance insights to identify opportunities, improve execution and focus investment where it matters.',
  },
  {
    title: 'A collaborative partnership',
    desc: 'We work closely with our clients, communicate clearly and adapt as their business and market evolve.',
  },
]

const TILE =
  'flex min-h-[200px] flex-col justify-between gap-8 md:min-h-[260px] md:gap-10 rounded-[24px] p-5 md:rounded-[32px] md:p-8 xl:min-h-[340px] 2xl:p-10'

export default function WhyIdis() {
  const [headRef, headIn] = useInView({ threshold: 0.5 })
  const [ref, inView] = useInView({ threshold: 0.15 })

  // Grid order: two cards, the accent tile, then the remaining three.
  const tiles = [CARDS[0], CARDS[1], 'accent', CARDS[2], CARDS[3], CARDS[4]]

  return (
    <section className="page-shell">
      <div className="flex flex-col items-center gap-[clamp(40px,5vw,72px)]">
        <div ref={headRef} className="flex w-full flex-col items-center gap-[clamp(16px,2vw,24px)] text-center text-ink lg:max-w-[980px]">
          <Reveal as="p" show={headIn} from="translate-y-4" className="text-body-lg font-normal">
            WHY IDIS
          </Reveal>
          <h2 className="text-h2 font-semibold">
            <RevealWords
              text="We don't start with deliverables. We start with the business."
              show={headIn}
              delay={100}
              stagger={50}
            />
          </h2>
        </div>

        <div
          ref={ref}
          className="w-full rounded-[24px] bg-[#fffbfb] p-3 sm:p-4 md:rounded-[40px] md:p-[clamp(16px,2vw,32px)]"
        >
          <ul className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-[clamp(16px,1.2vw,24px)]">
            {tiles.map((tile, i) => (
              <Reveal
                as="li"
                key={tile === 'accent' ? 'accent' : tile.title}
                show={inView}
                delay={i * 110}
                from="translate-y-16 scale-[0.94]"
              >
                {tile === 'accent' ? (
                  <div aria-hidden="true" className={`${TILE} h-full items-end bg-[#f4a57e]`}>
                    <img
                      src={sparkle}
                      alt=""
                      className="size-[clamp(64px,6vw,112px)] animate-[twinkle_6s_ease-in-out_infinite] brightness-0 invert motion-reduce:animate-none"
                    />
                  </div>
                ) : (
                  <ValueCard {...tile} show={inView} delay={i * 110 + 350} />
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ValueCard({ title, desc, show, delay }) {
  return (
    <div className={`${TILE} h-full bg-white`}>
      <Reveal show={show} delay={delay} from="scale-0" className="size-[48px] rounded-full bg-[#f4a57e] 2xl:size-[56px]" />
      <div className="flex flex-col gap-3">
        <h3 className="text-h4 font-semibold text-ink">{title}</h3>
        <p className="max-w-[40ch] text-body-lg font-normal text-[#7b8698]">{desc}</p>
      </div>
    </div>
  )
}
