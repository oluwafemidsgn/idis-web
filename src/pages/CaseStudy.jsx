import { Link, Navigate, useParams } from 'react-router-dom'
import heroImg from '../assets/projects/awo-hero.webp'
import heroImgSm from '../assets/projects/awo-hero-sm.webp'
import ticketsImg from '../assets/projects/awo-tickets.webp'
import ticketsImgSm from '../assets/projects/awo-tickets-sm.webp'
import satsImg from '../assets/projects/sats-app.webp'
import Button from '../components/Button'
import Cta from '../components/Cta'
import { Reveal, RevealWords } from '../components/Reveal'
import { Check, FadeUp, Tag } from '../components/ui'
import { useInView, useMounted } from '../hooks/scroll'
import { CASE_STUDY_SLUG, TESTIMONIALS } from '../data/site'

/** Case study — "IDIS — Case Study: Awo the Musical" in the pen.dev file. */

const META = [
  ['Client', 'Duke of Shomolu Productions'],
  ['Industry', 'Theatre, arts & culture'],
  ['Services', 'Digital strategy, social, paid media, event branding'],
  ['Markets', 'Lagos & London'],
]

const RESULTS = [
  ['2/2', "Shows sold out at London's Shaw Theatre"],
  ['40%', 'Increase in social media reach'],
  ['8', 'Productions now promoted across Nigeria & the UK'],
]

const TACTICS = [
  ['Story-first positioning', 'We framed Awo as a landmark cultural moment — giving press, partners and fans a reason to talk.', 'bg-pink'],
  ['Diaspora-led targeting', 'Paid social reached African communities across the UK first, turning them into early advocates.', 'bg-sun'],
  ['Always-on content engine', 'Rehearsal clips, cast stories and countdowns kept the show in feeds for weeks before opening.', 'bg-mint'],
  ['Event branding', 'A bold visual system carried from social posts to the theatre foyer for one seamless experience.', 'bg-lime'],
]

const IMPACT = [
  ['Sold-out debut', 'Every seat filled across both London performances.'],
  ['40% more social reach', 'A wider, more engaged audience for this show — and the next one.'],
  ['A global reputation', 'Duke of Shomolu is now recognised as a serious force in international African theatre.'],
  ['A lasting partnership', "We've since supported multiple productions across Nigeria and the UK."],
]

function Block({ num, title, children }) {
  return (
    <section className="page-shell">
      <div className="content grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-24">
        <FadeUp className="flex flex-col gap-4">
          <p className="text-body-lg font-medium text-brand">{num}</p>
          <h2 className="text-h3 font-semibold text-ink">{title}</h2>
        </FadeUp>
        <FadeUp delay={150} className="flex flex-col gap-6">
          {children}
        </FadeUp>
      </div>
    </section>
  )
}

const Lead = ({ children }) => <p className="text-h5 font-medium leading-[1.4] text-ink">{children}</p>

