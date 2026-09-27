import founderPhoto from '../assets/founder/founder-photo.png'
import { useInView } from '../hooks/scroll'
import { Reveal, Stagger } from './Reveal'

/**
 * Meet the Founder — node 1925:5029.
 * Dark-navy (#132650) card: left text column, right composed portrait.
 * On scroll the card lifts in, the text lines follow one after another and the
 * portrait settles from a slight zoom.
 */
export default function Founder() {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <section id="about" className="page-shell">
      <Reveal
        ref={ref}
        show={inView}
        from="translate-y-16 scale-[0.98]"
        className="grid grid-cols-1 gap-10 overflow-hidden rounded-[24px] bg-[#132650] p-4 md:rounded-[40px] md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-[clamp(40px,5vw,97px)] lg:p-[clamp(40px,3.3vw,64px)]"
      >
        {/* Left text column */}
        <div className="flex w-full max-w-[680px] flex-col items-start gap-[clamp(20px,2.2vw,40px)] text-white">
          <Stagger show={inView} delay={250} from="translate-y-6">
            <p className="text-body-lg font-normal">MEET THE FOUNDER</p>

            <div className="flex flex-col items-start gap-[8px]">
              <p className="text-h2 font-semibold">Sidi Adisa</p>
              <p className="text-body-lg font-normal">Founder &amp; Lead Marketing Consultant</p>
            </div>

            <p className="text-body-lg font-normal">
              For more than 15 years, Sidi has worked across sales, marketing, business development
              and brand strategy — helping organisations turn ideas, opportunities and marketing
              activity into business growth.
            </p>

            <div className="text-body-lg font-normal">
              <p>She founded IDIS Digital around a simple belief:</p>
              <p>Marketing works better when it understands the business first.</p>
              <p>
                Today, she leads IDIS's strategic work across positioning, brand development,
                digital strategy, campaigns and growth — combining commercial thinking with a deep
                understanding of how modern brands need to communicate and compete.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-block rounded-[99px] bg-brand px-8 py-4 text-body-lg font-medium text-[#fffbfb] transition-opacity hover:opacity-90"
            >
              Meet Sidi &amp; the IDIS team →
            </a>
          </Stagger>
        </div>

        {/* Right composed portrait */}
        <div className="w-full overflow-hidden rounded-[24px] md:rounded-[40px]">
          <img
            src={founderPhoto}
            alt="Sidi Adisa, Founder & Lead Marketing Consultant at IDIS Digital"
            className={`h-auto w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:scale-100 ${
              inView ? 'scale-100' : 'scale-115'
            }`}
          />
        </div>
      </Reveal>
    </section>
  )
}
