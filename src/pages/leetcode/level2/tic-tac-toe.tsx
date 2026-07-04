import { useMemo, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/tic-tac-toe.css'

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(board: string[]) {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
  }
  return ''
}

export default function TicTacToePage() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill('')])
  const [step, setStep] = useState(0)
  const xIsNext = step % 2 === 0
  const current = history[step]
  const winner = useMemo(() => calculateWinner(current), [current])

  const play = (index: number) => {
    if (current[index] || winner) return
    const next = current.slice()
    next[index] = xIsNext ? 'X' : 'O'
    setHistory((currentHistory) => [...currentHistory.slice(0, step + 1), next])
    setStep(step + 1)
  }

  return (
    <ChallengePage eyebrow="Level 2" title="Tic-Tac-Toe" summary="Play a full game and step backward through move history.">
      <div className="challenge-demo tic-tac-toe-page">
        <div className="challenge-grid">
          {current.map((cell, index) => (
            <button key={index} type="button" onClick={() => play(index)}>{cell}</button>
          ))}
        </div>
        <p className="challenge-copy">{winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}</p>
        <div className="challenge-actions">
          <button type="button" onClick={() => { setHistory([Array(9).fill('')]); setStep(0) }}>Restart</button>
          {history.map((_, move) => (
            <button key={move} type="button" onClick={() => setStep(move)}>
              Go to move {move}
            </button>
          ))}
        </div>
      </div>
    </ChallengePage>
  )
}