export default function CaseStudy() {
  const { slug } = useParams()
  const ready = useMounted()
  const [resRef, resIn] = useInView({ threshold: 0.3 })
  if (slug !== CASE_STUDY_SLUG) return <Navigate to="/projects" replace />
  const quote = TESTIMONIALS.find((t) => t.author === 'Duke of Shomolu Foundation')

  return (
    <>
      {/* Intro */}
      <section className="page-shell">
        <div className="content flex flex-col gap-8 pb-10 pt-[clamp(16px,3vw,56px)] md:gap-10 md:pb-14">
          <Reveal show={ready} from="translate-y-3" className="flex flex-wrap items-center gap-3 text-body text-slate">
            <Link to="/projects" className="flex items-center gap-2 transition-colors hover:text-ink">
              <span aria-hidden="true">←</span> All projects
            </Link>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-ink">Duke of Shomolu Productions</span>
          </Reveal>
          <Reveal show={ready} delay={100} from="translate-y-3" className="flex flex-wrap gap-2">
            <Tag className="bg-pink text-ink">Campaign</Tag>
            <Tag className="bg-sun text-ink">Theatre & Culture</Tag>
            <Tag className="bg-mint text-ink">Nigeria → UK</Tag>
          </Reveal>
          <h1 className="max-w-[1120px] text-h1 font-semibold text-ink">
            <RevealWords text="Selling out London's Shaw Theatre for Awo the Musical." show={ready} delay={150} stagger={55} />
          </h1>
          <Reveal show={ready} delay={600} from="translate-y-4" className="grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4 lg:gap-8">
            {META.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-2">
                <p className="text-[15px] tracking-[0.06em] text-slate uppercase">{k}</p>
                <p className="text-body-lg font-medium text-ink">{v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="page-shell">
        <Reveal show={ready} delay={700} from="translate-y-12 scale-[0.98]" className="overflow-hidden rounded-[24px] bg-pink md:rounded-[40px]">
          <img
            src={heroImg}
            srcSet={`${heroImgSm} 800w, ${heroImg} 1400w`}
            sizes="100vw"
            alt="Collage of applauding hands and a dancer on a spotlit theatre stage"
            className="aspect-[4/3] w-full object-cover md:aspect-[1336/700]"
          />
        </Reveal>
      </section>

      <main className="flex flex-col gap-[clamp(64px,10vw,140px)] py-[clamp(64px,8vw,120px)]">
        {/* Results */}
        <section className="page-shell">
          <div ref={resRef} className="rounded-[24px] bg-navy px-5 py-12 md:rounded-[40px] md:px-12 md:py-[72px]">
            <p className="text-center text-body-lg tracking-[0.05em] text-white/70">THE RESULTS AT A GLANCE</p>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3 md:mt-14">
              {RESULTS.map(([v, l], i) => (
                <Reveal key={v} show={resIn} delay={i * 140} from="translate-y-10" className="flex flex-col items-center gap-4 text-center text-white">
                  <p className="text-display-sm font-semibold">{v}</p>
                  <p className="max-w-[300px] text-body-lg">{l}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Block num="01" title="The challenge">
          <Lead>
            Awo the Musical had already moved audiences in Nigeria. Now it had to win over London — in a city with
            thousands of shows competing for the same night out.
          </Lead>
          <p className="text-body-lg text-slate">
            Duke of Shomolu Productions needed more than ticket ads. They needed a campaign that would build cultural
            buzz before curtain-up, reach both the African diaspora and mainstream theatregoers, and position the
            production as a must-see moment for African theatre on a global stage.
          </p>
        </Block>

        <Block num="02" title="Our approach">
          <Lead>
            We built the campaign around the story, not the seat. Every touchpoint was designed to make people feel
            they'd miss something important if they weren't in the room.
          </Lead>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TACTICS.map(([t, d, c], i) => (
              <div key={t} className="flex flex-col gap-4 rounded-[24px] border border-line bg-blush p-7">
                <span className={`grid size-11 place-items-center rounded-full text-body font-semibold text-ink ${c}`}>{i + 1}</span>
                <h3 className="text-h5 font-semibold text-ink">{t}</h3>
                <p className="text-body text-slate">{d}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* Gallery + quote */}
        <section className="page-shell">
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(0,1fr)_460px]">
            <FadeUp className="overflow-hidden rounded-[24px] bg-sun md:rounded-[40px]">
              <img
                src={ticketsImg}
                srcSet={`${ticketsImgSm} 800w, ${ticketsImg} 1400w`}
                sizes="(min-width: 1024px) 65vw, 100vw"
                loading="lazy"
                alt="Collage of a theatre ticket and a phone bursting with social media reactions"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </FadeUp>
            <FadeUp as="figure" delay={150} className="flex flex-col justify-between gap-12 rounded-[24px] bg-pink p-8 md:rounded-[40px] md:p-11">
              <span className="text-[96px] font-semibold leading-[0.6] text-ink" aria-hidden="true">“</span>
              <div className="flex flex-col gap-7">
                <blockquote className="text-h5 font-medium leading-[1.35] text-ink">{quote.quote}</blockquote>
                <figcaption className="text-body font-semibold text-ink">{quote.author}</figcaption>
              </div>
            </FadeUp>
          </div>
        </section>

        <Block num="03" title="The impact">
          <Lead>Both performances at the Shaw Theatre sold out. But the bigger win was what came after.</Lead>
          <ul>
            {IMPACT.map(([t, d]) => (
              <li key={t} className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-x-5 gap-y-1 border-b border-line py-6 sm:grid-cols-[36px_240px_minmax(0,1fr)] sm:gap-6">
                <Check className="bg-brand" stroke="#fff" size={36} />
                <p className="text-body-lg font-semibold text-ink">{t}</p>
                <p className="col-start-2 text-body-lg text-slate sm:col-start-3">{d}</p>
              </li>
            ))}
          </ul>
        </Block>

        {/* Next project */}
        <section className="page-shell">
          <FadeUp className="grid grid-cols-1 items-center gap-8 rounded-[24px] bg-brand p-4 md:rounded-[40px] md:p-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-14">
            <div className="flex flex-col gap-6 p-4 lg:py-6 lg:pl-10">
              <p className="text-body-lg tracking-[0.05em] text-white/70">NEXT PROJECT</p>
              <p className="text-body-lg font-medium text-sun">Sats App</p>
              <p className="text-h2 font-semibold text-white">Turning data into higher-quality fintech growth.</p>
              <Button href="/contact" variant="light" className="w-fit">
                Talk to us about it →
              </Button>
            </div>
            <img src={satsImg} alt="Collage of a hand holding a phone with a digital wallet" loading="lazy" className="aspect-[560/440] w-full rounded-[20px] object-cover md:rounded-[24px]" />
          </FadeUp>
        </section>

        <Cta />
      </main>
    </>
  )
}
