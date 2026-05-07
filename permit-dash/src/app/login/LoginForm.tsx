'use client'

import { CheckCircle2, Loader2, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import type { LoginFormState } from './actions'

type LoginFormProps = {
  action: (previousState: LoginFormState, formData: FormData) => Promise<LoginFormState>
}

const initialState: LoginFormState = {
  status: 'idle',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-lg active:scale-95 active:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending...
        </span>
      ) : (
        'Send Magic Link'
      )}
    </button>
  )
}

export default function LoginForm({ action }: LoginFormProps) {
  const [state, formAction] = useFormState(action, initialState)

  if (state.status === 'success') {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-emerald-950">Check your email</h3>
              <p className="mt-1 text-sm leading-relaxed text-emerald-900/80">{state.message}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white/80 p-4 text-sm text-emerald-950">
              <p className="font-semibold">Next step</p>
              <p className="mt-1 text-emerald-900/80">
                Open the email on the device you want to use, then tap the link to continue.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:bg-emerald-500 hover:shadow-lg active:scale-95 active:bg-opacity-90"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Work email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="block w-full rounded-2xl border border-gray-300 bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      {state.status === 'error' && state.message ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-slate-500">
          We’ll send a secure, passwordless link to your inbox.
        </p>
      )}

      <SubmitButton />

      <p className="text-center text-xs text-slate-500">
        By continuing, you agree to receive a sign-in email for ScoutLead.
      </p>
    </form>
  )
}