import strategyGrowth from '../assets/services/strategy-growth.webp'
import strategyGrowthSm from '../assets/services/strategy-growth-sm.webp'
import brandCreative from '../assets/services/brand-creative.webp'
import brandCreativeSm from '../assets/services/brand-creative-sm.webp'
import digitalExperience from '../assets/services/digital-experience.webp'
import digitalExperienceSm from '../assets/services/digital-experience-sm.webp'
import performanceAi from '../assets/services/performance-ai.webp'
import performanceAiSm from '../assets/services/performance-ai-sm.webp'
import afrilabs from '../assets/projects/afrilabs.webp'
import afrilabsSm from '../assets/projects/afrilabs-sm.webp'
import duke from '../assets/projects/duke-of-shomolu.webp'
import dukeSm from '../assets/projects/duke-of-shomolu-sm.webp'
import sats from '../assets/projects/sats-app.webp'
import satsSm from '../assets/projects/sats-app-sm.webp'
import africaCompare from '../assets/projects/africacompare.webp'
import africaCompareSm from '../assets/projects/africacompare-sm.webp'

/**
 * Shared site content. Copy follows the pen.dev designs
 * ("IDIS — Services V2", "IDIS — Projects", "IDIS — Blog", …).
 */

export const EMAIL = 'info@idisdigital.com'
export const BOOKING_URL = 'https://calendly.com/idisdigitalservices/30min'
export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/idisdigitalmarketing/' },
  { label: 'X (Twitter)', href: 'https://twitter.com/idisdigital' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/idis-digital-services-b31a27271' },
]

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resources', to: '/blog' },
]

// Accent colour per capability, in order (pills, tiles, check bullets).
export const SERVICES = [
  {
    slug: 'strategy-growth',
    num: '01',
    title: 'Strategy & Growth',
    accent: 'bg-sun',
    image: strategyGrowth,
    imageSm: strategyGrowthSm,
    tagline: "Know where you're going before you spend a cent getting there.",
    list: [
      'Marketing strategy',
      'Brand & market positioning',
      'Audience & competitor research',
      'Campaign planning',
      'Marketing audits',
      'Go-to-market launches',
    ],
    cta: 'Start with strategy',
  },
  {
    slug: 'brand-creative',
    num: '02',
    title: 'Brand & Creative',
    accent: 'bg-pink',
    image: brandCreative,
    imageSm: brandCreativeSm,
    tagline: 'Be the brand people remember, recommend and trust.',
    list: [
      'Brand strategy & messaging',
      'Visual identity systems',
      'Campaign creative',
      'Content strategy & production',
      'Graphic & motion design',
      'Event & activation branding',
    ],
    cta: 'Build your brand',
  },
  {
    slug: 'digital-experience',
    num: '03',
    title: 'Digital & Experience',
    accent: 'bg-lime',
    image: digitalExperience,
    imageSm: digitalExperienceSm,
    tagline: 'Turn every click into a step closer to yes.',
    list: [
      'Website strategy & build',
      'Search engine optimisation',
      'Social media management',
      'Email & lifecycle marketing',
      'Community building',
      'Experience optimisation',
    ],
    cta: 'Upgrade your digital',
  },
  {
    slug: 'performance-ai',
    num: '04',
    title: 'Performance & AI',
    accent: 'bg-mint',
    image: performanceAi,
    imageSm: performanceAiSm,
    tagline: 'Spend smarter. Learn faster. Grow on purpose.',
    list: [
      'Paid media & PPC',
      'Performance marketing',
      'Analytics & reporting',
      'Conversion optimisation',
      'Marketing automation',
      'AI-enabled workflows',
    ],
    cta: 'Boost performance',
  },
]

