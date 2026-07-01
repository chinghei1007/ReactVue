import { useEffect, useRef, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level3-mini-paint.css'

type ToolMode = 'brush' | 'eraser'

export default function MiniPaintPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)
  const [color, setColor] = useState('#0f172a')
  const [size, setSize] = useState(8)
  const [tool, setTool] = useState<ToolMode>('brush')

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (!context) return
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, 720, 420)
  }, [])

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * event.currentTarget.width,
      y: ((event.clientY - rect.top) / rect.height) * event.currentTarget.height,
    }
  }

  const drawStroke = (point: { x: number; y: number }) => {
    const context = canvasRef.current?.getContext('2d')
    const lastPoint = lastPointRef.current
    if (!context || !lastPoint) return
    context.strokeStyle = tool === 'eraser' ? '#ffffff' : color
    context.lineWidth = size
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.beginPath()
    context.moveTo(lastPoint.x, lastPoint.y)
    context.lineTo(point.x, point.y)
    context.stroke()
    lastPointRef.current = point
  }

  return (
    <ChallengePage
      eyebrow="Level 3"
      title="Interactive Canvas Drawing Tool"
      summary="Draw on a canvas, switch between brush and eraser, change stroke size, and clear the board."
    >
      <div className="level3-shell">
        <div className="level3-paint-panel">
          <div className="paint-toolbar">
            <label className="paint-control">
              <span>Tool</span>
              <select value={tool} onChange={(event) => setTool(event.target.value as ToolMode)}>
                <option value="brush">Brush</option>
                <option value="eraser">Eraser</option>
              </select>
            </label>
            <label className="paint-control">
              <span>Color</span>
              <input type="color" value={color} onChange={(event) => setColor(event.target.value)} disabled={tool === 'eraser'} />
            </label>
            <label className="paint-control">
              <span>Brush Size: {size}px</span>
              <input type="range" min="2" max="32" value={size} onChange={(event) => setSize(Number(event.target.value))} />
            </label>
            <div className="paint-actions">
              <button
                type="button"
                onClick={() => {
                  const context = canvasRef.current?.getContext('2d')
                  if (!context || !canvasRef.current) return
                  context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                  context.fillStyle = '#ffffff'
                  context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="paint-canvas"
          width={720}
          height={420}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            const point = getPoint(event)
            isDrawingRef.current = true
            lastPointRef.current = point
            drawStroke(point)
          }}
          onPointerMove={(event) => {
            if (!isDrawingRef.current) return
            drawStroke(getPoint(event))
          }}
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture(event.pointerId)
            isDrawingRef.current = false
            lastPointRef.current = null
          }}
          onPointerLeave={() => {
            isDrawingRef.current = false
            lastPointRef.current = null
          }}
        />
      </div>
    </ChallengePage>
  )
}
