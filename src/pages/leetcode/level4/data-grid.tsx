import { memo, useEffect, useMemo, useRef, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level4-data-grid.css'

const rowCount = 100
const columnCount = 20
const columnIds = Array.from({ length: columnCount }, (_, index) => `Column ${index + 1}`)
const initialRows = Array.from({ length: rowCount }, (_, rowIndex) => ({
  id: `row-${rowIndex + 1}`,
  cells: Array.from({ length: columnCount }, (_, columnIndex) => `R${rowIndex + 1}C${columnIndex + 1}`),
}))

type SortConfig = { column: number; direction: 'asc' | 'desc' } | null

const GridRow = memo(function GridRow({
  row,
  widths,
  onCellChange,
}: {
  row: { id: string; cells: string[] }
  widths: number[]
  onCellChange: (rowId: string, columnIndex: number, value: string) => void
}) {
  return (
    <tr>
      {row.cells.map((value, columnIndex) => (
        <td key={`${row.id}-${columnIndex}`} style={{ width: widths[columnIndex] }}>
          <input
            className="grid-cell"
            value={value}
            onChange={(event) => onCellChange(row.id, columnIndex, event.target.value)}
          />
        </td>
      ))}
    </tr>
  )
})

export default function DataGridPage() {
  const [rows, setRows] = useState(initialRows)
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [widths, setWidths] = useState(() => Array.from({ length: columnCount }, () => 140))
  const resizeState = useRef<{ index: number; startX: number; startWidth: number } | null>(null)

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const active = resizeState.current
      if (!active) return
      const nextWidth = Math.max(90, active.startWidth + event.clientX - active.startX)
      setWidths((current) => current.map((width, index) => (index === active.index ? nextWidth : width)))
    }

    const handleUp = () => {
      resizeState.current = null
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [])

  const sortedRows = useMemo(() => {
    if (!sortConfig) return rows
    const multiplier = sortConfig.direction === 'asc' ? 1 : -1
    return [...rows].sort((left, right) =>
      left.cells[sortConfig.column].localeCompare(right.cells[sortConfig.column]) * multiplier,
    )
  }, [rows, sortConfig])

  const updateCell = (rowId: string, columnIndex: number, value: string) => {
    setRows((current) =>
      current.map((row) =>
        row.id === rowId
          ? {
              ...row,
              cells: row.cells.map((cell, cellIndex) => (cellIndex === columnIndex ? value : cell)),
            }
          : row,
      ),
    )
  }

  return (
    <ChallengePage
      eyebrow="Level 4"
      title="Data Grid / Spreadsheet"
      summary="Editable 100 x 20 grid with sortable columns and pointer-based resize handles."
    >
      <div className="level4-shell">
        <div className="grid-toolbar">
          <span>Rows: {rowCount}</span>
          <span>Columns: {columnCount}</span>
          <span>Sorted by: {sortConfig ? `${columnIds[sortConfig.column]} (${sortConfig.direction})` : 'none'}</span>
        </div>
        <div className="grid-shell">
          <table className="grid-table">
            <thead>
              <tr>
                {columnIds.map((column, index) => (
                  <th key={column} style={{ width: widths[index] }}>
                    <div
                      className="grid-header"
                      onClick={() =>
                        setSortConfig((current) =>
                          current?.column === index
                            ? { column: index, direction: current.direction === 'asc' ? 'desc' : 'asc' }
                            : { column: index, direction: 'asc' },
                        )
                      }
                    >
                      {column}
                      <span className="grid-resizer" onPointerDown={(event) => {
                        event.stopPropagation()
                        resizeState.current = { index, startX: event.clientX, startWidth: widths[index] }
                      }} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <GridRow key={row.id} row={row} widths={widths} onCellChange={updateCell} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ChallengePage>
  )
}
