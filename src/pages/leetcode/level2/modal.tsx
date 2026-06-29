import { useEffect, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/modal.css'

export default function ModalPage() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <ChallengePage eyebrow="Level 2" title="Modal / Dialog Box" summary="Close via backdrop, X button, or Escape key.">
      <div className="challenge-demo">
        <button type="button" onClick={() => setOpen(true)}>Open modal</button>
        {open ? (
          <div className="challenge-modal-backdrop" onClick={() => setOpen(false)} role="presentation">
            <div className="challenge-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
              <button type="button" onClick={() => setOpen(false)}>Close</button>
              <p className="challenge-copy">This is a modal dialog.</p>
            </div>
          </div>
        ) : null}
      </div>
    </ChallengePage>
  )
}
