import { CASE_STUDIES } from './caseStudies'
import POSTS from './posts.json'

/**
 * First-run content for an empty database: the five Works & Campaigns case
 * studies, the four client testimonials and the 43 articles imported from the
 * previous idisdigital.co blog. Seeding only fills empty tables, so it never
 * overwrites anything edited in /admin.
 */

// Card copy shown on the homepage "Works & Campaign" grid and the Projects page.
const CARDS = {
  afrilabs: {
    label: 'AFRILABS',
    title: "Building a stronger visual presence for one of Africa's leading innovation networks.",
    desc: 'We worked with AfriLabs across its programmes, partnerships and Annual Gathering 2024 to develop a more consistent and compelling visual presence.',
    results: [['150+', 'Custom visual assets'], ['AAG 2024', 'Event branding and campaign creative']],
    image: '/assets/projects/afrilabs.webp',
    filterTag: 'Brand',
  },
  'awo-the-musical': {
    label: 'DUKE OF SHOMOLU PRODUCTIONS',
    title: 'Taking African theatre to audiences across Nigeria and the UK.',
    desc: 'Through integrated digital campaigns, content, event branding and targeted promotion, we supported multiple productions across two markets.',
    results: [['8 Productions', 'Promoted across Nigeria and the UK'], ['40%', 'Increase in social media reach']],
    image: '/assets/projects/duke-of-shomolu.webp',
    filterTag: 'Campaigns',
  },
  'sats-app': {
    label: 'SATS APP',
    title: 'Turning data into stronger fintech growth.',
    desc: "We combined audit insights, targeted advertising, SEO, retention strategy and thought leadership to strengthen Sats App's digital presence and attract higher-quality opportunities.",
    results: [['30%', 'Increase in high-quality leads'], ['Data-led', 'Continuous optimisation']],
    image: '/assets/projects/sats-app.webp',
    filterTag: 'Performance',
  },
  africacompare: {
    label: 'AFRICACOMPARE',
    title: 'Growing a financial platform through search, content and community',
    desc: "We brought SEO, content, email and financial-literacy campaigns together to increase discoverability and strengthen AfricaCompare's position as a useful financial resource.",
    results: [['27%', 'Increase in website traffic'], ['Integrated', 'SEO, content, email and community']],
    image: '/assets/projects/africacompare.webp',
    filterTag: 'Digital',
  },
  'mothers-of-chibok': {
    label: 'MOTHERS OF CHIBOK',
    title: 'Mothers of Chibok × Idis Digital',
    desc: 'Through digital marketing and website development, we helped build awareness for the documentary and extend its reach beyond the premiere.',
    results: [['Digital Promotion', 'Building awareness and audience engagement'], ['Website Development', "Strengthening the documentary's online presence"]],
    image: '/assets/projects/mothers-of-chibok.webp',
    filterTag: 'Digital',
  },
}

export const SEED_CASE_STUDIES = CASE_STUDIES.map((cs) => {
  // Drop the responsive -sm variants; uploaded images are single URLs.
  const strip = ({ sm, ...img }) => img
  return { ...cs, hero: strip(cs.hero), gallery: strip(cs.gallery), card: { cta: 'View case study', ...CARDS[cs.slug] } }
})

export const SEED_TESTIMONIALS = [
  {
    author: 'Sats App',
    accent: 'bg-mint',
    quote: '“Idis Digital brought a tailored, results-driven approach to our digital presence. Their professionalism, quality of work, and commitment to our goals made them a valuable partner.”',
  },
  {
    author: 'AfriLabs',
    accent: 'bg-sun',
    quote: '“Working with Idis felt seamless from the start. They delivered on-brand graphics and videos for AAG 2024 with impressive turnaround times, while remaining collaborative and responsive to feedback. They understood our vision and brought it to life beautifully.”',
  },
  {
    author: 'Duke of Shomolu Foundation',
    accent: 'bg-pink',
    quote: '“Idis’ dedication, expertise, and attention to detail made a real difference throughout the project. Their responsiveness and quality of work were outstanding, and we sincerely appreciate the value they brought to the partnership.”',
  },
  {
    author: 'Mothers of Chibok',
    accent: 'bg-lime',
    quote: '“Idis digital provided a thoughtful and effective approach to our social media management and influencer partnerships. Their tailored service and quality of work made a meaningful difference to our digital presence.”',
  },
]

export const SEED_POSTS = POSTS
