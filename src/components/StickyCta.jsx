'use client'

import { useState } from 'react'
import { Link, useLocation } from '@/lib/router'
import { useScrollFrame } from '../hooks/scroll'

/**
 * Sticky "Let's talk" button (client feedback, Nov 2026). Floats in the
 * bottom-right corner once the visitor has scrolled past the first screen,
 * and stays out of the way on the Contact page itself.
 */
export default function StickyCta() {
  const { pathname } = useLocation()
  const [shown, setShown] = useState(false)
  useScrollFrame(() => setShown(window.scrollY > window.innerHeight * 0.6))
  if (pathname === '/contact') return null

  return (
    <Link
      to="/contact"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`fixed bottom-4 right-4 z-[90] flex items-center gap-2 rounded-full bg-brand py-3 pl-4 pr-5 text-body-lg font-medium text-white shadow-[0_16px_40px_rgba(39,95,232,0.4)] transition-[opacity,translate,scale] duration-300 hover:scale-105 md:bottom-8 md:right-8 md:py-4 md:pl-5 md:pr-7 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-lime" />
      </span>
      Let’s talk
    </Link>
  )
}
