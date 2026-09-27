import { useRef, useState } from 'react'
import { useInView, usePrefersReducedMotion, useScrollFrame } from '../hooks/scroll'
import { Reveal } from './Reveal'

/**
 * Stats band — node 1917:2821.
 * Dark-navy card with five figures (white text on #132650).
 * Fully fluid: grid reflows 2-up → 3-up → single row of 5 at ≥1024.
 * The figures count up with scroll: 0 as the band enters the bottom of the
 * viewport, reaching the final value when the band's centre hits the
 * viewport's centre. The band itself scales in and each figure rises in turn.
 */
const STATS = [
  { value: '150+', caption: 'Custom creative assets produced for AfriLabs' },
  { value: '08+', caption: 'Theatre productions marketed across Nigeria and the UK' },
  { value: '40%', caption: 'Increase in social reach' },
  { value: '30%', caption: 'Increase in high-quality leads' },
  { value: '27%', caption: 'Increase in website traffic' },
]

// "08+" → { n: 8, pad: 2, suffix: '+' }. Only zero-led values ("08") keep
// their width while counting; "150" counts 0 → 150 rather than 000 → 150.
const parse = (v) => {
  const [, digits, suffix] = v.match(/^(\d+)(.*)$/)
  return { n: Number(digits), pad: digits.startsWith('0') ? digits.length : 1, suffix }
}

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

export default function Stats() {
  const ref = useRef(null)
  const [gridRef, gridIn] = useInView({ threshold: 0.2 })
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(reduced ? 1 : 0)

  useScrollFrame(() => {
    const el = ref.current
    if (!el) return
    const { top, height } = el.getBoundingClientRect()
    const vh = window.innerHeight
    // top === vh → 0 (just entering); centre at vh/2 → 1.
    const t = (vh - top) / (vh / 2 + height / 2)
    setProgress(Math.min(1, Math.max(0, t)))
  }, !reduced)

  const eased = reduced ? 1 : easeOut(progress)

  return (
    <section id="stats" aria-label="Results in numbers" className="page-shell">
      <Reveal
        ref={ref}
        show={gridIn}
        from="scale-[0.94]"
        className="h-auto w-full rounded-[24px] bg-[#132650] py-[clamp(48px,6vw,107px)] px-[clamp(16px,4vw,64px)] text-white md:rounded-[40px]"
      >
        <div ref={gridRef} className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
          {STATS.map((s, i) => {
            const { n, pad, suffix } = parse(s.value)
            const shown = String(Math.round(n * eased)).padStart(pad, '0') + suffix
            return (
              <Reveal
                key={s.value}
                show={gridIn}
                delay={150 + i * 90}
                from="translate-y-8"
                className="flex flex-col items-center gap-[16px] lg:gap-[33px]"
              >
                {/* Screen readers get the final value, not the ticking one */}
                <p className="whitespace-nowrap text-h1 font-semibold tabular-nums" aria-label={s.value}>
                  <span aria-hidden="true">{shown}</span>
                </p>
                <p className="max-w-[284px] text-center text-body-lg font-normal">{s.caption}</p>
              </Reveal>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
