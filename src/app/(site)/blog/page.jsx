import Blog from '@/views/Blog'
import { listPosts } from '@/lib/content'
import { getCountsMap } from '@/lib/analytics'

export const metadata = { title: 'Blog' }

export default async function BlogPage() {
  const [posts, counts] = await Promise.all([listPosts(), getCountsMap('post')])
  // Only what the listing needs — bodies stay on the post pages.
  return <Blog posts={posts.map(({ body, ...p }) => ({ ...p, ...(counts[p.slug] ?? { views: 0, likes: 0 }) }))} />
}
