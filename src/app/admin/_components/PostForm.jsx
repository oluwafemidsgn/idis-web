'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { savePostAction } from '../actions'
import { Field, Notice, SaveButton, Section, Select, Toggle } from './fields'
import UploadField from './UploadField'
import MarkdownField from './MarkdownField'

export const CATEGORIES = ['Strategy', 'Brand', 'AI & Tech', 'Community', 'Performance']

export default function PostForm({ post, saved }) {
  const [state, action] = useActionState(savePostAction, null)
  const p = post ?? { published: true, author: 'IDIS Digital', category: 'Strategy', publishedAt: new Date().toISOString().slice(0, 10) }
  return (
    <form action={action} className="flex flex-col gap-5">
      {p.id && <input type="hidden" name="id" value={p.id} />}
      <Notice state={state} saved={saved} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-5">
          <Section title="Post">
            <Field label="Title" name="title" defaultValue={p.title} required />
            <Field label="Summary" name="excerpt" defaultValue={p.excerpt} textarea rows={2} hint="One or two sentences shown on the blog page and under the title." />
            <MarkdownField name="body" defaultValue={p.body} />
          </Section>
        </div>
        <div className="flex flex-col gap-5">
          <Section title="Publishing">
            <Toggle label="Published" name="published" defaultChecked={p.published} hint="Off keeps it as a draft — hidden from the website." />
            <Toggle label="Feature at the top of the blog" name="featured" defaultChecked={p.featured} />
            <Field label="Publish date" name="publishedAt" type="date" defaultValue={p.publishedAt} />
            <Select label="Category" name="category" options={CATEGORIES} defaultValue={p.category} />
            <Field label="Author" name="author" defaultValue={p.author} />
            <Field label="Read time (minutes)" name="readMins" type="number" min="1" defaultValue={p.readMins} hint="Leave empty to work it out from the length." />
            <Field label="URL slug" name="slug" defaultValue={p.slug} hint="The end of the web address. Leave empty to create it from the title." />
          </Section>
          <Section title="Cover image">
            <UploadField label="Image" name="cover" defaultValue={p.cover ?? ''} />
            <Field label="Image description" name="coverAlt" defaultValue={p.coverAlt} hint="Describes the image for screen readers and search engines." />
          </Section>
        </div>
      </div>
      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
        <Link href="/admin/blog" className="text-[14px] font-medium text-slate hover:text-ink">← All posts</Link>
        <div className="flex items-center gap-3">
          {p.id && p.published && (
            <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="rounded-full border border-line px-5 py-3 text-[14px] font-medium text-ink">
              View on site ↗
            </a>
          )}
          <SaveButton>{p.id ? 'Save changes' : 'Create post'}</SaveButton>
        </div>
      </div>
    </form>
  )
}
