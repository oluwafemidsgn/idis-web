'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useEffect, useState } from 'react'

/**
 * Thin compatibility layer so components written for React Router keep
 * their familiar API (`<Link to>`, `<NavLink className={fn}>`, `useLocation`)
 * on top of Next.js navigation.
 */
export const Link = forwardRef(function Link({ to, href, ...rest }, ref) {
  return <NextLink ref={ref} href={to ?? href} {...rest} />
})

export function NavLink({ to, end, className, children, ...rest }) {
  const pathname = usePathname() || '/'
  const isActive = end || to === '/' ? pathname === to : pathname === to || pathname.startsWith(`${to}/`)
  const cls = typeof className === 'function' ? className({ isActive }) : className
  return (
    <NextLink href={to} className={cls} aria-current={isActive ? 'page' : undefined} {...rest}>
      {children}
    </NextLink>
  )
}

/** `{ pathname, hash }` for the current URL; hash updates after mount. */
export function useLocation() {
  const pathname = usePathname() || '/'
  const [hash, setHash] = useState('')
  useEffect(() => {
    const read = () => setHash(window.location.hash)
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [pathname])
  return { pathname, hash }
}
