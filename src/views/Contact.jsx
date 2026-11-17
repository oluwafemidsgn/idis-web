'use client'

import { useState } from 'react'
const founderPhoto = '/assets/founder/founder-photo-md.webp'
import Button from '../components/Button'
import { Reveal, RevealWords } from '../components/Reveal'
import { ArrowUpRight, Check, EyebrowPill, FadeUp, SectionHeading } from '../components/ui'
import { useMounted } from '../hooks/scroll'
import { BOOKING_URL, EMAIL, SERVICES, SOCIALS } from '../data/site'

/**
 * Contact — "IDIS — Contact" in the pen.dev file.
 * There's no form backend yet: sending opens the visitor's email app with a
 * message to the team, pre-filled from the form.
 */

const METHODS = [
  { k: 'Email us', v: EMAIL, href: `mailto:${EMAIL}`, bg: 'bg-sun', icon: 'M4 6h16v12H4z M4 7l8 6 8-6' },
  { k: 'Book a free call', v: '30-minute strategy session', href: BOOKING_URL, bg: 'bg-pink', icon: 'M5 5h14v15H5z M5 10h14 M9 3v4 M15 3v4' },
  { k: 'Where we work', v: 'Nigeria, the UK and remote worldwide', href: null, bg: 'bg-mint', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z' },
]

const STEPS = [
  ['01', 'We reply within a day', 'A strategist reads your message and replies personally — usually within one working day.', 'bg-sun'],
  ['02', 'A free 30-min call', "We dig into your goals, challenges and what's been tried. You'll leave with ideas either way.", 'bg-pink'],
  ['03', 'A tailored proposal', "If we're a fit, you get a clear plan, timeline and budget within a week. No surprises.", 'bg-mint'],
]

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)

function Field({ label, id, ...props }) {
  const Tag = props.rows ? 'textarea' : 'input'
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-[15px] font-medium text-ink">{label}</span>
      <Tag
        id={id}
        name={id}
        {...props}
        className="w-full resize-none rounded-[16px] border border-line bg-blush px-[18px] py-4 text-body text-ink outline-none transition-colors placeholder:text-gray-300 focus:border-brand focus:bg-white"
      />
    </label>
  )
}

function Chips({ label, options, selected, onToggle }) {
  return (
    <fieldset className="flex flex-col gap-[10px]">
      <legend className="mb-[10px] text-[15px] font-medium text-ink">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o)
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o)}
              className={`flex items-center gap-[6px] rounded-full px-4 py-[10px] text-[15px] font-medium transition-colors ${
                on ? 'bg-brand text-white' : 'border border-line bg-white text-ink hover:border-ink'
              }`}
            >
              {on && <Check className="bg-transparent" stroke="#fff" size={18} />}
              {o}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function ContactForm() {
  const [help, setHelp] = useState([])
  const toggle = (o) => setHelp((h) => (h.includes(o) ? h.filter((x) => x !== o) : [...h, o]))

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const lines = [
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Company: ${f.get('company') || '—'}`,
      `Website: ${f.get('website') || '—'}`,
      `Help with: ${help.join(', ') || '—'}`,
      `Monthly budget: ${f.get('budget') || '—'}`,
      '',
      f.get('goals'),
    ]
    const subject = encodeURIComponent(`New enquiry from ${f.get('name')}${f.get('company') ? ` (${f.get('company')})` : ''}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6 rounded-[24px] bg-white p-5 shadow-[0_16px_40px_rgba(4,9,23,0.05)] md:rounded-[32px] md:p-10">
      <p className="text-h4 font-semibold text-ink">Start a conversation</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" id="name" placeholder="Your name" required autoComplete="name" />
        <Field label="Work email" id="email" type="email" placeholder="you@company.com" required autoComplete="email" />
        <Field label="Company" id="company" placeholder="Company name" autoComplete="organization" />
        <Field label="Website" id="website" placeholder="company.com" />
      </div>
      <Chips label="What can we help with?" options={[...SERVICES.map((s) => s.title), 'Not sure yet']} selected={help} onToggle={toggle} />
      <Field label="Monthly budget" id="budget" placeholder="e.g. ₦1,500,000 or $2,000" />
      <Field label="Tell us about your goals" id="goals" rows={4} placeholder="What are you trying to achieve in the next 6–12 months?" required />
      <button type="submit" className="w-full rounded-full bg-ink px-8 py-4 text-body-lg font-medium text-[#fffbfb] transition-opacity hover:opacity-90">
        Send message →
      </button>
      <p className="text-center text-[14px] text-slate">We'll only use your details to reply to your enquiry.</p>
    </form>
  )
}

