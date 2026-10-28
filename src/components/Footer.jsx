import { Link } from 'react-router-dom'
import logo from '../assets/logo-idis.svg'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'

/**
 * Footer — navy (#132650) card that closes the page.
 * Brand block + CTA on the left, three link columns on the right, a bottom bar
 * with copyright + back-to-top, and an oversized "IDIS Digital" wordmark that
 * bleeds off the card's bottom edge.
 * All copy is reused from elsewhere on the page (nav, services, contact).
 * On scroll the brand block and link columns rise in turn and the wordmark
 * slides up out of the bottom edge.
 */
const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'Resources', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Strategy & Growth', href: '/services#strategy-growth' },
      { label: 'Brand & Creative', href: '/services#brand-creative' },
      { label: 'Digital & Experience', href: '/services#digital-experience' },
      { label: 'Performance & AI Marketing', href: '/services#performance-ai' },
    ],
  },
  {
    heading: 'Get in touch',
    links: [
      { label: 'Info@idisdigital.com', href: 'mailto:Info@idisdigital.com' },
      { label: 'Start a Conversation', href: '/contact' },
    ],
  },
]

const LINK = 'break-words text-body-lg text-white/90 transition-colors hover:text-white hover:underline hover:underline-offset-4'

export default function Footer() {
  const year = new Date().getFullYear()
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <footer className="page-shell">
      <div ref={ref} className="relative overflow-hidden rounded-[24px] bg-[#132650] px-5 pt-10 text-white md:rounded-[40px] md:px-[clamp(40px,4vw,64px)] md:pt-[clamp(48px,5vw,80px)]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-[clamp(40px,6vw,120px)]">
          {/* Brand + CTA */}
          <Reveal show={inView} from="translate-y-8" className="flex max-w-[480px] flex-col items-start gap-6">
            <Link to="/" aria-label="IDIS Digital — home">
              <img src={logo} alt="IDIS" className="h-[31px] w-[102px] brightness-0 invert" />
            </Link>
            <p className="text-h4 font-semibold">
              Build a marketing system that moves your business forward.
            </p>
            <Link
              to="/contact"
              className="rounded-[99px] bg-brand px-8 py-4 text-body-lg font-medium text-[#fffbfb] transition-opacity hover:opacity-90"
            >
              Start a Conversation →
            </Link>
          </Reveal>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {COLUMNS.map((col, i) => (
              <Reveal
                key={col.heading}
                show={inView}
                delay={150 + i * 100}
                from="translate-y-8"
                className={`flex flex-col gap-4 ${col.heading === 'Get in touch' ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <p className="text-body font-medium text-white/50">{col.heading}</p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith('/') ? (
                        <Link to={l.href} className={LINK}>
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className={LINK}>
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-[clamp(48px,6vw,96px)] flex flex-col gap-3 border-t border-white/15 py-6 text-body text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} IDIS Digital. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-fit transition-colors hover:text-white"
          >
            Back to top ↑
          </button>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="-mb-[0.2em] select-none whitespace-nowrap text-center text-display font-semibold leading-none text-white/[0.07]"
        >
          <RevealWords text="IDIS Digital" show={inView} delay={300} stagger={150} />
        </p>
      </div>
    </footer>
  )
}
