import { Link } from 'react-router-dom'

/**
 * Pill button used across the site.
 * Variants match the design system:
 *  - "dark"    → ink background, near-white text (hero, founder)
 *  - "blue"    → brand-blue background, mist text (nav, CTAs)
 *  - "light"   → white background, ink text (on blue / navy cards)
 *  - "outline" → white with a slate border (secondary actions)
 * Internal paths ("/contact") render a router Link; anything else an <a>.
 */
export default function Button({ children, variant = 'dark', href = '/contact', className = '', ...rest }) {
  const variants = {
    dark: 'bg-ink text-[#fffbfb]',
    blue: 'bg-brand text-mist',
    light: 'bg-white text-ink',
    outline: 'border border-slate bg-white text-ink',
  }
  const cls = `inline-flex items-center justify-center rounded-[99px] px-8 py-4 text-body-lg font-medium leading-none whitespace-nowrap transition-[opacity,translate] duration-200 hover:-translate-y-0.5 hover:opacity-90 ${variants[variant]} ${className}`
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}
