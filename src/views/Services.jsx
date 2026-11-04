'use client'

import { useState } from 'react'
import Button from '../components/Button'
import Cta from '../components/Cta'
import { Reveal, RevealWords } from '../components/Reveal'
import { ArrowUpRight, Eyebrow, FadeUp, RevealHeading, SectionHeading, Sparkle } from '../components/ui'
import { useInView, useMounted } from '../hooks/scroll'
import { EMAIL, SERVICES, SERVICES_EYEBROW, SERVICES_TITLE } from '../data/site'

/** Services — "IDIS — Services V2 (Services-forward)" in the pen.dev file. */

const STEPS = [
  ['01 — Discover', 'We get under the skin of your business: goals, customers, competitors, current activity and the real problem worth solving.'],
  ['02 — Define', 'We turn insight into a focused strategy — clear priorities, the right channels, sharp messaging and the metrics that matter.'],
  ['03 — Build & Execute', 'Brand, content, digital and media go live as one connected system, produced by the same senior team that planned it.'],
  ['04 — Measure & Evolve', 'We report in plain language, test relentlessly and reinvest in what works. The plan gets smarter every month.'],
]

const PLANS = [
  {
    name: 'Strategy Sprint',
    tag: '2–4 weeks',
    desc: 'A focused deep-dive that leaves you with a clear, prioritised marketing plan.',
    list: ['Marketing audit', 'Audience & competitor research', '90-day roadmap'],
    theme: 'bg-sun text-ink',
  },
  {
    name: 'Growth Partnership',
    tag: 'Monthly retainer',
    desc: 'Your outsourced marketing department — strategy, creative, digital and performance under one roof.',
    list: ['Dedicated senior team', 'Always-on campaigns', 'Monthly performance reviews'],
    theme: 'bg-brand text-white',
    featured: true,
  },
  {
    name: 'Campaign Project',
    tag: 'Fixed scope',
    desc: 'A launch, an event or a rebrand — planned, produced and promoted end to end.',
    list: ['Campaign strategy', 'Creative production', 'Paid & organic rollout'],
    theme: 'bg-mint text-ink',
  },
]

const FAQS = [
  [
    'What kind of businesses do you work with?',
    'Growth-minded SMEs, startups, fintechs, NGOs and cultural brands across Africa and the UK — usually teams that know marketing matters but want it to work harder.',
  ],
  [
    'Do I need all of your services?',
    "No. Many clients start with one — often a strategy sprint or a campaign — and add more as the results come in. Everything we build is designed to plug into the rest when you're ready.",
  ],
  [
    'How soon will I see results?',
    'Quick wins such as fixing tracking, tightening messaging or optimising ads often show within weeks. Brand, SEO and community work compound over months. We agree realistic milestones up front.',
  ],
  [
    'How do you report on performance?',
    'You get a live dashboard plus a plain-language monthly review: what happened, why it happened and what we will do next. No vanity metrics.',
  ],
  [
    'Can you work alongside our in-house team?',
    'Absolutely. We regularly act as the strategy and specialist layer for in-house teams — joining your tools, rituals and channels so it feels like one team.',
  ],
]

function Hero() {
  const ready = useMounted()
  return (
    <section className="page-shell">
      <div className="overflow-hidden rounded-[24px] bg-brand px-4 pb-6 pt-10 text-white md:rounded-[40px] md:px-[clamp(24px,4.4vw,64px)] md:pb-[64px] md:pt-[72px]">
        <div className="flex items-center gap-3 md:gap-6">
          <h1 className="text-display font-semibold">
            <RevealWords text="Services" show={ready} />
          </h1>
          <Reveal show={ready} delay={300} from="scale-50 rotate-45" className="shrink-0">
            <Sparkle className="size-[clamp(48px,10vw,150px)] animate-[twinkle_4s_ease-in-out_infinite]" strokeWidth={1.2} />
          </Reveal>
        </div>
        <Reveal as="p" show={ready} delay={350} from="translate-y-4" className="mt-6 text-body-lg tracking-[0.05em] text-white/75 md:mt-10">
          {SERVICES_EYEBROW}
        </Reveal>
        <Reveal as="p" show={ready} delay={450} from="translate-y-4" className="mt-3 max-w-[1000px] text-h3 font-semibold">
          {SERVICES_TITLE}
        </Reveal>
        {/* Jump links to each service */}
        <ul className="mt-8 flex flex-wrap gap-2 md:mt-12 md:gap-3">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.slug} show={ready} delay={550 + i * 50} from="translate-y-4">
              <a
                href={`#${s.slug}`}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-[10px] text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5 md:px-5 md:py-3 md:text-body ${s.accent}`}
              >
                <span className="text-ink/60">{s.num}</span>
                {s.title}
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServiceCard({ s, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <div
      id={s.slug}
      ref={ref}
      className={`scroll-mt-6 flex flex-col gap-6 rounded-[24px] border border-line p-3 md:rounded-[40px] md:p-5 ${index % 4 === 1 || index % 4 === 2 ? 'bg-blush' : 'bg-white'}`}
    >
      <Reveal show={inView} from="translate-y-10 scale-[0.97]" className="aspect-[16/10] overflow-hidden rounded-[20px] md:rounded-[28px]">
        <img
          src={s.image}
          srcSet={`${s.imageSm} 800w, ${s.image} 1400w`}
          sizes="(min-width: 1024px) 45vw, 100vw"
          loading="lazy"
          decoding="async"
          alt=""
          className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? 'scale-100' : 'scale-110'}`}
        />
      </Reveal>
      <Reveal show={inView} delay={150} className="flex flex-1 flex-col gap-4 px-2 pb-3 md:px-4 md:pb-5">
        <span className={`w-fit rounded-full px-4 py-[6px] text-body font-semibold text-ink ${s.accent}`}>{s.num}</span>
        <h2 className="text-h3 font-semibold text-ink">{s.title}</h2>
        <p className="text-body-lg text-slate">{s.desc}</p>
        <Button href="/contact" className="mt-auto w-fit">
          Let’s talk →
        </Button>
      </Reveal>
    </div>
  )
}

