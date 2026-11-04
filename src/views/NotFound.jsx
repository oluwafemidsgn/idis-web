'use client'

import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="page-shell py-[clamp(48px,8vw,120px)]">
      <div className="flex flex-col items-center gap-6 rounded-[24px] bg-blush-200 px-6 py-20 text-center md:rounded-[40px] md:py-32">
        <p className="text-display font-semibold text-brand">404</p>
        <p className="text-h3 font-semibold text-ink">This page took a different route.</p>
        <Button href="/">Back to home →</Button>
      </div>
    </section>
  )
}
