import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level3-undo-redo.css'

type HistoryState = {
  past: string[]
  present: string
  future: string[]
}

const initialHistory: HistoryState = {
  past: [],
  present: 'Refine the visualizer onboarding copy here.',
  future: [],
}

export default function UndoRedoPage() {
  const [history, setHistory] = useState(initialHistory)

  const updateValue = (value: string) => {
    setHistory((current) => ({
      past: [...current.past, current.present],
      present: value,
      future: [],
    }))
  }

  const undo = () => {
    setHistory((current) => {
      if (!current.past.length) return current
      const previous = current.past[current.past.length - 1]
      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      }
    })
  }

  const redo = () => {
    setHistory((current) => {
      if (!current.future.length) return current
      const [next, ...rest] = current.future
      return {
        past: [...current.past, current.present],
        present: next,
        future: rest,
      }
    })
  }

  return (
    <ChallengePage
      eyebrow="Level 3"
      title="Undo / Redo Functionality"
      summary="Track past, present, and future state for a text editor surface and travel through the history stack."
    >
      <div className="undo-shell">
        <div className="undo-actions">
          <button type="button" onClick={undo} disabled={!history.past.length}>Undo</button>
          <button type="button" onClick={redo} disabled={!history.future.length}>Redo</button>
          <button type="button" onClick={() => setHistory(initialHistory)}>Reset</button>
        </div>
        <div className="undo-panel level3-panel">
          <textarea value={history.present} onChange={(event) => updateValue(event.target.value)} />
        </div>
        <div className="undo-history">
          <span>Past states: {history.past.length}</span>
          <span>Future states: {history.future.length}</span>
        </div>
      </div>
    </ChallengePage>
  )
}
