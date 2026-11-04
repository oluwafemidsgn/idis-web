import Link from 'next/link'

export default function RootNotFound() {
  return (
    <main className="grid min-h-svh place-items-center p-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <p className="text-display font-semibold text-brand">404</p>
        <Link href="/" className="rounded-full bg-ink px-8 py-4 text-body-lg font-medium text-white">
          Back to home →
        </Link>
      </div>
    </main>
  )
}
