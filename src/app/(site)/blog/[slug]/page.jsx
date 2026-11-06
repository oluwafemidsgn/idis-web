import { notFound } from 'next/navigation'
import BlogPost from '@/views/BlogPost'
import { getPostBySlug, listPosts } from '@/lib/content'
import { renderMarkdown } from '@/lib/markdown'
import { getCounts } from '@/lib/analytics'

export async function generateMetadata({ params }) {
  const post = await getPostBySlug((await params).slug)
  return post ? { title: post.title, description: post.excerpt, openGraph: post.cover ? { images: [post.cover] } : undefined } : {}
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const { html, toc } = renderMarkdown(post.body)
  const counts = await getCounts('post', post.slug)
  const others = (await listPosts()).filter((p) => p.slug !== post.slug)
  // Same category first, then the newest of the rest.
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)]
    .slice(0, 3)
    .map(({ body, ...p }) => p)
  return <BlogPost post={post} html={html} toc={toc} related={related} counts={counts} />
}
