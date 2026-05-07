'use client'

import { useEffect, useState } from 'react'
import { Briefcase, Calendar, DollarSign, ExternalLink, MapPin, Phone, Ruler } from 'lucide-react'
import PermitDetailPanel from './PermitDetailPanel'
import {
  type Permit,
  formatIssuedDate,
  formatNumber,
  getBudgetBadge,
  getDaysActiveBadge,
  getNumericValue,
} from './permitUtils'

type PermitCardGridProps = {
  permits: Permit[] | null
}

const PermitCardGrid = ({ permits }: PermitCardGridProps) => {
  const [activePermit, setActivePermit] = useState<Permit | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  useEffect(() => {
    if (isPanelOpen) {
      return
    }

    const timer = setTimeout(() => setActivePermit(null), 200)
    return () => clearTimeout(timer)
  }, [isPanelOpen])

  const handleOpen = (permit: Permit) => {
    setActivePermit(permit)
    setIsPanelOpen(true)
  }

  const handleClose = () => {
    setIsPanelOpen(false)
  }

  const handleActionClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  if (!permits || permits.length === 0) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {permits.map((permit, index) => {
          const sqftValue = getNumericValue(permit.total_new_add_sqft)
          const sqftDisplay = typeof sqftValue === 'number' && sqftValue > 0 ? formatNumber(sqftValue) : null
          const issuedDate = formatIssuedDate(permit.issued_at)
          const daysBadge = getDaysActiveBadge(permit.issued_at)
          const budgetBadge = getBudgetBadge(permit.estimated_cost)
          const addressLine = [permit.address, permit.zip_code].filter(Boolean).join(' ')

          return (
            <div
              key={permit.permit_id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpen(permit)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleOpen(permit)
                }
              }}
              className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 flex flex-col group animate-fade-in-up cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200/60">
                  {permit.permit_type || 'General'}
                </span>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-zinc-500 flex items-center font-medium bg-zinc-100/70 px-2 py-1 rounded-md border border-zinc-200/60">
                    <Calendar className="w-3 h-3 mr-1" />
                    {issuedDate}
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
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    <Ruler className="w-3 h-3 mr-1" />
                    {sqftDisplay} sqft
                  </span>
                )}
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${budgetBadge.className}`}
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  {budgetBadge.label}
                </span>
              </div>

              <h3 className="text-sm text-zinc-900 mb-6 leading-relaxed flex-grow min-h-[4.5rem]">
                {permit.description || 'No description provided.'}
              </h3>

              <div className="space-y-3 mt-auto border-t border-gray-100/80 pt-4">
                <div className="flex items-start text-sm text-zinc-600">
                  <MapPin className="w-4 h-4 mr-2.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{addressLine || 'Address missing'}</span>
                </div>

                <div className="flex items-center text-sm text-zinc-600">
                  <Briefcase className="w-4 h-4 mr-2.5 text-zinc-400 shrink-0" />
                  <span className="font-medium">{permit.work_class || 'Standard'}</span>
                </div>

                <div className="flex gap-2 mt-4 pt-2">
                  <a
                    href={permit.contractor_phone ? `tel:${permit.contractor_phone}` : '#'}
                    onClick={(event) => {
                      handleActionClick(event)
                      if (!permit.contractor_phone) {
                        event.preventDefault()
                      }
                    }}
                    className="flex-1 flex justify-center items-center text-sm font-bold text-white bg-green-600 hover:bg-green-700 p-2.5 rounded-lg transition-all duration-200 active:scale-95"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {permit.contractor_phone ? permit.contractor_phone : 'N/A'}
                  </a>

                  {permit.portal_link && (
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
          )
        })}
      </div>

      <PermitDetailPanel isOpen={isPanelOpen} permit={activePermit} onClose={handleClose} />
    </>
  )
}

export default PermitCardGrid
