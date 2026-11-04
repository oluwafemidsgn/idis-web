import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAuthed } from '@/lib/auth'
import { logoutAction } from '../actions'
import AdminNav from './nav'

export default async function PanelLayout({ children }) {
  if (!(await isAuthed())) redirect('/admin/login')
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <aside className="flex shrink-0 flex-col gap-6 border-b border-line bg-white p-4 lg:sticky lg:top-0 lg:h-svh lg:w-[260px] lg:border-b-0 lg:border-r lg:p-6">
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start">
          <Link href="/admin" className="flex items-center gap-3">
            <img src="/assets/logo-idis.svg" alt="IDIS" className="h-[26px] w-[86px]" />
            <span className="rounded-full bg-blush-200 px-3 py-1 text-[12px] font-semibold text-brand">Admin</span>
          </Link>
        </div>
        <AdminNav />
        <div className="mt-auto hidden flex-col gap-2 lg:flex">
          <a href="/" target="_blank" rel="noreferrer" className="rounded-[14px] px-3 py-2.5 text-[14px] font-medium text-slate hover:bg-blush hover:text-ink">
            View website ↗
          </a>
          <form action={logoutAction}>
            <button type="submit" className="w-full rounded-[14px] px-3 py-2.5 text-left text-[14px] font-medium text-slate hover:bg-blush hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 pt-6 md:px-8 md:pt-10">{children}</main>
    </div>
  )
}
