import Projects from '@/views/Projects'
import { listCaseStudies, listTestimonials } from '@/lib/content'

export const metadata = { title: 'Works & Campaigns' }

export default async function ProjectsPage() {
  const [items, testimonials] = await Promise.all([listCaseStudies(), listTestimonials()])
  return <Projects items={items} testimonials={testimonials} />
}
