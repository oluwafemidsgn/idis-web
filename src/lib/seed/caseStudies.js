const afrilabs = '/assets/projects/afrilabs.webp'
const afrilabsSm = '/assets/projects/afrilabs-sm.webp'
const awoHero = '/assets/projects/awo-hero.webp'
const awoHeroSm = '/assets/projects/awo-hero-sm.webp'
const awoTickets = '/assets/projects/awo-tickets.webp'
const awoTicketsSm = '/assets/projects/awo-tickets-sm.webp'
const sats = '/assets/projects/sats-app.webp'
const satsSm = '/assets/projects/sats-app-sm.webp'
const africaCompare = '/assets/projects/africacompare.webp'
const africaCompareSm = '/assets/projects/africacompare-sm.webp'
const chibok = '/assets/projects/mothers-of-chibok.webp'
const chibokSm = '/assets/projects/mothers-of-chibok-sm.webp'
const socialImg = '/assets/projects/awo-tickets.webp'
const socialImgSm = '/assets/projects/awo-tickets-sm.webp'
const brandCreative = '/assets/services/brand-creative.webp'
const brandCreativeSm = '/assets/services/brand-creative-sm.webp'
const performanceAi = '/assets/services/performance-ai.webp'
const performanceAiSm = '/assets/services/performance-ai-sm.webp'
const digitalExperience = '/assets/services/digital-experience.webp'
const digitalExperienceSm = '/assets/services/digital-experience-sm.webp'
/**
 * Seed content for the Works & Campaigns case studies (see seed/index.js);
 * after first run they live in the database and are edited in /admin. The layout follows
 * "IDIS — Case Study" layout in the pen.dev file; facts come from
 * the client case studies on the previous idisdigital.co site.
 *
 * `quoteFrom` names a client testimonial; studies without one show
 * `highlight` (a headline stat) in the coloured card instead. `results`
 * (the stats band) and impact-item descriptions are optional, and `labels`
 * can rename the three section headings.
 */
