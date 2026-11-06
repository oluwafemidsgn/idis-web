/**
 * Tiny dashboard charts for the admin (single series, brand blue). Bars use
 * 4px rounded data-ends, a 2px gap, recessive gridlines and a hover value.
 */

export function StatTile({ label, value, sub }) {
  return (
    <div className="flex flex-col gap-1 rounded-[20px] border border-line bg-white p-5">
      <span className="text-[14px] font-medium text-slate">{label}</span>
      <span className="text-h3 font-semibold leading-none text-ink">{value}</span>
      {sub && <span className="text-[13px] text-slate">{sub}</span>}
    </div>
  )
}

/** Vertical bars over time — `data`: [{ label, n }]. */
export function DailyBars({ data, label = 'Views' }) {
  const max = Math.max(1, ...data.map((d) => d.n))
  if (!data.length) return <p className="py-10 text-center text-[15px] text-slate">No views in this period yet.</p>
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex h-44 items-end gap-[2px] border-b border-line" role="img" aria-label={`${label} per day`}>
        {[0.5, 1].map((f) => (
          <span key={f} className="pointer-events-none absolute inset-x-0 border-t border-dashed border-line" style={{ bottom: `${f * 100}%` }} />
        ))}
        {data.map((d) => (
          <div key={d.label} className="group relative flex h-full flex-1 items-end">
            <div className="w-full rounded-t-[4px] bg-brand transition-opacity group-hover:opacity-80" style={{ height: `${Math.max(2, (d.n / max) * 100)}%` }} />
            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-[8px] bg-ink px-2 py-1 text-[12px] font-medium text-white group-hover:block">
              {d.label}: {d.n}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[12px] text-slate">
        <span>{data[0].label}</span>
        <span>max {max}/day</span>
        <span>{data[data.length - 1].label}</span>
      </div>
    </div>
  )
}

/** Horizontal bars with the value at the end — `rows`: [[label, value]], `unit` appended. */
export function HBars({ rows, unit = '', max }) {
  const top = max ?? Math.max(1, ...rows.map(([, v]) => v))
  return (
    <ul className="flex flex-col gap-2">
      {rows.map(([label, v]) => (
        <li key={label} className="grid grid-cols-[110px_minmax(0,1fr)_56px] items-center gap-3 text-[14px]">
          <span className="truncate text-ink">{label}</span>
          <span className="h-3 rounded-full bg-blush-200">
            <span className="block h-full rounded-full bg-brand" style={{ width: `${(v / top) * 100}%` }} />
          </span>
          <span className="text-right font-semibold text-ink">
            {v}
            {unit}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Inline percentage bar for table cells. */
export function PctBar({ value }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-2 w-16 rounded-full bg-blush-200">
        <span className="block h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
      </span>
      <span className="tabular-nums">{value}%</span>
    </span>
  )
}

export const fmtTime = (s) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`)
