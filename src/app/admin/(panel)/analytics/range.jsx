import Link from 'next/link'

export const RANGES = [
  [7, 'Last 7 days'],
  [30, 'Last 30 days'],
  [90, 'Last 90 days'],
  [0, 'All time'],
]

export const parseDays = (v) => (RANGES.some(([d]) => String(d) === v) ? Number(v) : 30)

export default function RangeTabs({ days, base, extra = '' }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-full bg-white p-1">
      {RANGES.map(([d, label]) => (
        <Link
          key={d}
          href={`${base}?days=${d}${extra}`}
          className={`rounded-full px-4 py-2 text-[14px] font-medium ${d === days ? 'bg-ink text-white' : 'text-slate hover:text-ink'}`}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
