import strategyGrowth from '../assets/services/strategy-growth.png'
import brandCreative from '../assets/services/brand-creative.png'
import digitalExperience from '../assets/services/digital-experience.png'
import performanceAi from '../assets/services/performance-ai.png'
import { useRef } from 'react'
import { useInView, useMediaQuery, usePrefersReducedMotion, useStackEffect } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * "One partner" services — node 1917:113.
 * Brand-blue rounded card: an oversized "One partner" heading + subheading row,
 * then four service cards. From lg up each card fills the viewport and pins
 * (sticky) so the next card slides over it; the covered card eases back in
 * scale, giving a stacked-deck effect. Below lg the cards simply flow.
 */
const ROWS = [
  {
    image: strategyGrowth,
    imageLeft: true,
    title: 'Strategy & Growth',
    desc: [
      "Know where you're going before deciding what to create.",
      'We turn business objectives into focused marketing strategies built around your audience, market and opportunities.',
      'From research and positioning to campaign planning and growth strategy, we make sure the work starts with the right problem.',
    ],
    capabilities: [
      'Marketing Strategy',
      'Brand & Market Positioning',
      'Audience & Competitor Research',
      'Campaign Strategy',
      'Marketing Audits',
      'Growth Planning',
      'Go-to-Market Support',
    ],
    cta: 'Explore Strategy & Growth →',
  },
  {
    image: brandCreative,
    imageLeft: false,
    title: 'Brand & Creative',
    desc: [
      'Build a brand people understand, remember and trust.',
      "Your brand isn't simply what you look like. It's the system behind how your business communicates.",
      'We develop identities, messages, campaigns and creative assets that make your brand clearer, stronger and more consistent wherever your audience encounters it.',
    ],
    capabilities: [
      'Brand Strategy',
      'Visual Identity',
      'Graphic Design',
      'Campaign Creative',
      'Content Strategy',
      'Content Production',
      'Event & Activation Branding',
    ],
    cta: 'Explore Brand & Creative →',
  },
  {
    image: digitalExperience,
    imageLeft: true,
    title: 'Digital & Experience',
    desc: [
      'Turn your digital presence into a business asset.',
      'We create connected digital experiences that help audiences discover your brand, understand what makes you valuable and take the next step.',
      'From your website to social, email and search, every touchpoint is designed to play a role in the customer journey.',
    ],
    capabilities: [
      'Website Strategy & Development',
      'Social Media Marketing',
      'Search Engine Optimisation',
      'Email Marketing',
      'Content Ecosystems',
      'Community Strategy',
      'Digital Experience Optimisation',
    ],
    cta: 'Explore Digital & Experience →',
  },
  {
    image: performanceAi,
    imageLeft: false,
    title: 'Performance & AI Marketing',
    desc: [
      'Measure what matters. Improve what works.',
      'Marketing becomes more valuable when decisions are informed by evidence.',
      'We combine paid media, analytics, optimisation, automation and AI-enabled workflows to help teams work smarter, identify opportunities and continuously improve performance.',
    ],
    capabilities: [
      'Paid Media & PPC',
      'Performance Marketing',
      'Analytics & Reporting',
      'Conversion Optimisation',
      'Marketing Automation',
      'AI-Enabled Marketing',
      'Testing & Optimisation',
    ],
    cta: 'Explore Performance & Intelligence →',
  },
]

// Sticky offsets: each card pins a little lower than the one before so the
// edges of the stack stay visible.
const STACK_TOP = 24
const STACK_STEP = 16

function ServiceRow({ row, index, cardRef }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  return (
    <div
      ref={cardRef}
      className="lg:sticky lg:h-[calc(100svh-var(--stack-top)-24px)] lg:min-h-[560px]"
      style={{ '--stack-top': `${STACK_TOP + index * STACK_STEP}px`, top: 'var(--stack-top)' }}
    >
      <div
        data-card
        style={{ scale: 'var(--stack-scale, 1)' }}
        className="h-full origin-top rounded-[24px] bg-white p-4 shadow-[0_-12px_40px_rgba(4,9,23,0.12)] will-change-transform md:rounded-[40px] md:p-[clamp(28px,2.5vw,48px)]"
      >
        <div
          className={`grid h-full grid-cols-1 gap-8 lg:items-center lg:gap-[clamp(32px,5vw,97px)] ${
            row.imageLeft
              ? 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]'
              : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]'
          }`}
        >
          <div
            ref={ref}
            className={`aspect-[743/706] w-full overflow-hidden rounded-[24px] md:rounded-[32px] lg:max-h-full lg:self-center ${
              row.imageLeft ? '' : 'lg:order-2'
            }`}
          >
            {/* Image settles from a slight zoom as the card arrives */}
            <img
              src={row.image}
              alt={row.title}
              className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:scale-100 ${
                inView ? 'scale-100' : 'scale-115'
              }`}
            />
          </div>

          <div className="flex w-full max-w-[680px] flex-col gap-[clamp(12px,min(2.2vw,2.6vh),40px)]">
            <p className="text-h3 font-semibold text-ink">{row.title}</p>
            <div className="text-body-lg font-normal text-[#7b8698] [@media(max-height:780px)]:text-body">
              {row.desc.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="flex flex-col gap-[12px]">
              <p className="text-h5 font-semibold text-ink">Capabilities</p>
              <ul className="grid grid-cols-1 gap-x-6 text-body-lg font-normal text-[#7b8698] sm:grid-cols-2 [@media(max-height:780px)]:text-body">
                {row.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              className="w-fit rounded-[99px] bg-ink px-8 py-4 text-body-lg font-medium text-[#fffbfb] [@media(max-height:780px)]:py-3 transition-opacity hover:opacity-90"
            >
              {row.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const cards = useRef([])
  const [headRef, headIn] = useInView({ threshold: 0.4 })
  const stacking = useMediaQuery('(min-width: 1024px)')
  const reduced = usePrefersReducedMotion()
  const animate = stacking && !reduced

  // As card i+1 slides up over card i, card i eases back slightly.
  useStackEffect(cards, (i) => STACK_TOP + i * STACK_STEP, { enabled: animate })

  return (
    <section id="services" className="page-shell">
      <div className="relative overflow-clip rounded-[24px] bg-brand px-4 pb-10 pt-6 md:rounded-[40px] md:px-[clamp(32px,4vw,64px)] md:pb-[clamp(40px,4vw,72px)] md:pt-[clamp(20px,2.4vw,48px)]">
        {/* Intro */}
        <h2 ref={headRef} className="text-display font-semibold text-white">
          <RevealWords text="One partner" show={headIn} stagger={140} />
        </h2>
        <div className="mt-[16px] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-h2 font-semibold text-white">
            <RevealWords text="Four connected capabilities" show={headIn} delay={300} stagger={70} />
          </p>
          <Reveal show={headIn} delay={550} from="translate-y-4 scale-90" className="w-fit">
            <a
              href="#contact"
              className="w-fit rounded-[99px] bg-white px-8 py-4 text-body-lg font-medium text-ink transition-opacity hover:opacity-90"
            >
              Lets talk
            </a>
          </Reveal>
        </div>

        {/* Stacked cards */}
        <div className="mt-[clamp(32px,4vw,72px)] flex flex-col gap-10 lg:gap-[24vh]">
          {ROWS.map((row, i) => (
            <ServiceRow key={row.title} row={row} index={i} cardRef={(el) => (cards.current[i] = el)} />
          ))}
        </div>
      </div>
    </section>
  )
}
