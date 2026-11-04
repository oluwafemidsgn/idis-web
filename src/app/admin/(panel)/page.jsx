import Link from 'next/link'
import { listCaseStudies, listPosts, listTestimonials } from '@/lib/content'
import { logoutAction } from '../actions'

export default async function Overview() {
  const [posts, works, testimonials] = await Promise.all([listPosts({ all: true }), listCaseStudies({ all: true }), listTestimonials({ all: true })])
  const cards = [
    ['Blog posts', posts.filter((p) => p.published).length, `${posts.filter((p) => !p.published).length} drafts`, '/admin/blog', '/admin/blog/new', 'New post', 'bg-sun'],
    ['Works & Campaigns', works.filter((w) => w.published).length, `${works.filter((w) => !w.published).length} hidden`, '/admin/works', '/admin/works/new', 'New case study', 'bg-pink'],
    ['Testimonials', testimonials.filter((t) => t.published).length, `${testimonials.filter((t) => !t.published).length} hidden`, '/admin/testimonials', '/admin/testimonials#new', 'Add testimonial', 'bg-mint'],
  ]
  return (
    <div className="flex max-w-[1100px] flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-h3 font-semibold">Welcome back</h1>
        <p className="text-body text-slate">Changes you save here show on the website straight away.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map(([label, n, sub, href, newHref, newLabel, bg]) => (
          <div key={label} className={`flex flex-col gap-6 rounded-[24px] p-6 ${bg}`}>
            <Link href={href} className="flex flex-col gap-1">
              <span className="text-[15px] font-medium text-ink/70">{label}</span>
              <span className="text-display-sm font-semibold leading-none">{n}</span>
              <span className="text-[14px] text-ink/70">live · {sub}</span>
            </Link>
            <Link href={newHref} className="w-fit rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white">
              + {newLabel}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-[24px] border border-line bg-white p-6">
        <h2 className="text-[19px] font-semibold">Latest blog posts</h2>
        <ul className="divide-y divide-line">
          {posts.slice(0, 5).map((p) => (
            <li key={p.id}>
              <Link href={`/admin/blog/${p.id}`} className="flex items-center justify-between gap-4 py-3 hover:text-brand">
                <span className="truncate text-[15px] font-medium">{p.title}</span>
                <span className="shrink-0 text-[13px] text-slate">{p.published ? p.publishedAt : 'Draft'}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <form action={logoutAction} className="lg:hidden">
        <button type="submit" className="text-[14px] font-medium text-slate">Sign out</button>
      </form>
    </div>
  )
}
