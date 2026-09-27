/**
 * Pill button used across the site.
 * Variants match the Figma design:
 *  - "dark"    → ink background, near-white text (hero, founder)
 *  - "blue"    → brand-blue background, mist text (nav, CTAs)
 */
export default function Button({ children, variant = 'dark', href = '#contact', className = '' }) {
  const variants = {
    dark: 'bg-ink text-[#fffbfb]',
    blue: 'bg-brand text-mist',
  }
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-[99px] px-8 py-4 text-body-lg font-medium leading-none whitespace-nowrap transition-opacity duration-200 hover:opacity-90 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}
