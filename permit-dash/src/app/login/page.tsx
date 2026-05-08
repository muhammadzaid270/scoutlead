import Link from 'next/link'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex items-center justify-center px-6 py-12 sm:px-8 lg:bg-white">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10 lg:border-0 lg:shadow-none">
            <div className="mb-8 space-y-3">
              <Link href="/" className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
                  SL
                </div>
                <span className="text-lg font-semibold tracking-tight text-slate-900">ScoutLead</span>
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Sign in to ScoutLead</h1>
                <p className="text-sm leading-relaxed text-slate-600">
                  Use Google or your email and password to get to the dashboard fast.
                </p>
              </div>
            </div>

            <LoginForm />
          </div>
        </section>

        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-900 lg:flex lg:items-center lg:justify-center lg:px-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25"
          />
          <div
            aria-hidden="true"
            className="absolute right-[-4rem] top-24 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl animate-float"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[-5rem] left-[-3rem] h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl animate-float"
          />

          <div className="relative z-10 max-w-lg space-y-8 text-white">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Built for crews</p>
              <h2 className="text-4xl font-semibold tracking-tight">Fast access to leads that keep your team moving.</h2>
              <p className="text-base leading-relaxed text-white/70">
                ScoutLead gives contractors a cleaner way to spot the right jobs, act sooner, and stay booked without the noise.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
              <p className="text-sm leading-relaxed text-white/80">
                “We went from chasing stale postings to calling on fresh work the same day. It’s the first lead feed our office actually trusts.”
              </p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">Jordan M.</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">General Contractor</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Premium lead flow
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Google + email login
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Desktop and mobile ready
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}