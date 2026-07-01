import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/visibility.css'

export default function VisibilityPage() {
  const [visible, setVisible] = useState(true)

  return (
    <ChallengePage eyebrow="Level 1" title="Toggle Visibility" summary="Show or hide a paragraph with a button.">
      <div className="challenge-demo visibility-demo">
        <button 
          type="button" 
          className="visibility-toggle-btn"
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? 'Hide' : 'Show'} message
        </button>
        {visible && (
          <div className="visibility-content">
            <p>This content is conditionally rendered.</p>
          </div>
        )}
      </div>
    </ChallengePage>
  )
}
