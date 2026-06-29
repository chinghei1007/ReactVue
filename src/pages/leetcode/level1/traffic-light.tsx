import { useEffect, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/traffic-light.css'

const lights = ['red', 'yellow', 'green'] as const

export default function TrafficLightPage() {
  const [active, setActive] = useState<(typeof lights)[number]>('red')
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      setActive((current) => lights[(lights.indexOf(current) + 1) % lights.length])
    }, 1200)
    return () => window.clearInterval(timer)
  }, [running])

  return (
    <ChallengePage eyebrow="Level 1" title="Traffic Light" summary="Cycle through Red, Yellow, and Green on a timer.">
      <div className="challenge-demo">
        <div className="traffic-light-stage" data-active={active}>
          {lights.map((light) => <span key={light} className={`traffic-light ${light}`} />)}
        </div>
        <div className="challenge-actions">
          <button type="button" onClick={() => setRunning((value) => !value)}>{running ? 'Stop' : 'Start'} auto cycle</button>
          <button type="button" onClick={() => setActive('red')}>Red</button>
          <button type="button" onClick={() => setActive('yellow')}>Yellow</button>
          <button type="button" onClick={() => setActive('green')}>Green</button>
        </div>
      </div>
    </ChallengePage>
  )
}
