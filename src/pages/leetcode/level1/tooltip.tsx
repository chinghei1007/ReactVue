import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/tooltip.css'

export default function TooltipPage() {
  const [show, setShow] = useState(false)

  return (
    <ChallengePage eyebrow="Level 1" title="Tooltip" summary="Show a small label when hovering an element.">
      <div className="challenge-demo tooltip-demo">
        <button 
          type="button" 
          className="tooltip-trigger"
          onMouseEnter={() => setShow(true)} 
          onMouseLeave={() => setShow(false)}
        >
          Hover me
        </button>
        {show && (
          <div className="challenge-tooltip">This is a tooltip.</div>
        )}
      </div>
    </ChallengePage>
  )
}
