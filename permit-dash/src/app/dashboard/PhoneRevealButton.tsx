'use client'

import { Loader2, Lock, X } from 'lucide-react'
import { useState } from 'react'
import { revealPhoneNumber } from './actions'

type PhoneRevealButtonProps = {
  phoneNumber?: string | null
}

export default function PhoneRevealButton({ phoneNumber }: PhoneRevealButtonProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const normalizedPhone = phoneNumber?.trim() ?? ''
  const hasNumber = normalizedPhone.length > 0

  const handleReveal = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (isRevealed || isLoading || !hasNumber) {
      return
    }

    setIsLoading(true)
    const result = await revealPhoneNumber()
    setIsLoading(false)

    if (result.success) {
      setIsRevealed(true)
      return
    }

    if (result.error === 'limit_reached') {
      setShowModal(true)
    }
  }

  return (
    <>
      <div className="flex-1">
        {isRevealed && hasNumber ? (
          <a
            href={`tel:${normalizedPhone}`}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-green-700 active:scale-95"
          >
            {normalizedPhone}
          </a>
        ) : (
          <button
            type="button"
            onClick={handleReveal}
            disabled={isLoading || !hasNumber}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-green-300"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </span>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                {hasNumber ? 'Reveal Contact Info' : 'Unavailable'}
              </>
            )}
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Pro
              </span>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900">Unlock Unlimited Leads</h3>
            <p className="mt-2 text-sm text-slate-600">
              You have reached the 5-contact preview limit. Upgrade to reveal every phone number and
              keep crews moving.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95"
              >
                Upgrade to Premium
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors duration-150 hover:bg-slate-50"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
