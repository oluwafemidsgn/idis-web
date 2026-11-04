import Blog from '@/views/Blog'
import { listPosts } from '@/lib/content'

export const metadata = { title: 'Blog' }

export default async function BlogPage() {
  const posts = await listPosts()
  // Only what the listing needs — bodies stay on the post pages.
  return <Blog posts={posts.map(({ body, ...p }) => p)} />
}
