import { listTestimonials } from '@/lib/content'
import { deleteTestimonialAction, moveTestimonialAction } from '../../actions'
import { ConfirmButton, Section } from '../../_components/fields'
import TestimonialForm from '../../_components/TestimonialForm'

export default async function TestimonialsAdmin() {
  const items = await listTestimonials({ all: true })
  return (
    <div className="flex max-w-[900px] flex-col gap-6 pb-12">
      <div>
        <h1 className="text-h3 font-semibold">Testimonials</h1>
        <p className="text-body text-slate">Shown in “What our Clients are Saying” on the homepage and the Projects page, in this order. Case studies can show one beside their image.</p>
      </div>
      {items.map((t, i) => (
        <Section key={t.id} title={t.author}>
          <TestimonialForm t={t} />
          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
            {[
              [-1, 'Move up', i === 0],
              [1, 'Move down', i === items.length - 1],
            ].map(([dir, label, disabled]) => (
              <form key={dir} action={moveTestimonialAction}>
                <input type="hidden" name="id" value={t.id} />
                <input type="hidden" name="dir" value={dir} />
                <button type="submit" disabled={disabled} className="rounded-full border border-line px-4 py-2 text-[13px] font-medium text-ink disabled:opacity-30">
                  {label}
                </button>
              </form>
            ))}
            <form action={deleteTestimonialAction} className="ml-auto">
              <input type="hidden" name="id" value={t.id} />
              <ConfirmButton message={`Delete the ${t.author} testimonial?`}>Delete</ConfirmButton>
            </form>
          </div>
        </Section>
      ))}
      <div id="new" className="scroll-mt-6">
        <Section title="Add a testimonial">
          <TestimonialForm />
        </Section>
      </div>
    </div>
  )
}
