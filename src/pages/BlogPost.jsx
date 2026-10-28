import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import heroImg from '../assets/human-lead/collage.webp'
import heroImgMd from '../assets/human-lead/collage-md.webp'
import figureImg from '../assets/services/performance-ai-md.webp'
import founderPhoto from '../assets/founder/founder-photo-sm.webp'
import Newsletter from '../components/Newsletter'
import { Reveal, RevealWords } from '../components/Reveal'
import { Check, FadeUp, Tag } from '../components/ui'
import { useMounted } from '../hooks/scroll'
import { FEATURED_POST_SLUG, POSTS, postHref } from '../data/site'

/** Blog post — "IDIS — Blog Post" in the pen.dev file. */

const SECTIONS = [
  ['speed-trap', 'The speed trap'],
  ['ai-strengths', 'What AI is genuinely good at'],
  ['humans-win', 'Where humans still win'],
  ['simple-split', 'A simple split that works'],
  ['takeaways', 'Key takeaways'],
]

const RELATED = [
  [POSTS[0], 'bg-sun', 'Strategy'],
  [POSTS[1], 'bg-pink', 'Strategy'],
  [POSTS[2], 'bg-mint', 'Community'],
]

const P = ({ children }) => <p className="text-body-lg leading-[1.7] text-[#3a4254]">{children}</p>
const H = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-8 pt-2 text-h4 font-semibold text-ink">
    {children}
  </h2>
)

