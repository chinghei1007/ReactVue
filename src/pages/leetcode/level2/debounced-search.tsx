import { useEffect, useMemo, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/debounced-search.css'

const names = ['Ada', 'Alan', 'Grace', 'Linus', 'Edsger', 'Barbara', 'Donald', 'Margaret', 'Ken', 'Bjarne']

export default function DebouncedSearchPage() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 300)
    return () => window.clearTimeout(timer)
  }, [query])

  const results = useMemo(() => names.filter((name) => name.toLowerCase().includes(debouncedQuery.toLowerCase())), [debouncedQuery])

  return (
    <ChallengePage eyebrow="Level 2" title="Debounced Search Filter" summary="Filter a list without running the search on every keystroke.">
      <div className="challenge-demo">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names" />
        <p className="challenge-copy">Searching for: {debouncedQuery || '...'}</p>
        <ul className="challenge-list">
          {results.map((name) => <li key={name}>{name}</li>)}
        </ul>
      </div>
    </ChallengePage>
  )
}
