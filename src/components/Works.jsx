'use client'

import { Link } from '@/lib/router'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * Works & Campaign — heading + intro then a 2-column grid of the published
 * case studies (managed in /admin); an odd last card spans the full width.
 * Figma fileKey ahIhjZnPngc6EQrR5X7weh, node-id 1925-5604.
 * On scroll the intro rises in, then each card lifts in (image block first,
 * then its copy); side-by-side cards are staggered.
 */

function Card({ cs, index, wide }) {
  const { label, title, desc, results = [], image, cta } = cs.card
  const [ref, inView] = useInView({ threshold: 0.2 })
  const base = (index % 2) * 150 // stagger the right-hand column
  return (
    <div
      ref={ref}
      className={`flex w-full flex-col gap-[clamp(24px,2.5vw,48px)] ${wide ? 'md:col-span-2 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-[clamp(24px,3vw,46px)]' : ''}`}
    >
      <Reveal
        show={inView}
        delay={base}
        from="translate-y-12 scale-[0.97]"
        className="aspect-[809/520] w-full overflow-hidden rounded-[24px] bg-[#d9d9d9] md:rounded-[40px]"
      >
        <img
          src={image}
          loading="lazy"
          decoding="async"
          alt={`${cs.client} campaign artwork`}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </Reveal>
      <Reveal
        show={inView}
        delay={base + 200}
        from="translate-y-8"
        className="flex w-full flex-col items-start gap-[clamp(16px,1.8vw,32px)]"
      >
        <p className="text-body-lg font-normal text-[#7b8698]">{label}</p>
        <h3 className="text-h3 font-semibold text-ink">
          {title}
        </h3>
        <p className="text-body-lg font-normal text-[#7b8698]">{desc}</p>
        <div className="flex flex-wrap gap-x-[clamp(24px,2.5vw,40px)] gap-y-4 text-body-lg font-normal text-[#7b8698]">
          {results.map(([value, caption]) => (
            <div key={value} className="flex flex-col gap-[4px]">
              <p className="font-medium text-ink">{value}</p>
              <p>{caption}</p>
            </div>
          ))}
        </div>
        <Link
          to={`/projects/${cs.slug}`}
          className="flex w-fit items-start rounded-[99px] bg-ink px-[32px] py-[16px] text-body-lg font-medium whitespace-nowrap text-[#fffbfb] transition-opacity hover:opacity-90"
        >
          {cta || 'View case study'} →
        </Link>
      </Reveal>
    </div>
  )
}

export default function Works({ items = [] }) {
  const [introRef, introIn] = useInView({ threshold: 0.5 })
  return (
    <section id="works">
      <div className="page-shell">
        <div className="mx-auto flex w-[1664px] max-w-full flex-col items-center">
          {/* Intro */}
          <div ref={introRef} className="flex w-full max-w-[680px] flex-col items-center gap-[clamp(16px,2vw,32px)] text-center">
            <h2 className="text-h2 font-semibold text-ink">
              <RevealWords text="Works & Campaign" show={introIn} stagger={90} />
            </h2>
            <Reveal as="p" show={introIn} delay={300} from="translate-y-6" className="text-body-lg font-normal text-[#7b8698]">
              Strategy is only valuable when it creates results. A look at how we&apos;ve
              helped businesses turn marketing challenges into measurable progress.
            </Reveal>
          </div>

          {/* 2x2 grid + one wide card */}
          <div className="mt-[clamp(48px,6vw,120px)] grid grid-cols-1 gap-x-[clamp(24px,3vw,46px)] gap-y-[clamp(56px,6vw,80px)] md:grid-cols-2">
            {items.map((cs, i) => (
              // An odd final card spans the full width.
              <Card key={cs.slug} cs={cs} index={i} wide={items.length % 2 === 1 && i === items.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
