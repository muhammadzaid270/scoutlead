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
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="User menu"
      >
        <div className="flex items-start justify-between border-b border-slate-200 p-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Signed in as
            </p>
            <p className="text-sm font-semibold text-slate-900 break-all">{displayEmail}</p>
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

        <div className="space-y-4 p-6">
          <Link
            href="/settings"
            className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-slate-900"
          >
            Profile Settings
          </Link>

          <form action={onSignOut}>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </div>
  )
}
