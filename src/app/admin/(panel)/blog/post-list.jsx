'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PostList({ posts }) {
  const [q, setQ] = useState('')
  const shown = posts.filter((p) => `${p.title} ${p.category}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="flex flex-col gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search posts…"
        className="w-full max-w-[420px] rounded-full border border-line bg-white px-5 py-3 text-[15px] outline-none focus:border-brand"
      />
      <ul className="overflow-hidden rounded-[24px] border border-line bg-white">
        {shown.map((p) => (
          <li key={p.id} className="border-b border-line last:border-0">
            <Link href={`/admin/blog/${p.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-blush md:px-5">
              <span className="size-14 shrink-0 overflow-hidden rounded-[12px] bg-blush-200">
                {p.cover && <img src={p.cover} alt="" className="h-full w-full object-cover" />}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[15px] font-semibold text-ink">{p.title}</span>
                <span className="text-[13px] text-slate">
                  {p.category} · {p.publishedAt} · {p.views} views · {p.likes} likes
                </span>
              </span>
              {p.featured && <span className="hidden rounded-full bg-sun px-3 py-1 text-[12px] font-semibold sm:inline">Featured</span>}
              <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold ${p.published ? 'bg-leaf/10 text-leaf' : 'bg-gray-300/40 text-slate'}`}>
                {p.published ? 'Live' : 'Draft'}
              </span>
            </Link>
          </li>
        ))}
        {shown.length === 0 && <li className="px-5 py-8 text-center text-[15px] text-slate">No posts match “{q}”.</li>}
      </ul>
    </div>
  )
}
