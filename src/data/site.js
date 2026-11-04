import aiCollage from '../assets/human-lead/collage.webp'
import aiCollageSm from '../assets/human-lead/collage-sm.webp'
import strategyGrowth from '../assets/services/strategy-growth.webp'
import strategyGrowthSm from '../assets/services/strategy-growth-sm.webp'
import brandCreative from '../assets/services/brand-creative.webp'
import brandCreativeSm from '../assets/services/brand-creative-sm.webp'
import digitalExperience from '../assets/services/digital-experience.webp'
import digitalExperienceSm from '../assets/services/digital-experience-sm.webp'
import socialImg from '../assets/projects/awo-tickets.webp'
import socialImgSm from '../assets/projects/awo-tickets-sm.webp'
import seoImg from '../assets/how-we-work/discover.webp'
import seoImgSm from '../assets/how-we-work/discover-sm.webp'
import ppcImg from '../assets/how-we-work/define.webp'
import ppcImgSm from '../assets/how-we-work/define-sm.webp'
import emailImg from '../assets/services/email.webp'
import emailImgSm from '../assets/services/email-sm.webp'
import brandingImg from '../assets/services/branding.webp'
import brandingImgSm from '../assets/services/branding-sm.webp'
import analyticsImg from '../assets/how-we-work/measure.webp'
import analyticsImgSm from '../assets/how-we-work/measure-sm.webp'
import afrilabs from '../assets/projects/afrilabs.webp'
import afrilabsSm from '../assets/projects/afrilabs-sm.webp'
import duke from '../assets/projects/duke-of-shomolu.webp'
import dukeSm from '../assets/projects/duke-of-shomolu-sm.webp'
import sats from '../assets/projects/sats-app.webp'
import satsSm from '../assets/projects/sats-app-sm.webp'
import africaCompare from '../assets/projects/africacompare.webp'
import africaCompareSm from '../assets/projects/africacompare-sm.webp'
import chibok from '../assets/projects/mothers-of-chibok.webp'
import chibokSm from '../assets/projects/mothers-of-chibok-sm.webp'

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

// "Projects" also opens a dropdown of every Works & Campaigns case study (see Nav).
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects', withCaseStudies: true },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

// The ten services, presented individually (client feedback, Nov 2026).
// `accent` colours the number badge and check bullets.
const svc = (slug, title, desc, accent, image, imageSm) => ({ slug, title, desc, accent, image, imageSm })
export const SERVICES = [
  svc('ai-powered-marketing', 'AI-Powered Marketing', 'Smarter marketing powered by AI and guided by human expertise. We use intelligent tools, automation, and data-driven insights to improve how brands plan, execute, and optimise their marketing.', 'bg-lime', aiCollage, aiCollageSm),
  svc('digital-marketing-strategy', 'Digital Marketing Strategy', 'Clear, tailored marketing strategies built around your business objectives, target audience, and growth goals.', 'bg-sun', strategyGrowth, strategyGrowthSm),
  svc('website-development', 'Website Development', 'High-performing, user-friendly websites designed to strengthen your online presence, communicate your value, and turn visitors into customers.', 'bg-mint', digitalExperience, digitalExperienceSm),
  svc('content-creation', 'Content Creation', 'Strategic content that captures attention, communicates your message, and gives your audience a reason to engage with your brand.', 'bg-pink', brandCreative, brandCreativeSm),
  svc('social-media-marketing', 'Social Media Marketing', 'Purpose-driven social media management that builds your brand, grows your audience, and creates opportunities for engagement and conversion.', 'bg-coral', socialImg, socialImgSm),
  svc('seo', 'Search Engine Optimisation (SEO)', 'Improve your visibility on search engines, attract relevant traffic, and make it easier for potential customers to find your business.', 'bg-sun', seoImg, seoImgSm),
  svc('ppc-advertising', 'Pay-Per-Click (PPC) Advertising', 'Targeted paid campaigns designed to reach the right audience, maximise your advertising budget, and generate measurable results.', 'bg-mint', ppcImg, ppcImgSm),
  svc('email-marketing', 'Email Marketing', 'Strategic email campaigns that help you nurture relationships, engage your audience, and turn existing contacts into repeat customers.', 'bg-pink', emailImg, emailImgSm),
  svc('branding-graphic-design', 'Branding & Graphic Design', 'Thoughtful, consistent design that strengthens your brand identity and helps your business communicate with clarity and confidence.', 'bg-lime', brandingImg, brandingImgSm),
  svc('analytics-reporting', 'Analytics & Reporting', "Clear, actionable insights that show what's working, where opportunities exist, and how your marketing is contributing to business growth.", 'bg-coral', analyticsImg, analyticsImgSm),
].map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }))

export const SERVICES_EYEBROW = 'SERVICES WE OFFER'
export const SERVICES_TITLE = 'Everything Your Business Needs to Grow in a Digital-First World'

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
  {
    slug: 'mothers-of-chibok',
    client: 'Mothers of Chibok',
    tag: 'Digital',
    title: 'Mothers of Chibok × Idis Digital',
    desc: 'Through digital marketing and website development, we helped build awareness for the documentary and extend its reach beyond the premiere.',
    results: [
      ['Digital Promotion', 'Building awareness and audience engagement'],
      ['Website Development', "Strengthening the documentary's online presence"],
    ],
    cta: 'See more →',
    image: chibok,
    imageSm: chibokSm,
  },
]

// Every project has a case-study page at /projects/:slug (content in caseStudies.js).
export const projectHref = (slug) => `/projects/${slug}`
export const projectCta = (slug) => PROJECTS.find((p) => p.slug === slug)?.cta ?? 'View case study →'

export const TESTIMONIALS_TITLE = 'What our Clients are Saying'

export const TESTIMONIALS = [
  {
    author: 'Sats App',
    accent: 'bg-mint',
    quote:
      '“Idis Digital brought a tailored, results-driven approach to our digital presence. Their professionalism, quality of work, and commitment to our goals made them a valuable partner.”',
  },
  {
    author: 'AfriLabs',
    accent: 'bg-sun',
    quote:
      '“Working with Idis felt seamless from the start. They delivered on-brand graphics and videos for AAG 2024 with impressive turnaround times, while remaining collaborative and responsive to feedback. They understood our vision and brought it to life beautifully.”',
  },
  {
    author: 'Duke of Shomolu Foundation',
    accent: 'bg-pink',
    quote:
      '“Idis’ dedication, expertise, and attention to detail made a real difference throughout the project. Their responsiveness and quality of work were outstanding, and we sincerely appreciate the value they brought to the partnership.”',
  },
  {
    author: 'Mothers of Chibok',
    accent: 'bg-lime',
    quote:
      '“Idis digital provided a thoughtful and effective approach to our social media management and influencer partnerships. Their tailored service and quality of work made a meaningful difference to our digital presence.”',
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
