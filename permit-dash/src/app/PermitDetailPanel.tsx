'use client'

import { useEffect } from 'react'
import { Briefcase, Calendar, DollarSign, MapPin, Phone, Ruler, User, X } from 'lucide-react'
import {
  type Permit,
  formatIssuedDate,
  formatNumber,
  getBudgetBadge,
  getDaysActiveBadge,
  getNumericValue,
} from './permitUtils'

type PermitDetailPanelProps = {
  isOpen: boolean
  permit: Permit | null
  onClose: () => void
}

const PermitDetailPanel = ({ isOpen, permit, onClose }: PermitDetailPanelProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!permit) {
    return null
  }

  const addressLine = [permit.address, permit.zip_code].filter(Boolean).join(' ')
  const issuedDate = formatIssuedDate(permit.issued_at)
  const daysBadge = getDaysActiveBadge(permit.issued_at)
  const budgetBadge = getBudgetBadge(permit.estimated_cost)
  const sqftValue = getNumericValue(permit.total_new_add_sqft)
  const sqftDisplay = typeof sqftValue === 'number' && sqftValue > 0 ? formatNumber(sqftValue) : null

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-lg transform bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Permit details"
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-zinc-200/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Permit Type</p>
                <h2 className="text-xl font-semibold text-zinc-900">
                  {permit.permit_type || 'General Permit'}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-100 px-2 py-1 font-medium text-zinc-600">
                    <Calendar className="h-3 w-3" />
                    {issuedDate}
                  </span>
                  {daysBadge && (
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-1 font-semibold ${daysBadge.className}`}
                    >
                      {daysBadge.label}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Close panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            <div className="flex items-center gap-3 text-sm text-zinc-700">
              <User className="h-4 w-4 text-zinc-400" />
              <span className="font-medium">{permit.contractor_name || 'Contractor unavailable'}</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-zinc-700">
              <MapPin className="mt-0.5 h-4 w-4 text-zinc-400" />
              <span>{addressLine || 'Address missing'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-700">
              <Briefcase className="h-4 w-4 text-zinc-400" />
              <span>{permit.work_class || 'Standard'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-700">
              <DollarSign className="h-4 w-4 text-zinc-400" />
              <span
                className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold ${budgetBadge.className}`}
              >
                {budgetBadge.label}
              </span>
            </div>
            {sqftDisplay && (
              <div className="flex items-center gap-3 text-sm text-zinc-700">
                <Ruler className="h-4 w-4 text-zinc-400" />
                <span>{sqftDisplay} sqft</span>
              </div>
            )}
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-zinc-900">Job Details</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 whitespace-pre-line">
                {permit.description || 'No description provided.'}
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-200/70 p-6">
            {permit.contractor_phone ? (
              <a
                href={`tel:${permit.contractor_phone}`}
                className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-green-700"
              >
                <Phone className="h-4 w-4" />
                Call {permit.contractor_phone}
              </a>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-green-100 px-4 py-3 text-sm font-semibold text-green-700">
                <Phone className="h-4 w-4" />
                Call Unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PermitDetailPanel
