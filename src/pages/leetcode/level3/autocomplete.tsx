import { useEffect, useMemo, useRef, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level3-autocomplete.css'

const commandItems = Array.from({ length: 500 }, (_, index) => `Command Palette Item ${String(index + 1).padStart(3, '0')}`)

export default function AutocompletePage() {
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [selectedValue, setSelectedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return commandItems.slice(0, 12)
    return commandItems.filter((item) => item.toLowerCase().includes(normalized)).slice(0, 12)
  }, [query])

  useEffect(() => {
    setHighlightedIndex(0)
  }, [query])

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLButtonElement>('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex])

  const commitSelection = (value: string) => {
    setSelectedValue(value)
    setQuery(value)
    setIsOpen(false)
  }

  return (
    <ChallengePage
      eyebrow="Level 3"
      title="Autocomplete / Typeahead"
      summary="Filter 500 local options, navigate with the keyboard, and confirm with Enter."
    >
      <div className="level3-shell">
        <div className="typeahead">
          <input
            value={query}
            aria-expanded={isOpen}
            aria-autocomplete="list"
            placeholder="Search commands..."
            onFocus={() => setIsOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value)
              setIsOpen(true)
            }}
            onKeyDown={(event) => {
              if (!results.length) return
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setHighlightedIndex((index) => (index + 1) % results.length)
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                setHighlightedIndex((index) => (index - 1 + results.length) % results.length)
              }
              if (event.key === 'Enter') {
                event.preventDefault()
                commitSelection(results[highlightedIndex])
              }
              if (event.key === 'Escape') {
                setIsOpen(false)
              }
            }}
          />
          {isOpen && results.length ? (
            <div ref={listRef} className="typeahead-list" role="listbox">
              {results.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`typeahead-option ${index === highlightedIndex ? 'is-active' : ''}`}
                  data-active={index === highlightedIndex}
                  onMouseDown={() => commitSelection(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="level3-card">
          <strong>Selected value</strong>
          <p>{selectedValue || 'Nothing selected yet.'}</p>
        </div>
      </div>
    </ChallengePage>
  )
}
