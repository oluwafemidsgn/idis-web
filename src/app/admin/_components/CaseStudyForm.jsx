'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { saveCaseStudyAction } from '../actions'
import { ACCENTS, Field, Notice, SaveButton, Section, Select, Toggle } from './fields'
import UploadField from './UploadField'
import ListField from './ListField'

const FILTERS = ['Brand', 'Campaigns', 'Digital', 'Performance']

export default function CaseStudyForm({ cs, authors = [], saved }) {
  const [state, action] = useActionState(saveCaseStudyAction, null)
  const c = cs ?? { published: false, tags: [], meta: [], results: [], labels: ['', '', ''], hero: {}, gallery: {}, challenge: {}, approach: { tactics: [] }, impact: { items: [] }, highlight: ['', ''], card: { results: [] } }
  return (
    <form action={action} className="flex flex-col gap-5">
      {c.id && <input type="hidden" name="id" value={c.id} />}
      <Notice state={state} saved={saved} />

      <Section title="Basics">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Client name" name="client" defaultValue={c.client} required />
          <Field label="Short name for menus" name="nav" defaultValue={c.nav} hint="e.g. “Awo the Musical”. Defaults to the client name." />
          <Field label="URL slug" name="slug" defaultValue={c.slug} hint="Leave empty to create it from the client name." />
          <Select label="Filter on the Projects page" name="card.filterTag" options={FILTERS} defaultValue={c.card?.filterTag} />
        </div>
        <Toggle label="Published" name="published" defaultChecked={c.published} hint="Off hides it from the website, the menu and the footer." />
      </Section>

      <Section title="Card" hint="How this project appears on the homepage “Works & Campaign” grid and the Projects page.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Small label" name="card.label" defaultValue={c.card?.label} hint="Shown above the title, e.g. “AFRILABS”." />
          <Field label="Button text" name="card.cta" defaultValue={c.card?.cta} hint="Defaults to “View case study”." />
        </div>
        <Field label="Card title" name="card.title" defaultValue={c.card?.title} />
        <Field label="Card description" name="card.desc" defaultValue={c.card?.desc} textarea rows={3} />
        <ListField label="Card highlights" name="cardResults" defaultValue={c.card?.results} columns={[{ placeholder: 'e.g. 40%', width: 'sm:w-48' }, { placeholder: 'e.g. Increase in social reach' }]} addLabel="Add highlight" />
        <UploadField label="Card image" name="card.image" defaultValue={c.card?.image ?? ''} />
      </Section>

      <Section title="Case study page — top" hint="The heading area of the full case study page.">
        <Field label="Page headline" name="title" defaultValue={c.title} textarea rows={2} />
        <ListField label="Tags" name="tags" defaultValue={c.tags} columns={[{ placeholder: 'e.g. Campaign' }, { options: ACCENTS }]} addLabel="Add tag" />
        <ListField label="Project details" hint="e.g. Client / Industry / Services / Markets." name="meta" defaultValue={c.meta} columns={[{ placeholder: 'Label', width: 'sm:w-44' }, { placeholder: 'Value' }]} addLabel="Add detail" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_200px]">
          <UploadField label="Large header image" name="hero.src" defaultValue={c.hero?.src ?? ''} />
          <Select label="Background colour behind it" name="hero.bg" options={ACCENTS} defaultValue={c.hero?.bg} />
        </div>
        <Field label="Header image description" name="hero.alt" defaultValue={c.hero?.alt} />
        <ListField label="Results band" hint="Big numbers in the navy band. Leave empty to hide the band." name="results" defaultValue={c.results} columns={[{ placeholder: 'e.g. 2/2', width: 'sm:w-48' }, { placeholder: 'e.g. Shows sold out' }]} addLabel="Add result" />
      </Section>

      <Section title="Section 1 — The challenge">
        <Field label="Section heading" name="labels.0" defaultValue={c.labels?.[0]} placeholder="The challenge" />
        <Field label="Lead paragraph" name="challenge.lead" defaultValue={c.challenge?.lead} textarea rows={3} />
        <Field label="More detail (optional)" name="challenge.body" defaultValue={c.challenge?.body} textarea rows={4} />
      </Section>

      <Section title="Section 2 — Our approach">
        <Field label="Section heading" name="labels.1" defaultValue={c.labels?.[1]} placeholder="Our approach" />
        <Field label="Lead paragraph" name="approach.lead" defaultValue={c.approach?.lead} textarea rows={3} />
        <ListField label="What we did (cards)" name="tactics" defaultValue={c.approach?.tactics} columns={[{ placeholder: 'Title', width: 'sm:w-56' }, { placeholder: 'Short description' }]} addLabel="Add card" />
      </Section>

      <Section title="Image & quote">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_200px]">
          <UploadField label="Supporting image" name="gallery.src" defaultValue={c.gallery?.src ?? ''} hint="Leave empty to hide this row." />
          <Select label="Background colour" name="gallery.bg" options={ACCENTS} defaultValue={c.gallery?.bg} />
        </div>
        <Field label="Image description" name="gallery.alt" defaultValue={c.gallery?.alt} />
        <Select label="Client quote beside it" name="quoteFrom" options={[['', '— No quote: show a headline stat instead —'], ...authors.map((a) => [a, a])]} defaultValue={c.quoteFrom} hint="Quotes come from the Testimonials section." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_minmax(0,1fr)]">
          <Field label="Headline stat" name="highlight.0" defaultValue={c.highlight?.[0]} placeholder="e.g. 27%" />
          <Field label="Stat description" name="highlight.1" defaultValue={c.highlight?.[1]} placeholder="e.g. more website traffic" />
        </div>
      </Section>

      <Section title="Section 3 — The impact">
        <Field label="Section heading" name="labels.2" defaultValue={c.labels?.[2]} placeholder="The impact" />
        <Field label="Lead paragraph" name="impact.lead" defaultValue={c.impact?.lead} textarea rows={2} />
        <ListField label="Outcomes" name="impactItems" defaultValue={c.impact?.items} columns={[{ placeholder: 'Outcome', width: 'sm:w-64' }, { placeholder: 'Detail (optional)', optional: true }]} addLabel="Add outcome" />
      </Section>

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-4 backdrop-blur md:-mx-8 md:px-8">
        <Link href="/admin/works" className="text-[14px] font-medium text-slate hover:text-ink">← All works</Link>
        <div className="flex items-center gap-3">
          {c.id && c.published && (
            <a href={`/projects/${c.slug}`} target="_blank" rel="noreferrer" className="rounded-full border border-line px-5 py-3 text-[14px] font-medium text-ink">
              View on site ↗
            </a>
          )}
          <SaveButton>{c.id ? 'Save changes' : 'Create case study'}</SaveButton>
        </div>
      </div>
    </form>
  )
}
