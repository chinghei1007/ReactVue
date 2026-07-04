import { useEffect, useMemo, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/memory-card.css'

const symbols = ['🍎', '🍌', '🍇', '🍓']

export default function MemoryCardPage() {
  const deck = useMemo(() => [...symbols, ...symbols].sort(() => Math.random() - 0.5), [])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])

  useEffect(() => {
    if (flipped.length !== 2) return
    const [first, second] = flipped
    if (deck[first] === deck[second]) {
      setMatched((current) => [...current, first, second])
      setFlipped([])
      return
    }
    const timer = window.setTimeout(() => setFlipped([]), 700)
    return () => window.clearTimeout(timer)
  }, [deck, flipped])

  return (
    <ChallengePage eyebrow="Level 2" title="Memory Card Game" summary="Flip cards, match pairs, and track moves.">
      <div className="challenge-demo memory-card-page">
        <div className="challenge-grid">
          {deck.map((card, index) => {
            const isOpen = flipped.includes(index) || matched.includes(index)
            return (
              <button key={`${card}-${index}`} type="button" onClick={() => !isOpen && flipped.length < 2 && setFlipped((current) => [...current, index])}>
                {isOpen ? card : '❓'}
              </button>
            )
          })}
        </div>
      </div>
    </ChallengePage>
  )
}
