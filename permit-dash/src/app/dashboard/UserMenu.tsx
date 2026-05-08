'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type UserMenuProps = {
  email: string
  onSignOut: (formData: FormData) => void | Promise<void>
}

export default function UserMenu({ email, onSignOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const initial = email ? email[0].toUpperCase() : '?'
  const displayEmail = email || 'Account'

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 transition-transform duration-200 active:scale-95"
      >
        {initial}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-transparent transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`absolute right-0 top-full z-50 mt-2 w-64 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 ease-out ${
          isOpen ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="User menu"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 p-4">
          <div className="rounded-lg px-3 py-2 transition-colors hover:bg-gray-50">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              Signed in as
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900 break-all">{displayEmail}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2 p-4">
          <Link
            href="/settings"
            className="inline-flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:bg-gray-50"
          >
            Profile Settings
          </Link>

          <form action={onSignOut}>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:bg-gray-50 active:scale-95"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </div>
  )
}
