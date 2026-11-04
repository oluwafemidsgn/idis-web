'use client'

import { useState } from 'react'

/**
 * Editable list of rows (e.g. results, tags, tactics). Each row is an array
 * of column values; the whole list is submitted as JSON in a hidden input.
 * `columns`: [{ placeholder, width?, options? (renders a select), optional? }]
 */
export default function ListField({ label, hint, name, columns, defaultValue = [], addLabel = 'Add row' }) {
  const blank = () => columns.map((c) => (c.options ? c.options[0][0] : ''))
  const [rows, setRows] = useState(defaultValue.length ? defaultValue.map((r) => columns.map((_, i) => r[i] ?? '')) : [])
  const set = (ri, ci, v) => setRows((rs) => rs.map((r, i) => (i === ri ? r.map((c, j) => (j === ci ? v : c)) : r)))
  const move = (ri, d) =>
    setRows((rs) => {
      const j = ri + d
      if (j < 0 || j >= rs.length) return rs
      const out = [...rs]
      ;[out[ri], out[j]] = [out[j], out[ri]]
      return out
    })
  // Drop empty rows and trailing optional blanks before saving.
  const value = rows
    .filter((r) => r.some((c, i) => !columns[i].options && String(c).trim()))
    .map((r) => {
      const out = r.map((c) => String(c).trim())
      while (out.length > 1 && !out[out.length - 1] && columns[out.length - 1].optional) out.pop()
      return out
    })

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-ink">{label}</span>
      {hint && <span className="-mt-1 text-[13px] text-slate">{hint}</span>}
      <input type="hidden" name={name} value={JSON.stringify(value)} />
      <div className="flex flex-col gap-2">
        {rows.map((r, ri) => (
          <div key={ri} className="flex flex-col gap-2 rounded-[16px] bg-blush p-2 sm:flex-row sm:items-center">
            {columns.map((c, ci) =>
              c.options ? (
                <select key={ci} value={r[ci]} onChange={(e) => set(ri, ci, e.target.value)} className="rounded-[12px] border border-line bg-white px-3 py-2.5 text-[14px] sm:w-36">
                  {c.options.map(([v, t]) => (
                    <option key={v} value={v}>
                      {t}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  key={ci}
                  value={r[ci]}
                  onChange={(e) => set(ri, ci, e.target.value)}
                  placeholder={c.placeholder}
                  className={`min-w-0 rounded-[12px] border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-brand ${c.width ?? 'flex-1'}`}
                />
              ),
            )}
            <div className="flex shrink-0 gap-1">
              <button type="button" onClick={() => move(ri, -1)} aria-label="Move up" className="grid size-9 place-items-center rounded-full bg-white text-slate hover:text-ink">↑</button>
              <button type="button" onClick={() => move(ri, 1)} aria-label="Move down" className="grid size-9 place-items-center rounded-full bg-white text-slate hover:text-ink">↓</button>
              <button type="button" onClick={() => setRows((rs) => rs.filter((_, i) => i !== ri))} aria-label="Remove" className="grid size-9 place-items-center rounded-full bg-white text-coral">✕</button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setRows((rs) => [...rs, blank()])} className="w-fit rounded-full border border-dashed border-slate/50 px-4 py-2 text-[14px] font-medium text-ink hover:border-ink">
        + {addLabel}
      </button>
    </div>
  )
}
