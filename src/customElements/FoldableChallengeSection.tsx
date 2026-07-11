import { useState, useRef, useEffect } from 'react'
import ChallengeCard, { type ChallengeCardData } from './ChallengeCard'

type FoldableChallengeSectionProps = {
  sections: {
    eyebrow?: string
    title: string
    description?: string
    items: ChallengeCardData[]
  }[]
}

export default function FoldableChallengeSection({ sections }: FoldableChallengeSectionProps) {
  const [activeLevel, setActiveLevel] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollButtons, setShowScrollButtons] = useState(false)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const handleLevelClick = (index: number) => {
    if (activeLevel === index) {
      // Toggle fold/unfold
      setIsExpanded(!isExpanded)
    } else {
      // Switch to new level
      setActiveLevel(index)
      setIsExpanded(true)
    }
  }

  const scrollCards = (direction: 'up' | 'down') => {
    if (cardsContainerRef.current) {
      const container = cardsContainerRef.current
      const scrollAmount = container.clientHeight * 0.8
      if (direction === 'up') {
        container.scrollBy({ top: -scrollAmount, behavior: 'smooth' })
      } else {
        container.scrollBy({ top: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    const container = cardsContainerRef.current
    if (!container) return

    const checkScrollability = () => {
      const hasOverflow = container.scrollHeight > container.clientHeight
      setShowScrollButtons(hasOverflow)
      setCanScrollUp(container.scrollTop > 0)
      setCanScrollDown(container.scrollHeight - container.scrollTop - container.clientHeight > 10)
    }

    checkScrollability()
    container.addEventListener('scroll', checkScrollability)
    return () => container.removeEventListener('scroll', checkScrollability)
  }, [activeLevel, isExpanded])

  if (sections.length === 0) return null

  return (
    <section className="foldable-challenge-section">
      <div className="levels-header">
        <span className="levels-label">Leetcode Levels</span>
        <div className="level-tabs">
          {sections.map((section, index) => (
            <button
              key={section.eyebrow}
              type="button"
              className={`level-tab ${activeLevel === index ? 'is-active' : ''}`}
              onClick={() => handleLevelClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`cards-container-wrapper ${isExpanded && activeLevel !== null ? 'is-expanded' : ''}`}
      >
        {activeLevel !== null && (
          <div className="cards-container" ref={cardsContainerRef}>
            <div className="card-grid">
              {sections[activeLevel].items.map((item) => (
                <ChallengeCard key={item.to} {...item} />
              ))}
            </div>
          </div>
        )}

        {showScrollButtons && isExpanded && (
          <div className="scroll-buttons">
            <button
              type="button"
              className={`scroll-btn scroll-up ${!canScrollUp ? 'is-disabled' : ''}`}
              onClick={() => scrollCards('up')}
              disabled={!canScrollUp}
              aria-label="Scroll up"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              className={`scroll-btn scroll-down ${!canScrollDown ? 'is-disabled' : ''}`}
              onClick={() => scrollCards('down')}
              disabled={!canScrollDown}
              aria-label="Scroll down"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {activeLevel !== null && isExpanded && (
        <div className="level-info">
          <h3 className="level-title">{sections[activeLevel].title}</h3>
          {sections[activeLevel].description && (
            <p className="level-description">{sections[activeLevel].description}</p>
          )}
        </div>
      )}
    </section>
  )
}
