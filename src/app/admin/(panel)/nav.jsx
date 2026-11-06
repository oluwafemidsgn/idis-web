'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  ['/admin', 'Overview'],
  ['/admin/blog', 'Blog'],
  ['/admin/works', 'Works & Campaigns'],
  ['/admin/testimonials', 'Testimonials'],
  ['/admin/analytics', 'Analytics'],
]

export default function AdminNav() {
  const path = usePathname()
  return (
    <nav className="-mx-1 flex gap-1 overflow-x-auto lg:mx-0 lg:flex-col">
      {ITEMS.map(([href, label]) => {
        const on = href === '/admin' ? path === href : path.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`shrink-0 whitespace-nowrap rounded-[14px] px-3 py-2.5 text-[15px] font-medium transition-colors ${on ? 'bg-brand text-white' : 'text-ink hover:bg-blush'}`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
