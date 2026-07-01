import { useEffect, useRef, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level4-memory-leak-detective.css'

const leakStats = {
  intervals: 0,
  listeners: 0,
}

function LeakyWidget() {
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      document.body.dataset.leakPulse = String(Date.now())
    }, 1000)
    const listener = () => {
      document.body.dataset.leakResize = String(window.innerWidth)
    }
    window.addEventListener('resize', listener)
    leakStats.intervals += 1
    leakStats.listeners += 1

    return () => {
      void intervalId
    }
  }, [])

  return <p>This component mounts timers and listeners without releasing them.</p>
}

function FixedWidget() {
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      document.body.dataset.fixedPulse = String(Date.now())
    }, 1000)
    const listener = () => {
      document.body.dataset.fixedResize = String(window.innerWidth)
    }
    window.addEventListener('resize', listener)
    leakStats.intervals += 1
    leakStats.listeners += 1

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('resize', listener)
      leakStats.intervals -= 1
      leakStats.listeners -= 1
    }
  }, [])

  return <p>This version removes its interval and resize listener during cleanup.</p>
}

export default function MemoryLeakDetectivePage() {
  const [mode, setMode] = useState<'leaky' | 'fixed'>('leaky')
  const [mounted, setMounted] = useState(false)
  const [, forceRender] = useState(0)
  const mountCount = useRef(0)

  useEffect(() => {
    if (!mounted) return
    mountCount.current += 1
    const timer = window.setInterval(() => forceRender((value) => value + 1), 500)
    return () => window.clearInterval(timer)
  }, [mounted])

  return (
    <ChallengePage
      eyebrow="Level 4"
      title="Memory Leak Detective"
      summary="Toggle a leaky component, watch orphaned subscriptions accumulate, then compare with the cleaned-up version."
    >
      <div className="leak-shell">
        <div className="leak-actions">
          <button type="button" onClick={() => setMode('leaky')}>Show leaky version</button>
          <button type="button" onClick={() => setMode('fixed')}>Show fixed version</button>
          <button type="button" onClick={() => setMounted((value) => !value)}>{mounted ? 'Unmount widget' : 'Mount widget'}</button>
        </div>
        <div className="leak-grid">
          <article className="leak-card">
            <strong>Runtime counters</strong>
            <p>Mount toggles: {mountCount.current}</p>
            <p>Tracked intervals: {leakStats.intervals}</p>
            <p>Tracked listeners: {leakStats.listeners}</p>
            {mounted ? (mode === 'leaky' ? <LeakyWidget /> : <FixedWidget />) : <p>Widget currently unmounted.</p>}
          </article>
          <article className="leak-card">
            <strong>Leak pattern</strong>
            <pre>{`useEffect(() => {
  const id = setInterval(work, 1000)
  window.addEventListener('resize', onResize)
  return () => {
    // leaked: cleanup omitted
  }
}, [])`}</pre>
          </article>
          <article className="leak-card">
            <strong>Fixed pattern</strong>
            <pre>{`useEffect(() => {
  const id = setInterval(work, 1000)
  window.addEventListener('resize', onResize)
  return () => {
    clearInterval(id)
    window.removeEventListener('resize', onResize)
  }
}, [])`}</pre>
          </article>
        </div>
      </div>
    </ChallengePage>
  )
}
