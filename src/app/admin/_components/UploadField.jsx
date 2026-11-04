'use client'

import { useRef, useState } from 'react'

/**
 * Image field: paste a URL or upload through the Cloudinary Upload Widget
 * (signed by /api/cloudinary/sign), with a live preview. The Upload button
 * only appears when Cloudinary is configured.
 */
const SCRIPT_SRC = 'https://upload-widget.cloudinary.com/latest/global/all.js'
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER || 'idis'

let scriptPromise = null
function loadWidget() {
  if (window.cloudinary) return Promise.resolve(window.cloudinary)
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = SCRIPT_SRC
      s.async = true
      s.onload = () => (window.cloudinary ? resolve(window.cloudinary) : reject(new Error('Upload widget unavailable')))
      s.onerror = () => reject(new Error('Could not load the upload widget'))
      document.head.appendChild(s)
    }).catch((e) => {
      scriptPromise = null
      throw e
    })
  }
  return scriptPromise
}

export default function UploadField({ label, name, defaultValue = '', hint }) {
  const [url, setUrl] = useState(defaultValue)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const widget = useRef(null)
  const canUpload = Boolean(CLOUD_NAME && API_KEY)

  async function open() {
    setError(null)
    setBusy(true)
    try {
      if (!widget.current) {
        const cloudinary = await loadWidget()
        widget.current = cloudinary.createUploadWidget(
          {
            cloudName: CLOUD_NAME,
            apiKey: API_KEY,
            folder: FOLDER,
            sources: ['local', 'url', 'camera'],
            multiple: false,
            resourceType: 'image',
            clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg'],
            uploadSignature: (cb, paramsToSign) => {
              fetch('/api/cloudinary/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paramsToSign }),
              })
                .then(async (r) => {
                  const d = await r.json().catch(() => ({}))
                  if (!r.ok || !d.signature) throw new Error(d.error || `Signing failed (${r.status})`)
                  cb(d.signature)
                })
                .catch((e) => setError(e.message))
            },
          },
          (err, result) => {
            if (err) return setError(typeof err === 'string' ? err : err.message || 'Upload failed')
            if (result?.event === 'success' && result.info?.secure_url) {
              // Serve a web-optimised version (auto format/quality, max 1600px wide).
              setUrl(result.info.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_1600,c_limit/'))
            }
          },
        )
      }
      widget.current.open()
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