function Process() {
  return (
    <section className="page-shell">
      <div className="content flex flex-col gap-14">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="From business problem to measurable progress."
          desc="Four stages, one loop. Every engagement — big or small — runs on the same rhythm so you always know what's happening and why."
        />
        <ol className="border-t border-line">
          {STEPS.map(([t, d], i) => (
            <FadeUp
              as="li"
              key={t}
              delay={i * 80}
              className="grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:items-center md:gap-12"
            >
              <h3 className="text-h3 font-semibold text-ink">{t}</h3>
              <p className="text-body-lg text-slate">{d}</p>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Engagement() {
  return (
    <section className="page-shell">
      <div className="rounded-[24px] bg-navy px-4 py-14 md:rounded-[40px] md:px-14 md:py-[96px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex max-w-[720px] flex-col gap-5">
            <Eyebrow className="text-white/70">WAYS TO WORK WITH US</Eyebrow>
            <RevealHeading text="Start small or go all in." className="text-h2 font-semibold text-white" />
          </div>
          <p className="max-w-[420px] text-body-lg text-white/70">
            Every engagement starts with a free 30-minute strategy session. No pitch decks, just an honest
            conversation.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <FadeUp key={p.name} delay={i * 120} className={`flex flex-col gap-7 rounded-[24px] p-7 md:p-9 ${p.theme}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full px-4 py-2 text-[15px] font-medium ${p.featured ? 'bg-white/15' : 'bg-ink/[0.08]'}`}>{p.tag}</span>
                {p.featured && <span className="rounded-full bg-sun px-4 py-2 text-[15px] font-semibold text-ink">Most popular</span>}
              </div>
              <h3 className="text-h3 font-semibold">{p.name}</h3>
              <p className="text-body-lg opacity-80">{p.desc}</p>
              <ul className={`flex flex-col gap-3 border-t pt-5 ${p.featured ? 'border-white/20' : 'border-ink/15'}`}>
                {p.list.map((l) => (
                  <li key={l} className="flex items-center gap-3 text-body">
                    <ArrowUpRight className="size-5 shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant={p.featured ? 'light' : 'dark'} className="mt-auto w-full">
                Book a strategy call
              </Button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="page-shell">
      <div className="content grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-24">
        <div className="flex flex-col gap-6">
          <Eyebrow>FAQ</Eyebrow>
          <RevealHeading text="Questions we hear a lot." className="text-h2 font-semibold text-ink" />
          <p className="text-body-lg text-slate">
            Still curious? Email{' '}
            <a href={`mailto:${EMAIL}`} className="font-medium text-brand underline-offset-4 hover:underline">
              {EMAIL}
            </a>{' '}
            and a strategist — not a bot — will reply.
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <li key={q} className={`rounded-[24px] border transition-colors ${isOpen ? 'border-transparent bg-blush-200' : 'border-line bg-white'}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8 md:py-7"
                >
                  <span className="text-h5 font-semibold text-ink">{q}</span>
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full text-xl transition-colors ${isOpen ? 'bg-ink text-white' : 'bg-blush-200 text-ink'}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <p className="overflow-hidden px-6 text-body-lg text-slate md:px-8">
                    <span className="block pb-7">{a}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <Hero />
      <main className="flex flex-col gap-[clamp(64px,10vw,140px)] py-[clamp(64px,10vw,140px)]">
        <section className="page-shell">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.slug} s={s} index={i} />
            ))}
          </div>
        </section>
        <Process />
        <Engagement />
        <Faq />
        <Cta />
      </main>
    </>
  )
}

