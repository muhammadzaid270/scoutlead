import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SettingsForm from './SettingsForm'

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

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const safeProfile = error || !profile ? { full_name: '', company_name: '', phone: '' } : profile

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Account</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Profile settings</h1>
            <p className="text-sm leading-relaxed text-slate-600">
              Manage how your profile appears across ScoutLead.
            </p>
          </div>

          <SettingsForm
            defaultValues={{
              fullName: safeProfile.full_name ?? '',
              companyName: safeProfile.company_name ?? '',
              phone: safeProfile.phone ?? '',
            }}
          />
        </div>
      </div>
    </main>
  )
}
