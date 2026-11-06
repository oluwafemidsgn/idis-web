import Projects from '@/views/Projects'
import { listCaseStudies, listTestimonials } from '@/lib/content'
import { getCountsMap } from '@/lib/analytics'

export const metadata = { title: 'Works & Campaigns' }

export default async function ProjectsPage() {
  const [items, testimonials, counts] = await Promise.all([listCaseStudies(), listTestimonials(), getCountsMap('case')])
  return <Projects items={items.map((c) => ({ ...c, stats: counts[c.slug] ?? { views: 0, likes: 0 } }))} testimonials={testimonials} />
}
