'use client'

import { useState } from 'react'
import { Loader2, Lock, X } from 'lucide-react'

type PhoneRevealButtonProps = {
  phoneNumber?: string | null
  isRevealed: boolean
  isLoading: boolean
  onReveal: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function PhoneRevealButton({
  phoneNumber,
  isRevealed,
  isLoading,
  onReveal,
}: PhoneRevealButtonProps) {
  const normalizedPhone = phoneNumber?.trim() ?? ''
  const hasNumber = normalizedPhone.length > 0

  return (
    <div className="flex-1">
      {isRevealed ? (
        hasNumber ? (
          <a
            href={`tel:${normalizedPhone}`}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-green-700 active:scale-95"
          >
            {normalizedPhone}
          </a>
        ) : (
          <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-100 px-3 py-2.5 text-sm font-semibold text-green-700">
            Unavailable
          </div>
        )
      ) : (
        <button
          type="button"
          onClick={onReveal}
          disabled={isLoading}
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
              Reveal Contact Info
            </>
          )}
        </button>
      )}
    </div>
  )
}
                <Lock className="h-4 w-4" />
