import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans text-zinc-900 app-surface">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-32 left-[-8%] h-80 w-80 rounded-full bg-amber-200/40 blur-3xl"
        />

        <header className="relative z-10 px-6 py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="text-lg font-semibold tracking-tight text-zinc-900">
              ScoutLead
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-95"
            >
              Login
            </Link>
          </div>
        </header>

        <section className="relative z-10 px-6 pb-16 pt-10">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">Live permit intelligence</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Spot the highest-value construction leads before your competitors do.
              </h1>
              <p className="mt-6 text-base text-zinc-600 sm:text-lg">
                ScoutLead turns raw municipal permits into a live, prioritized feed. Filter by trade,
                capture contractor details, and stay ahead with clean, RLS-secured data.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-500 active:scale-95"
                >
                  Get the magic link
                </Link>
                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/70 px-6 py-3 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-white"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 text-sm text-zinc-600">
                <div>
                  <div className="text-2xl font-semibold text-zinc-900">50+</div>
                  New permits daily
                </div>
                <div>
                  <div className="text-2xl font-semibold text-zinc-900">Austin</div>
                  Launch market
                </div>
                <div>
                  <div className="text-2xl font-semibold text-zinc-900">RLS</div>
                  Always enforced
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200/70 bg-white/80 p-8 shadow-xl shadow-zinc-200/60 backdrop-blur">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Instant clarity</p>
                  <h2 className="mt-2 text-xl font-semibold text-zinc-900">
                    A premium dashboard that feels like a command center.
                  </h2>
                </div>
                <div className="space-y-4 text-sm text-zinc-600">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    Sort by permit value, recency, and trade focus.
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    Open a lead and call contractors in one click.
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    Always protected by Supabase RLS and server-side auth.
                  </div>
                </div>
                <div className="rounded-2xl bg-zinc-900 px-5 py-4 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Next up</p>
                  <p className="mt-2 text-sm font-semibold">Your personalized feed at /dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="relative z-10 px-6 pb-20">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              {
                title: 'Ingest & enrich',
                copy: 'Permit data lands every morning, normalized and tagged for trade, scope, and value.',
              },
              {
                title: 'Filter & prioritize',
                copy: 'Dial in the exact work class you want and surface only the leads that matter.',
              },
              {
                title: 'Act immediately',
                copy: 'Call contractors directly, reference the city portal, and stay first-in-line.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-200/70 bg-white/80 p-6 shadow-lg shadow-zinc-200/40"
              >
                <h3 className="text-lg font-semibold text-zinc-900">{item.title}</h3>
                <p className="mt-3 text-sm text-zinc-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
