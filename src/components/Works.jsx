import { Link } from 'react-router-dom'
import { useInView } from '../hooks/scroll'
import { PROJECTS, projectCta, projectHref } from '../data/site'
import { Reveal, RevealWords } from './Reveal'

/**
 * Works & Campaign — heading + intro then a 2x2 grid of case-study cards,
 * followed by a full-width Mothers of Chibok card (client feedback, Nov 2026).
 * Figma fileKey ahIhjZnPngc6EQrR5X7weh, node-id 1925-5604.
 * Card image frames (1924:3029/3030/3032/3034) are empty #d9d9d9 placeholders
 * in the Figma source — reproduced as gray rounded blocks (see caveats).
 * On scroll the intro rises in, then each card lifts in (image block first,
 * then its copy); side-by-side cards are staggered.
 */

const CARDS = [
  {
    label: 'AFRILABS',
    title: "Building a stronger visual presence for one of Africa's leading innovation networks.",
    desc: 'We worked with AfriLabs across its programmes, partnerships and Annual Gathering 2024 to develop a more consistent and compelling visual presence.',
    stats: [
      { value: '150+', caption: 'Custom visual assets', w: 'w-[194px]' },
      { value: 'AAG 2024', caption: 'Event branding and campaign creative', w: 'w-[344px]' },
    ],
  },
  {
    label: 'DUKE OF SHOMOLU PRODUCTIONS',
    title: 'Taking African theatre to audiences across Nigeria and the UK.',
    desc: 'Through integrated digital campaigns, content, event branding and targeted promotion, we supported multiple productions across two markets.',
    stats: [
      { value: '8 Productions', caption: 'Promoted across Nigeria and the UK', w: 'w-[326px]' },
      { value: '40%', caption: 'Increase in social media reach', w: 'w-[269px]' },
    ],
  },
  {
    label: 'SATS APP',
    title: 'Turning data into stronger fintech growth.',
    desc: "We combined audit insights, targeted advertising, SEO, retention strategy and thought leadership to strengthen Sats App's digital presence and attract higher-quality opportunities.",
    stats: [
      { value: '30%', caption: 'Increase in high-quality leads', w: 'w-[260px]' },
      { value: 'Data-led', caption: 'Continuous optimisation', w: 'w-[224px]' },
    ],
  },
  {
    label: 'AFRICACOMPARE',
    title: 'Growing a financial platform through search, content and community',
    desc: "We brought SEO, content, email and financial-literacy campaigns together to increase discoverability and strengthen AfricaCompare's position as a useful financial resource.",
    stats: [
      { value: '27%', caption: 'Increase in website traffic', w: 'w-[232px]' },
      { value: 'Integrated', caption: 'SEO, content, email and community', w: 'w-[323px]' },
    ],
  },
  {
    label: 'MOTHERS OF CHIBOK',
    title: 'Mothers of Chibok × Idis Digital',
    desc: 'Through digital marketing and website development, we helped build awareness for the documentary and extend its reach beyond the premiere.',
    stats: [
      { value: 'Digital Promotion', caption: 'Building awareness and audience engagement' },
      { value: 'Website Development', caption: "Strengthening the documentary's online presence" },
    ],
    wide: true,
  },
]

// Cover art comes from the shared project data (matched by slug).
const COVERS = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]))
const SLUGS = ['afrilabs', 'awo-the-musical', 'sats-app', 'africacompare', 'mothers-of-chibok']

function Card({ label, title, desc, stats, index, wide }) {
  const project = COVERS[SLUGS[index]]
  const [ref, inView] = useInView({ threshold: 0.2 })
  const base = (index % 2) * 150 // stagger the right-hand column
  return (
    <div
      ref={ref}
      className={`flex w-full flex-col gap-[clamp(24px,2.5vw,48px)] ${wide ? 'md:col-span-2 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-[clamp(24px,3vw,46px)]' : ''}`}
    >
      <Reveal
        show={inView}
        delay={base}
        from="translate-y-12 scale-[0.97]"
        className="aspect-[809/520] w-full overflow-hidden rounded-[24px] bg-[#d9d9d9] md:rounded-[40px]"
      >
        <img
          src={project.image}
          srcSet={`${project.imageSm} 800w, ${project.image} 1400w`}
          sizes="(min-width: 768px) 50vw, 100vw"
          loading="lazy"
          decoding="async"
          alt={`${project.client} campaign artwork`}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </Reveal>
      <Reveal
        show={inView}
        delay={base + 200}
        from="translate-y-8"
        className="flex w-full flex-col items-start gap-[clamp(16px,1.8vw,32px)]"
      >
        <p className="text-body-lg font-normal text-[#7b8698]">{label}</p>
        <h3 className="text-h3 font-semibold text-ink">
          {title}
        </h3>
        <p className="text-body-lg font-normal text-[#7b8698]">{desc}</p>
        <div className="flex flex-wrap gap-x-[clamp(24px,2.5vw,40px)] gap-y-4 text-body-lg font-normal text-[#7b8698]">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col gap-[4px]">
              <p className="font-medium text-ink">{s.value}</p>
              <p>{s.caption}</p>
            </div>
          ))}
        </div>
        <Link
          to={projectHref(project.slug)}
          className="flex w-fit items-start rounded-[99px] bg-ink px-[32px] py-[16px] text-body-lg font-medium whitespace-nowrap text-[#fffbfb] transition-opacity hover:opacity-90"
        >
          {projectCta(project.slug)}
        </Link>
      </Reveal>
    </div>
  )
}

export default function Works() {
  const [introRef, introIn] = useInView({ threshold: 0.5 })
  return (
    <section id="works">
      <div className="page-shell">
        <div className="mx-auto flex w-[1664px] max-w-full flex-col items-center">
          {/* Intro */}
          <div ref={introRef} className="flex w-full max-w-[680px] flex-col items-center gap-[clamp(16px,2vw,32px)] text-center">
            <h2 className="text-h2 font-semibold text-ink">
              <RevealWords text="Works & Campaign" show={introIn} stagger={90} />
            </h2>
            <Reveal as="p" show={introIn} delay={300} from="translate-y-6" className="text-body-lg font-normal text-[#7b8698]">
              Strategy is only valuable when it creates results. A look at how we&apos;ve
              helped businesses turn marketing challenges into measurable progress.
            </Reveal>
          </div>

          {/* 2x2 grid + one wide card */}
          <div className="mt-[clamp(48px,6vw,120px)] grid grid-cols-1 gap-x-[clamp(24px,3vw,46px)] gap-y-[clamp(56px,6vw,80px)] md:grid-cols-2">
            {CARDS.map((c, i) => (
              <Card key={c.label} index={i} {...c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
