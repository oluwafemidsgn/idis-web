'use client'

import { Link } from '@/lib/router'
import { useRef, useState } from 'react'
import { useInView, useMediaQuery, useScrollFrame } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'
const discover = '/assets/how-we-work/discover.webp'
const discoverSm = '/assets/how-we-work/discover-sm.webp'
const discoverMd = '/assets/how-we-work/discover-md.webp'
const define = '/assets/how-we-work/define.webp'
const defineSm = '/assets/how-we-work/define-sm.webp'
const defineMd = '/assets/how-we-work/define-md.webp'
const build = '/assets/how-we-work/build.webp'
const buildSm = '/assets/how-we-work/build-sm.webp'
const buildMd = '/assets/how-we-work/build-md.webp'
const measure = '/assets/how-we-work/measure.webp'
const measureSm = '/assets/how-we-work/measure-sm.webp'
const measureMd = '/assets/how-we-work/measure-md.webp'
/**
 * How we work — node 1917:2886.
 * Header + a four-step stepper paired with a process visual. From lg up the
 * section is a scroll-driven "pinned" scene: a tall track (one viewport per
 * step) holds a sticky, viewport-height stage, and scroll progress through the
 * track picks the active step — its copy expands and its image crossfades in.
 * Below lg every step simply stacks with its own image.
 */
const STEPS = [
  {
    title: '01 — Discover',
    desc: 'We start with the business — not the marketing channel. We learn your goals, customers, competitive landscape, existing activity, challenges and opportunities.',
    image: discover,
    imageSm: discoverSm,
    imageMd: discoverMd,
  },
  {
    title: '02 — Define',
    desc: 'We turn the insight into direction. That means identifying priorities, positioning, audiences, messages, channels, objectives and the role each part of the marketing ecosystem needs to play.',
    image: define,
    imageSm: defineSm,
    imageMd: defineMd,
  },
  {
    title: '03 — Build & Execute',
    desc: 'Strategy becomes work people can actually experience. Our team brings together creative, content, digital, campaigns, technology and performance execution around one shared direction.',
    image: build,
    imageSm: buildSm,
    imageMd: buildMd,
  },
  {
    title: '04 — Measure & Evolve',
    desc: "We don't disappear after launch. We look at what's working, what isn't and where the next opportunity exists — then use those insights to continuously improve the strategy.",
    image: measure,
    imageSm: measureSm,
    imageMd: measureMd,
  },
]

function Header() {
  const [ref, inView] = useInView({ threshold: 0.5 })
  return (
    <div ref={ref} className="flex flex-col items-start gap-[clamp(8px,1.2vw,16px)]">
      <Reveal as="p" show={inView} from="translate-y-4" className="text-body-lg font-normal text-ink">
        HOW WE WORK
      </Reveal>
      <h2 className="max-w-[640px] text-h3 font-semibold text-ink">
        <RevealWords
          text="A clear process from business problem to measurable progress."
          show={inView}
          delay={100}
          stagger={45}
        />
      </h2>
    </div>
  )
}

/** One mobile step: copy then image, lifting in as it scrolls into view. */
function StackedStep({ step }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <li ref={ref} className="flex flex-col gap-5">
      <Reveal show={inView} from="translate-y-8" className="flex flex-col gap-2">
        <p className="text-h3 font-semibold text-ink">{step.title}</p>
        <p className="text-body-lg font-normal text-[#7b8698]">{step.desc}</p>
      </Reveal>
      <Reveal
        show={inView}
        delay={150}
        from="translate-y-12 scale-[0.96]"
        className="aspect-[4/5] w-full overflow-hidden rounded-[24px] sm:aspect-[4/3] md:rounded-[32px]"
      >
        <img
          src={step.image}
          srcSet={`${step.imageSm} 800w, ${step.imageMd} 1200w, ${step.image} 1400w`}
          sizes="100vw"
          alt={`${step.title.replace(/^\d+ — /, '')} process illustration`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </Reveal>
    </li>
  )
}

function TalkButton() {
  return (
    <Link
      to="/contact"
      className="w-fit shrink-0 rounded-[99px] bg-brand px-8 py-4 text-body-lg font-medium text-white transition-opacity hover:opacity-90"
    >
      Let’s talk
    </Link>
  )
}

