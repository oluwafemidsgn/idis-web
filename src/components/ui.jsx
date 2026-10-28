import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * Small building blocks shared by the inner pages (About, Services, …) so
 * every page speaks the same visual language as the homepage.
 */

/** Fades + lifts in once it scrolls into view. */
export function FadeUp({ as = 'div', delay = 0, from = 'translate-y-10', threshold = 0.2, className = '', children, ...rest }) {
  const [ref, inView] = useInView({ threshold })
  return (
    <Reveal ref={ref} as={as} show={inView} delay={delay} from={from} className={className} {...rest}>
      {children}
    </Reveal>
  )
}

/** Heading whose words rise in when scrolled into view. */
export function RevealHeading({ as: Tag = 'h2', text, className = '', stagger = 60, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  return (
    <Tag ref={ref} className={className}>
      <RevealWords text={text} show={inView} stagger={stagger} delay={delay} />
    </Tag>
  )
}

/** White pill with a coloured dot — "ABOUT IDIS", "RESOURCES & THINKING"… */
export function EyebrowPill({ children, dot = 'bg-coral', className = '' }) {
  return (
    <span className={`inline-flex w-fit items-center gap-[10px] rounded-full bg-white px-5 py-[10px] text-[15px] font-medium tracking-[0.1em] text-ink ${className}`}>
      <span className={`size-[10px] rounded-full ${dot}`} />
      {children}
    </span>
  )
}

/** Plain uppercase label above a heading. */
export function Eyebrow({ children, className = '' }) {
  return <p className={`text-body-lg font-normal tracking-[0.05em] text-ink ${className}`}>{children}</p>
}

/** Centered eyebrow + title + description (the "Section Heading" component). */
export function SectionHeading({ eyebrow, title, desc, className = '' }) {
  return (
    <div className={`mx-auto flex max-w-[1100px] flex-col items-center gap-6 text-center ${className}`}>
      {eyebrow && (
        <FadeUp from="translate-y-4">
          <Eyebrow>{eyebrow}</Eyebrow>
        </FadeUp>
      )}
      <RevealHeading text={title} className="text-h2 font-semibold text-ink" />
      {desc && (
        <FadeUp as="p" delay={250} from="translate-y-6" className="max-w-[720px] text-body-lg text-slate">
          {desc}
        </FadeUp>
      )}
    </div>
  )
}

/** Small rounded tag, e.g. a category or accent label. */
export function Tag({ children, className = 'bg-white text-ink' }) {
  return <span className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-[15px] font-semibold ${className}`}>{children}</span>
}

/** Small round icon badge with a check mark. */
export function Check({ className = 'bg-ink', stroke = 'currentColor', size = 28 }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  )
}

/** Diagonal "open" arrow used on cards and list rows. */
export function ArrowUpRight({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

/** Four-point sparkle, as used next to oversized page titles. */
export function Sparkle({ className = 'size-24', strokeWidth = 1.5 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5c.6 4.7 2.8 6.9 9.5 9.5-6.7 2.6-8.9 4.8-9.5 9.5-.6-4.7-2.8-6.9-9.5-9.5 6.7-2.6 8.9-4.8 9.5-9.5Z" />
    </svg>
  )
}
