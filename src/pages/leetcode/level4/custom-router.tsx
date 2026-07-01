import { useEffect, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level4-custom-router.css'

type RouteMatch =
  | { name: 'home'; params: Record<string, string> }
  | { name: 'metrics'; params: Record<string, string> }
  | { name: 'user'; params: { id: string } }
  | { name: 'notFound'; params: Record<string, string> }

const baseHash = '#'

function readRoute() {
  return window.location.hash.replace(baseHash, '') || '/'
}

function matchRoute(path: string): RouteMatch {
  if (path === '/') return { name: 'home', params: {} }
  if (path === '/metrics') return { name: 'metrics', params: {} }
  const userMatch = path.match(/^\/user\/([^/]+)$/)
  if (userMatch) return { name: 'user', params: { id: userMatch[1] } }
  return { name: 'notFound', params: {} }
}

function navigate(path: string) {
  window.history.pushState({ path }, '', `${window.location.pathname}${window.location.search}${baseHash}${path}`)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function CustomRouterPage() {
  const [path, setPath] = useState('/')

  useEffect(() => {
    const sync = () => setPath(readRoute())
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const route = matchRoute(path)

  return (
    <ChallengePage
      eyebrow="Level 4"
      title="Build A Custom Router"
      summary="A tiny router built from `pushState`, `popstate`, and dynamic route matching without using React Router inside the demo."
    >
      <div className="level4-shell">
        <div className="router-shell">
          <div className="router-nav">
            <button type="button" onClick={() => navigate('/')}>Home</button>
            <button type="button" onClick={() => navigate('/metrics')}>Metrics</button>
            <button type="button" onClick={() => navigate('/user/42')}>User 42</button>
            <button type="button" onClick={() => navigate('/user/108')}>User 108</button>
          </div>
          <div className="router-view">
            <span className="route-badge">Current path: {path}</span>
            {route.name === 'home' ? <p>Home route rendered from a custom matcher.</p> : null}
            {route.name === 'metrics' ? <p>Metrics route rendered from a second static entry.</p> : null}
            {route.name === 'user' ? <p>Dynamic route matched user id: {route.params.id}</p> : null}
            {route.name === 'notFound' ? <p>No route matched this hash-backed path.</p> : null}
          </div>
        </div>
      </div>
    </ChallengePage>
  )
}
