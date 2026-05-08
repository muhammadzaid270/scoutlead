'use client'

import { Loader2, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import type { AuthFormState, OAuthRedirectState } from './actions'
import { login, signInWithGoogle, signup } from './actions'

const initialAuthState: AuthFormState = {
  status: 'idle',
}

type AuthMode = 'login' | 'signup'

type FormActionsProps = {
  mode: AuthMode
  setMode: (mode: AuthMode) => void
  loginAction: (formData: FormData) => void
  signupAction: (formData: FormData) => void
}

function GoogleButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-150 hover:-translate-y-1 active:scale-95 active:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </span>
      ) : (
        <>
          <svg className="h-4 w-4" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.3 1.2 8.1 2.2l6-6C35.7 3 30.2 1 24 1 14.7 1 6.8 5.8 3 13.7l7.3 5.7C11.9 14 17.4 9.5 24 9.5z" />
            <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v8.1h12.8c-.6 3.3-2.9 6.2-6.1 7.8l6.2 4.8c3.6-3.3 5.6-8.6 5.6-16.6z" />
            <path fill="#4A90E2" d="M10.3 29.4A14.5 14.5 0 0 1 9.1 24c0-1.6.3-3.1.8-4.4L3 13.7C1 17.5 0 21.6 0 24c0 2.5 1 6.6 3 10.3l7.3-5.9z" />
            <path fill="#FBBC05" d="M24 46.9c6.2 0 11.7-2 15.9-5.3l-7.6-5.9c-2 1.3-4.6 2.1-8.3 2.1-6.6 0-12.1-4.5-13.9-10.4L3 34.7C6.8 42.6 14.7 46.9 24 46.9z" />
          </svg>
          Sign in with Google
        </>
      )}
    </button>
  )
}

function FormActions({ mode, setMode, loginAction, signupAction }: FormActionsProps) {
  const { pending } = useFormStatus()
  const primaryClasses =
    'inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-lg active:scale-95 active:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70'
  const secondaryClasses =
    'inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-150 hover:-translate-y-1 hover:border-slate-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70'

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="submit"
        formAction={loginAction}
        onClick={() => setMode('login')}
        disabled={pending}
        className={primaryClasses}
      >
        {pending && mode === 'login' ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in...
          </span>
        ) : (
          'Sign In'
        )}
      </button>
      <button
        type="submit"
        formAction={signupAction}
        onClick={() => setMode('signup')}
        disabled={pending}
        className={secondaryClasses}
      >
        {pending && mode === 'signup' ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating...
          </span>
        ) : (
          'Create Account'
        )}
      </button>
    </div>
  )
}

type LoginFormProps = {
  defaultEmail?: string
}

export default function LoginForm({ defaultEmail }: LoginFormProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loginState, loginAction] = useFormState(login, initialAuthState)
  const [signupState, signupAction] = useFormState(signup, initialAuthState)
  const [googleState, googleAction] = useFormState(signInWithGoogle, { status: 'idle' } as OAuthRedirectState)
  const activeState = mode === 'signup' ? signupState : loginState

  useEffect(() => {
    if (googleState.status === 'redirect' && googleState.url) {
      // client-side navigation to Google's consent screen
      window.location.href = googleState.url
    }
  }, [googleState])

  return (
    <div className="space-y-6">
      <form action={googleAction}>
        <GoogleButton />
      </form>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">or</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form action={loginAction} className="space-y-5">
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
              defaultValue={defaultEmail || ''}
              className="block w-full rounded-2xl border border-gray-300 bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Your password"
              className="block w-full rounded-2xl border border-gray-300 bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-slate-500 transition-colors duration-150 hover:text-slate-700"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {activeState.status === 'error' && activeState.message ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {activeState.message}
          </div>
        ) : activeState.status === 'success' && activeState.message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {activeState.message}
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-slate-500">
            Use your work email and password to access ScoutLead.
          </p>
        )}

        <FormActions mode={mode} setMode={setMode} loginAction={loginAction} signupAction={signupAction} />

        <p className="text-center text-xs text-slate-500">
          By continuing, you agree to ScoutLead's Terms and Privacy Policy.
        </p>
      </form>
    </div>
  )
}