export const CASE_STUDIES = [
  {
    slug: 'afrilabs',
    client: 'AfriLabs',
    nav: 'AfriLabs',
    tags: [
      ['Branding & Graphic Design', 'bg-pink'],
      ['Events', 'bg-sun'],
      ['Pan-African', 'bg-mint'],
    ],
    title: "Giving Africa's biggest innovation network a look as bold as its mission.",
    meta: [
      ['Client', 'AfriLabs'],
      ['Industry', 'Innovation & technology'],
      ['Services', 'Brand strategy, visual design, event branding, social content'],
      ['Markets', 'Pan-African'],
    ],
    hero: { src: afrilabs, sm: afrilabsSm, alt: 'Collage of a hand holding a lightbulb above a crowd at a tech conference', bg: 'bg-sun' },
    results: [
      ['150+', 'Custom visual assets created'],
      ['AAG 2024', 'Annual Gathering branded end to end'],
      ['1', 'Consistent visual system across programmes'],
    ],
    challenge: {
      lead: 'AfriLabs connects hundreds of innovation hubs across the continent. Its work was growing faster than its visual identity could keep up.',
      body: 'Programmes, partnerships and events each looked a little different. Ahead of its Annual Gathering 2024, AfriLabs needed a stronger, more consistent visual presence — one that matched its standing with governments, institutions and the hubs it serves.',
    },
    approach: {
      lead: 'We started with what AfriLabs stands for, then built a visual language every team could use with confidence.',
      tactics: [
        ['Mission first', 'We sharpened the mission and value proposition so every visual had a clear message behind it.'],
        ['A flexible visual system', 'Colour, type and layout rules that work across programmes, partners and channels.'],
        ['Annual Gathering 2024', 'Full event branding — from announcement graphics to on-site visuals and videos.'],
        ['Content at speed', 'On-brand social content delivered with fast turnaround while the event unfolded.'],
      ],
    },
    gallery: { src: brandCreative, sm: brandCreativeSm, alt: 'Halftone collage of a hand drawing with a pen', bg: 'bg-blush-200' },
    quoteFrom: 'AfriLabs',
    impact: {
      lead: 'AfriLabs now shows up as one confident brand — wherever its community meets it.',
      items: [
        ['A clear leader', 'Positioned as a leading voice in African tech ecosystems.'],
        ['Stronger engagement', 'A more consistent brand drove more community interaction.'],
        ['Wider visibility', 'Greater reach among government-affiliated tech hubs such as RLabs.'],
        ['Fast, reliable delivery', '150+ assets produced on tight event timelines.'],
      ],
    },
  },
  {
    slug: 'duke-of-shomolu-foundation',
    client: 'Duke of Shomolu Foundation',
    nav: 'Duke of Shomolu Foundation',
    tags: [
      ['Campaigns', 'bg-sun'],
      ['Theatre & Culture', 'bg-mint'],
      ['Nigeria & UK', 'bg-lime'],
    ],
    title: 'Growing Theatre Audiences Across Nigeria and the UK',
    meta: [
      ['Client', 'Duke of Shomolu Foundation'],
      ['Industry', 'Theatre, arts & culture'],
      ['Services', 'Digital marketing, social media, event branding, targeted advertising, content'],
      ['Markets', 'Lagos & the UK'],
    ],
    hero: { src: awoHero, sm: awoHeroSm, alt: 'Collage of applauding hands and a dancer on a spotlit theatre stage', bg: 'bg-sun' },
    labels: ['The Challenge', 'What We Did', 'The Results'],
    results: [
      ['8', 'Shows promoted across Nigeria & the UK'],
      ['4 + 4', 'UK shows and Lagos shows'],
      ['40%', 'Increase in social media reach'],
    ],
    challenge: {
      lead: 'Duke of Shomolu Foundation needed to consistently build awareness, audience interest, and ticket sales for its theatrical productions across two markets: Nigeria and the UK.',
    },
    approach: {
      lead: 'We supported the promotion of multiple productions through digital marketing, social media campaigns, event branding, targeted advertising, and audience-focused content. Our work helped build awareness around each show and drive audiences to the theatre.',
      tactics: [
        ['Digital marketing', 'Campaigns planned around each production, from announcement to closing night.'],
        ['Social media campaigns', 'Content and activity that kept every show in front of the right audiences.'],
        ['Event branding', 'Visuals that gave each production a clear, recognisable identity.'],
        ['Targeted advertising', 'Paid campaigns aimed at theatregoers in Lagos and across the UK.'],
      ],
    },
    gallery: { src: awoTickets, sm: awoTicketsSm, alt: 'Collage of a theatre ticket and a phone bursting with social media reactions', bg: 'bg-sun' },
    quoteFrom: 'Duke of Shomolu Foundation',
    impact: {
      lead: 'Eight productions, two markets, and a growing audience for every show.',
      items: [
        ['8 shows promoted across the UK and Nigeria'],
        ['4 UK shows and 4 Lagos shows'],
        ['40% increase in social media reach'],
        ['Supported audience growth and ticket sales across multiple productions'],
      ],
    },
  },
  {
    slug: 'sats-app',
    client: 'Sats App',
    nav: 'Sats App',
    tags: [
      ['Analytics & Reporting', 'bg-mint'],
      ['Fintech', 'bg-sun'],
      ['Data-led', 'bg-lime'],
    ],
    title: 'Turning data into higher-quality fintech growth.',
    meta: [
      ['Client', 'Sats App'],
      ['Industry', 'Fintech — digital wallets'],
      ['Services', 'Marketing audit, targeted advertising, SEO, thought leadership, analytics'],
      ['Focus', 'Retention & lead quality'],
    ],
    hero: { src: sats, sm: satsSm, alt: 'Collage of a hand holding a phone showing a digital wallet', bg: 'bg-mint' },
    results: [
      ['30%', 'Increase in high-quality leads'],
      ['Real-time', 'Campaigns refined from live analytics'],
      ['4', 'Channels working as one: ads, SEO, content, retention'],
    ],
    challenge: {
      lead: 'In a crowded fintech market, Sats App was attracting attention — but not always the right users, and not keeping enough of them.',
      body: 'The team needed stronger brand exposure and better customer retention, without simply spending more on acquisition. That meant understanding which activity was really driving valuable users.',
    },
    approach: {
      lead: 'We began with an honest audit, then rebuilt the marketing mix around data instead of guesswork.',
      tactics: [
        ['Marketing audit', 'A full review of channels, funnels and messaging to find what was working and what was leaking.'],
        ['Targeted advertising', 'Paid campaigns aimed at the audiences most likely to become active, loyal users.'],
        ['SEO & thought leadership', "Search and expert content that built trust in Sats App's category."],
        ['Real-time optimisation', 'Analytics dashboards used to refine campaigns week by week.'],
      ],
    },
    gallery: { src: performanceAi, sm: performanceAiSm, alt: 'Halftone collage of a hand holding a speedometer', bg: 'bg-navy' },
    quoteFrom: 'Sats App',
    impact: {
      lead: 'Better leads, better engagement and a brand customers trust more.',
      items: [
        ['30% more qualified leads', 'Higher-quality opportunities entering the funnel.'],
        ['Improved engagement', 'Customers interacting more — and more satisfied.'],
        ['Revenue growth', 'Marketing that contributed directly to commercial results.'],
        ['Stronger credibility', 'Thought leadership that lifted trust in the brand.'],
      ],
    },
  },
  {
    slug: 'africacompare',
    client: 'AfricaCompare',
    nav: 'AfricaCompare',
    tags: [
      ['SEO & Content', 'bg-lime'],
      ['Financial services', 'bg-sun'],
      ['Community', 'bg-pink'],
    ],
    title: 'Building a trusted financial resource through search, content and community.',
    meta: [
      ['Client', 'AfricaCompare'],
      ['Industry', 'Financial services — loan comparison'],
      ['Services', 'SEO, email marketing, content, virtual workshops, targeted campaigns'],
      ['Focus', 'Discoverability & trust'],
    ],
    hero: { src: africaCompare, sm: africaCompareSm, alt: 'Collage of a hand stacking coins beside a magnifying glass and bar chart', bg: 'bg-mint' },
    results: [
      ['27%', 'Increase in website traffic'],
      ['Workshops', 'Virtual financial-literacy sessions for the community'],
      ['5', 'Connected channels: SEO, email, content, workshops, campaigns'],
    ],
    challenge: {
      lead: 'AfricaCompare helps people find the right personal and business loans. To do that, people first had to find AfricaCompare — and trust it.',
      body: 'The platform wanted to grow a real digital community and become a go-to financial resource, not just another comparison site.',
    },
    approach: {
      lead: "We researched what the audience actually worried about, then answered those questions everywhere they were searching.",
      tactics: [
        ['Audience research', 'We mapped the financial needs and pain points of the people AfricaCompare serves.'],
        ['Search & content', 'SEO and educational content that made the platform easy to find and useful to read.'],
        ['Financial-literacy workshops', 'Virtual sessions that built confidence — and a community around the brand.'],
        ['Consistent messaging', 'Email and targeted campaigns that told one clear story across channels.'],
      ],
    },
    gallery: { src: digitalExperience, sm: digitalExperienceSm, alt: 'Halftone collage of a hand pointing at a cursor', bg: 'bg-lime' },
    highlight: ['27%', 'more website traffic — and a community that comes back to learn.'],
    impact: {
      lead: 'AfricaCompare is now easier to find, and easier to trust.',
      items: [
        ['27% more traffic', 'More people discovering the platform through search and content.'],
        ['A trusted resource', 'Recognised as a reliable source of financial information.'],
        ['Community built', 'Workshops turned visitors into an engaged audience.'],
        ['Thought leadership', 'A stronger position in financial knowledge-sharing.'],
      ],
    },
  },
  {
    slug: 'mothers-of-chibok',
    client: 'Mothers of Chibok',
    nav: 'Mothers of Chibok',
    tags: [
      ['Digital Promotion', 'bg-lime'],
      ['Website Development', 'bg-mint'],
      ['Documentary', 'bg-sun'],
    ],
    title: 'Amplifying a Powerful Story Through Digital Marketing',
    meta: [
      ['Client', 'Mothers of Chibok'],
      ['Industry', 'Film & documentary'],
      ['Services', 'Social media, content, promotional campaigns, website development'],
      ['Focus', 'Awareness before and after the premiere'],
    ],
    hero: { src: chibok, sm: chibokSm, alt: 'Collage of a film clapperboard and a phone showing a documentary still', bg: 'bg-blush-200' },
    labels: ['The Challenge', 'What We Did', 'The Results'],
    challenge: {
      lead: 'The documentary needed to build awareness ahead of its premiere and sustain audience interest beyond its release.',
    },
    approach: {
      lead: 'We managed social media, created audience-focused content, and ran promotional campaigns. We also designed and developed a dedicated website to showcase the documentary and its message.',
      tactics: [
        ['Social media management', 'Day-to-day channel management around the premiere and beyond.'],
        ['Audience-focused content', 'Content shaped to connect the story with the people it needed to reach.'],
        ['Promotional campaigns', 'Campaigns that built anticipation and kept the documentary visible.'],
        ['A dedicated website', "A home online for the documentary and its message."],
      ],
    },
    gallery: { src: socialImg, sm: socialImgSm, alt: 'Collage of a phone bursting with social media reactions', bg: 'bg-sun' },
    quoteFrom: 'Mothers of Chibok',
    impact: {
      lead: 'Awareness before the premiere — and visibility long after it.',
      items: [
        ['Built awareness ahead of the premiere'],
        ['Sustained digital visibility after release'],
        ['Developed a dedicated website for the documentary'],
        ['Created more opportunities for audience engagement'],
      ],
    },
  },
]

export const caseStudyBySlug = (slug) => CASE_STUDIES.find((c) => c.slug === slug)
