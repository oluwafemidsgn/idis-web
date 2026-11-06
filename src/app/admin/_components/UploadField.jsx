'use client'

import { useState } from 'react'
import { openUploadWidget, uploadsEnabled } from './cloudinary'

/**
 * Image field: upload straight from the admin (Cloudinary Upload Widget) or
 * paste a link, with a live preview.
 */
export default function UploadField({ label, name, defaultValue = '', hint }) {
  const [url, setUrl] = useState(defaultValue)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const canUpload = uploadsEnabled

  async function open() {
    setError(null)
    setBusy(true)
    try {
      await openUploadWidget({ onUrl: setUrl, onError: setError })
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-ink">{label}</span>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="grid size-28 shrink-0 place-items-center overflow-hidden rounded-[14px] border border-line bg-blush">
          {url ? <img src={url} alt="" className="h-full w-full object-cover" /> : <span className="text-[12px] text-slate">No image</span>}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://… or /assets/…"
            className="w-full rounded-[14px] border border-line bg-white px-4 py-3 text-[14px] text-ink outline-none focus:border-brand"
          />
          <div className="flex flex-wrap items-center gap-2">
            {canUpload && (
              <button type="button" onClick={open} disabled={busy} className="rounded-full bg-ink px-5 py-2 text-[14px] font-medium text-white disabled:opacity-60">
                {busy ? 'Opening…' : 'Upload image'}
              </button>
            )}
            {url && (
              <button type="button" onClick={() => setUrl('')} className="rounded-full border border-line px-4 py-2 text-[14px] text-slate">
                Remove
              </button>
            )}
          </div>
          {!canUpload && <span className="text-[13px] text-slate">Uploads switch on once Cloudinary is connected — until then paste an image link.</span>}
          {hint && <span className="text-[13px] text-slate">{hint}</span>}
          {error && <span className="text-[13px] text-coral">{error}</span>}
        </div>
      </div>
    </div>
  )
}
