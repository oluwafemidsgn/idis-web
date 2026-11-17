'use client'

const personCenter = '/assets/hero/person-center.webp'
const personLeft = '/assets/hero/person-left.webp'
const personRight = '/assets/hero/person-right.webp'
import Founder from '../components/Founder'
import Cta from '../components/Cta'
import { Reveal, RevealWords } from '../components/Reveal'
import { EyebrowPill, Eyebrow, FadeUp, RevealHeading, Sparkle } from '../components/ui'
import { useInView, useMounted } from '../hooks/scroll'

/** About — "IDIS — About" in the pen.dev file. */

const STATS = [
  ['15+', 'Years of sales and marketing leadership'],
  ['150+', 'Creative assets delivered for a single client'],
  ['2', 'Markets served: Nigeria and the United Kingdom'],
  ['40%', 'Lift in social reach for Awo the Musical'],
]

const CLIENTS = ['AfriLabs', 'Sats App', 'AfricaCompare', 'Duke of Shomolu', 'Mothers of Chibok']

function Hero() {
  const ready = useMounted()
  const tiles = [
    { h: 'h-[78%]', cls: 'bg-sun', img: personCenter, alt: 'Smiling woman in a pink top' },
    { h: 'h-[62%]', cls: 'bg-brand text-white', stat: true },
    { h: 'h-full', cls: 'bg-pink', img: personLeft, alt: 'Woman in a beret looking at her phone' },
    { h: 'h-[66%]', cls: 'bg-lime', note: true },
    { h: 'h-[88%]', cls: 'bg-mint', img: personRight, alt: 'Smiling man in glasses' },
  ]
  return (
    <section className="page-shell">
      <div className="overflow-hidden rounded-[24px] bg-blush-200 px-4 pt-12 md:rounded-[40px] md:px-[clamp(24px,4.4vw,64px)] md:pt-[clamp(56px,6.6vw,96px)]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-7 text-center">
          <Reveal show={ready} from="translate-y-4">
            <EyebrowPill>ABOUT IDIS</EyebrowPill>
          </Reveal>
          <h1 className="text-h1 font-semibold text-ink">
            <RevealWords text="Marketing that makes sense for the business behind it." show={ready} delay={100} stagger={55} />
          </h1>
          <Reveal as="p" show={ready} delay={550} from="translate-y-4" className="max-w-[760px] text-body-lg text-slate">
            IDIS is a strategy-led marketing partner for ambitious brands across Africa and the UK. We connect brand,
            content, digital and performance into one system — so every naira and pound you spend has a job to do.
          </Reveal>
        </div>

        <div className="mt-12 grid h-[clamp(260px,32vw,440px)] grid-cols-3 items-end gap-2 md:mt-14 md:grid-cols-5 md:gap-5">
          {tiles.map((t, i) => (
            <Reveal
              key={i}
              show={ready}
              delay={650 + i * 110}
              from="translate-y-[40%]"
              className={`${t.h} ${i === 1 || i === 3 ? 'hidden md:flex' : 'flex'} relative flex-col justify-end overflow-hidden rounded-t-[20px] p-4 duration-[1100ms]! md:rounded-t-[32px] md:p-7 ${t.cls}`}
            >
              {t.img && <img src={t.img} alt={t.alt} className="absolute inset-x-0 bottom-0 h-[92%] w-full object-cover object-top" />}
              {t.stat && (
                <>
                  <p className="text-display-sm font-semibold">15+</p>
                  <p className="text-body-lg">years turning marketing into momentum</p>
                </>
              )}
              {t.note && (
                <div className="flex h-full flex-col justify-between text-ink">
                  <Sparkle className="size-12" strokeWidth={2} />
                  <p className="text-h5 font-semibold">Lagos · London · Remote-first</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="page-shell">
      <div className="content grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-[96px]">
        <div className="flex flex-col gap-6">
          <FadeUp from="translate-y-4">
            <Eyebrow>OUR STORY</Eyebrow>
          </FadeUp>
          <RevealHeading
            text="Built for businesses tired of marketing that looks busy but goes nowhere."
            className="text-h2 font-semibold text-ink"
            stagger={45}
          />
        </div>
        <FadeUp delay={200} className="flex flex-col gap-6 lg:pt-14">
          <p className="text-h5 font-medium text-ink">
            IDIS began with a simple frustration. Too many good businesses were spending on posts, ads and agencies —
            and still couldn't say what any of it was doing for them.
          </p>
          <p className="text-body-lg text-slate">
            So we built a different kind of partner. One that starts with the business problem, not the deliverable.
            One that treats strategy, brand, content, digital and performance as parts of the same engine instead of
            separate invoices.
          </p>
          <p className="text-body-lg text-slate">
            Today we work with innovation networks, fintechs, financial platforms and cultural productions across
            Nigeria and the UK — helping each one show up with clarity, consistency and a plan that compounds.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <section className="page-shell">
      <div ref={ref} className="grid grid-cols-2 gap-x-4 gap-y-10 rounded-[24px] bg-navy px-5 py-12 md:rounded-[40px] md:px-12 md:py-[72px] lg:grid-cols-4">
        {STATS.map(([v, l], i) => (
          <Reveal key={v} show={inView} delay={i * 120} from="translate-y-8" className="flex flex-col items-center gap-4 text-center text-white">
            <p className="text-h1 font-semibold">{v}</p>
            <p className="max-w-[260px] text-body-lg">{l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Clients() {
  return (
    <section className="page-shell">
      <div className="content flex flex-col items-center gap-10">
        <FadeUp as="p" from="translate-y-4" className="text-body-lg tracking-[0.05em] text-slate">
          BRANDS WE'VE MOVED FORWARD
        </FadeUp>
        <FadeUp className="flex w-full flex-wrap items-center justify-center gap-x-[clamp(24px,5vw,72px)] gap-y-5 border-y border-line py-10">
          {CLIENTS.map((c) => (
            <span key={c} className="text-h4 font-semibold text-gray-300 transition-colors hover:text-ink">
              {c}
            </span>
          ))}
        </FadeUp>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <Hero />
      <main className="flex flex-col gap-[clamp(64px,10vw,140px)] py-[clamp(64px,10vw,140px)]">
        <Story />
        <Stats />
        <Founder cta={{ label: 'Book a session with Sidi →', to: '/contact' }} />
        <Clients />
        <Cta />
      </main>
    </>
  )
}
