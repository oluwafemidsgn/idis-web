import { listTestimonials } from '@/lib/content'
import CaseStudyForm from '../../../_components/CaseStudyForm'

export default async function NewWork() {
  const authors = (await listTestimonials({ all: true })).map((t) => t.author)
  return (
    <div className="flex max-w-[1000px] flex-col gap-6">
      <div>
        <h1 className="text-h3 font-semibold">New case study</h1>
        <p className="text-body text-slate">New case studies start hidden — switch on “Published” when it’s ready.</p>
      </div>
      <CaseStudyForm authors={authors} />
    </div>
  )
}
