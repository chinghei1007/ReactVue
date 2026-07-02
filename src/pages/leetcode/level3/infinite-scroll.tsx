import { useEffect, useMemo, useRef, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import Playlist from "../../../components/Playlist.tsx"
import '../../../styles/leetcode-level3-infinite-scroll.css'

const allItems = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  title: `Mock record ${index + 1}`,
  summary: `Row ${index + 1} was generated locally for the infinite scroll exercise.`,
}))

const batchSize = 20

export default function InfiniteScrollPage() {
  const [visibleCount, setVisibleCount] = useState(batchSize)
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const visibleItems = useMemo(() => allItems.slice(0, visibleCount), [visibleCount])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || isLoading || visibleCount >= allItems.length) return

        setIsLoading(true)
        window.setTimeout(() => {
          setVisibleCount((count) => Math.min(count + batchSize, allItems.length))
          setIsLoading(false)
        }, 400)
      },
      { rootMargin: '120px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [isLoading, visibleCount])

  return (
    <ChallengePage
      eyebrow="Level 3"
      title="Infinite Scroll"
      summary="Render 1,000 mocked rows and reveal 20 more each time the sentinel reaches the viewport."
    >
      <div className="level3-shell">
        <div className="level3-meta">
          <span>{visibleItems.length} / {allItems.length} rows loaded</span>
          <button type="button" className="level3-button" onClick={() => setVisibleCount(batchSize)}>Reset</button>
        </div>
        <div className="level3-scroller">
          <div className="level3-list">
            {visibleItems.map((item) => (
              <article key={item.id} className="level3-list-item">
                <strong>{item.title}</strong>
                <p>{item.summary}</p>
              </article>
            ))}
            <div ref={sentinelRef} />
            {isLoading ? (
              <div className="level3-loading">
                <span className="level3-spinner" />
                <span>Loading next batch...</span>
              </div>
            ) : null}
          </div>
        </div>
        <Playlist />
      </div>
    </ChallengePage>
  )
}
