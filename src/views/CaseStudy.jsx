'use client'

import { useRef } from 'react'
import { Link } from '@/lib/router'
import Button from '../components/Button'
import Cta from '../components/Cta'
import { EngageBar, useReadTracking } from '../components/Engagement'
import { Reveal, RevealWords } from '../components/Reveal'
import { Check, FadeUp, Tag } from '../components/ui'
import { useInView, useMounted } from '../hooks/scroll'

/**
 * Case study — "IDIS — Case Study: Awo the Musical" in the pen.dev file,
 * used as the template for every project at /projects/:slug.
 */

const ACCENTS = ['bg-pink', 'bg-sun', 'bg-mint', 'bg-lime']

function Block({ num, title, children }) {
  return (
    <section className="page-shell">
      <div className="content grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-24">
        <FadeUp className="flex flex-col gap-4">
          <p className="text-body-lg font-medium text-brand">{num}</p>
          <h2 className="text-h3 font-semibold text-ink">{title}</h2>
        </FadeUp>
        <FadeUp delay={150} className="flex flex-col gap-6">
          {children}
        </FadeUp>
      </div>
    </section>
  )
}

const Lead = ({ children }) => <p className="text-h5 font-medium leading-[1.4] text-ink">{children}</p>

/** `cs` is the case study, `next` the one after it, `quote` its client testimonial (if any). */
export default function CaseStudy({ cs, next, quote, counts = { views: 0, likes: 0 } }) {
  const ready = useMounted()
  const bodyRef = useRef(null)
  useReadTracking('case', cs.slug, bodyRef)
  const engage = { kind: 'case', slug: cs.slug, title: cs.title || cs.client, views: counts.views, likes: counts.likes }
  const [resRef, resIn] = useInView({ threshold: 0.3 })
  const [challengeLabel, approachLabel, impactLabel] = ['The challenge', 'Our approach', 'The impact'].map((d, i) => cs.labels?.[i] || d)
  const hasResults = cs.results?.length > 0
  const tactics = cs.approach?.tactics ?? []
  const impactItems = cs.impact?.items ?? []

  return (
    // key resets entrance animations when moving between case studies
    <div key={cs.slug}>
      {/* Intro */}
      <section className="page-shell">
        <div className="content flex flex-col gap-8 pb-10 pt-[clamp(16px,3vw,56px)] md:gap-10 md:pb-14">
          <Reveal show={ready} from="translate-y-3" className="flex flex-wrap items-center gap-3 text-body text-slate">
            <Link to="/projects" className="flex items-center gap-2 transition-colors hover:text-ink">
              <span aria-hidden="true">←</span> All projects
            </Link>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-ink">{cs.client}</span>
          </Reveal>
          <Reveal show={ready} delay={100} from="translate-y-3" className="flex flex-wrap gap-2">
            {cs.tags.map(([t, c]) => (
              <Tag key={t} className={`${c} text-ink`}>
                {t}
              </Tag>
            ))}
          </Reveal>
          <h1 className="max-w-[1120px] text-h1 font-semibold text-ink">
            <RevealWords text={cs.title} show={ready} delay={150} stagger={55} />
          </h1>
          <Reveal show={ready} delay={600} from="translate-y-4" className="grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4 lg:gap-8">
            {cs.meta.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-2">
                <p className="text-[15px] tracking-[0.06em] text-slate uppercase">{k}</p>
                <p className="text-body-lg font-medium text-ink">{v}</p>
              </div>
            ))}
          </Reveal>
          <Reveal show={ready} delay={680} from="translate-y-4">
            <EngageBar {...engage} />
          </Reveal>
        </div>
      </section>

      {cs.hero.src && (
      <section className="page-shell">
        <Reveal show={ready} delay={700} from="translate-y-12 scale-[0.98]" className={`overflow-hidden rounded-[24px] md:rounded-[40px] ${cs.hero.bg}`}>
          <img
            src={cs.hero.src}
            alt={cs.hero.alt}
            className="aspect-[4/3] w-full object-cover md:aspect-[1336/700]"
          />
        </Reveal>
      </section>
      )}

      <main className="flex flex-col gap-[clamp(64px,10vw,140px)] py-[clamp(64px,8vw,120px)]">
        <div ref={bodyRef} className="flex flex-col gap-[clamp(64px,10vw,140px)]">
        {/* Results */}
        {hasResults && (
          <section className="page-shell">
            <div ref={resRef} className="rounded-[24px] bg-navy px-5 py-12 md:rounded-[40px] md:px-12 md:py-[72px]">
              <p className="text-center text-body-lg tracking-[0.05em] text-white/70">THE RESULTS AT A GLANCE</p>
              <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3 md:mt-14">
                {cs.results.map(([v, l], i) => (
                  <Reveal key={v} show={resIn} delay={i * 140} from="translate-y-10" className="flex flex-col items-center gap-4 text-center text-white">
                    <p className="text-display-sm font-semibold">{v}</p>
                    <p className="max-w-[300px] text-body-lg">{l}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <Block num="01" title={challengeLabel}>
          <Lead>{cs.challenge.lead}</Lead>
          {cs.challenge.body && <p className="text-body-lg text-slate">{cs.challenge.body}</p>}
        </Block>

        <Block num="02" title={approachLabel}>
          <Lead>{cs.approach.lead}</Lead>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tactics.map(([t, d], i) => (
              <div key={t} className="flex flex-col gap-4 rounded-[24px] border border-line bg-blush p-7">
                <span className={`grid size-11 place-items-center rounded-full text-body font-semibold text-ink ${ACCENTS[i % 4]}`}>{i + 1}</span>
                <h3 className="text-h5 font-semibold text-ink">{t}</h3>
                <p className="text-body text-slate">{d}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* Gallery + quote (or headline stat) */}
        {cs.gallery.src && (
        <section className="page-shell">
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(0,1fr)_460px]">
            <FadeUp className={`overflow-hidden rounded-[24px] md:rounded-[40px] ${cs.gallery.bg}`}>
              <img
                src={cs.gallery.src}
                loading="lazy"
                alt={cs.gallery.alt}
                className="h-full max-h-[620px] min-h-[320px] w-full object-cover"
              />
            </FadeUp>
            {quote ? (
              <FadeUp as="figure" delay={150} className="flex flex-col justify-between gap-12 rounded-[24px] bg-pink p-8 md:rounded-[40px] md:p-11">
                <span className="text-[96px] font-semibold leading-[0.6] text-ink" aria-hidden="true">“</span>
                <div className="flex flex-col gap-7">
                  <blockquote className="text-h5 font-medium leading-[1.35] text-ink">{quote.quote}</blockquote>
                  <figcaption className="text-body font-semibold text-ink">{quote.author}</figcaption>
                </div>
              </FadeUp>
            ) : (
              <FadeUp delay={150} className="flex flex-col justify-between gap-12 rounded-[24px] bg-sun p-8 md:rounded-[40px] md:p-11">
                <p className="text-body font-semibold tracking-[0.06em] text-ink/70">THE HEADLINE</p>
                <div className="flex flex-col gap-4">
                  <p className="text-display-sm font-semibold text-ink">{cs.highlight[0]}</p>
                  <p className="text-h5 font-medium leading-[1.35] text-ink">{cs.highlight[1]}</p>
                </div>
              </FadeUp>
            )}
          </div>
        </section>
        )}

        <Block num="03" title={impactLabel}>
          <Lead>{cs.impact.lead}</Lead>
          <ul>
            {impactItems.map(([t, d]) => (
              <li key={t} className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-x-5 gap-y-1 border-b border-line py-6 sm:grid-cols-[36px_240px_minmax(0,1fr)] sm:gap-6">
                <Check className="bg-brand" stroke="#fff" size={36} />
                <p className={`text-body-lg font-semibold text-ink ${d ? '' : 'sm:col-span-2'}`}>{t}</p>
                {d && <p className="col-start-2 text-body-lg text-slate sm:col-start-3">{d}</p>}
              </li>
            ))}
          </ul>
        </Block>

        </div>

        {/* Like / share */}
        <section className="page-shell">
          <div className="content">
            <FadeUp className="flex flex-col items-start gap-4 rounded-[24px] bg-blush-200 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <p className="text-h5 font-semibold text-ink">Enjoyed this case study? Like it or share it.</p>
              <EngageBar {...engage} />
            </FadeUp>
          </div>
        </section>

        {/* Next project */}
        {next && next.slug !== cs.slug && (
        <section className="page-shell">
          <FadeUp className="grid grid-cols-1 items-center gap-8 rounded-[24px] bg-brand p-4 md:rounded-[40px] md:p-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-14">
            <div className="flex flex-col gap-6 p-4 lg:py-6 lg:pl-10">
              <p className="text-body-lg tracking-[0.05em] text-white/70">NEXT PROJECT</p>
              <p className="text-body-lg font-medium text-sun">{next.client}</p>
              <p className="text-h2 font-semibold text-white">{next.title}</p>
              <Button href={`/projects/${next.slug}`} variant="light" className="w-fit">
                Read the case study →
              </Button>
            </div>
            <Link to={`/projects/${next.slug}`} className="overflow-hidden rounded-[20px] md:rounded-[24px]">
              <img src={next.card?.image || next.hero?.src} alt="" loading="lazy" className="aspect-[560/440] w-full object-cover transition-transform duration-700 hover:scale-105" />
            </Link>
          </FadeUp>
        </section>
        )}

        <Cta />
      </main>
    </div>
  )
}
