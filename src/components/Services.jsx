'use client'

import { Link } from '@/lib/router'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'
import { SERVICES, SERVICES_EYEBROW, SERVICES_TITLE } from '../data/site'

/**
 * "Services we offer" — brand-blue card listing all ten services
 * individually (client feedback, Nov 2026: no grouping). Each service is a
 * white card with its collage thumbnail, number, title and one-line summary,
 * linking to that service on the Services page. Cards rise in as they enter.
 */
function ServiceCard({ s, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <Reveal ref={ref} show={inView} delay={(index % 2) * 120} from="translate-y-10">
      <Link
        to={`/services#${s.slug}`}
        className="group flex h-full gap-4 rounded-[24px] bg-white p-3 transition-transform duration-300 hover:-translate-y-1 sm:gap-6 sm:p-4 md:rounded-[32px] md:p-5"
      >
        <span className="block aspect-square w-[96px] shrink-0 overflow-hidden rounded-[16px] sm:w-[140px] md:w-[160px] md:rounded-[20px]">
          <img
            src={s.imageSm}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </span>
        <span className="flex min-w-0 flex-col justify-center gap-2 py-1 md:gap-3">
          <span className={`w-fit rounded-full px-3 py-1 text-[13px] font-semibold text-ink ${s.accent}`}>{s.num}</span>
          <span className="text-h4 font-semibold text-ink">{s.title}</span>
          <span className="text-body text-slate">{s.desc}</span>
        </span>
      </Link>
    </Reveal>
  )
}

export default function Services() {
  const [headRef, headIn] = useInView({ threshold: 0.4 })
  return (
    <section id="services" className="page-shell">
      <div className="rounded-[24px] bg-brand px-3 pb-3 pt-10 md:rounded-[40px] md:px-[clamp(24px,3vw,56px)] md:pb-[clamp(24px,3vw,56px)] md:pt-[clamp(48px,5vw,88px)]">
        <div ref={headRef} className="flex flex-col gap-6 px-2 md:flex-row md:items-end md:justify-between md:px-0">
          <div className="flex max-w-[900px] flex-col gap-4">
            <Reveal as="p" show={headIn} from="translate-y-4" className="text-body-lg tracking-[0.05em] text-white/75">
              {SERVICES_EYEBROW}
            </Reveal>
            <h2 className="text-h2 font-semibold text-white">
              <RevealWords text={SERVICES_TITLE} show={headIn} delay={100} stagger={50} />
            </h2>
          </div>
          <Reveal show={headIn} delay={450} from="translate-y-4 scale-90" className="flex shrink-0 flex-wrap gap-3">
            <Link to="/services" className="rounded-[99px] bg-white px-8 py-4 text-body-lg font-medium text-ink transition-opacity hover:opacity-90">
              All services →
            </Link>
          </Reveal>
        </div>

        <div className="mt-[clamp(32px,4vw,64px)] grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
