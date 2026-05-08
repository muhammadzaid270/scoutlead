'use client'

import { Loader2, Lock } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'
import { updatePassword, type UpdatePasswordState } from './actions'

const initialState: UpdatePasswordState = {
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
          Updating...
        </span>
      ) : (
        'Update Password'
      )}
    </button>
  )
}

export default function UpdatePasswordPage() {
  const [state, formAction] = useFormState(updatePassword, initialState)

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-lg items-center px-6 py-12">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Secure access</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Update your password</h1>
            <p className="text-sm leading-relaxed text-slate-600">
              Choose a new password to secure your ScoutLead account.
            </p>
          </div>

          <form action={formAction} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                New password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Enter a new password"
                  className="block w-full rounded-2xl border border-gray-300 bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
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
                Use at least 8 characters with a mix of letters and numbers.
              </p>
            )}

            <SubmitButton />
          </form>
        </div>
      </div>
    </main>
  )
}
