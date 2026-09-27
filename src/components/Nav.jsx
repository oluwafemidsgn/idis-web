import logo from '../assets/logo-idis.svg'
import Button from './Button'
import { Reveal } from './Reveal'
import { useMounted } from '../hooks/scroll'

const LINKS = [
  { label: 'Home', href: '#home', active: true },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Top navigation — a centered cluster (logo · links · CTA) matching the
 * Figma frame (x=450, width=1019 on the 1920 canvas). Slides down on load.
 */
export default function Nav() {
  const ready = useMounted()
  return (
    <header className="page-shell py-[20px]">
      <Reveal as="nav" show={ready} from="-translate-y-6" className="mx-auto flex w-full items-center justify-between gap-6 lg:w-max lg:justify-center lg:gap-[clamp(40px,8vw,156px)]">
        <a href="#home" className="shrink-0">
          <img src={logo} alt="IDIS" className="h-[31px] w-[102px]" />
        </a>

        <ul className="hidden items-center gap-[30px] text-body-lg lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={
                  l.active
                    ? 'font-semibold text-brand'
                    : 'font-normal text-ink transition-colors hover:text-brand'
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <Button variant="blue">Lets talk</Button>
      </Reveal>
    </header>
  )
}
