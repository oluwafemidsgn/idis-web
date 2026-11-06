import Link from 'next/link'
import { listCaseStudies } from '@/lib/content'
import { getCountsMap } from '@/lib/analytics'
import { moveCaseStudyAction } from '../../actions'

export default async function WorksAdmin() {
  const [works, counts] = await Promise.all([listCaseStudies({ all: true }), getCountsMap('case')])
  return (
    <div className="flex max-w-[1100px] flex-col gap-6 pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h3 font-semibold">Works &amp; Campaigns</h1>
          <p className="text-body text-slate">Case studies, in the order they appear on the website. Use the arrows to reorder.</p>
        </div>
        <Link href="/admin/works/new" className="rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-white">
          + New case study
        </Link>
      </div>
      <ul className="overflow-hidden rounded-[24px] border border-line bg-white">
        {works.map((w, i) => (
          <li key={w.id} className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-0 md:px-5">
            <div className="flex flex-col gap-1">
              {[
                [-1, '↑', i === 0],
                [1, '↓', i === works.length - 1],
              ].map(([dir, glyph, disabled]) => (
                <form key={dir} action={moveCaseStudyAction}>
                  <input type="hidden" name="id" value={w.id} />
                  <input type="hidden" name="dir" value={dir} />
                  <button type="submit" disabled={disabled} aria-label={dir < 0 ? 'Move up' : 'Move down'} className="grid size-7 place-items-center rounded-full bg-blush text-[13px] text-slate hover:text-ink disabled:opacity-30">
                    {glyph}
                  </button>
                </form>
              ))}
            </div>
            <Link href={`/admin/works/${w.id}`} className="flex min-w-0 flex-1 items-center gap-4 rounded-[14px] p-1 hover:bg-blush">
              <span className="size-16 shrink-0 overflow-hidden rounded-[12px] bg-blush-200">
                {w.card.image && <img src={w.card.image} alt="" className="h-full w-full object-cover" />}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[15px] font-semibold text-ink">{w.nav || w.client}</span>
                <span className="truncate text-[13px] text-slate">{w.card.title || w.title}</span>
                <span className="text-[12px] text-slate">
                  {counts[w.slug]?.views ?? 0} views · {counts[w.slug]?.likes ?? 0} likes
                </span>
              </span>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold ${w.published ? 'bg-leaf/10 text-leaf' : 'bg-gray-300/40 text-slate'}`}>
                {w.published ? 'Live' : 'Hidden'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
