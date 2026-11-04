export const metadata = { title: 'Admin', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default function AdminRoot({ children }) {
  return <div className="min-h-svh bg-blush text-ink">{children}</div>
}