export const PROJECTS = [
  {
    slug: 'afrilabs',
    client: 'AfriLabs',
    tag: 'Brand & event creative',
    title: "Giving Africa's biggest innovation network a look as bold as its mission.",
    desc: 'We worked with AfriLabs across its programmes, partnerships and Annual Gathering 2024 to develop a more consistent and compelling visual presence.',
    results: [
      ['150+', 'Custom visual assets'],
      ['AAG 2024', 'Event branding & campaign'],
    ],
    image: afrilabs,
    imageSm: afrilabsSm,
  },
  {
    slug: 'awo-the-musical',
    client: 'Duke of Shomolu Productions',
    tag: 'Campaign',
    title: "Selling out London's Shaw Theatre for Awo the Musical.",
    desc: 'An integrated launch campaign that took Nigerian theatre to a global audience — and filled every seat.',
    results: [
      ['Sold out', "Both nights at London's Shaw Theatre"],
      ['40%', 'Increase in social media reach'],
    ],
    image: duke,
    imageSm: dukeSm,
  },
  {
    slug: 'sats-app',
    client: 'Sats App',
    tag: 'Performance',
    title: 'Turning data into higher-quality fintech growth.',
    desc: 'Audit insights, targeted ads, SEO and thought leadership — working as one engine to attract better leads.',
    results: [
      ['30%', 'Increase in high-quality leads'],
      ['Data-led', 'Real-time campaign optimisation'],
    ],
    image: sats,
    imageSm: satsSm,
  },
  {
    slug: 'africacompare',
    client: 'AfricaCompare',
    tag: 'Digital',
    title: 'Building a trusted financial resource through search, content and community.',
    desc: 'SEO, email and financial-literacy workshops that made AfricaCompare easier to find — and easier to trust.',
    results: [
      ['27%', 'Increase in website traffic'],
      ['Integrated', 'SEO, content, email & community'],
    ],
    image: africaCompare,
    imageSm: africaCompareSm,
  },
]

// Only Awo the Musical has a full case-study page so far.
export const CASE_STUDY_SLUG = 'awo-the-musical'
export const projectHref = (slug) => (slug === CASE_STUDY_SLUG ? `/projects/${slug}` : '/contact')
export const projectCta = (slug) => (slug === CASE_STUDY_SLUG ? 'View case study →' : 'Start a similar project →')

export const TESTIMONIALS = [
  {
    author: 'AfriLabs',
    accent: 'bg-sun',
    quote:
      '“Working with IDIS felt seamless from the start. They balanced efficiency, professionalism and adaptability, delivering on-brand graphics and videos for AAG 2024 with impressive turnaround times while remaining collaborative and responsive to feedback.”',
  },
  {
    author: 'Mothers of Chibok',
    accent: 'bg-pink',
    quote:
      '“IDIS Digital played an important role in supporting the cinema release of Mothers of Chibok. Their team brought a thoughtful, well-executed approach that helped us build awareness and connect the film with the right audience.”',
  },
  {
    author: 'Duke of Shomolu Foundation',
    accent: 'bg-mint',
    quote:
      "“IDIS' dedication, expertise and attention to detail made a real difference throughout the project. Their responsiveness and quality of work were outstanding.”",
  },
]

export const FEATURED_POST_SLUG = 'ai-is-a-production-accelerator'

export const POSTS = [
  { date: 'Sep 7, 2026', title: 'Trust is the new conversion rate.', cat: 'Strategy', mins: 5, dot: 'bg-sun' },
  { date: 'Aug 11, 2026', title: '3 marketing rules to break before the year ends', cat: 'Strategy', mins: 4, dot: 'bg-pink' },
  { date: 'Jul 20, 2026', title: 'From social listening to community stewardship', cat: 'Community', mins: 6, dot: 'bg-mint' },
  { date: 'Jun 16, 2026', title: 'The attention economy is expensive. Spend it wisely.', cat: 'Performance', mins: 5, dot: 'bg-coral' },
  {
    date: 'May 15, 2026',
    title: 'AI is a production accelerator. Your strategy still needs a human.',
    cat: 'AI & Tech',
    mins: 6,
    dot: 'bg-lime',
    slug: FEATURED_POST_SLUG,
  },
  { date: 'Apr 8, 2026', title: 'Moving from generative novelty to strategic asset', cat: 'AI & Tech', mins: 5, dot: 'bg-grape' },
  { date: 'Feb 9, 2026', title: 'The silent revenue killer: the true cost of inaction', cat: 'Strategy', mins: 6, dot: 'bg-sun' },
  { date: 'Sep 23, 2025', title: "Your brand isn't your logo. It's your operating system.", cat: 'Brand', mins: 7, dot: 'bg-brand' },
  { date: 'Sep 10, 2025', title: 'Stop treating media spend like a vending machine', cat: 'Performance', mins: 5, dot: 'bg-mint' },
  { date: 'Jul 16, 2025', title: 'The role of social proof in building community', cat: 'Community', mins: 5, dot: 'bg-pink' },
]

// Every listed post opens the one written-up article until the rest are published.
export const postHref = () => `/blog/${FEATURED_POST_SLUG}`
