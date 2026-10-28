import afrilabs from '../assets/projects/afrilabs.webp'
import afrilabsSm from '../assets/projects/afrilabs-sm.webp'
import awoHero from '../assets/projects/awo-hero.webp'
import awoHeroSm from '../assets/projects/awo-hero-sm.webp'
import awoTickets from '../assets/projects/awo-tickets.webp'
import awoTicketsSm from '../assets/projects/awo-tickets-sm.webp'
import sats from '../assets/projects/sats-app.webp'
import satsSm from '../assets/projects/sats-app-sm.webp'
import africaCompare from '../assets/projects/africacompare.webp'
import africaCompareSm from '../assets/projects/africacompare-sm.webp'
import brandCreative from '../assets/services/brand-creative.webp'
import brandCreativeSm from '../assets/services/brand-creative-sm.webp'
import performanceAi from '../assets/services/performance-ai.webp'
import performanceAiSm from '../assets/services/performance-ai-sm.webp'
import digitalExperience from '../assets/services/digital-experience.webp'
import digitalExperienceSm from '../assets/services/digital-experience-sm.webp'

/**
 * Case-study content for /projects/:slug, in the order they appear on the
 * Projects page ("Next project" cycles through this list). The layout follows
 * "IDIS — Case Study: Awo the Musical" in the pen.dev file; facts come from
 * the client case studies on the previous idisdigital.co site.
 *
 * `quote` is a client testimonial; studies without one show `highlight`
 * (a headline stat) in the coloured card instead.
 */
export const CASE_STUDIES = [
  {
    slug: 'afrilabs',
    client: 'AfriLabs',
    nav: 'AfriLabs',
    tags: [
      ['Brand & Creative', 'bg-pink'],
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
    slug: 'awo-the-musical',
    client: 'Duke of Shomolu Productions',
    nav: 'Awo the Musical',
    tags: [
      ['Campaign', 'bg-pink'],
      ['Theatre & Culture', 'bg-sun'],
      ['Nigeria → UK', 'bg-mint'],
    ],
    title: "Selling out London's Shaw Theatre for Awo the Musical.",
    meta: [
      ['Client', 'Duke of Shomolu Productions'],
      ['Industry', 'Theatre, arts & culture'],
      ['Services', 'Digital strategy, social, paid media, event branding'],
      ['Markets', 'Lagos & London'],
    ],
    hero: { src: awoHero, sm: awoHeroSm, alt: 'Collage of applauding hands and a dancer on a spotlit theatre stage', bg: 'bg-pink' },
    results: [
      ['2/2', "Shows sold out at London's Shaw Theatre"],
      ['40%', 'Increase in social media reach'],
      ['8', 'Productions now promoted across Nigeria & the UK'],
    ],
    challenge: {
      lead: 'Awo the Musical had already moved audiences in Nigeria. Now it had to win over London — in a city with thousands of shows competing for the same night out.',
      body: 'Duke of Shomolu Productions needed more than ticket ads. They needed a campaign that would build cultural buzz before curtain-up, reach both the African diaspora and mainstream theatregoers, and position the production as a must-see moment for African theatre on a global stage.',
    },
    approach: {
      lead: "We built the campaign around the story, not the seat. Every touchpoint was designed to make people feel they'd miss something important if they weren't in the room.",
      tactics: [
        ['Story-first positioning', 'We framed Awo as a landmark cultural moment — giving press, partners and fans a reason to talk.'],
        ['Diaspora-led targeting', 'Paid social reached African communities across the UK first, turning them into early advocates.'],
        ['Always-on content engine', 'Rehearsal clips, cast stories and countdowns kept the show in feeds for weeks before opening.'],
        ['Event branding', 'A bold visual system carried from social posts to the theatre foyer for one seamless experience.'],
      ],
    },
    gallery: { src: awoTickets, sm: awoTicketsSm, alt: 'Collage of a theatre ticket and a phone bursting with social media reactions', bg: 'bg-sun' },
    quoteFrom: 'Duke of Shomolu Foundation',
    impact: {
      lead: 'Both performances at the Shaw Theatre sold out. But the bigger win was what came after.',
      items: [
        ['Sold-out debut', 'Every seat filled across both London performances.'],
        ['40% more social reach', 'A wider, more engaged audience for this show — and the next one.'],
        ['A global reputation', 'Duke of Shomolu is now recognised as a serious force in international African theatre.'],
        ['A lasting partnership', "We've since supported multiple productions across Nigeria and the UK."],
      ],
    },
  },
  {
    slug: 'sats-app',
    client: 'Sats App',
    nav: 'Sats App',
    tags: [
      ['Performance & AI', 'bg-mint'],
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
    highlight: ['30%', 'more high-quality leads — from a smarter mix, not a bigger budget.'],
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
      ['Digital & Experience', 'bg-lime'],
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
]

export const caseStudyBySlug = (slug) => CASE_STUDIES.find((c) => c.slug === slug)
