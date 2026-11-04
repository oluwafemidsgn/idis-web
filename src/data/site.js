const aiCollage = '/assets/human-lead/collage.webp'
const aiCollageSm = '/assets/human-lead/collage-sm.webp'
const strategyGrowth = '/assets/services/strategy-growth.webp'
const strategyGrowthSm = '/assets/services/strategy-growth-sm.webp'
const brandCreative = '/assets/services/brand-creative.webp'
const brandCreativeSm = '/assets/services/brand-creative-sm.webp'
const digitalExperience = '/assets/services/digital-experience.webp'
const digitalExperienceSm = '/assets/services/digital-experience-sm.webp'
const socialImg = '/assets/projects/awo-tickets.webp'
const socialImgSm = '/assets/projects/awo-tickets-sm.webp'
const seoImg = '/assets/how-we-work/discover.webp'
const seoImgSm = '/assets/how-we-work/discover-sm.webp'
const ppcImg = '/assets/how-we-work/define.webp'
const ppcImgSm = '/assets/how-we-work/define-sm.webp'
const emailImg = '/assets/services/email.webp'
const emailImgSm = '/assets/services/email-sm.webp'
const brandingImg = '/assets/services/branding.webp'
const brandingImgSm = '/assets/services/branding-sm.webp'
const analyticsImg = '/assets/how-we-work/measure.webp'
const analyticsImgSm = '/assets/how-we-work/measure-sm.webp'
/**
 * Static site content (navigation, contact details, services). Blog posts,
 * Works & Campaigns case studies and testimonials live in the database and
 * are managed in /admin.
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

export const TESTIMONIALS_TITLE = 'What our Clients are Saying'
