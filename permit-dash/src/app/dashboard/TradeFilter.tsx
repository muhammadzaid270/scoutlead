'use client'

import { Filter } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type TradeFilterProps = {
  initialTrade?: string
}

const tradeOptions = [
  { value: 'All', label: 'All Trades' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Plumbing', label: 'Plumbing' },
  { value: 'Mechanical', label: 'HVAC / Mechanical' },
  { value: 'Building', label: 'General Building' },
  { value: 'Demolition', label: 'Demolition' },
]

export default function TradeFilter({ initialTrade = 'All' }: TradeFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedTrade, setSelectedTrade] = useState(initialTrade)

  useEffect(() => {
    setSelectedTrade(searchParams.get('trade') ?? initialTrade)
  }, [searchParams, initialTrade])

  const updateTrade = (nextTrade: string) => {
    setSelectedTrade(nextTrade)
    const params = new URLSearchParams(searchParams.toString())

    if (nextTrade === 'All') {
      params.delete('trade')
    } else {
      params.set('trade', nextTrade)
    }

    params.delete('page')

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <div className="sticky top-4 z-40 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
      <div className="flex items-center text-zinc-500 font-medium text-sm mr-2">
        <Filter className="w-4 h-4 mr-2" />
        Filters:
      </div>
      <select
        name="trade"
        value={selectedTrade}
        onChange={(event) => updateTrade(event.target.value)}
        className="bg-white border border-gray-200/60 text-gray-900 text-sm rounded-lg focus:ring-gray-900/20 focus:border-gray-300 block p-2.5 cursor-pointer outline-none transition-all duration-200 hover:bg-gray-50 active:scale-95"
      >
        {tradeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => updateTrade(selectedTrade)}
        className="bg-gray-900 text-white hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 active:scale-95"
      >
        Apply Filter
      </button>
    </div>
  )
}
