import Link from 'next/link'
import { CHANNEL_LABELS, fillDays, getItemStats, getTotals } from '@/lib/analytics'
import { listCaseStudies, listPosts } from '@/lib/content'
import { DailyBars, HBars, PctBar, StatTile, fmtTime } from '../../_components/charts'
import RangeTabs, { RANGES, parseDays } from './range'

export default async function Analytics({ searchParams }) {
  const sp = await searchParams
  const days = parseDays(sp?.days)
  const show = ['all', 'post', 'case'].includes(sp?.show) ? sp.show : 'all'
  const [totals, stats, posts, works] = await Promise.all([getTotals(days), getItemStats(days), listPosts({ all: true }), listCaseStudies({ all: true })])

  const items = [
    ...works.map((w) => ({ kind: 'case', slug: w.slug, title: w.nav || w.client })),
    ...posts.map((p) => ({ kind: 'post', slug: p.slug, title: p.title })),
  ]
    .filter((i) => show === 'all' || i.kind === show)
    .map((i) => ({ ...i, ...(stats[`${i.kind}:${i.slug}`] ?? { views: 0, readers: 0, scroll: 0, finishRate: 0, seconds: 0, likes: 0, shares: 0 }) }))
    .sort((a, b) => b.views - a.views || b.likes - a.likes)

  const rangeLabel = RANGES.find(([d]) => d === days)[1].toLowerCase()
  const series = fillDays(totals.daily, days === 0 ? 90 : Math.min(days, 90))

  return (
    <div className="flex max-w-[1200px] flex-col gap-6 pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h3 font-semibold">Analytics</h1>
          <p className="text-body text-slate">How people read the blog and case studies — {rangeLabel}.</p>
        </div>
        <RangeTabs days={days} base="/admin/analytics" extra={`&show=${show}`} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        <StatTile label="Views" value={totals.views.toLocaleString()} />
        <StatTile label="Readers" value={totals.readers.toLocaleString()} sub="unique visitors" />
        <StatTile label="Avg. scroll" value={`${totals.scroll}%`} sub="of the page read" />
        <StatTile label="Finished" value={`${totals.finishRate}%`} sub="read to the end" />
        <StatTile label="Avg. time" value={fmtTime(totals.seconds)} sub="per visit" />
        <StatTile label="Likes" value={totals.likes.toLocaleString()} />
        <StatTile label="Shares" value={totals.shares.toLocaleString()} sub="share-button clicks" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-5 md:p-6">
          <h2 className="text-[17px] font-semibold">Views per day{days === 0 ? ' (last 90 days)' : ''}</h2>
          <DailyBars data={series} />
        </section>
        <section className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-5 md:p-6">
          <h2 className="text-[17px] font-semibold">Where people share</h2>
          {totals.channels.length ? (
            <HBars rows={totals.channels.map((c) => [CHANNEL_LABELS[c.channel] ?? c.channel, c.n])} />
          ) : (
            <p className="py-8 text-center text-[15px] text-slate">No shares yet.</p>
          )}
        </section>
      </div>

      <section className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[17px] font-semibold">Content</h2>
          <div className="flex gap-1 rounded-full bg-blush p-1 text-[14px] font-medium">
            {[
              ['all', 'Everything'],
              ['case', 'Works & Campaigns'],
              ['post', 'Blog'],
            ].map(([k, label]) => (
              <Link key={k} href={`/admin/analytics?days=${days}&show=${k}`} className={`rounded-full px-4 py-1.5 ${show === k ? 'bg-white text-ink shadow-sm' : 'text-slate'}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[14px]">
            <thead className="text-[13px] text-slate">
              <tr className="border-b border-line">
                <th className="py-3 pr-3 font-medium">Title</th>
                <th className="px-3 py-3 font-medium">Views</th>
                <th className="px-3 py-3 font-medium">Readers</th>
                <th className="px-3 py-3 font-medium">Avg. scroll</th>
                <th className="px-3 py-3 font-medium">Finished</th>
                <th className="px-3 py-3 font-medium">Avg. time</th>
                <th className="px-3 py-3 font-medium">Likes</th>
                <th className="px-3 py-3 font-medium">Shares</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={`${i.kind}:${i.slug}`} className="border-b border-line last:border-0 hover:bg-blush">
                  <td className="max-w-[340px] py-3 pr-3">
                    <Link href={`/admin/analytics/item?kind=${i.kind}&slug=${encodeURIComponent(i.slug)}&days=${days}`} className="flex items-center gap-2 font-medium text-ink hover:text-brand">
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${i.kind === 'case' ? 'bg-pink' : 'bg-sun'}`}>{i.kind === 'case' ? 'Work' : 'Blog'}</span>
                      <span className="truncate">{i.title}</span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 font-semibold tabular-nums">{i.views}</td>
                  <td className="px-3 py-3 tabular-nums">{i.readers}</td>
                  <td className="px-3 py-3">{i.views ? <PctBar value={i.scroll} /> : '—'}</td>
                  <td className="px-3 py-3 tabular-nums">{i.views ? `${i.finishRate}%` : '—'}</td>
                  <td className="px-3 py-3 tabular-nums">{i.views ? fmtTime(i.seconds) : '—'}</td>
                  <td className="px-3 py-3 tabular-nums">{i.likes}</td>
                  <td className="px-3 py-3 tabular-nums">{i.shares}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-slate">
          “Finished” means the reader scrolled through at least 90% of the article or case study. Readers are counted by an anonymous browser id — no personal data is stored.
        </p>
      </section>
    </div>
  )
}
