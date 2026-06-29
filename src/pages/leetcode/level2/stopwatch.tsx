import { useEffect, useRef, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/stopwatch.css'

export default function StopwatchPage() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      if (startRef.current !== null) setElapsed(Date.now() - startRef.current)
    }, 100)
    return () => window.clearInterval(timer)
  }, [running])

  const toggle = () => {
    if (running) {
      setRunning(false)
      return
    }
    startRef.current = Date.now() - elapsed
    setRunning(true)
  }

  return (
    <ChallengePage eyebrow="Level 2" title="Stopwatch with Laps" summary="Start, stop, reset, and record lap times.">
      <div className="challenge-demo">
        <p className="challenge-metric">{(elapsed / 1000).toFixed(1)}s</p>
        <div className="challenge-actions">
          <button type="button" onClick={toggle}>{running ? 'Stop' : 'Start'}</button>
          <button type="button" onClick={() => { setElapsed(0); setLaps([]); startRef.current = null; setRunning(false) }}>Reset</button>
          <button type="button" onClick={() => setLaps((current) => [elapsed, ...current])}>Lap</button>
        </div>
        <ul className="challenge-list">
          {laps.map((lap, index) => <li key={`${lap}-${index}`}>Lap {index + 1}: {(lap / 1000).toFixed(1)}s</li>)}
        </ul>
      </div>
    </ChallengePage>
  )
}
