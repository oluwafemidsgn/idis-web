import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo-idis.svg'
import Button from './Button'
import { Reveal } from './Reveal'
import { useMounted } from '../hooks/scroll'
import { NAV_LINKS } from '../data/site'

/**
 * Top navigation — a centered cluster (logo · links · CTA) on desktop.
 * Below lg the links collapse into a menu button that opens a floating
 * panel. The current page's link is brand-blue and semibold; blog posts
 * count as "Resources" and case studies as "Projects".
 */
const isActive = (to, path) => (to === '/' ? path === '/' : path.startsWith(to))

export default function Nav() {
  const ready = useMounted()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="page-shell relative z-50 py-[20px]">
      <Reveal as="nav" show={ready} from="-translate-y-6" className="mx-auto flex w-full items-center justify-between gap-6 lg:w-max lg:justify-center lg:gap-[clamp(40px,8vw,156px)]">
        <Link to="/" className="shrink-0" aria-label="IDIS Digital — home">
          <img src={logo} alt="IDIS" className="h-[31px] w-[102px]" />
        </Link>

        <ul className="hidden items-center gap-[30px] text-body-lg lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                className={
                  isActive(l.to, pathname)
                    ? 'font-semibold text-brand'
                    : 'font-normal text-ink transition-colors hover:text-brand'
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button variant="blue" href="/contact" className="px-5! py-3! sm:px-8! sm:py-4!">
            Lets talk
          </Button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-[44px] place-items-center rounded-full bg-blush-200 lg:hidden"
          >
            <span className="relative block h-[12px] w-[18px]">
              <span className={`absolute left-0 h-[2px] w-full rounded bg-ink transition-transform ${open ? 'top-[5px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-[5px] h-[2px] w-full rounded bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-[2px] w-full rounded bg-ink transition-transform ${open ? 'top-[5px] -rotate-45' : 'top-[10px]'}`} />
            </span>
          </button>
        </div>
      </Reveal>

      {/* Mobile menu panel */}
      <div
        className={`absolute inset-x-3 top-full origin-top rounded-[24px] bg-white p-3 shadow-[0_24px_48px_rgba(4,9,23,0.14)] transition-[opacity,scale] duration-300 lg:hidden ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <ul className="flex flex-col">
          {[...NAV_LINKS, { label: 'Contact', to: '/contact' }].map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                className={`block rounded-[16px] px-4 py-3 text-h5 ${
                  isActive(l.to, pathname) ? 'bg-blush-200 font-semibold text-brand' : 'font-medium text-ink'
                }`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
