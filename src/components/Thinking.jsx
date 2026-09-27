import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * Thinking — node 1931:17005.
 * Two columns: a sticky-feel header on the left, and a tall off-white panel on
 * the right holding three article cards. Each card's thumbnail is a solid
 * brand-blue block (as authored in Figma — no image asset).
 * On scroll the header rises in and each article card slides in from the right.
 */

const ARTICLES = [
  {
    date: 'September 24, 2026',
    title: 'AI Is a Production Accelerator. Your Strategy Still Needs a Human.',
    excerpt:
      'Why speed is valuable, but knowing what to create — and why — remains a strategic decision.',
  },
  {
    date: 'September 24, 2026',
    title: 'From Social Listening to Community Stewardship',
    excerpt:
      'What brands can learn when they stop simply monitoring their audiences and start building with them.',
  },
  {
    date: 'September 24, 2026',
    title: "Your Brand Isn't Your Logo. It's Your Operating System.",
    excerpt:
      'Why great branding influences how a company communicates, prioritises and makes decisions.',
  },
]

function ArticleCard({ a }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <Reveal
      ref={ref}
      show={inView}
      from="translate-x-16"
      className="group flex flex-col gap-6 overflow-hidden rounded-[24px] bg-white p-4 sm:flex-row sm:items-center sm:gap-[clamp(20px,2vw,32px)] md:rounded-[32px] md:p-6"
    >
      <div className="aspect-[387/321] w-full shrink-0 rounded-[16px] bg-brand transition-transform duration-500 group-hover:scale-[1.02] sm:w-[40%] sm:max-w-[387px]" />
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[clamp(8px,1.2vw,20px)]">
        <p className="text-body-lg font-normal text-[#7b8698]">{a.date}</p>
        <p className="text-h4 font-medium text-ink">{a.title}</p>
        <p className="text-body-lg font-normal text-[#7b8698]">{a.excerpt}</p>
      </div>
    </Reveal>
  )
}

export default function Thinking() {
  const [headRef, headIn] = useInView({ threshold: 0.5 })
  return (
    <section className="page-shell">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[clamp(40px,4vw,79px)]">
        {/* Left header column */}
        <div
          ref={headRef}
          className="flex w-full flex-col items-start justify-center gap-[clamp(16px,2vw,33px)] lg:sticky lg:top-8 lg:w-[34%] lg:shrink-0"
        >
          <Reveal as="p" show={headIn} from="translate-y-4" className="text-body-lg font-normal text-ink">
            THINKING
          </Reveal>
          <h2 className="text-h2 font-semibold text-ink">
            <RevealWords text="Ideas for businesses that want more from their marketing." show={headIn} delay={100} stagger={50} />
          </h2>
          <Reveal as="p" show={headIn} delay={500} from="translate-y-4" className="text-body-lg font-normal text-[#7b8698]">
            We don't just execute marketing. We think deeply about how it is changing.
          </Reveal>
        </div>

        {/* Right panel with article cards */}
        <div className="flex h-auto min-w-0 flex-1 flex-col gap-[clamp(16px,1.6vw,32px)] overflow-hidden rounded-[24px] bg-[#fffbfb] p-4 md:rounded-[40px] md:p-[clamp(24px,3.3vw,64px)]">
          {ARTICLES.map((a) => (
            <ArticleCard key={a.title} a={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
