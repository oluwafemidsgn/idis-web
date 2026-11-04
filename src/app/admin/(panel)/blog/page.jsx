import Link from 'next/link'
import { listPosts } from '@/lib/content'
import PostList from './post-list'

export default async function BlogAdmin() {
  const posts = (await listPosts({ all: true })).map(({ body, ...p }) => p)
  return (
    <div className="flex max-w-[1100px] flex-col gap-6 pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-h3 font-semibold">Blog</h1>
          <p className="text-body text-slate">{posts.length} posts · featured post shows first on the blog page</p>
        </div>
        <Link href="/admin/blog/new" className="rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-white">
          + New post
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  )
}
