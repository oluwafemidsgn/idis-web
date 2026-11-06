import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CHANNEL_LABELS, fillDays, getItemDetail, getItemStats, getScrollDepth } from '@/lib/analytics'
import { getCaseStudyBySlug, getPostBySlug } from '@/lib/content'
import { DailyBars, HBars, StatTile, fmtTime } from '../../../_components/charts'
import RangeTabs, { parseDays } from '../range'

export default async function ItemAnalytics({ searchParams }) {
  const sp = await searchParams
  const days = parseDays(sp?.days)
  const kind = sp?.kind === 'case' ? 'case' : 'post'
  const slug = String(sp?.slug ?? '')
  const item = kind === 'case' ? await getCaseStudyBySlug(slug) : await getPostBySlug(slug, { all: true })
  if (!item) notFound()
  const title = kind === 'case' ? item.nav || item.client : item.title
  const [all, depth, detail] = await Promise.all([getItemStats(days), getScrollDepth(kind, slug, days), getItemDetail(kind, slug, days)])
  const s = all[`${kind}:${slug}`] ?? { views: 0, readers: 0, scroll: 0, finishRate: 0, seconds: 0, likes: 0, shares: 0 }
  const href = kind === 'case' ? `/projects/${slug}` : `/blog/${slug}`

  return (
    <div className="flex max-w-[1100px] flex-col gap-6 pb-12">
      <Link href={`/admin/analytics?days=${days}`} className="text-[14px] font-medium text-slate hover:text-ink">
        ← All analytics
      </Link>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className={`w-fit rounded-full px-3 py-1 text-[12px] font-semibold ${kind === 'case' ? 'bg-pink' : 'bg-sun'}`}>{kind === 'case' ? 'Works & Campaigns' : 'Blog post'}</span>
          <h1 className="text-h3 font-semibold">{title}</h1>
          <a href={href} target="_blank" rel="noreferrer" className="text-[14px] font-medium text-brand">
            View on site ↗
          </a>
        </div>
        <RangeTabs days={days} base="/admin/analytics/item" extra={`&kind=${kind}&slug=${encodeURIComponent(slug)}`} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        <StatTile label="Views" value={s.views} />
        <StatTile label="Readers" value={s.readers} sub="unique visitors" />
        <StatTile label="Avg. scroll" value={`${s.scroll}%`} />
        <StatTile label="Finished" value={`${s.finishRate}%`} sub="read to the end" />
        <StatTile label="Avg. time" value={fmtTime(s.seconds)} />
        <StatTile label="Likes" value={s.likes} />
        <StatTile label="Shares" value={s.shares} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-5 md:p-6">
          <div>
            <h2 className="text-[17px] font-semibold">How far people read</h2>
            <p className="text-[13px] text-slate">Share of {depth.n} visits that scrolled at least this far.</p>
          </div>
          {depth.n ? <HBars rows={depth.depth} unit="%" max={100} /> : <p className="py-8 text-center text-[15px] text-slate">No visits yet.</p>}
        </section>
        <section className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-5 md:p-6">
          <h2 className="text-[17px] font-semibold">Shares by channel</h2>
          {detail.channels.length ? (
            <HBars rows={detail.channels.map((c) => [CHANNEL_LABELS[c.channel] ?? c.channel, c.n])} />
          ) : (
            <p className="py-8 text-center text-[15px] text-slate">No shares yet.</p>
          )}
        </section>
      </div>

      <section className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-5 md:p-6">
        <h2 className="text-[17px] font-semibold">Views per day{days === 0 ? ' (last 90 days)' : ''}</h2>
        <DailyBars data={fillDays(detail.daily, days === 0 ? 90 : Math.min(days, 90))} />
      </section>
    </div>
  )
}
