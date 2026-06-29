import { useEffect, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/counter.css'

export default function CounterPage() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const storedCount = Number(localStorage.getItem('leetcode-counter-count'))
    const storedStep = Number(localStorage.getItem('leetcode-counter-step'))
    if (!Number.isNaN(storedCount)) setCount(storedCount)
    if (!Number.isNaN(storedStep) && storedStep > 0) setStep(storedStep)
  }, [])

  useEffect(() => {
    localStorage.setItem('leetcode-counter-count', String(count))
    localStorage.setItem('leetcode-counter-step', String(step))
  }, [count, step])

  return (
    <ChallengePage eyebrow="Level 1" title="The Classic Counter" summary="Increment, decrement, reset, and step control.">
      <div className="challenge-demo counter-demo">
        <p className="challenge-metric">Count: {count}</p>
        <label className="challenge-field">
          Step size
          <input type="number" min="1" value={step} onChange={(event) => setStep(Math.max(1, Number(event.target.value) || 1))} />
        </label>
        <div className="challenge-actions">
          <button type="button" onClick={() => setCount((value) => value - step)}>
            - Decrement
          </button>
          <button type="button" onClick={() => setCount(0)}>
            Reset
          </button>
          <button type="button" onClick={() => setCount((value) => value + step)}>
            + Increment
          </button>
        </div>
      </div>
    </ChallengePage>
  )
}
