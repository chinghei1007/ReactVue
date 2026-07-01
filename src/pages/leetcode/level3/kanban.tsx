import { useMemo, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level3-kanban.css'

type ColumnId = 'backlog' | 'inProgress' | 'done'
type Card = { id: string; title: string }
type BoardState = Record<ColumnId, Card[]>
type DragPayload = { cardId: string; fromColumn: ColumnId; fromIndex: number }

const initialBoard: BoardState = {
  backlog: [
    { id: 'card-1', title: 'Map playback controls' },
    { id: 'card-2', title: 'Tune shader colors' },
  ],
  inProgress: [
    { id: 'card-3', title: 'Draft upload empty state' },
    { id: 'card-4', title: 'Benchmark render loop' },
  ],
  done: [{ id: 'card-5', title: 'Ship challenge layout' }],
}

const columns: { id: ColumnId; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

function moveCard(board: BoardState, payload: DragPayload, toColumn: ColumnId, toIndex: number) {
  const nextBoard: BoardState = {
    backlog: [...board.backlog],
    inProgress: [...board.inProgress],
    done: [...board.done],
  }

  const [card] = nextBoard[payload.fromColumn].splice(payload.fromIndex, 1)
  if (!card) return board

  const adjustedIndex = payload.fromColumn === toColumn && payload.fromIndex < toIndex ? toIndex - 1 : toIndex
  nextBoard[toColumn].splice(adjustedIndex, 0, card)
  return nextBoard
}

export default function KanbanPage() {
  const [board, setBoard] = useState(initialBoard)
  const [dragState, setDragState] = useState<DragPayload | null>(null)
  const [hoverKey, setHoverKey] = useState('')

  const totalCards = useMemo(() => Object.values(board).flat().length, [board])

  return (
    <ChallengePage
      eyebrow="Level 3"
      title="Drag And Drop Kanban"
      summary="Drag cards between columns or reorder them in place using the native HTML5 drag and drop API."
    >
      <div className="level3-shell">
        <div className="level3-meta">
          <span>{totalCards} cards across 3 columns</span>
          <button type="button" className="level3-button" onClick={() => setBoard(initialBoard)}>Reset board</button>
        </div>
        <div className="kanban-board">
          {columns.map((column) => (
            <section
              key={column.id}
              className="level3-column"
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (!dragState) return
                setBoard((current) => moveCard(current, dragState, column.id, current[column.id].length))
                setDragState(null)
                setHoverKey('')
              }}
            >
              <div className="kanban-column-header">
                <strong>{column.title}</strong>
                <span>{board[column.id].length}</span>
              </div>
              <div className="kanban-stack">
                {board[column.id].map((card, index) => {
                  const dropKey = `${column.id}-${index}`
                  return (
                    <div
                      key={card.id}
                      className={`kanban-drop-zone ${hoverKey === dropKey ? 'is-over' : ''}`}
                      onDragOver={(event) => {
                        event.preventDefault()
                        setHoverKey(dropKey)
                      }}
                      onDragLeave={() => setHoverKey((value) => (value === dropKey ? '' : value))}
                      onDrop={(event) => {
                        event.preventDefault()
                        if (!dragState) return
                        setBoard((current) => moveCard(current, dragState, column.id, index))
                        setDragState(null)
                        setHoverKey('')
                      }}
                    >
                      <article
                        draggable
                        className={`kanban-card ${dragState?.cardId === card.id ? 'is-dragging' : ''}`}
                        onDragStart={() => setDragState({ cardId: card.id, fromColumn: column.id, fromIndex: index })}
                        onDragEnd={() => {
                          setDragState(null)
                          setHoverKey('')
                        }}
                      >
                        {card.title}
                      </article>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </ChallengePage>
  )
}
