import { redirect } from 'next/navigation'
import { isAuthed } from '@/lib/auth'
import LoginForm from '../_components/LoginForm'

export default async function LoginPage() {
  if (await isAuthed()) redirect('/admin')
  return (
    <main className="grid min-h-svh place-items-center p-4">
      <div className="flex w-full max-w-[420px] flex-col gap-8 rounded-[32px] bg-white p-8 shadow-[0_24px_60px_rgba(4,9,23,0.08)] md:p-10">
        <div className="flex flex-col gap-4">
          <img src="/assets/logo-idis.svg" alt="IDIS" className="h-[31px] w-[102px]" />
          <div>
            <h1 className="text-h4 font-semibold">Website admin</h1>
            <p className="text-[15px] text-slate">Sign in to edit the blog, works and testimonials.</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
