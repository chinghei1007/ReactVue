import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level3-wizard-form.css'

type FormState = {
  name: string
  email: string
  role: string
  goal: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  role: '',
  goal: '',
}

export default function WizardFormPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const validateStep = () => {
    if (step === 0 && !form.name.trim()) return 'Name is required.'
    if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email address.'
    if (step === 2 && !form.role.trim()) return 'Role is required.'
    if (step === 3 && form.goal.trim().length < 10) return 'Goal must be at least 10 characters.'
    return ''
  }

  const nextStep = () => {
    const nextError = validateStep()
    setError(nextError)
    if (!nextError) setStep((current) => Math.min(current + 1, 3))
  }

  return (
    <ChallengePage
      eyebrow="Level 3"
      title="Multi-Step Wizard Form"
      summary="Move through four validated steps, preserve every field, and show progress while navigating."
    >
      <div className="wizard-shell">
        <div className="wizard-progress">
          <strong>Step {step + 1} / 4</strong>
          <span>{Math.round(((step + 1) / 4) * 100)}%</span>
        </div>
        <div className="wizard-bar">
          <div className="wizard-bar-fill" style={{ width: `${((step + 1) / 4) * 100}%` }} />
        </div>
        <div className="level3-panel wizard-fields">
          {step === 0 ? (
            <label className="wizard-field">
              <span>Full Name</span>
              <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
            </label>
          ) : null}
          {step === 1 ? (
            <label className="wizard-field">
              <span>Email</span>
              <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
            </label>
          ) : null}
          {step === 2 ? (
            <label className="wizard-field">
              <span>Role</span>
              <input value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))} />
            </label>
          ) : null}
          {step === 3 ? (
            <label className="wizard-field">
              <span>Primary Goal</span>
              <input value={form.goal} onChange={(event) => setForm((current) => ({ ...current, goal: event.target.value }))} />
            </label>
          ) : null}
          {error ? <p className="wizard-error">{error}</p> : null}
        </div>
        <div className="wizard-actions">
          <button type="button" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>Back</button>
          {step < 3 ? (
            <button type="button" onClick={nextStep}>Next</button>
          ) : (
            <button
              type="button"
              onClick={() => {
                const nextError = validateStep()
                setError(nextError || 'All steps validated. Form is ready to submit.')
              }}
            >
              Validate
            </button>
          )}
        </div>
      </div>
    </ChallengePage>
  )
}
