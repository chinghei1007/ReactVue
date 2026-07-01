import { useMemo, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level4-masonry-layout.css'

type Tile = { id: number; title: string; height: number; color: string }

const tiles: Tile[] = [
  { id: 1, title: 'Waveform', height: 220, color: '#0f172a' },
  { id: 2, title: 'Spectrum', height: 160, color: '#1d4ed8' },
  { id: 3, title: 'Particles', height: 280, color: '#0f766e' },
  { id: 4, title: 'Mixer', height: 190, color: '#9333ea' },
  { id: 5, title: 'Preset', height: 250, color: '#ea580c' },
  { id: 6, title: 'Sequence', height: 170, color: '#db2777' },
  { id: 7, title: 'Equalizer', height: 300, color: '#047857' },
  { id: 8, title: 'Timeline', height: 210, color: '#b45309' },
  { id: 9, title: 'Snapshot', height: 240, color: '#334155' },
]

function distributeIntoColumns(items: Tile[], columns: number) {
  const nextColumns = Array.from({ length: columns }, () => ({ height: 0, items: [] as Tile[] }))
  items.forEach((item) => {
    const shortest = nextColumns.reduce((best, column, index, list) => (column.height < list[best].height ? index : best), 0)
    nextColumns[shortest].items.push(item)
    nextColumns[shortest].height += item.height
  })
  return nextColumns
}

export default function MasonryLayoutPage() {
  const [columnCount, setColumnCount] = useState(3)
  const columns = useMemo(() => distributeIntoColumns(tiles, columnCount), [columnCount])

  return (
    <ChallengePage
      eyebrow="Level 4"
      title="Masonry Image Layout"
      summary="Pack variable-height cards into the shortest column each time to mimic a Pinterest-style masonry wall."
    >
      <div className="masonry-shell">
        <div className="masonry-toolbar">
          <span className="masonry-badge">Shortest-column placement</span>
          <select value={columnCount} onChange={(event) => setColumnCount(Number(event.target.value))}>
            <option value={2}>2 columns</option>
            <option value={3}>3 columns</option>
            <option value={4}>4 columns</option>
          </select>
        </div>
        <div className="masonry-columns" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="masonry-column">
              {column.items.map((tile) => (
                <article key={tile.id} className="masonry-card">
                  <div className="masonry-visual" style={{ minHeight: tile.height, background: tile.color }}>
                    {tile.title}
                  </div>
                  <div className="masonry-copy">
                    <strong>{tile.title}</strong>
                    <p>Placed in the shortest column at render time.</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ChallengePage>
  )
}
