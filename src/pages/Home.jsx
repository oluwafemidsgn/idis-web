import Hero from '../components/Hero'
import LogoStrip from '../components/LogoStrip'
import VideoPreview from '../components/VideoPreview'
import Testimonials from '../components/Testimonials'
import Alignment from '../components/Alignment'
import Services from '../components/Services'
import Works from '../components/Works'
import Stats from '../components/Stats'
import HowWeWork from '../components/HowWeWork'
import HumanLead from '../components/HumanLead'
import WhyIdis from '../components/WhyIdis'
import Founder from '../components/Founder'
import Thinking from '../components/Thinking'
import Cta from '../components/Cta'

/** Homepage — section order follows "IDIS — Homepage V2 (Video + Services-forward)". */
export default function Home() {
  return (
    <>
      <Hero />
      <main className="flex flex-col gap-[clamp(64px,10vw,140px)] py-[clamp(64px,10vw,140px)]">
        <LogoStrip />
        <VideoPreview />
        <Testimonials />
        <Alignment />
        <Services />
        <Works />
        <Stats />
        <HowWeWork />
        <HumanLead />
        <WhyIdis />
        <Founder />
        <Thinking />
        <Cta />
      </main>
    </>
  )
}
