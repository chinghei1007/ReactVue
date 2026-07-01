import { useEffect, useRef, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level3-context-menu.css'

type MenuPosition = { x: number; y: number } | null

const actions = ['Rename Layer', 'Duplicate Layer', 'Export Snapshot']

export default function ContextMenuPage() {
  const [position, setPosition] = useState<MenuPosition>(null)
  const [message, setMessage] = useState('Right-click the stage to open the custom menu.')
  const surfaceRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!position) return
    const close = () => setPosition(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [position])

  return (
    <ChallengePage
      eyebrow="Level 3"
      title="Custom Context Menu"
      summary="Intercept the browser context menu, place a custom menu at the pointer, and close it when the user clicks away."
    >
      <div className="level3-shell">
        <div className="context-menu-header">
          <strong>{message}</strong>
        </div>
        <div
          ref={surfaceRef}
          className="level3-context-surface"
          onContextMenu={(event) => {
            event.preventDefault()
            const bounds = surfaceRef.current?.getBoundingClientRect()
            if (!bounds) return
            const menuWidth = 180
            const menuHeight = 150
            const x = Math.min(event.clientX - bounds.left, bounds.width - menuWidth - 12)
            const y = Math.min(event.clientY - bounds.top, bounds.height - menuHeight - 12)
            setPosition({ x: Math.max(12, x), y: Math.max(12, y) })
          }}
        >
          <p>Right-click anywhere in this stage.</p>
          {position ? (
            <div className="context-menu" style={{ left: position.x, top: position.y }}>
              {actions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => {
                    setMessage(`Action fired: ${action}`)
                    setPosition(null)
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </ChallengePage>
  )
}