export default function Contact() {
  const ready = useMounted()
  return (
    <>
      <section className="page-shell">
        <div className="grid grid-cols-1 gap-10 rounded-[24px] bg-blush-200 p-3 pt-10 md:rounded-[40px] md:p-8 md:pl-[72px] md:pt-[72px] lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] lg:gap-[72px]">
          <div className="flex flex-col gap-8 px-2 md:px-0">
            <Reveal show={ready} from="translate-y-4">
              <EyebrowPill dot="bg-leaf">TAKING NEW PROJECTS</EyebrowPill>
            </Reveal>
            <h1 className="text-h1 font-semibold text-ink">
              <RevealWords text="Tell us where you're trying to go." show={ready} delay={100} stagger={60} />
            </h1>
            <Reveal as="p" show={ready} delay={450} from="translate-y-4" className="text-body-lg text-slate">
              Share a little about your business and goals. A strategist — not a sales rep — will get back to you within
              one working day.
            </Reveal>
            <Reveal show={ready} delay={600} from="translate-y-6" className="flex flex-col gap-3">
              {METHODS.map((m) => {
                const inner = (
                  <>
                    <span className={`grid size-12 shrink-0 place-items-center rounded-[12px] text-ink ${m.bg}`}>
                      <Icon d={m.icon} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
                      <span className="text-[15px] text-slate">{m.k}</span>
                      <span className="break-words text-body font-semibold text-ink">{m.v}</span>
                    </span>
                    {m.href && <ArrowUpRight className="size-5 shrink-0 text-ink" />}
                  </>
                )
                const cls = 'flex items-center gap-4 rounded-[16px] bg-white px-5 py-4'
                return m.href ? (
                  <a key={m.k} href={m.href} {...(m.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})} className={`${cls} transition-transform hover:-translate-y-0.5`}>
                    {inner}
                  </a>
                ) : (
                  <div key={m.k} className={cls}>
                    {inner}
                  </div>
                )
              })}
            </Reveal>
            <Reveal show={ready} delay={700} from="translate-y-4" className="flex flex-wrap items-center gap-3">
              <span className="text-[15px] text-slate">Follow along</span>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-white transition-opacity hover:opacity-85">
                  {s.label}
                </a>
              ))}
            </Reveal>
          </div>
          <Reveal show={ready} delay={300} from="translate-y-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <main className="flex flex-col gap-[clamp(64px,9vw,120px)] py-[clamp(64px,9vw,120px)]">
        <section className="page-shell">
          <div className="content flex flex-col gap-14">
            <SectionHeading eyebrow="WHAT HAPPENS NEXT" title="No pitch decks. Just a clear next step." desc="Here's exactly what to expect after you hit send." />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {STEPS.map(([n, t, d, bg], i) => (
                <FadeUp key={n} delay={i * 120} className={`flex min-h-[300px] flex-col justify-between gap-10 rounded-[24px] p-8 md:rounded-[40px] md:p-9 ${bg}`}>
                  <p className="text-h3 font-semibold text-ink">{n}</p>
                  <div className="flex flex-col gap-3">
                    <p className="text-h4 font-semibold text-ink">{t}</p>
                    <p className="text-body-lg text-ink/75">{d}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell">
          <FadeUp className="grid grid-cols-1 items-center gap-8 rounded-[24px] bg-navy p-4 md:rounded-[40px] md:p-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-16">
            <div className="flex flex-col gap-6 p-4 lg:py-8 lg:pl-12">
              <p className="text-body-lg tracking-[0.05em] text-white/70">PREFER TO TALK?</p>
              <p className="text-h2 font-semibold text-white">Grab 30 minutes with Sidi. It's free.</p>
              <p className="text-body-lg text-white/70">
                Pick a time that suits you. Come with a challenge — leave with a clearer view of what to do next.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href={BOOKING_URL} variant="blue">
                  Book a strategy session →
                </Button>
                <Button href={`mailto:${EMAIL}`} variant="light">
                  {EMAIL}
                </Button>
              </div>
            </div>
            <img src={founderPhoto} alt="Sidi Aderemi, founder of IDIS Digital" loading="lazy" className="aspect-[520/500] w-full rounded-[20px] bg-blush-200 object-cover md:rounded-[24px]" />
          </FadeUp>
        </section>
      </main>
    </>
  )
}
