'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type ProfileFormState = {
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

export async function updateProfile(
  _previousState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const fullName = String(formData.get('full_name') ?? '').trim()
  const companyName = String(formData.get('company_name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { status: 'error', message: 'Please sign in to update your profile.' }
  }

  const { error } = await supabase.from('profiles').upsert(
    {
      id: user.id,
      full_name: fullName || null,
      company_name: companyName || null,
      phone: phone || null,
    },
    { onConflict: 'id' }
  )

  if (error) {
    return { status: 'error', message: error.message }
  }

  revalidatePath('/settings')
  return { status: 'success', message: 'Profile updated.' }
}
