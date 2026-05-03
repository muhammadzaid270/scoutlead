export type Permit = {
  permit_id: string | number
  permit_type?: string | null
  issued_at?: string | null
  description?: string | null
  address?: string | null
  zip_code?: string | number | null
  work_class?: string | null
  contractor_phone?: string | null
  contractor_name?: string | null
  portal_link?: string | null
  total_new_add_sqft?: string | number | null
  estimated_cost?: string | number | null
}

export const getNumericValue = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

export const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value)

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export const formatIssuedDate = (issuedAt?: string | null) => {
  if (!issuedAt) {
    return 'Unknown'
  }

  const issuedDate = new Date(issuedAt)
  if (Number.isNaN(issuedDate.getTime())) {
    return 'Unknown'
  }

  const month = issuedDate.getUTCMonth() + 1
  const day = issuedDate.getUTCDate()
  const year = issuedDate.getUTCFullYear()

  return `${month}/${day}/${year}`
}

export const getDaysActiveBadge = (issuedAt?: string | null) => {
  if (!issuedAt) {
    return null
  }

  const issuedDate = new Date(issuedAt)
  if (Number.isNaN(issuedDate.getTime())) {
    return null
  }

  const issuedDayUtc = Date.UTC(
    issuedDate.getUTCFullYear(),
    issuedDate.getUTCMonth(),
    issuedDate.getUTCDate()
  )
  const today = new Date()
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  const diffMs = todayUtc - issuedDayUtc
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))

  if (diffDays === 0) {
    return {
      label: 'Issued Today',
      className: 'bg-green-100 text-green-800 border-green-200',
    }
  }

  if (diffDays === 1) {
    return {
      label: '1 Day Ago',
      className: 'bg-amber-100 text-amber-800 border-amber-200',
    }
  }

  return {
    label: `${diffDays} Days Ago`,
    className: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  }
}

export const getBudgetBadge = (estimatedCost: unknown) => {
  const numericValue = getNumericValue(estimatedCost)

  if (numericValue === null) {
    return {
      label: 'TBD',
      className: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    }
  }

  if (numericValue <= 1) {
    return {
      label: 'Bid Required',
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    }
  }

  return {
    label: formatCurrency(numericValue),
    className: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  }
}
