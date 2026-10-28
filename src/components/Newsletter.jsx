import { useState } from 'react'
import { EMAIL } from '../data/site'
import { FadeUp, RevealHeading } from './ui'

/**
 * Brand-blue "One sharp email a month." sign-up card (Blog + Blog Post).
 * There is no mailing-list backend yet, so submitting opens a pre-filled
 * email to the team with the subscriber's address.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Newsletter sign-up')
    const body = encodeURIComponent(`Please add ${email} to the IDIS monthly email.`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }
  return (
    <section className="page-shell">
      <div className="grid grid-cols-1 items-center gap-8 rounded-[24px] bg-brand px-5 py-12 md:rounded-[40px] md:px-[72px] md:py-[72px] lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-16">
        <div className="flex flex-col gap-5">
          <RevealHeading text="One sharp email a month." className="text-h2 font-semibold text-white" />
          <p className="text-body-lg text-white/80">
            Our best thinking, a teardown of a campaign we love, and one thing you can try tomorrow. No spam, no fluff.
          </p>
        </div>
        <FadeUp delay={150} className="flex flex-col gap-3">
          <form onSubmit={submit} className="flex items-center gap-2 rounded-full bg-white p-2 pl-6">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-gray-300"
            />
            <button type="submit" className="shrink-0 rounded-full bg-ink px-5 py-3 text-body font-medium text-white transition-opacity hover:opacity-90 md:px-7 md:py-4">
              Subscribe
            </button>
          </form>
          <p className="text-center text-[15px] text-white/70">Free forever. Unsubscribe anytime.</p>
        </FadeUp>
      </div>
    </section>
  )
}
