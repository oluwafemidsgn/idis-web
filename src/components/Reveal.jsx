import { Children, forwardRef } from 'react'

/**
 * Small, reusable entrance animations driven by a `show` flag (usually from
 * useInView). Both respect prefers-reduced-motion by rendering the end state.
 */

const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

/** Splits text into words that slide up out of a mask, one after another. */
export function RevealWords({ text, show, delay = 0, stagger = 60, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
              <span
                className={`inline-block transition-transform duration-[900ms] ${EASE} motion-reduce:translate-y-0 motion-reduce:transition-none ${
                  show ? 'translate-y-0' : 'translate-y-[110%]'
                }`}
                style={{ transitionDelay: `${delay + i * stagger}ms` }}
              >
                {w}
              </span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </span>
  )
}

/** Fades + lifts its children in. `from` tweaks the start transform. */
export const Reveal = forwardRef(function Reveal(
  { show, delay = 0, from = 'translate-y-10', as: Tag = 'div', className = '', children, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      {...rest}
      className={`transition-[opacity,translate,scale,rotate] duration-[900ms] ${EASE} motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:rotate-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        show ? 'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100' : `opacity-0 ${from}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...rest.style }}
    >
      {children}
    </Tag>
  )
})

/** Wraps each child in a Reveal, delaying each one `step` ms after the last. */
export function Stagger({ show, delay = 0, step = 90, from, itemClassName = '', children }) {
  return Children.toArray(children).map((child, i) => (
    <Reveal key={child.key ?? i} show={show} delay={delay + i * step} from={from} className={itemClassName}>
      {child}
    </Reveal>
  ))
}
