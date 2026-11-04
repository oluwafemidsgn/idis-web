'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/lib/router'
import Newsletter from '../components/Newsletter'
import { Reveal, RevealWords } from '../components/Reveal'
import { FadeUp, Tag } from '../components/ui'
import { useMounted } from '../hooks/scroll'

/**
 * Blog post — "IDIS — Blog Post" in the pen.dev file. The article body is
 * Markdown written in /admin, rendered to HTML on the server (`html`), with
 * an "In this article" list built from its `##` headings (`toc`).
 */

const CATEGORY_TAG = { Strategy: 'bg-sun', Brand: 'bg-pink', 'AI & Tech': 'bg-lime', Community: 'bg-mint', Performance: 'bg-coral' }
const RELATED_BG = ['bg-sun', 'bg-pink', 'bg-mint']
const fmtDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogPost({ post, html, toc = [], related = [] }) {
  const ready = useMounted()
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState('')
  useEffect(() => setUrl(window.location.href), [])

  const share = [
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, 'in'],
    ['X', `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`, '𝕏'],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'f'],
  ]
  const copy = () => {
    navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      {/* Article head */}
      <section className="page-shell">
        <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-8 pb-12 pt-[clamp(16px,4vw,64px)] text-center md:pb-14">
          <Reveal show={ready} from="translate-y-3" className="flex items-center gap-3 text-body text-slate">
            <Link to="/blog" className="transition-colors hover:text-ink">
              Blog
            </Link>
            <span className="text-gray-300">›</span>
            <Tag className={`${CATEGORY_TAG[post.category] ?? 'bg-sun'} text-ink`}>{post.category}</Tag>
          </Reveal>
          <h1 className="text-h1 font-semibold text-ink">
            <RevealWords text={post.title} show={ready} delay={100} stagger={45} />
          </h1>
          {post.excerpt && (
            <Reveal as="p" show={ready} delay={500} from="translate-y-4" className="max-w-[720px] text-h5 font-normal text-slate">
              {post.excerpt}
            </Reveal>
          )}
          <Reveal show={ready} delay={650} from="translate-y-4" className="text-left">
            <span className="block text-body font-semibold text-ink">{post.author}</span>
            <span className="block text-[15px] text-slate">
              {fmtDate(post.publishedAt)} · {post.readMins} min read
            </span>
          </Reveal>
        </div>
      </section>

      {post.cover && (
        <section className="page-shell">
          <Reveal show={ready} delay={750} from="translate-y-12 scale-[0.98]" className="overflow-hidden rounded-[24px] bg-blush-200 md:rounded-[40px]">
            <img src={post.cover} alt={post.coverAlt || ''} className="aspect-[4/3] w-full object-cover md:aspect-[1336/640]" />
          </Reveal>
        </section>
      )}

      <main className="flex flex-col gap-[clamp(64px,9vw,120px)] py-[clamp(56px,7vw,96px)]">
        {/* Body */}
        <section className="page-shell">
          <div className="content grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-[clamp(48px,7vw,120px)]">
            <aside className="hidden lg:block">
              <div className="sticky top-8 flex flex-col gap-10">
                {toc.length > 0 && (
                  <nav aria-label="In this article" className="flex flex-col">
                    <p className="mb-4 text-[14px] font-semibold tracking-[0.1em] text-slate">IN THIS ARTICLE</p>
                    {toc.map((h) => (
                      <a key={h.id} href={`#${h.id}`} className="border-l border-line py-[10px] pl-4 text-body text-slate transition-colors hover:border-brand hover:text-brand">
                        {h.text}
                      </a>
                    ))}
                  </nav>
                )}
                <div className="flex flex-col gap-4">
                  <p className="text-[14px] font-semibold tracking-[0.1em] text-slate">SHARE</p>
                  <div className="flex gap-[10px]">
                    {share.map(([name, href, glyph]) => (
                      <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Share on ${name}`} className="grid size-11 place-items-center rounded-full bg-blush-200 text-body font-semibold text-ink transition-colors hover:bg-ink hover:text-white">
                        {glyph}
                      </a>
                    ))}
                    <button type="button" onClick={copy} aria-label="Copy link" className="grid size-11 place-items-center rounded-full bg-blush-200 text-ink transition-colors hover:bg-ink hover:text-white">
                      {copied ? '✓' : '🔗'}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <article className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="page-shell">
            <div className="content flex flex-col gap-10">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-h2 font-semibold text-ink">Keep reading</h2>
                <Link to="/blog" className="shrink-0 text-body-lg font-medium text-brand hover:underline">
                  All posts →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((p, i) => (
                  <FadeUp key={p.slug} delay={i * 100}>
                    <Link to={`/blog/${p.slug}`} className="group flex flex-col gap-5">
                      <span className={`relative block aspect-[4/3] overflow-hidden rounded-[24px] ${RELATED_BG[i % 3]}`}>
                        {p.cover && (
                          <img src={p.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        )}
                        <span className="absolute left-5 top-5">
                          <Tag>{p.category}</Tag>
                        </span>
                      </span>
                      <span className="text-[15px] text-slate">
                        {fmtDate(p.publishedAt)} · {p.readMins} min read
                      </span>
                      <span className="text-h5 font-semibold text-ink">{p.title}</span>
                    </Link>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        )}

        <Newsletter />
      </main>
    </>
  )
}
