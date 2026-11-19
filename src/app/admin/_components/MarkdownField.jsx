'use client'

import { marked } from 'marked'
import { useMemo, useRef, useState } from 'react'
import { openUploadWidget, uploadsEnabled } from './cloudinary'

/**
 * Article body editor: a Markdown textarea with quick-format buttons, an
 * "Upload image" button that inserts the photo at the cursor, and a Preview
 * tab that uses the same styles as the live blog post.
 */
const TOOLS = [
  ['Heading', '## ', ''],
  ['Bold', '**', '**'],
  ['Italic', '*', '*'],
  ['Quote', '> ', ''],
  ['List', '- ', ''],
  ['Link', '[', '](https://)'],
]

export default function MarkdownField({ name, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue)
  const [tab, setTab] = useState('write')
  const ref = useRef(null)
  const html = useMemo(() => (tab === 'preview' ? marked.parse(value.replace(/</g, '&lt;')) : ''), [tab, value])

  const [uploadError, setUploadError] = useState(null)

  // Upload a photo and insert it at the cursor as a Markdown image.
  const uploadImage = () => {
    setUploadError(null)
    const el = ref.current
    const at = el ? el.selectionStart : value.length
    openUploadWidget({
      onUrl: (url) => setValue((v) => `${v.slice(0, at)}\n\n![Image description](${url})\n\n${v.slice(at)}`),
      onError: setUploadError,
    }).catch((e) => setUploadError(e.message))
  }

  const wrap = (before, after) => {
    const el = ref.current
    const { selectionStart: a, selectionEnd: b } = el
    const next = value.slice(0, a) + before + value.slice(a, b) + after + value.slice(b)
    setValue(next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(a + before.length, b + before.length)
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[14px] font-medium text-ink">Article</span>
        <div className="flex rounded-full bg-blush p-1 text-[13px] font-medium">
          {['write', 'preview'].map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 capitalize ${tab === t ? 'bg-white text-ink shadow-sm' : 'text-slate'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <input type="hidden" name={name} value={value} />
      {tab === 'write' ? (
        <>
          <div className="flex flex-wrap gap-1">
            {TOOLS.map(([label, b, a]) => (
              <button key={label} type="button" onClick={() => wrap(b, a)} className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink hover:border-ink">
                {label}
              </button>
            ))}
            {uploadsEnabled && (
              <button type="button" onClick={uploadImage} className="rounded-full bg-ink px-3 py-1.5 text-[13px] font-medium text-white">
                + Upload image
              </button>
            )}
          </div>
          {uploadError && <span className="text-[13px] text-danger">{uploadError}</span>}
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={22}
            className="w-full resize-y rounded-[14px] border border-line bg-white px-4 py-3 font-mono text-[14px] leading-relaxed text-ink outline-none focus:border-brand"
            placeholder="Write the article here. Start a line with ## for a section heading, > for a pull quote, - for a bullet point."
          />
          <span className="text-[13px] text-slate">
            Tip: each <code>##</code> heading appears in the “In this article” list beside the post. Leave a blank line between paragraphs.
          </span>
        </>
      ) : (
        <div className="article-body min-h-[300px] rounded-[14px] border border-line bg-white p-6" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  )
}
