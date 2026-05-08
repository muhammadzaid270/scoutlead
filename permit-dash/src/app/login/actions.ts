'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export type AuthFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

export async function login(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return {
      status: 'error',
      message: 'Enter your email and password to continue.',
    }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { status: 'error', message: error.message }
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: 'last_used_email',
    value: email,
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  redirect('/dashboard')
}

export async function signup(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return {
      status: 'error',
      message: 'Enter your email and password to create an account.',
    }
  }

  const supabase = await createSupabaseServerClient()
  const origin = (await headers()).get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return { status: 'error', message: error.message }
  }

  return {
    status: 'success',
    message: 'Check your email to confirm your account, then sign in to continue.',
  }
}

export type OAuthRedirectState = {
  status: 'idle' | 'redirect' | 'error'
  url?: string | null
  message?: string
}

export async function signInWithGoogle(
  _previousState: OAuthRedirectState,
  _formData: FormData
): Promise<OAuthRedirectState> {
  const supabase = await createSupabaseServerClient()

  const origin = (await headers()).get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return { status: 'error', message: error.message }
  }

  return { status: 'redirect', url: data?.url ?? null }
}