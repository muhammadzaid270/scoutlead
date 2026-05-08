import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PaginationControls from './PaginationControls'
import PermitCardGrid from './PermitCardGrid'
import TradeFilter from './TradeFilter'

export const revalidate = 0;

type SearchParams = { trade?: string; class?: string; page?: string }

const pageSize = 50

const parsePositiveInt = (value?: string) => {
  if (!value) {
    return null
  }

  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

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

async function signOut() {
  'use server'
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/')
}


// Next.js passes URL parameters into this component
export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams | Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams;
  const selectedTrade = resolvedSearchParams.trade || 'All';
  const currentPage = parsePositiveInt(resolvedSearchParams.page) ?? 1

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthenticated = Boolean(user)
  const userEmail = user?.email ?? ''
  const userInitial = userEmail ? userEmail[0].toUpperCase() : '?'
  const userEmailDisplay = userEmail
    ? userEmail.length > 24
      ? `${userEmail.slice(0, 21)}...`
      : userEmail
    : 'Account'

  // 1. Start building the database query
  let query = supabase
    .from('permits')
    .select('*', { count: 'exact' })
    .order('issued_at', { ascending: false })

  // 2. Apply the trade filter if the user selected one
  if (selectedTrade !== 'All') {
    // We use ilike to catch things like "Electrical Permit" or "Plumbing Permit"
    query = query.ilike('permit_type', `%${selectedTrade}%`);
  }

  const rangeFrom = (currentPage - 1) * pageSize
  const rangeTo = rangeFrom + pageSize - 1
  query = query.range(rangeFrom, rangeTo)

  // 3. Execute the query
  const { data: permits, error, count } = await query;

  const totalCount = count ?? permits?.length ?? 0
  const hasPrevPage = currentPage > 1
  const hasNextPage = count !== null && count !== undefined
    ? currentPage * pageSize < count
    : (permits?.length ?? 0) === pageSize

  if (error) {
    return <div className="p-10 text-red-500">Error loading leads: {error.message}</div>
  }

  return (
    <main className="min-h-screen p-8 font-sans app-surface">
      <div className="max-w-7xl mx-auto">

        {/* Dashboard Header */}
        <header className="sticky top-0 z-10 mb-8 rounded-2xl bg-white/80 backdrop-blur-md p-6 shadow-sm border border-gray-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Live Permit Leads</h1>
              <p className="text-zinc-500 mt-1">Displaying the newest approved construction jobs in Austin.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-zinc-100/80 text-zinc-700 px-4 py-2 rounded-lg font-medium flex items-center border border-zinc-200/60">
                <MapPin className="w-4 h-4 mr-2" />
                Austin, TX
              </div>
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/80 px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 font-semibold">
                      {userInitial}
                    </span>
                    <span className="hidden md:inline" title={userEmail}>
                      {userEmailDisplay}
                    </span>
                  </div>
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200 active:scale-95"
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200 active:scale-95"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* The Filter Bar */}
          <TradeFilter initialTrade={selectedTrade} />
        </header>

        {/* Results Counter */}
        <div className="mb-4 text-sm font-medium text-zinc-500">
          Found {totalCount} active leads {selectedTrade !== 'All' ? `for ${selectedTrade}` : ''}
        </div>

        {/* The Leads Grid */}
        <PermitCardGrid permits={permits} />

        {(permits?.length ?? 0) > 0 && (
          <PaginationControls
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}

        {/* Empty State */}
        {permits?.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200/60 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-zinc-500 mb-6">Try selecting a different trade or clear all filters.</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 active:scale-95"
            >
              Clear All Filters
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}