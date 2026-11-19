'use client'

import { Link } from '@/lib/router'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * Thinking — node 1931:17005.
 * Two columns: a sticky-feel header on the left, and a tall off-white panel on
 * the right holding the three latest published blog posts (from /admin),
 * each with its cover image.
 * On scroll the header rises in and each article card slides in from the right.
 */

const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

function ArticleCard({ a }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <Reveal
      ref={ref}
      as={Link}
      to={`/blog/${a.slug}`}
      show={inView}
      from="translate-x-16"
      className="group flex flex-col gap-6 overflow-hidden rounded-[24px] bg-white p-4 sm:flex-row sm:items-center sm:gap-[clamp(20px,2vw,32px)] md:rounded-[32px] md:p-6"
    >
      <div className="aspect-[387/321] w-full shrink-0 overflow-hidden rounded-[16px] bg-brand sm:w-[40%] sm:max-w-[387px]">
        {a.cover && (
          <img src={a.cover} alt={a.coverAlt || ''} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[clamp(8px,1.2vw,20px)]">
        <p className="text-body-lg font-normal text-[#7b8698]">{fmtDate(a.publishedAt)}</p>
        <p className="text-h4 font-medium text-ink">{a.title}</p>
        <p className="text-body-lg font-normal text-[#7b8698]">{a.excerpt}</p>
      </div>
    </Reveal>
  )
}

export default function Thinking({ posts = [] }) {
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
          <Reveal show={headIn} delay={650} from="translate-y-4">
            <Link
              to="/blog"
              className="inline-block rounded-[99px] bg-ink px-8 py-4 text-body-lg font-medium text-white transition-opacity hover:opacity-90"
            >
              Read the blog →
            </Link>
          </Reveal>
        </div>

        {/* Right panel with article cards */}
        <div className="flex h-auto min-w-0 flex-1 flex-col gap-[clamp(16px,1.6vw,32px)] overflow-hidden rounded-[24px] bg-blush p-4 md:rounded-[40px] md:p-[clamp(24px,3.3vw,64px)]">
          {posts.map((a) => (
            <ArticleCard key={a.title} a={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
