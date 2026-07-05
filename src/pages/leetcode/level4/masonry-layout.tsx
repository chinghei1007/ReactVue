import { useMemo, useState, useCallback } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level4-masonry-layout.css'

type Tile = { id: number; width: number; height: number }

const generateRandomTiles = (count: number): Tile[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: Date.now() + i,
    width: Math.floor(Math.random() * 100) + 200,
    height: Math.floor(Math.random() * 200) + 150,
  }))
}

function distributeIntoColumns(items: Tile[], columns: number) {
  const nextColumns = Array.from({ length: columns }, () => ({ height: 0, items: [] as Tile[] }))
  items.forEach((item) => {
    const shortest = nextColumns.reduce((best, column, index, list) => (column.height < list[best].height ? index : best), 0)
    nextColumns[shortest].items.push(item)
    nextColumns[shortest].height += item.height + 16
  })
  return nextColumns
}

export default function MasonryLayoutPage() {
  const [tiles, setTiles] = useState<Tile[]>(() => generateRandomTiles(9))
  const [columnCount, setColumnCount] = useState(3)
  const [viewMode, setViewMode] = useState<'gui' | 'json'>('gui')
  const [defaultWidth, setDefaultWidth] = useState(300)
  const [defaultHeight, setDefaultHeight] = useState(250)
  const [jsonText, setJsonText] = useState(JSON.stringify(tiles, null, 2))

  const columns = useMemo(() => distributeIntoColumns(tiles, columnCount), [tiles, columnCount])

  const handleAddTile = useCallback(() => {
    const newTile: Tile = {
      id: Date.now(),
      width: defaultWidth,
      height: defaultHeight,
    }
    setTiles(prev => [...prev, newTile])
  }, [defaultWidth, defaultHeight])

  const handleRemoveTile = useCallback((id: number) => {
    setTiles(prev => prev.filter(tile => tile.id !== id))
  }, [])

  const handleRandomize = useCallback(() => {
    const count = Math.floor(Math.random() * 6) + 6
    setTiles(generateRandomTiles(count))
  }, [])

  const handleUpdateTile = useCallback((id: number, field: 'width' | 'height', value: number) => {
    setTiles(prev => prev.map(tile => 
      tile.id === id ? { ...tile, [field]: value } : tile
    ))
  }, [])

  const handleJsonChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setJsonText(newText)
    try {
      const parsed = JSON.parse(newText)
      if (Array.isArray(parsed)) {
        setTiles(parsed.map((t: Partial<Tile>, i: number) => ({
          id: t.id ?? Date.now() + i,
          width: t.width ?? 300,
          height: t.height ?? 250,
        })))
      }
    } catch {
      // Invalid JSON, ignore
    }
  }, [])

  const handleSyncJson = useCallback(() => {
    setJsonText(JSON.stringify(tiles, null, 2))
  }, [tiles])

  return (
    <ChallengePage
      eyebrow="Level 4"
      title="Masonry Image Layout"
      summary="Pack variable-height cards into the shortest column each time to mimic a Pinterest-style masonry wall."
    >
      <div className="masonry-shell">
        <div className="masonry-toolbar">
          <div className="masonry-controls-left">
            <span className="masonry-badge">Shortest-column placement</span>
            <select 
              value={columnCount} 
              onChange={(event) => setColumnCount(Number(event.target.value))}
              className="masonry-select"
            >
              <option value={2}>2 columns</option>
              <option value={3}>3 columns</option>
              <option value={4}>4 columns</option>
              <option value={5}>5 columns</option>
            </select>
          </div>
          <div className="masonry-controls-right">
            <button onClick={() => setViewMode('gui')} className={`masonry-btn ${viewMode === 'gui' ? 'active' : ''}`}>
              GUI View
            </button>
            <button onClick={() => setViewMode('json')} className={`masonry-btn ${viewMode === 'json' ? 'active' : ''}`}>
              JSON View
            </button>
          </div>
        </div>

        {viewMode === 'gui' ? (
          <>
            <div className="masonry-editor">
              <div className="editor-section">
                <h4>Default Dimensions</h4>
                <div className="slider-group">
                  <label>
                    Width: {defaultWidth}px
                    <input
                      type="range"
                      min="150"
                      max="500"
                      value={defaultWidth}
                      onChange={(e) => setDefaultWidth(Number(e.target.value))}
                    />
                  </label>
                  <label>
                    Height: {defaultHeight}px
                    <input
                      type="range"
                      min="100"
                      max="500"
                      value={defaultHeight}
                      onChange={(e) => setDefaultHeight(Number(e.target.value))}
                    />
                  </label>
                </div>
                <div className="button-group">
                  <button onClick={handleAddTile} className="masonry-btn add-btn">+ Add Tile</button>
                  <button onClick={handleRandomize} className="masonry-btn random-btn">🎲 Randomize All</button>
                </div>
              </div>
              <div className="editor-section tile-list">
                <h4>Tiles ({tiles.length})</h4>
                <div className="tile-items">
                  {tiles.map((tile, index) => (
                    <div key={tile.id} className="tile-item">
                      <span className="tile-index">#{index + 1}</span>
                      <div className="tile-controls">
                        <label>
                          W:
                          <input
                            type="number"
                            min="100"
                            max="600"
                            value={tile.width}
                            onChange={(e) => handleUpdateTile(tile.id, 'width', Number(e.target.value))}
                          />
                        </label>
                        <label>
                          H:
                          <input
                            type="number"
                            min="100"
                            max="600"
                            value={tile.height}
                            onChange={(e) => handleUpdateTile(tile.id, 'height', Number(e.target.value))}
                          />
                        </label>
                      </div>
                      <button onClick={() => handleRemoveTile(tile.id)} className="remove-btn" title="Remove tile">
                        −
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="masonry-columns" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="masonry-column">
                  {column.items.map((tile, tileIndex) => (
                    <article 
                      key={tile.id} 
                      className="masonry-card"
                      style={{
                        animation: `fadeInUp 0.4s ease-out ${tileIndex * 0.05}s both`,
                      }}
                    >
                      <div 
                        className="masonry-visual" 
                        style={{ 
                          minHeight: tile.height,
                          backgroundImage: `url(https://picsum.photos/${tile.width}/${tile.height})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <span className="tile-dims">{tile.width}×{tile.height}</span>
                      </div>
                      <div className="masonry-copy">
                        <strong>Image #{tile.id.toString().slice(-4)}</strong>
                        <p>Placed in column {columnIndex + 1}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="json-editor">
            <div className="json-header">
              <h4>JSON Editor</h4>
              <button onClick={handleSyncJson} className="masonry-btn">Sync from GUI</button>
            </div>
            <textarea
              value={jsonText}
              onChange={handleJsonChange}
              className="json-textarea"
              spellCheck={false}
            />
            <p className="json-hint">Edit the JSON directly. Changes will update the preview automatically.</p>
          </div>
        )}
      </div>
    </ChallengePage>
  )
}
