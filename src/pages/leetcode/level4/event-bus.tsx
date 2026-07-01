import { useEffect, useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level4-event-bus.css'

type ToastKind = 'info' | 'success' | 'error'
type Toast = { id: number; message: string; kind: ToastKind }
type BusEvents = { toast: Omit<Toast, 'id'> }

function createEventBus<TEvents extends Record<string, unknown>>() {
  const listeners = new Map<keyof TEvents, Set<(payload: TEvents[keyof TEvents]) => void>>()
  return {
    on<TKey extends keyof TEvents>(event: TKey, handler: (payload: TEvents[TKey]) => void) {
      const eventListeners = listeners.get(event) ?? new Set()
      eventListeners.add(handler as (payload: TEvents[keyof TEvents]) => void)
      listeners.set(event, eventListeners)
      return () => eventListeners.delete(handler as (payload: TEvents[keyof TEvents]) => void)
    },
    emit<TKey extends keyof TEvents>(event: TKey, payload: TEvents[TKey]) {
      listeners.get(event)?.forEach((handler) => handler(payload as TEvents[keyof TEvents]))
    },
  }
}

const bus = createEventBus<BusEvents>()

function ToastListener() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const unsubscribe = bus.on('toast', (payload) => {
      const id = Date.now() + Math.random()
      setToasts((current) => [...current, { id, ...payload }])
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id))
      }, 2400)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <article key={toast.id} className={`toast ${toast.kind}`}>
          <div className="toast-head">
            <span className="toast-kind">{toast.kind}</span>
            <button type="button" onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}>
              Close
            </button>
          </div>
          <p>{toast.message}</p>
        </article>
      ))}
    </div>
  )
}

export default function EventBusPage() {
  return (
    <ChallengePage
      eyebrow="Level 4"
      title="Custom Event Bus & Notification System"
      summary="A global pub/sub emitter powers toast notifications that can be triggered from anywhere in the tree."
    >
      <div className="event-shell">
        <div className="event-actions">
          <button type="button" onClick={() => bus.emit('toast', { kind: 'info', message: 'Sync started for the current draft.' })}>Info toast</button>
          <button type="button" onClick={() => bus.emit('toast', { kind: 'success', message: 'Export finished successfully.' })}>Success toast</button>
          <button type="button" onClick={() => bus.emit('toast', { kind: 'error', message: 'Audio decoding failed. Retry with a local file.' })}>Error toast</button>
        </div>
        <p>Each button emits an event to the shared bus. The toast layer subscribes once and renders notifications globally.</p>
        <ToastListener />
      </div>
    </ChallengePage>
  )
}
