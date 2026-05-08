'use client'

import { useState } from 'react'
import { Briefcase, Calendar, DollarSign, ExternalLink, MapPin, Ruler, X } from 'lucide-react'
import PermitDetailPanel from './PermitDetailPanel'
import PhoneRevealButton from './PhoneRevealButton'
import { revealPhoneNumber } from './actions'
import {
  type Permit,
  formatIssuedDate,
  formatNumber,
  getBudgetBadge,
  getDaysActiveBadge,
  getNumericValue,
} from './permitUtils'

type PermitCardProps = {
  permit: Permit
  index: number
}

const getTradeBadgeClass = (permitType?: string | null) => {
  const type = permitType?.toLowerCase() ?? ''

  if (type.includes('plumb')) {
    return 'bg-blue-50 border-blue-100'
  }

  if (type.includes('mech') || type.includes('hvac')) {
    return 'bg-orange-50 border-orange-100'
  }

  if (type.includes('build')) {
    return 'bg-zinc-100 border-zinc-200/60'
  }

  if (type.includes('elect')) {
    return 'bg-indigo-50 border-indigo-100'
  }

  if (type.includes('demo')) {
    return 'bg-rose-50 border-rose-100'
  }

  return 'bg-zinc-100 border-zinc-200/60'
}

export default function PermitCard({ permit, index }: PermitCardProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const sqftValue = getNumericValue(permit.total_new_add_sqft)
  const sqftDisplay = typeof sqftValue === 'number' && sqftValue > 0 ? formatNumber(sqftValue) : null
  const issuedDate = formatIssuedDate(permit.issued_at)
  const daysBadge = getDaysActiveBadge(permit.issued_at)
  const budgetBadge = getBudgetBadge(permit.estimated_cost)
  const addressLine = [permit.address, permit.zip_code].filter(Boolean).join(' ')
  const tradeBadgeClass = getTradeBadgeClass(permit.permit_type)
  const addressDisplay = isRevealed ? addressLine || 'Address missing' : 'Address hidden (Unlock to view)'
  const addressClasses = isRevealed ? 'text-zinc-900 font-semibold' : 'text-zinc-400 select-none'

  const handleOpen = () => {
    setIsPanelOpen(true)
  }

  const handleClose = () => {
    setIsPanelOpen(false)
  }

  const handleReveal = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (isLoading || isRevealed) {
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

  const handleActionClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setShowModal(false)
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleOpen()
          }
        }}
        className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-4 sm:p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 flex flex-col group animate-fade-in-up cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border text-zinc-900 ${tradeBadgeClass}`}
          >
            {permit.permit_type || 'General'}
          </span>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-zinc-500 flex items-center font-medium bg-zinc-100/70 px-2 py-1 rounded-md border border-zinc-200/60">
              <Calendar className="w-3 h-3 mr-1" />
              {issuedDate}
            </span>
            <span
              className="text-[11px] text-zinc-500 font-medium max-w-[140px] truncate"
              title={String(permit.permit_id)}
            >
              Permit #{permit.permit_id}
            </span>
            {daysBadge && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${daysBadge.className}`}>
                {daysBadge.label}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {sqftDisplay && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-zinc-900 border border-blue-100">
              <Ruler className="w-3 h-3 mr-1" />
              {sqftDisplay} sqft
            </span>
          )}
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border text-zinc-900 ${budgetBadge.className}`}
          >
            <DollarSign className="w-3 h-3 mr-1" />
            {budgetBadge.label}
          </span>
        </div>

        <h3 className="text-sm text-zinc-700 mb-6 leading-relaxed flex-grow min-h-[3.5rem] sm:min-h-[4.5rem]">
          {permit.description || 'No description provided.'}
        </h3>

        <div className="space-y-3 mt-auto border-t border-gray-100/80 pt-4">
          <div className={`flex items-start text-sm ${addressClasses}`}>
            <MapPin className="w-4 h-4 mr-2.5 text-zinc-400 shrink-0 mt-0.5" />
            <span className="leading-tight">{addressDisplay}</span>
          </div>

          <div className="flex items-center text-sm text-zinc-500">
            <Briefcase className="w-4 h-4 mr-2.5 text-zinc-400 shrink-0" />
            <span className="font-medium">{permit.work_class || 'Standard'}</span>
          </div>

          <div className="flex gap-2 mt-4 pt-2">
            <PhoneRevealButton
              phoneNumber={permit.contractor_phone}
              isRevealed={isRevealed}
              isLoading={isLoading}
              onReveal={handleReveal}
            />

            {isRevealed && permit.portal_link && (
              <a
                href={permit.portal_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleActionClick}
                className="flex justify-center items-center p-2.5 rounded-lg border border-gray-200/60 text-zinc-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 active:scale-95 tooltip text-sm font-medium"
                title="View on City Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <PermitDetailPanel
        isOpen={isPanelOpen}
        permit={permit}
        onClose={handleClose}
        isRevealed={isRevealed}
        isLoading={isLoading}
        onReveal={handleReveal}
      />

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Pro
              </span>
              <button
                type="button"
                onClick={handleCloseModal}
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
                onClick={handleCloseModal}
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
