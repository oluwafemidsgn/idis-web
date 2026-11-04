import { notFound } from 'next/navigation'
import CaseStudy from '@/views/CaseStudy'
import { getCaseStudyBySlug, listCaseStudies, listTestimonials } from '@/lib/content'

export async function generateMetadata({ params }) {
  const cs = await getCaseStudyBySlug((await params).slug)
  return cs ? { title: `${cs.nav || cs.client} — Works & Campaigns`, description: cs.card.desc } : {}
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const [cs, all, testimonials] = await Promise.all([getCaseStudyBySlug(slug), listCaseStudies(), listTestimonials()])
  if (!cs) notFound()
  const i = all.findIndex((c) => c.slug === cs.slug)
  const next = all.length > 1 ? all[(i + 1) % all.length] : null
  const quote = cs.quoteFrom ? (testimonials.find((t) => t.author === cs.quoteFrom) ?? null) : null
  return <CaseStudy cs={cs} next={next} quote={quote} />
}
