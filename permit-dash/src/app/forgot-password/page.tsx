'use client'

import { Loader2, Mail } from 'lucide-react'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { requestPasswordReset, type ForgotPasswordState } from './actions'

const initialState: ForgotPasswordState = {
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
        'Send Reset Link'
      )}
    </button>
  )
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(requestPasswordReset, initialState)

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-lg items-center px-6 py-12">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Password help</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Reset your password</h1>
            <p className="text-sm leading-relaxed text-slate-600">
              Enter the email you use for ScoutLead and we will send a reset link.
            </p>
          </div>

          <form action={formAction} className="mt-8 space-y-5">
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
            ) : state.status === 'success' && state.message ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {state.message}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-slate-500">
                We will email a secure link that lets you update your password.
              </p>
            )}

            <SubmitButton />

            <div className="text-center">
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-500 transition-colors duration-150 hover:text-slate-700"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
