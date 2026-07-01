import { useMemo, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level3-virtualized-list.css'

const rowHeight = 48
const totalItems = 10000
const overscan = 6
const items = Array.from({ length: totalItems }, (_, index) => `Virtualized item ${index + 1}`)

export default function VirtualizedListPage() {
  const [scrollTop, setScrollTop] = useState(0)
  const viewportHeight = 416

  const { startIndex, endIndex, visibleItems } = useMemo(() => {
    const visibleCount = Math.ceil(viewportHeight / rowHeight)
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
    const end = Math.min(totalItems, start + visibleCount + overscan * 2)
    return {
      startIndex: start,
      endIndex: end,
      visibleItems: items.slice(start, end),
    }
  }, [scrollTop])

  return (
    <ChallengePage
      eyebrow="Level 3"
      title="Virtualized List"
      summary="Keep a 10,000 row list smooth by only rendering the items visible inside the scroll window."
    >
      <div className="level3-shell">
        <div className="level3-meta">
          <span>Rendering rows {startIndex + 1} - {endIndex} of {totalItems}</span>
          <span>{visibleItems.length} DOM nodes live</span>
        </div>
        <div className="virtual-shell">
          <div className="virtual-list" onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
            <div style={{ height: totalItems * rowHeight, position: 'relative' }}>
              {visibleItems.map((item, index) => {
                const itemIndex = startIndex + index
                return (
                  <div
                    key={item}
                    className="virtual-row"
                    style={{ transform: `translateY(${itemIndex * rowHeight}px)` }}
                  >
                    {item}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </ChallengePage>
  )
}