/** Mobile / tablet: each step followed by its own image. */
function StackedSteps() {
  return (
    <section id="process" className="page-shell">
      <Header />
      <ol className="mt-10 flex flex-col gap-12">
        {STEPS.map((step) => (
          <StackedStep key={step.title} step={step} />
        ))}
      </ol>
      <div className="mt-10">
        <TalkButton />
      </div>
    </section>
  )
}

/** Desktop: pinned, scroll-driven scene. */
function PinnedSteps() {
  const track = useRef(null)
  const [stageRef, stageIn] = useInView({ threshold: 0.3 })
  const [active, setActive] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)

  useScrollFrame(() => {
    const el = track.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const distance = rect.height - window.innerHeight
    const p = Math.min(0.9999, Math.max(0, -rect.top / distance)) * STEPS.length
    setActive(Math.floor(p))
    setStepProgress(p - Math.floor(p))
  })

  // Clicking a step scrolls to the middle of its slice of the track.
  const goTo = (i) => {
    const el = track.current
    const top = el.getBoundingClientRect().top + window.scrollY
    const distance = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((i + 0.5) / STEPS.length) * distance, behavior: 'smooth' })
  }

  return (
    <section id="process" className="page-shell">
      <div ref={track} className="relative" style={{ height: `${STEPS.length * 85 + 15}svh` }}>
        <div className="sticky top-0 grid h-[100svh] grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-[clamp(40px,5vw,97px)] py-[clamp(20px,4vh,48px)]">
          {/* Left: header, steps, CTA */}
          <div className="flex min-h-0 flex-col">
            <Header />

            <ol className="flex min-h-0 flex-1 flex-col justify-center py-[clamp(16px,3vh,40px)]">
              {STEPS.map((step, i) => {
                const isActive = i === active
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="flex w-full items-start gap-[clamp(16px,2vw,32px)] py-[clamp(10px,1.8vh,20px)] text-left"
                    >
                      <span
                        className={`mt-1 size-[clamp(40px,4.4vh,56px)] shrink-0 rounded-[16px] transition-colors duration-500 ${
                          isActive ? 'bg-brand' : 'bg-[#f0f0f0]'
                        }`}
                      />
                      <span className="flex flex-1 flex-col">
                        <span
                          className={`text-h3 font-semibold transition-colors duration-500 ${
                            isActive ? 'text-ink' : 'text-[#b3b9c4]'
                          }`}
                        >
                          {step.title}
                        </span>
                        {/* Description + progress line expand only on the active step */}
                        <span
                          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                            isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-[560px] pt-[clamp(8px,1.2vh,16px)] text-body-lg font-normal text-[#7b8698]">
                              {step.desc}
                            </span>
                            <span className="mt-[clamp(12px,1.6vh,20px)] block h-[2px] w-full max-w-[560px] rounded-full bg-[#e5e7ea]">
                              <span
                                className="block h-full rounded-full bg-brand"
                                style={{ width: `${(isActive ? stepProgress : 0) * 100}%` }}
                              />
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <TalkButton />
          </div>

          {/* Right: all four images stacked full-height; the active one fades/slides in */}
          <Reveal
            ref={stageRef}
            show={stageIn}
            from="translate-y-12 scale-[0.96]"
            className="relative min-h-0 overflow-hidden rounded-[40px]"
          >
            {STEPS.map((step, i) => (
              <img
                key={step.title}
                src={step.image}
                srcSet={`${step.imageSm} 800w, ${step.imageMd} 1200w, ${step.image} 1400w`}
                sizes="45vw"
                loading="lazy"
                decoding="async"
                alt={i === active ? `${step.title.replace(/^\d+ — /, '')} process illustration` : ''}
                aria-hidden={i !== active}
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
                  i === active ? 'scale-100 opacity-100' : i < active ? 'scale-105 opacity-0' : 'scale-95 opacity-0'
                }`}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function HowWeWork() {
  const pinned = useMediaQuery('(min-width: 1024px) and (min-height: 600px)')
  return pinned ? <PinnedSteps /> : <StackedSteps />
}
