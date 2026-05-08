'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export type RevealPhoneResult =
  | { success: true; count: number }
  | { success: false; error: 'limit_reached' | 'unauthenticated' | 'unknown' }

const createSupabaseServerClient = async () => {
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

export async function revealPhoneNumber(): Promise<RevealPhoneResult> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, error: 'unauthenticated' }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('reveals_count')
    .eq('id', user.id)
    .single()

  if (profileError) {
    return { success: false, error: 'unknown' }
  }

  const currentCount = Number(profile?.reveals_count ?? 0)
  const safeCount = Number.isFinite(currentCount) ? currentCount : 0

  if (safeCount >= 5) {
    return { success: false, error: 'limit_reached' }
  }

  const newCount = safeCount + 1
  const { error: updateError } = await supabase.from('profiles').upsert(
    {
      id: user.id,
      reveals_count: newCount,
    },
    { onConflict: 'id' }
  )

  if (updateError) {
    return { success: false, error: 'unknown' }
  }

  return { success: true, count: newCount }
}
