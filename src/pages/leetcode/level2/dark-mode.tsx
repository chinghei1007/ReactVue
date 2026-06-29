import { useEffect, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/dark-mode.css'

export default function DarkModePage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('challenge-theme') === 'dark' ? 'dark' : 'light')

  useEffect(() => {
    document.documentElement.dataset.challengeTheme = theme
    localStorage.setItem('challenge-theme', theme)
  }, [theme])

  return (
    <ChallengePage eyebrow="Level 2" title="Dark Mode with Persistence" summary="Persist the user's theme choice in localStorage.">
      <div className="challenge-demo">
        <button type="button" onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}>
          Switch to {theme === 'light' ? 'dark' : 'light'}
        </button>
        <p className="challenge-copy">Challenge theme: {theme}</p>
      </div>
    </ChallengePage>
  )
}
