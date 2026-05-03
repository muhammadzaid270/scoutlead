'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type PaginationControlsProps = {
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function PaginationControls({
  currentPage,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updatePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (nextPage <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(nextPage))
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const buttonBase = 'rounded-lg text-sm font-medium px-4 py-2.5 transition-all duration-200 active:scale-95'
  const buttonEnabled = 'bg-gray-900 text-white hover:bg-gray-800'
  const buttonDisabled = 'bg-zinc-100 text-zinc-400 cursor-not-allowed'

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm font-medium text-zinc-500">Page {currentPage}</div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => updatePage(currentPage - 1)}
          disabled={!hasPrevPage}
          className={`${buttonBase} ${hasPrevPage ? buttonEnabled : buttonDisabled}`}
        >
          Previous Page
        </button>
        <button
          type="button"
          onClick={() => updatePage(currentPage + 1)}
          disabled={!hasNextPage}
          className={`${buttonBase} ${hasNextPage ? buttonEnabled : buttonDisabled}`}
        >
          Next Page
        </button>
      </div>
    </div>
  )
}
