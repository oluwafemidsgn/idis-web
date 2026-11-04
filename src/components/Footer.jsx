import { Link } from 'react-router-dom'
import logo from '../assets/logo-idis.svg'
import { useInView } from '../hooks/scroll'
import { Reveal, RevealWords } from './Reveal'
import { CASE_STUDIES } from '../data/caseStudies'
import { EMAIL, SERVICES } from '../data/site'

/**
 * Footer — navy (#132650) card that closes the page.
 * The logo on its own (client feedback, Nov 2026), four link columns, a bottom
 * bar with copyright + back-to-top, and an oversized "IDIS Digital" wordmark
 * that bleeds off the card's bottom edge.
 * On scroll the logo and link columns rise in turn and the wordmark
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
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Works & Campaigns',
    links: CASE_STUDIES.map((c) => ({ label: c.nav, href: `/projects/${c.slug}` })),
  },
  {
    heading: 'Services',
    links: SERVICES.map((s) => ({ label: s.title, href: `/services#${s.slug}` })),
  },
  {
    heading: 'Get in touch',
    links: [
      { label: EMAIL, href: `mailto:${EMAIL}` },
      { label: 'Contact us', href: '/contact' },
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
        <div className="flex flex-col gap-12 md:gap-16">
          {/* Logo */}
          <Reveal show={inView} from="translate-y-8">
            <Link to="/" aria-label="IDIS Digital — home" className="inline-block">
              <img src={logo} alt="IDIS" className="h-[31px] w-[102px] brightness-0 invert md:h-[41px] md:w-[136px]" />
            </Link>
          </Reveal>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1fr_1.2fr_1.4fr_1.2fr] md:gap-x-10">
            {COLUMNS.map((col, i) => (
              <Reveal
                key={col.heading}
                show={inView}
                delay={150 + i * 100}
                from="translate-y-8"
                className={`flex flex-col gap-4 ${col.heading === 'Get in touch' || col.heading === 'Services' ? 'col-span-2 md:col-span-1' : ''}`}
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
