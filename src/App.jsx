import Nav from './components/Nav'
import Hero from './components/Hero'
import LogoStrip from './components/LogoStrip'
import Alignment from './components/Alignment'
import Services from './components/Services'
import Works from './components/Works'
import Stats from './components/Stats'
import HowWeWork from './components/HowWeWork'
import HumanLead from './components/HumanLead'
import WhyIdis from './components/WhyIdis'
import Founder from './components/Founder'
import Testimonials from './components/Testimonials'
import Thinking from './components/Thinking'
import Cta from './components/Cta'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="w-full overflow-x-clip bg-paper">
      <Nav />
      <Hero />

      <main className="flex flex-col gap-[clamp(64px,10vw,140px)] pb-[clamp(64px,10vw,140px)] pt-[clamp(64px,10vw,140px)]">
        <LogoStrip />
        <Alignment />
        <Services />
        <Works />
        <Stats />
        <HowWeWork />
        <HumanLead />
        <WhyIdis />
        <Founder />
        <Testimonials />
        <Thinking />
        <Cta />
        <Footer />
      </main>
    </div>
  )
}
