import { useState } from 'react'
import ChallengePage from '@/customElements/ChallengePage'
import '@/styles/tooltip.css'

export default function TooltipPage() {
  const [show, setShow] = useState(false)

  return (
    <ChallengePage eyebrow="Level 1" title="Tooltip" summary="Show a small label when hovering an element.">
      <div className="challenge-demo tooltip-exercise">
        <button 
          type="button" 
          className="tooltip-exercise-trigger"
          onMouseEnter={() => setShow(true)} 
          onClick={() => setShow(true)} 
          onMouseLeave={() => setShow(false)}
        >
          Hover me
        </button>
        {show && (
          <div className="tooltip-exercise-popup">This is a tooltip.</div>
        )}
      </div>
    </ChallengePage>
  )
}
