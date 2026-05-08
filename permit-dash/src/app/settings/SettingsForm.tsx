'use client'

import { Building2, Loader2, Phone, User } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'
import { updateProfile, type ProfileFormState } from './actions'

type SettingsFormProps = {
  defaultValues: {
    fullName: string
    companyName: string
    phone: string
  }
}

const initialState: ProfileFormState = {
  status: 'idle',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-lg active:scale-95 active:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </span>
      ) : (
        'Save Changes'
      )}
    </button>
  )
}

export default function SettingsForm({ defaultValues }: SettingsFormProps) {
  const [state, formAction] = useFormState(updateProfile, initialState)

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <div className="space-y-2">
        <label htmlFor="full_name" className="block text-sm font-medium text-slate-700">
          Full name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            defaultValue={defaultValues.fullName}
            className="block w-full rounded-2xl border border-gray-300 bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="company_name" className="block text-sm font-medium text-slate-700">
          Company name
        </label>
        <div className="relative">
          <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="company_name"
            name="company_name"
            type="text"
            autoComplete="organization"
            placeholder="Company or team"
            defaultValue={defaultValues.companyName}
            className="block w-full rounded-2xl border border-gray-300 bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Phone number
        </label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            defaultValue={defaultValues.phone}
            className="block w-full rounded-2xl border border-gray-300 bg-white px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      {state.status === 'error' && state.message ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      ) : state.status === 'success' && state.message ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {state.message}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-slate-500">
          Keep your profile current so clients recognize you in ScoutLead outreach.
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
