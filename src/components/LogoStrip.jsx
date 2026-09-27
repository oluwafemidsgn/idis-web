import idisMark from '../assets/logos/idis-mark.svg'
import { useInView } from '../hooks/scroll'
import { Reveal } from './Reveal'

/**
 * LogoStrip — full-bleed, single-row marquee of client/partner logos.
 * Figma node-id 1913:75 ("Frame 38"): 12 monochrome IDIS marks (#7B8698),
 * each 102px × 30.993px, spaced with an 80px gap.
 * The row is rendered twice back-to-back and slid left by exactly one copy's
 * width, so the loop is seamless. Edges fade out; it pauses on hover and
 * holds still for reduced-motion users. The strip fades up as it enters.
 */
const LOGOS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  src: idisMark,
  alt: 'Client logo',
}))

function Row({ hidden = false }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-x-10 pr-10 md:gap-x-[80px] md:pr-[80px]"
    >
      {LOGOS.map((l) => (
        <li key={l.id} className="shrink-0">
          <img
            src={l.src}
            alt={hidden ? '' : l.alt}
            className="block h-[24px] w-auto md:h-[30.993px]"
          />
        </li>
      ))}
    </ul>
  )
}

export default function LogoStrip() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section
      id="logos"
      aria-label="Client and partner logos"
      className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <Reveal ref={ref} show={inView} from="translate-y-4">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Row />
          <Row hidden />
        </div>
      </Reveal>
    </section>
  )
}
