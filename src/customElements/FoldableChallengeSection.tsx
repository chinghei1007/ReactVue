import { useState, useRef, useEffect } from 'react'
import ChallengeCard, { type ChallengeCardData } from '@/customElements/ChallengeCard'

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
    <section className="panel foldable-challenge">
      <div className="foldable-challenge-header">
        <span className="foldable-challenge-label">Leetcode Levels</span>
        <div className="foldable-challenge-tabs">
          {sections.map((section, index) => (
            <button
              key={section.eyebrow}
              type="button"
              className={`foldable-challenge-tab ${activeLevel === index ? 'is-active' : ''}`}
              onClick={() => handleLevelClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`foldable-challenge-cards-wrapper ${isExpanded && activeLevel !== null ? 'is-expanded' : ''}`}
      >
        {activeLevel !== null && (
          <div className="foldable-challenge-cards" ref={cardsContainerRef}>
            <div className="card-grid">
              {sections[activeLevel].items.map((item) => (
                <ChallengeCard key={item.to} {...item} />
              ))}
            </div>
          </div>
        )}

        {showScrollButtons && isExpanded && (
          <div className="foldable-challenge-scroll-controls">
            <button
              type="button"
              className={`foldable-challenge-scroll-button ${!canScrollUp ? 'is-disabled' : ''}`}
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
              className={`foldable-challenge-scroll-button ${!canScrollDown ? 'is-disabled' : ''}`}
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
        <div className="foldable-challenge-level-info">
          <h3 className="foldable-challenge-level-title">{sections[activeLevel].title}</h3>
          {sections[activeLevel].description && (
            <p className="foldable-challenge-level-description">{sections[activeLevel].description}</p>
          )}
        </div>
      )}
    </section>
  )
}
