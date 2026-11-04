'use client'

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from '@/lib/router'
const logo = '/assets/logo-idis.svg'
import Button from './Button'
import { Reveal } from './Reveal'
import { useMounted } from '../hooks/scroll'
import { NAV_LINKS } from '../data/site'

/**
 * Top navigation — a centered cluster (logo · links · CTA) on desktop.
 * "Projects" opens a dropdown of every Works & Campaigns case study on hover or keyboard focus.
 * Below lg the links collapse into a menu button that opens a floating
 * panel, with the case studies listed under Projects. The current page's
 * link is brand-blue and semibold (blog posts count as Blog, case studies
 * as Projects).
 */
const isActive = (to, path) => (to === '/' ? path === '/' : path.startsWith(to))

function ProjectsMenu({ active, works }) {
  return (
    <div className="group/menu relative">
      <NavLink
        to="/projects"
        aria-haspopup="true"
        className={`flex items-center gap-1 ${active ? 'font-semibold text-brand' : 'font-normal text-ink transition-colors hover:text-brand'}`}
      >
        Projects
        <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover/menu:rotate-180 group-focus-within/menu:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavLink>
      {/* pt bridges the gap so the panel stays open while the pointer moves down */}
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-[opacity,visibility] duration-200 group-hover/menu:visible group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:opacity-100">
        <div className="w-[320px] rounded-[24px] bg-white p-3 shadow-[0_24px_48px_rgba(4,9,23,0.14)]">
          <p className="px-3 pb-2 pt-1 text-[13px] font-semibold tracking-[0.1em] text-slate">WORKS &amp; CAMPAIGNS</p>
          {works.map((c) => (
            <NavLink
              key={c.slug}
              to={`/projects/${c.slug}`}
              className={({ isActive: on }) =>
                `flex items-center gap-3 rounded-[16px] px-3 py-3 transition-colors hover:bg-blush-200 ${on ? 'bg-blush-200' : ''}`
              }
            >
              <span className={`size-3 shrink-0 rounded-full ${c.tags[0][1]}`} />
              <span className="flex flex-col">
                <span className="text-body font-semibold text-ink">{c.nav}</span>
                <span className="text-[14px] text-slate">{c.tags[0][0]}</span>
              </span>
            </NavLink>
          ))}
          <Link to="/projects" className="mt-1 block rounded-[16px] bg-ink px-3 py-3 text-center text-body font-medium text-white">
            All projects →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Nav({ works = [] }) {
  const ready = useMounted()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="page-shell relative z-50 py-[20px]">
      <Reveal as="nav" show={ready} from="-translate-y-6" className="mx-auto flex w-full items-center justify-between gap-6 lg:w-max lg:justify-center lg:gap-[clamp(40px,6vw,120px)]">
        <Link to="/" className="shrink-0" aria-label="IDIS Digital — home">
          <img src={logo} alt="IDIS" className="h-[31px] w-[102px]" />
        </Link>

        <ul className="hidden items-center gap-[30px] text-body-lg lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              {l.withCaseStudies ? (
                <ProjectsMenu active={isActive(l.to, pathname)} works={works} />
              ) : (
                <NavLink
                  to={l.to}
                  className={isActive(l.to, pathname) ? 'font-semibold text-brand' : 'font-normal text-ink transition-colors hover:text-brand'}
                >
                  {l.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button variant="blue" href="/contact" className="px-5! py-3! sm:px-8! sm:py-4!">
            Let’s talk
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
        className={`absolute inset-x-3 top-full max-h-[calc(100svh-96px)] origin-top overflow-y-auto rounded-[24px] bg-white p-3 shadow-[0_24px_48px_rgba(4,9,23,0.14)] transition-[opacity,scale] duration-300 lg:hidden ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                end={l.withCaseStudies}
                className={`block rounded-[16px] px-4 py-3 text-h5 ${
                  isActive(l.to, pathname) ? 'bg-blush-200 font-semibold text-brand' : 'font-medium text-ink'
                }`}
              >
                {l.label}
              </NavLink>
              {l.withCaseStudies && (
                <ul className="mb-1 ml-4 flex flex-col border-l border-line pl-2">
                  {works.map((c) => (
                    <li key={c.slug}>
                      <NavLink
                        to={`/projects/${c.slug}`}
                        className={({ isActive: on }) => `flex items-center gap-3 rounded-[12px] px-3 py-2 text-body ${on ? 'font-semibold text-brand' : 'text-ink'}`}
                      >
                        <span className={`size-[10px] rounded-full ${c.tags[0][1]}`} />
                        {c.nav}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
