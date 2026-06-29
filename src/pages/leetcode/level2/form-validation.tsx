import { useMemo, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/form-validation.css'

export default function FormValidationPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const errors = useMemo(() => ({
    name: form.name.trim().length < 2 ? 'Name must be at least 2 characters.' : '',
    email: /\S+@\S+\.\S+/.test(form.email) ? '' : 'Enter a valid email.',
    password: form.password.length < 8 ? 'Password must be at least 8 characters.' : '',
    confirm: form.confirm === form.password ? '' : 'Passwords do not match.',
  }), [form])

  const isValid = Object.values(errors).every((error) => !error) && Object.values(form).every((value) => value.trim().length > 0)

  return (
    <ChallengePage eyebrow="Level 2" title="Multi-field Form Validation" summary="Validate name, email, password, and confirmation in real time.">
      <div className="challenge-demo">
        {(['name', 'email', 'password', 'confirm'] as const).map((field) => (
          <label key={field} className="challenge-field">
            {field}
            <input
              type={field.includes('password') ? 'password' : 'text'}
              value={form[field]}
              onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
            />
            {errors[field] ? <span>{errors[field]}</span> : null}
          </label>
        ))}
        <button type="button" disabled={!isValid}>Submit</button>
      </div>
    </ChallengePage>
  )
}
