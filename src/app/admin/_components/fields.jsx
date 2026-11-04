'use client'

import { useFormStatus } from 'react-dom'

/** Shared form building blocks for the admin. */

const inputCls =
  'w-full rounded-[14px] border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-gray-300 focus:border-brand'

export function Section({ title, hint, children }) {
  return (
    <section className="flex flex-col gap-5 rounded-[24px] border border-line bg-white p-5 md:p-7">
      <div className="flex flex-col gap-1">
        <h2 className="text-[19px] font-semibold text-ink">{title}</h2>
        {hint && <p className="text-[14px] text-slate">{hint}</p>}
      </div>
      {children}
    </section>
  )
}

export function Field({ label, hint, name, textarea, rows = 3, className = '', ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[14px] font-medium text-ink">{label}</span>
      <Tag name={name} rows={textarea ? rows : undefined} className={`${inputCls} ${textarea ? 'resize-y leading-relaxed' : ''}`} {...props} />
      {hint && <span className="text-[13px] text-slate">{hint}</span>}
    </label>
  )
}

export function Select({ label, name, options, defaultValue, hint }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-ink">{label}</span>
      <select name={name} defaultValue={defaultValue} className={inputCls}>
        {options.map((o) => {
          const [value, text] = Array.isArray(o) ? o : [o, o]
          return (
            <option key={value} value={value}>
              {text}
            </option>
          )
        })}
      </select>
      {hint && <span className="text-[13px] text-slate">{hint}</span>}
    </label>
  )
}

export function Toggle({ label, name, defaultChecked, hint }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-gray-300 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-brand peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40" />
      <span className="flex flex-col">
        <span className="text-[15px] font-medium text-ink">{label}</span>
        {hint && <span className="text-[13px] text-slate">{hint}</span>}
      </span>
    </label>
  )
}

export function SaveButton({ children = 'Save changes' }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="rounded-full bg-brand px-7 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60">
      {pending ? 'Saving…' : children}
    </button>
  )
}

export function Notice({ state, saved }) {
  if (state?.error) return <p className="rounded-[14px] bg-coral/10 px-4 py-3 text-[14px] font-medium text-coral">{state.error}</p>
  if (state?.ok || saved) return <p className="rounded-[14px] bg-leaf/10 px-4 py-3 text-[14px] font-medium text-leaf">{state?.ok || 'Saved — the website is updated.'}</p>
  return null
}

/** Small button that asks before submitting (used for deletes). */
export function ConfirmButton({ message, children, className = '' }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault()
      }}
      className={className || 'rounded-full border border-coral/40 px-5 py-2.5 text-[14px] font-medium text-coral transition-colors hover:bg-coral hover:text-white'}
    >
      {children}
    </button>
  )
}

export const ACCENTS = [
  ['bg-sun', 'Yellow'],
  ['bg-pink', 'Pink'],
  ['bg-mint', 'Mint'],
  ['bg-lime', 'Lime'],
  ['bg-coral', 'Coral'],
  ['bg-brand', 'Blue'],
  ['bg-blush-200', 'Blush'],
  ['bg-navy', 'Navy'],
]
