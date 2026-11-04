import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/content'
import { deletePostAction } from '../../../actions'
import { ConfirmButton } from '../../../_components/fields'
import PostForm from '../../../_components/PostForm'

export default async function EditPost({ params, searchParams }) {
  const post = await getPostById(Number((await params).id))
  if (!post) notFound()
  const saved = (await searchParams)?.saved === '1'
  return (
    <div className="flex max-w-[1300px] flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-h3 font-semibold">Edit post</h1>
        <form action={deletePostAction}>
          <input type="hidden" name="id" value={post.id} />
          <ConfirmButton message={`Delete “${post.title}”? This can’t be undone.`}>Delete post</ConfirmButton>
        </form>
      </div>
      <PostForm key={post.id} post={post} saved={saved} />
    </div>
  )
}
