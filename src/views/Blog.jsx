'use client'

import { useState } from 'react'
import { Link } from '@/lib/router'
import Newsletter from '../components/Newsletter'
import { Reveal, RevealWords } from '../components/Reveal'
import { ArrowUpRight, FadeUp, Sparkle, Tag } from '../components/ui'
import { useMounted } from '../hooks/scroll'

/** Blog listing — "IDIS — Blog" in the pen.dev file (renamed from Journal). */

const TABS = ['All posts', 'Strategy', 'Brand', 'AI & Tech', 'Community', 'Performance']
const PER_PAGE = 8
const SIDE_COLOURS = ['bg-pink', 'bg-mint']
const DOTS = { Strategy: 'bg-sun', Brand: 'bg-brand', 'AI & Tech': 'bg-lime', Community: 'bg-pink', Performance: 'bg-coral' }

const postHref = (p) => `/blog/${p.slug}`
const fmtDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

/** `posts` — published posts from the database, featured first then newest. */
export default function Blog({ posts = [] }) {
  const POSTS = posts.map((p) => ({ ...p, date: fmtDate(p.publishedAt), cat: p.category, mins: p.readMins, dot: DOTS[p.category] ?? 'bg-sun' }))
  const ready = useMounted()
  const [tab, setTab] = useState('All posts')
  const [page, setPage] = useState(1)

  const list = tab === 'All posts' ? POSTS.slice(3) : POSTS.filter((p) => p.cat === tab)
  const [lead, ...side] = POSTS
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const visible = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const pick = (t) => {
    setTab(t)
    setPage(1)
  }

  return (
    <>
      {/* Hero */}
      <section className="page-shell pt-[clamp(24px,4vw,56px)]">
        <div className="content flex flex-col gap-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex items-start gap-4">
              <h1 className="text-display font-semibold leading-[0.85] text-ink">
                <RevealWords text="Blog" show={ready} />
              </h1>
              <Reveal show={ready} delay={300} from="scale-50 rotate-45">
                <Sparkle className="size-[clamp(36px,5.5vw,80px)] text-coral" strokeWidth={2} />
              </Reveal>
            </div>
            <Reveal as="p" show={ready} delay={400} from="translate-y-4" className="max-w-[400px] text-body-lg text-slate lg:pb-3">
              Opinions, frameworks and field notes on strategy, brand, community and AI — written by the people doing
              the work.
            </Reveal>
          </div>
          <Reveal show={ready} delay={500} from="translate-y-4" className="-mx-1 flex gap-8 overflow-x-auto border-b border-line px-1">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => pick(t)}
                className={`shrink-0 whitespace-nowrap border-b-2 pb-4 text-body transition-colors ${
                  tab === t ? 'border-ink font-semibold text-ink' : 'border-transparent text-slate hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      <main className="flex flex-col gap-[clamp(64px,9vw,120px)] pb-[clamp(64px,10vw,140px)] pt-[clamp(32px,4vw,56px)]">
        {/* Featured */}
        {tab === 'All posts' && lead && (
          <section className="page-shell">
            <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
              <FadeUp className="group relative isolate min-h-[420px] overflow-hidden rounded-[24px] bg-navy md:rounded-[40px] lg:min-h-[720px]">
                <Link to={postHref(lead)} className="absolute inset-0 flex flex-col justify-end gap-5 p-6 md:p-12">
                  {lead.cover && (
                    <img src={lead.cover} alt={lead.coverAlt || ''} className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
                  )}
                  <span className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/0 from-35% to-ink/90" />
                  <span className="flex flex-wrap items-center gap-3">
                    <Tag className="bg-sun text-ink">{lead.cat}</Tag>
                    <span className="text-[15px] text-white/80">
                      {lead.date} · {lead.mins} min read
                    </span>
                  </span>
                  <span className="text-h2 font-semibold text-white">{lead.title}</span>
                  {lead.excerpt && <span className="max-w-[640px] text-body-lg text-white/80">{lead.excerpt}</span>}
                </Link>
              </FadeUp>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-1">
                {side.slice(0, 2).map((p, i) => (
                  <FadeUp key={p.slug} delay={150 + i * 120} className={`group rounded-[24px] p-5 md:rounded-[40px] ${SIDE_COLOURS[i]}`}>
                    <Link to={postHref(p)} className="flex h-full flex-col gap-4">
                      <span className="block aspect-[16/9] overflow-hidden rounded-[20px] bg-white/40 lg:aspect-auto lg:min-h-[180px] lg:flex-1">
                        {p.cover && (
                          <img src={p.cover} alt={p.coverAlt || ''} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                      </span>
                      <span className="flex flex-col gap-2 px-2 pb-2">
                        <span className="text-[15px] font-medium text-ink/70">
                          {p.cat} · {p.date}
                        </span>
                        <span className="text-h5 font-semibold text-ink">{p.title}</span>
                      </span>
                    </Link>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest */}
        <section id="latest" className="page-shell scroll-mt-6">
          <div className="content flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-h3 font-semibold text-ink">{tab === 'All posts' ? 'Latest posts' : tab}</h2>
              <span className="text-body text-slate">{list.length} posts</span>
            </div>
            <ul className="border-t border-line">
              {visible.map((p, i) => (
                <FadeUp as="li" key={p.slug} delay={i * 50} threshold={0.1}>
                  <Link
                    to={postHref(p)}
                    className="group grid grid-cols-[minmax(0,1fr)_48px] items-center gap-x-4 gap-y-2 border-b border-line py-6 transition-colors hover:bg-blush-200 md:grid-cols-[140px_16px_minmax(0,1fr)_150px_48px] md:gap-8 md:rounded-[24px] md:px-4 md:py-8"
                  >
                    <span className="text-[15px] text-slate md:order-none">{p.date}</span>
                    <span className={`hidden size-4 rounded-full md:block ${p.dot}`} />
                    <span className="col-start-1 text-h5 font-semibold text-ink md:col-start-auto">{p.title}</span>
                    <span className="hidden justify-end md:flex">
                      <span className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium text-ink">{p.cat}</span>
                    </span>
                    <span className="col-start-2 row-span-2 row-start-1 grid size-12 place-items-center rounded-full bg-blush-200 text-ink transition-colors group-hover:bg-ink group-hover:text-white md:col-start-auto md:row-span-1 md:row-start-auto">
                      <ArrowUpRight />
                    </span>
                  </Link>
                </FadeUp>
              ))}
            </ul>
            {pages > 1 && (
              <div className="flex justify-center gap-2 pt-4">
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setPage(n)
                      document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`grid size-12 place-items-center rounded-full text-body font-medium ${n === page ? 'bg-ink text-white' : 'border border-line text-ink'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <Newsletter />
      </main>
    </>
  )
}
