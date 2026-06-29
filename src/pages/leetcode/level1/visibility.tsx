import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/visibility.css'

export default function VisibilityPage() {
  const [visible, setVisible] = useState(true)

  return (
    <ChallengePage eyebrow="Level 1" title="Toggle Visibility" summary="Show or hide a paragraph with a button.">
      <div className="challenge-demo">
        <button type="button" onClick={() => setVisible((value) => !value)}>
          {visible ? 'Hide' : 'Show'} message
        </button>
        {visible ? <p className="challenge-copy">This content is conditionally rendered.</p> : null}
      </div>
    </ChallengePage>
  )
}
