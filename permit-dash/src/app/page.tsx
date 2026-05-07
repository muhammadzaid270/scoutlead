import Link from 'next/link'

const workflowSteps = [
  {
    title: 'Ingest and enrich',
    copy: 'Permit data lands every morning, normalized and tagged for trade, scope, and value.',
  },
  {
    title: 'Filter and prioritize',
    copy: 'Dial in the exact work class you want and surface only the leads that matter.',
  },
  {
    title: 'Act immediately',
    copy: 'Call contractors directly, reference the city portal, and stay first in line.',
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans text-slate-900 hero-mesh">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-6rem] left-[-8rem] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />

        <header className="relative z-10 px-6 py-8 sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
                SL
              </div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">ScoutLead</span>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-lg active:scale-95"
            >
              Login
            </Link>
          </div>
        </header>

        <section className="relative z-10 px-6 pb-20 pt-6 sm:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm animate-fade-in-up">
                  Live permit intelligence
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl animate-fade-in-up animate-fade-in-up-delay-1">
                  <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 bg-clip-text text-transparent">
                    Premium leads.
                  </span>{' '}
                  Delivered before the competition.
                </h1>
                <p className="text-base leading-relaxed text-slate-600 sm:text-lg animate-fade-in-up animate-fade-in-up-delay-2">
                  ScoutLead transforms raw municipal permits into a live, prioritized feed. Filter by
                  trade, capture contractor details, and stay ahead with clean, RLS-secured data.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 animate-fade-in-up animate-fade-in-up-delay-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-lg active:scale-95"
                >
                  Get the magic link
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  See how it works
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Daily feed</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">50+</p>
                  <p className="text-sm text-slate-600">New permits each morning</p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Launch market</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">Austin</p>
                  <p className="text-sm text-slate-600">Next up: Houston, Dallas</p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Security</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">RLS</p>
                  <p className="text-sm text-slate-600">Server-first access control</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-200/60 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Today</p>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  Austin, TX
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">Your lead command center</h2>
              <p className="mt-2 text-sm text-slate-600">
                Preview the premium dashboard with high-signal leads, ready to contact in seconds.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Top opportunity</span>
                    <span className="text-emerald-600">Issued today</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-900">New build, 5,400 sqft addition</p>
                  <p className="mt-1 text-xs text-slate-500">Electrical + HVAC, $1.2M est.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Response speed</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">2.5x</p>
                    <p className="text-xs text-slate-500">Faster than spreadsheets</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Verified</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">RLS</p>
                    <p className="text-xs text-slate-500">Always enforced</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900 px-5 py-4 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Next up</p>
                  <p className="mt-2 text-sm font-semibold">Your personalized feed at /dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative z-10 px-6 pb-24 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Workflow</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  Built for decisive sales teams.
                </h2>
              </div>
              <Link
                href="/login"
                className="text-sm font-semibold text-indigo-600 transition-all duration-300 ease-in-out hover:text-indigo-500"
              >
                Request access
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {workflowSteps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-slate-200/40 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
