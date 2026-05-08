export default function Loading() {
  return (
    <main className="min-h-screen p-8 font-sans app-surface">
      <div className="max-w-7xl mx-auto animate-pulse">
        <header className="mb-8 bg-white/80 p-6 rounded-2xl shadow-sm border border-gray-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-gray-200 rounded" />
              <div className="h-4 w-80 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/80 px-3 py-1.5">
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <div className="hidden md:block h-4 w-28 bg-gray-200 rounded" />
              </div>
              <div className="h-9 w-28 bg-gray-200 rounded-lg" />
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-gray-200/60 pt-6">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-10 w-48 bg-gray-200 rounded-lg" />
            <div className="h-10 w-28 bg-gray-200 rounded-lg" />
          </div>
        </header>

        <div className="mb-4 h-4 w-48 bg-gray-200 rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="h-5 w-28 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
              </div>
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="flex gap-2 pt-2">
                  <div className="h-10 flex-1 bg-gray-200 rounded-lg" />
                  <div className="h-10 w-10 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