export default function BlogPost() {
  const { slug } = useParams()
  const ready = useMounted()
  const [copied, setCopied] = useState(false)
  if (slug !== FEATURED_POST_SLUG) return <Navigate to="/blog" replace />

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const title = 'AI is a production accelerator. Your strategy still needs a human.'
  const share = [
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, 'in'],
    ['X', `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '𝕏'],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'f'],
  ]
  const copy = () => {
    navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      {/* Article head */}
      <section className="page-shell">
        <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-8 pb-12 pt-[clamp(16px,4vw,64px)] text-center md:pb-14">
          <Reveal show={ready} from="translate-y-3" className="flex items-center gap-3 text-body text-slate">
            <Link to="/blog" className="transition-colors hover:text-ink">
              Journal
            </Link>
            <span className="text-gray-300">›</span>
            <Tag className="bg-lime text-ink">AI & Tech</Tag>
          </Reveal>
          <h1 className="text-h1 font-semibold text-ink">
            <RevealWords text={title} show={ready} delay={100} stagger={45} />
          </h1>
          <Reveal as="p" show={ready} delay={500} from="translate-y-4" className="max-w-[720px] text-h5 font-normal text-slate">
            AI can draft fifty ad variations before lunch. It still can't tell you which customer to chase, or why they
            should care.
          </Reveal>
          <Reveal show={ready} delay={650} from="translate-y-4" className="flex items-center gap-4 text-left">
            <img src={founderPhoto} alt="" className="size-14 rounded-full bg-blush-200 object-cover" />
            <span>
              <span className="block text-body font-semibold text-ink">Sidi Adisa</span>
              <span className="block text-[15px] text-slate">May 15, 2026 · 6 min read</span>
            </span>
          </Reveal>
        </div>
      </section>

      <section className="page-shell">
        <Reveal show={ready} delay={750} from="translate-y-12 scale-[0.98]" className="overflow-hidden rounded-[24px] bg-blush-200 md:rounded-[40px]">
          <img
            src={heroImg}
            srcSet={`${heroImgMd} 1200w, ${heroImg} 1400w`}
            sizes="100vw"
            alt="Halftone collage of a human hand and a robot hand reaching towards each other"
            className="aspect-[4/3] w-full object-cover md:aspect-[1336/640]"
          />
        </Reveal>
      </section>

      <main className="flex flex-col gap-[clamp(64px,9vw,120px)] py-[clamp(56px,7vw,96px)]">
        {/* Body */}
        <section className="page-shell">
          <div className="content grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-[clamp(48px,7vw,120px)]">
            <aside className="hidden lg:block">
              <div className="sticky top-8 flex flex-col gap-10">
                <nav aria-label="In this article" className="flex flex-col">
                  <p className="mb-4 text-[14px] font-semibold tracking-[0.1em] text-slate">IN THIS ARTICLE</p>
                  {SECTIONS.map(([id, label]) => (
                    <a key={id} href={`#${id}`} className="border-l border-line py-[10px] pl-4 text-body text-slate transition-colors hover:border-brand hover:text-brand">
                      {label}
                    </a>
                  ))}
                </nav>
                <div className="flex flex-col gap-4">
                  <p className="text-[14px] font-semibold tracking-[0.1em] text-slate">SHARE</p>
                  <div className="flex gap-[10px]">
                    {share.map(([name, href, glyph]) => (
                      <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Share on ${name}`} className="grid size-11 place-items-center rounded-full bg-blush-200 text-body font-semibold text-ink transition-colors hover:bg-ink hover:text-white">
                        {glyph}
                      </a>
                    ))}
                    <button type="button" onClick={copy} aria-label="Copy link" className="grid size-11 place-items-center rounded-full bg-blush-200 text-ink transition-colors hover:bg-ink hover:text-white">
                      {copied ? '✓' : '🔗'}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <article className="flex flex-col gap-7">
              <p className="text-h5 font-medium leading-[1.5] text-ink">
                Every week another tool promises to replace your marketing team. And every week, brands discover the
                same thing: producing more content was never the hard part.
              </p>
              <H id="speed-trap">The speed trap</H>
              <P>
                AI has collapsed the cost of making things. Copy, images, video edits, reports — work that took days now
                takes minutes. That's a genuine gift. But when everyone can produce at the same speed, speed stops being
                an advantage.
              </P>
              <P>What's left is the part machines can't shortcut: deciding what's worth making in the first place.</P>
              <FadeUp as="blockquote" className="flex flex-col gap-5 rounded-[24px] bg-brand p-8 md:p-10">
                <span className="text-[72px] font-semibold leading-[0.5] text-sun" aria-hidden="true">“</span>
                <p className="text-h4 font-semibold text-white">AI makes the work faster. Strategy makes sure it's the right work.</p>
              </FadeUp>
              <H id="ai-strengths">What AI is genuinely good at</H>
              <P>
                Drafting variations. Summarising research. Spotting patterns in campaign data. Repurposing one great idea
                into twenty formats. We use these tools every day — and they've made our team noticeably faster.
              </P>
              <FadeUp as="figure" className="flex flex-col gap-3 py-2">
                <img src={figureImg} alt="Halftone collage of a hand holding a speedometer" loading="lazy" className="aspect-[760/420] w-full rounded-[24px] object-cover" />
                <figcaption className="text-[15px] text-slate">
                  Use AI to measure and iterate faster — then let people decide what the numbers mean.
                </figcaption>
              </FadeUp>
              <H id="humans-win">Where humans still win</H>
              <P>
                Choosing which customer to chase. Understanding why a market is shifting. Knowing when a brand should stay
                quiet. These are judgement calls built on context, taste and accountability — and they're where most of
                the value in marketing lives.
              </P>
              <H id="simple-split">A simple split that works</H>
              <P>
                Our rule of thumb: people set the direction, AI accelerates the journey. Strategists define the audience,
                message and success metrics. AI helps produce, test and report. People review what comes back and decide
                what happens next.
              </P>
              <FadeUp id="takeaways" className="flex scroll-mt-8 flex-col gap-5 rounded-[24px] bg-sun p-8 md:p-10">
                <p className="text-h5 font-semibold text-ink">Key takeaways</p>
                {[
                  'Use AI to go faster on production, research and reporting.',
                  'Keep strategy, positioning and final judgement with people.',
                  "Measure outcomes, not output — more content isn't the goal.",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-4">
                    <Check className="mt-0.5 bg-ink" stroke="#ffce31" size={28} />
                    <p className="text-body-lg text-ink">{t}</p>
                  </div>
                ))}
              </FadeUp>
              <P>
                The brands that win the next five years won't be the ones producing the most. They'll be the ones that
                pair machine speed with human clarity about where they're going.
              </P>
              <div className="flex flex-wrap gap-2 border-t border-line pt-6">
                {['#AI', '#Strategy', '#Marketing operations'].map((t) => (
                  <span key={t} className="rounded-full border border-line px-4 py-2 text-[15px] text-ink">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-col items-start gap-5 rounded-[24px] bg-blush-200 p-7 sm:flex-row sm:items-center sm:gap-6">
                <img src={founderPhoto} alt="" className="size-20 shrink-0 rounded-full bg-white object-cover md:size-24" />
                <div className="flex flex-col gap-1">
                  <p className="text-h5 font-semibold text-ink">Written by Sidi Adisa</p>
                  <p className="text-body text-slate">
                    Founder & Lead Consultant at IDIS. 15+ years helping brands grow through strategy, rebrands and
                    digital experiences.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Related */}
        <section className="page-shell">
          <div className="content flex flex-col gap-10">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-h2 font-semibold text-ink">Keep reading</h2>
              <Link to="/blog" className="shrink-0 text-body-lg font-medium text-brand hover:underline">
                All posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {RELATED.map(([p, bg, cat], i) => (
                <FadeUp key={p.title} delay={i * 100}>
                  <Link to={postHref(p)} className="group flex flex-col gap-5">
                    <span className={`flex aspect-[4/3] flex-col justify-between rounded-[24px] p-6 transition-transform duration-500 group-hover:-translate-y-1 ${bg}`}>
                      <Tag>{cat}</Tag>
                      <span className="self-end text-[96px] font-semibold leading-none text-ink/15">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="text-[15px] text-slate">
                      {p.date} · {p.mins} min read
                    </span>
                    <span className="text-h5 font-semibold text-ink">{p.title}</span>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
    </>
  )
}
