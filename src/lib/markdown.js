import 'server-only'
import { Marked } from 'marked'

/**
 * Renders a blog post's Markdown body to HTML and collects its `##`
 * headings (with anchor ids) for the "In this article" list.
 * Raw HTML in the Markdown is escaped, so only Markdown formatting renders.
 */
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderMarkdown(md = '') {
  const toc = []
  const used = new Set()
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens)
        if (depth !== 2) return `<h${depth}>${text}</h${depth}>`
        let id = slugify(text) || 'section'
        while (used.has(id)) id += '-'
        used.add(id)
        toc.push({ id, text: text.replace(/<[^>]+>/g, '') })
        return `<h2 id="${id}">${text}</h2>`
      },
      html({ text }) {
        return escapeHtml(text)
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens)
        if (/^\s*javascript:/i.test(href)) return text
        const external = /^https?:\/\//.test(href)
        return `<a href="${href}"${title ? ` title="${title}"` : ''}${external ? ' target="_blank" rel="noreferrer"' : ''}>${text}</a>`
      },
    },
  })
  return { html: marked.parse(md), toc }
}
