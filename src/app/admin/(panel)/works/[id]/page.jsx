import { notFound } from 'next/navigation'
import { getCaseStudyById, listTestimonials } from '@/lib/content'
import { deleteCaseStudyAction } from '../../../actions'
import { ConfirmButton } from '../../../_components/fields'
import CaseStudyForm from '../../../_components/CaseStudyForm'

export default async function EditWork({ params, searchParams }) {
  const cs = await getCaseStudyById(Number((await params).id))
  if (!cs) notFound()
  const saved = (await searchParams)?.saved === '1'
  const authors = (await listTestimonials({ all: true })).map((t) => t.author)
  return (
    <div className="flex max-w-[1000px] flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-h3 font-semibold">{cs.nav || cs.client}</h1>
        <form action={deleteCaseStudyAction}>
          <input type="hidden" name="id" value={cs.id} />
          <ConfirmButton message={`Delete the ${cs.client} case study? This can’t be undone.`}>Delete case study</ConfirmButton>
        </form>
      </div>
      <CaseStudyForm key={cs.id} cs={cs} authors={authors} saved={saved} />
    </div>
  )
}
