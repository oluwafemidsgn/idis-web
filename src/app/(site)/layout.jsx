import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StickyCta from '@/components/StickyCta'
import { listCaseStudies } from '@/lib/content'

// Content comes from the database and changes from /admin, so render per request.
export const dynamic = 'force-dynamic'

export default async function SiteLayout({ children }) {
  const works = (await listCaseStudies()).map((c) => ({ slug: c.slug, nav: c.nav || c.client, tags: c.tags.length ? c.tags : [['', 'bg-sun']] }))
  return (
    <div className="w-full overflow-x-clip bg-paper">
      <Nav works={works} />
      {children}
      <div className="pb-[clamp(24px,3vw,52px)]">
        <Footer works={works} />
      </div>
      <StickyCta />
    </div>
  )
}
