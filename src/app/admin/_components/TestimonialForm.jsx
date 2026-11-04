'use client'

import { useActionState } from 'react'
import { saveTestimonialAction } from '../actions'
import { ACCENTS, Field, Notice, SaveButton, Select, Toggle } from './fields'

export default function TestimonialForm({ t }) {
  const [state, action] = useActionState(saveTestimonialAction, null)
  const v = t ?? { published: true, accent: 'bg-sun' }
  return (
    <form action={action} key={t ? t.id : state?.at} className="flex flex-col gap-4">
      {t && <input type="hidden" name="id" value={t.id} />}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_200px]">
        <Field label="Client" name="author" defaultValue={v.author} required />
        <Select label="Avatar colour" name="accent" options={ACCENTS} defaultValue={v.accent} />
      </div>
      <Field label="Quote" name="quote" defaultValue={v.quote} textarea rows={4} required hint="Include the quote marks “ ” if you want them shown." />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Toggle label="Show on website" name="published" defaultChecked={v.published} />
        <SaveButton>{t ? 'Save' : 'Add testimonial'}</SaveButton>
      </div>
      <Notice state={state} />
    </form>
  )
}
