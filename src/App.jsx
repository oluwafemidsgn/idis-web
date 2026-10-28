import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import CaseStudy from './pages/CaseStudy'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { caseStudyBySlug } from './data/caseStudies'

const TITLES = {
  '/': 'IDIS Digital — Build a marketing system that moves your business forward',
  '/about': 'About — IDIS Digital',
  '/services': 'Services — IDIS Digital',
  '/projects': 'Projects — IDIS Digital',
  '/blog': 'Journal — IDIS Digital',
  '/contact': 'Contact — IDIS Digital',
}

/** Jump to the top and update the tab title on every route change. */
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title =
      TITLES[pathname] ??
      (pathname.startsWith('/projects/')
        ? `${caseStudyBySlug(pathname.split('/')[2])?.nav ?? 'Case study'} — Case Study — IDIS Digital`
        : pathname.startsWith('/blog/')
          ? 'AI is a production accelerator — IDIS Digital'
          : 'IDIS Digital')
    // "/services#brand-creative" lands on that section; anything else starts at the top.
    const target = hash && document.getElementById(hash.slice(1))
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }))
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="w-full overflow-x-clip bg-paper">
      <RouteEffects />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<CaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className="pb-[clamp(24px,3vw,52px)]">
        <Footer />
      </div>
    </div>
  )
}
