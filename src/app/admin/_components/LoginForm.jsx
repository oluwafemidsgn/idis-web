'use client'

import { useActionState } from 'react'
import { loginAction } from '../actions'
import { Notice, SaveButton } from './fields'

export default function LoginForm() {
  const [state, action] = useActionState(loginAction, null)
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium text-ink">Password</span>
        <input type="password" name="password" required autoFocus autoComplete="current-password" className="rounded-[14px] border border-line px-4 py-3 text-[15px] outline-none focus:border-brand" />
      </label>
      <Notice state={state} />
      <SaveButton>Sign in</SaveButton>
    </form>
  )
}
