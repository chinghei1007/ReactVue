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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }
  return { winner: '', line: [] as number[] }
}

export default function TicTacToePage() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''))
  const xIsNext = board.filter(cell => cell !== '').length % 2 === 0
  const { winner, line } = useMemo(() => calculateWinner(board), [board])
  const isDraw = !winner && board.every(cell => cell !== '')

  const play = (index: number) => {
    if (board[index] || winner) return
    const next = board.slice()
    next[index] = xIsNext ? 'X' : 'O'
    setBoard(next)
  }

  const reset = () => {
    setBoard(Array(9).fill(''))
  }

  return (
    <ChallengePage eyebrow="Level 2" title="Tic-Tac-Toe" summary="Play a full game. A red line highlights the winning combination.">
      <div className="challenge-demo tic-tac-toe-page">
        <div className="challenge-grid">
          {board.map((cell, index) => (
            <button 
              key={index} 
              type="button" 
              onClick={() => play(index)}
              className={line.includes(index) && winner ? 'winning-cell' : ''}
            >
              {cell}
            </button>
          ))}
          {winner && (
            <div className="winning-line" data-line={JSON.stringify(line)}></div>
          )}
        </div>
        <p className="challenge-copy">
          {winner ? `Winner: ${winner}` : isDraw ? "It's a draw!" : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </p>
        <div className="challenge-actions">
          <button type="button" onClick={reset}>Restart</button>
        </div>
      </div>
    </ChallengePage>
  )
}
