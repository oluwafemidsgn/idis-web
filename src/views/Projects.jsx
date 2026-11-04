'use client'

import { useState } from 'react'
import { Link } from '@/lib/router'
import Button from '../components/Button'
import Cta from '../components/Cta'
import { Reveal, RevealWords } from '../components/Reveal'
import { FadeUp, RevealHeading, Sparkle } from '../components/ui'
import { useMounted } from '../hooks/scroll'
import { TESTIMONIALS_TITLE } from '../data/site'

/** Projects — "IDIS — Projects" in the pen.dev file. */

const FILTERS = [
  ['All', null],
  ['Brand', 'Brand'],
  ['Campaigns', 'Campaigns'],
  ['Digital', 'Digital'],
  ['Performance', 'Performance'],
]

const projectHref = (slug) => `/projects/${slug}`

/** Flattens a case study (from the database) into what the cards need. */
const toCard = (cs) => ({
  slug: cs.slug,
  client: cs.client,
  tag: cs.card.filterTag,
  title: cs.card.title,
  desc: cs.card.desc,
  results: cs.card.results ?? [],
  image: cs.card.image,
  cta: `${cs.card.cta || 'View case study'} →`,
})

function Cover({ p, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={p.image}
        loading="lazy"
        decoding="async"
        alt={`${p.client} campaign artwork`}
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
    </div>
  )
}

function Results({ p, big }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4">
      {p.results.map(([v, l]) => (
        <div key={v} className="flex min-w-[140px] flex-1 flex-col gap-1">
          <p className={`${big ? 'text-h4' : 'text-body-lg'} font-semibold text-ink`}>{v}</p>
          <p className="text-body text-slate">{l}</p>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ p, delay = 0 }) {
  return (
    <FadeUp delay={delay} className="group flex flex-col gap-6">
      <Link to={projectHref(p.slug)}>
        <Cover p={p} className="aspect-[4/3] rounded-[24px] bg-blush-200 md:rounded-[40px]" />
      </Link>
      <p className="text-body-lg tracking-[0.03em] text-slate uppercase">{p.client}</p>
      <h3 className="text-h3 font-semibold text-ink">{p.title}</h3>
      <p className="text-body-lg text-slate">{p.desc}</p>
      <Results p={p} />
      <Button href={projectHref(p.slug)} className="w-fit">
        {p.cta}
      </Button>
    </FadeUp>
  )
}

function NextCard() {
  return (
    <FadeUp delay={150} className="flex min-h-[420px] flex-col justify-between gap-10 rounded-[24px] bg-ink p-8 md:rounded-[40px] md:p-12">
      <Sparkle className="size-16 text-sun" strokeWidth={2} />
      <div className="flex flex-col gap-6">
        <p className="text-h2 font-semibold text-white">Your brand could be the next story here.</p>
        <p className="text-body-lg text-white/70">
          Tell us where you want to go. We'll show you how marketing can get you there — in a free 30-minute strategy
          session.
        </p>
        <Button href="/contact" variant="blue" className="w-fit">
          Start a conversation →
        </Button>
      </div>
    </FadeUp>
  )
}

export default function Projects({ items = [], testimonials = [] }) {
  const PROJECTS = items.map(toCard)
  const ready = useMounted()
  const [filter, setFilter] = useState(null)
  const [featured, ...rest] = PROJECTS
  const shown = filter ? PROJECTS.filter((p) => p.tag === filter) : rest

  return (
    <>
      {/* Hero */}
      <section className="page-shell pt-[clamp(24px,4vw,64px)]">
        <div className="content flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex items-start gap-3">
            <h1 className="text-display font-semibold leading-[0.85] text-ink">
              <RevealWords text="Work" show={ready} />
            </h1>
            <Reveal show={ready} delay={300} from="translate-y-4 scale-90" className="shrink-0">
              <span className="inline-block rounded-full bg-brand px-4 py-2 text-body font-semibold text-white md:px-5">{String(PROJECTS.length).padStart(2, '0')} works &amp; campaigns</span>
            </Reveal>
          </div>
          <Reveal show={ready} delay={400} from="translate-y-6" className="flex max-w-[440px] flex-col gap-7 lg:pb-4">
            <p className="text-body-lg text-slate">
              Strategy is only worth something when it moves the numbers. Here's how we've helped ambitious brands across
              Africa and the UK turn marketing into momentum.
            </p>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(([label, value]) => {
                const on = filter === value
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setFilter(value)}
                    className={`rounded-full px-[18px] py-[10px] text-[15px] font-medium transition-colors ${
                      on ? 'bg-ink text-white' : 'border border-line bg-white text-ink hover:border-ink'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <main className="flex flex-col gap-[clamp(64px,10vw,140px)] pb-[clamp(64px,10vw,140px)] pt-[clamp(48px,5.5vw,80px)]">
        <section className="page-shell flex flex-col gap-[clamp(56px,6vw,80px)]">
          {!filter && featured && (
            <FadeUp className="group flex flex-col gap-8">
              <Link to={projectHref(featured.slug)}>
                <Cover p={featured} className="aspect-[4/3] rounded-[24px] bg-sun md:aspect-[1336/620] md:rounded-[40px]" />
              </Link>
              <div className="grid grid-cols-1 gap-8 md:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
                <div className="flex flex-col gap-4">
                  <p className="text-body tracking-[0.06em] text-slate uppercase">
                    {featured.client} · {featured.tag}
                  </p>
                  <h2 className="text-h2 font-semibold text-ink">{featured.title}</h2>
                </div>
                <div className="flex flex-col gap-7 lg:pt-9">
                  <Results p={featured} big />
                  <Button href={projectHref(featured.slug)} className="w-fit">
                    {featured.cta}
                  </Button>
                </div>
              </div>
            </FadeUp>
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2">
            {shown.map((p, i) => (
              <ProjectCard key={p.slug} p={p} delay={(i % 2) * 150} />
            ))}
            {(shown.length % 2 === 1 || shown.length === 0) && <NextCard />}
          </div>
        </section>

        {/* Testimonials */}
        <section className="page-shell">
          <div className="rounded-[24px] bg-brand p-4 pt-12 md:rounded-[40px] md:p-12 md:pt-[88px]">
            <RevealHeading text={TESTIMONIALS_TITLE} className="max-w-[760px] px-2 text-h2 font-semibold text-white md:px-4" />
            <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 lg:grid-cols-2 lg:gap-5">
              {testimonials.map((t, i) => (
                <FadeUp key={t.author} as="figure" delay={i * 120} className="flex flex-col gap-7 rounded-[24px] bg-white p-7 md:p-8">
                  <div className="flex items-center gap-5">
                    <span className={`size-14 shrink-0 rounded-full ${t.accent}`} />
                    <figcaption className="text-h5 font-semibold text-ink">{t.author}</figcaption>
                  </div>
                  <blockquote className="text-body-lg text-slate">{t.quote}</blockquote>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <Cta />
      </main>
    </>
  )
}
