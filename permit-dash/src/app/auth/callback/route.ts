import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies() // Awaited for modern Next.js
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
          set(name: string, value: string, options: CookieOptions) { 
            cookieStore.set({ name, value, ...options }) 
          },
          remove(name: string, options: CookieOptions) { 
            cookieStore.set({ name, value: '', ...options }) 
          },
        },
      }
    )
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const providers = data.session?.user?.app_metadata?.providers ?? []
      const usesGoogle = providers.includes('google')
      const hasPassword = providers.includes('email')
      const redirectPath = usesGoogle && !hasPassword ? '/setup-password' : next
      return NextResponse.redirect(`${origin}${redirectPath}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}