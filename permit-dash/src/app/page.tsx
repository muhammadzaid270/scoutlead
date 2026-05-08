import Link from 'next/link'

const howItWorksSteps = [
  {
    step: '01',
    title: 'We monitor permits',
    copy: 'Fresh permits are tracked every morning so you never miss a new opportunity.',
  },
  {
    step: '02',
    title: 'You get instant alerts',
    copy: 'Get a clean feed of jobs that match your trade, budget, and location.',
  },
  {
    step: '03',
    title: 'You win the bid',
    copy: 'Reach contractors fast with verified contact details and clear scope notes.',
  },
]

const featureCards = [
  {
    icon: 'T',
    title: 'Time saved',
    copy: 'Skip spreadsheets and focus on the leads that are ready to close today.',
  },
  {
    icon: 'V',
    title: 'Verified data',
    copy: 'Every permit is checked and organized for fast, confident outreach.',
  },
  {
    icon: 'C',
    title: 'Direct contact info',
    copy: 'Call or email contractors in one click and move before competitors.',
  },
]

const socialProofCards = [
  {
    quote: 'ScoutLead keeps my crew busy with leads that actually convert. We stopped wasting mornings digging through city sites.',
    name: 'Marcus R.',
    role: 'Electrical Contractor',
  },
  {
    quote: 'The clean feed and direct contact info save us hours every week. It feels built for people who need answers fast.',
    name: 'Tanya L.',
    role: 'General Contractor',
  },
  {
    quote: 'We get to the right jobs first. That alone has made a real difference in our close rate.',
    name: 'David P.',
    role: 'HVAC Owner',
  },
]

const faqItems = [
  {
    question: 'How quickly do new leads show up?',
    answer: 'New permits are surfaced as soon as they are available, so your team can move before the market gets crowded.',
  },
  {
    question: 'What kind of jobs does ScoutLead highlight?',
    answer: 'The feed focuses on active construction opportunities with the details contractors need to decide fast.',
  },
  {
    question: 'Can I focus on a specific trade?',
    answer: 'Yes. You can narrow the feed to the trades and project types that match your crew and schedule.',
  },
  {
    question: 'Is this built for mobile use?',
    answer: 'Absolutely. The layout is responsive, so your team can review leads from the office, truck, or job site.',
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans text-slate-900 hero-mesh">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl animate-[float_6s_ease-in-out_infinite]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl animate-[float_6s_ease-in-out_infinite]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-6rem] left-[-8rem] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-[float_6s_ease-in-out_infinite]"
        />

        <header className="sticky top-0 z-50 bg-white/95 px-6 py-4 backdrop-blur-md sm:px-8 border-b border-gray-200/50">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 transition-all duration-300 ease-in-out hover:opacity-80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
                SL
              </div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">ScoutLead</span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
              <a className="transition-all duration-300 ease-in-out hover:text-slate-900" href="#how-it-works">
                How it works
              </a>
              <a className="transition-all duration-300 ease-in-out hover:text-slate-900" href="#features">
                Features
              </a>
            </nav>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-150 ease-in-out hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-lg active:scale-95 active:bg-opacity-90"
            >
              Signup/Login
            </Link>
          </div>
        </header>

        <section className="relative z-10 px-6 pb-16 pt-6 sm:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm animate-fade-in-up">
                  Live permit intelligence
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl animate-crane-lift animate-fade-in-up-delay-1">
                  <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 bg-clip-text text-transparent">
                    Premium leads.
                  </span>{' '}
                  Delivered before the competition.
                </h1>
                <p className="text-base leading-relaxed text-slate-600 sm:text-lg animate-fade-in-up animate-fade-in-up-delay-2">
                  ScoutLead turns city permits into a live, prioritized feed. Filter by trade, capture
                  contractor details, and move faster with verified data.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 animate-fade-in-up animate-fade-in-up-delay-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-150 ease-in-out hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-lg active:scale-95 active:bg-opacity-90"
                >
                  Get the magic link
                </Link>
                <a
                  href="#how-it-works"
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
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Data quality</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">Verified</p>
                  <p className="text-sm text-slate-600">Trusted city sources</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-200/60 backdrop-blur">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 right-8 h-16 w-16 rounded-full bg-indigo-500/10 blur-2xl animate-[float_6s_ease-in-out_infinite]"
              />
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
                  <p className="mt-1 text-xs text-slate-500">Electrical and HVAC, $1.2M est.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Response speed</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">2.5x</p>
                    <p className="text-xs text-slate-500">Faster than spreadsheets</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trusted data</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">Daily</p>
                    <p className="text-xs text-slate-500">Updated every morning</p>
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

        <section id="how-it-works" className="relative z-10 px-6 pb-20 sm:px-8 scroll-mt-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl space-y-3 animate-[fade-up_1s_ease-out_both]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">How it works</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                From permit to pipeline in three steps.
              </h2>
              <p className="text-sm text-slate-600 sm:text-base">
                Everything is delivered in plain language, organized for quick calls and fast decisions.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.title}
                  className="group rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-slate-200/40 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-sm font-semibold text-indigo-600 transition-transform duration-300 group-hover:scale-110">
                      {step.step}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Step {step.step}
                    </p>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="relative z-10 px-6 pb-16 sm:px-8 scroll-mt-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Features</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Built for busy contractors.
                </h2>
                <p className="text-sm text-slate-600 sm:text-base">
                  Focus on the jobs that fit your crew and close faster with clean, actionable data.
                </p>
              </div>
              <Link
                href="/login"
                className="text-sm font-semibold text-indigo-600 transition-all duration-300 ease-in-out hover:text-indigo-500"
              >
                Request access
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featureCards.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-slate-200/40 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg animate-blueprint-reveal"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{feature.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="social-proof" className="relative z-10 px-6 py-20 sm:px-8 scroll-mt-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl space-y-3 animate-[fade-up_1s_ease-out_both]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Social proof</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Contractors use it to stay booked and stay ahead.
              </h2>
              <p className="text-sm text-slate-600 sm:text-base">
                Simple, modern testimonials from teams that want faster visibility into the right jobs.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {socialProofCards.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-slate-200/40 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-sm leading-relaxed text-slate-600">“{testimonial.quote}”</p>
                  <div className="mt-6 border-t border-slate-200/70 pt-4">
                    <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{testimonial.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="relative z-10 px-6 pb-24 sm:px-8 scroll-mt-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl space-y-3 animate-[fade-up_1s_ease-out_both]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">FAQ</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Straight answers for busy crews.
              </h2>
              <p className="text-sm text-slate-600 sm:text-base">
                No fluff, just the details contractors want before they ask for access.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg shadow-slate-200/30 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 focus:outline-none">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}
                      <span className="text-slate-400 transition-transform duration-300 group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="relative z-10 px-6 pb-24 sm:px-8 scroll-mt-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-8 rounded-3xl border border-slate-200/70 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-xl sm:p-12 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Ready to move faster</p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Win more bids with a live permit feed.
                </h2>
                <p className="text-sm text-white/70 sm:text-base">
                  Get your magic link and start receiving the best leads in your market today.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-150 ease-in-out hover:-translate-y-1 hover:bg-slate-100 hover:shadow-lg active:scale-95 active:bg-opacity-90"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
