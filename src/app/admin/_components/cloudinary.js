'use client'

/**
 * Opens the Cloudinary Upload Widget (signed by /api/cloudinary/sign) and
 * calls `onUrl` with a web-optimised URL of the uploaded image. Used by the
 * image fields and the article editor, so images are uploaded from the admin.
 */
const SCRIPT_SRC = 'https://upload-widget.cloudinary.com/latest/global/all.js'
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER || 'idis'

export const uploadsEnabled = Boolean(CLOUD_NAME && API_KEY)

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

// Serve uploads as auto format/quality, max 1600px wide.
const optimise = (url) => url.replace('/upload/', '/upload/f_auto,q_auto,w_1600,c_limit/')

export async function openUploadWidget({ onUrl, onError }) {
  const cloudinary = await loadWidget()
  const widget = cloudinary.createUploadWidget(
    {
      cloudName: CLOUD_NAME,
      apiKey: API_KEY,
      folder: FOLDER,
      sources: ['local', 'url', 'camera'],
      multiple: false,
      resourceType: 'image',
      clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg'],
      maxFileSize: 15_000_000,
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
          .catch((e) => onError?.(e.message))
      },
    },
    (err, result) => {
      if (err) return onError?.(typeof err === 'string' ? err : err.message || 'Upload failed')
      if (result?.event === 'success' && result.info?.secure_url) {
        onUrl(optimise(result.info.secure_url), result.info)
        widget.close()
      }
    },
  )
  widget.open()
}
