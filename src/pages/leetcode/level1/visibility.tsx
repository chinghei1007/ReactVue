import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/visibility.css'

type VisibilityMode = 'remove' | 'collapse'

export default function VisibilityPage() {
  const [visible, setVisible] = useState(true)
  const [mode, setMode] = useState<VisibilityMode>('remove')

  return (
    <ChallengePage eyebrow="Level 1" title="Toggle Visibility" summary="Show or hide a paragraph with a button.">
      <div className="challenge-demo visibility-demo">
        <div className="visibility-controls">
          <label className="visibility-label" htmlFor="visibility-mode">
            Toggle type
          </label>
          <select
            id="visibility-mode"
            className="visibility-select"
            value={mode}
            onChange={(event) => setMode(event.target.value as VisibilityMode)}
          >
            <option value="remove">Type 1 - remove from DOM</option>
            <option value="collapse">Type 2 - collapse to height 0</option>
          </select>
        </div>

        <button
          type="button"
          className="visibility-toggle-btn"
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? 'Hide' : 'Show'} message
        </button>

        {mode === 'remove' ? (
          visible && (
            <div className="visibility-content">
              <p>This content is conditionally rendered.</p>
            </div>
          )
        ) : (
          <div className={`visibility-content ${visible ? 'visibility-content--open' : 'visibility-content--collapsed'}`}>
            <p>This content collapses to zero height.</p>
          </div>
        )}
      </div>
    </ChallengePage>
  )
}
