import PostForm from '../../../_components/PostForm'

export default function NewPost() {
  return (
    <div className="flex max-w-[1300px] flex-col gap-6">
      <h1 className="text-h3 font-semibold">New blog post</h1>
      <PostForm />
    </div>
  )
}
