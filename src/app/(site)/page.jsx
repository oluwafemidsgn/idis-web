import Home from '@/views/Home'
import { listCaseStudies, listPosts, listTestimonials } from '@/lib/content'

export default async function HomePage() {
  const [works, testimonials, posts] = await Promise.all([listCaseStudies(), listTestimonials(), listPosts()])
  return <Home works={works} testimonials={testimonials} posts={posts.slice(0, 3)} />
}
