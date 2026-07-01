import { useSyncExternalStore } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level4-mini-state-manager.css'

type StoreState = {
  count: number
  theme: 'light' | 'dark'
  lastAction: string
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'toggleTheme' }
  | { type: 'reset' }

function createStore(initialState: StoreState) {
  let state = initialState
  const listeners = new Set<() => void>()

  return {
    getState: () => state,
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    dispatch: (action: Action) => {
      switch (action.type) {
        case 'increment':
          state = { ...state, count: state.count + 1, lastAction: 'increment' }
          break
        case 'decrement':
          state = { ...state, count: state.count - 1, lastAction: 'decrement' }
          break
        case 'toggleTheme':
          state = { ...state, theme: state.theme === 'light' ? 'dark' : 'light', lastAction: 'toggleTheme' }
          break
        case 'reset':
          state = { ...initialState, lastAction: 'reset' }
          break
      }
      listeners.forEach((listener) => listener())
    },
  }
}

const store = createStore({ count: 0, theme: 'light', lastAction: 'bootstrap' })

function useMiniStore() {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState)
}

export default function MiniStateManagerPage() {
  const state = useMiniStore()

  return (
    <ChallengePage
      eyebrow="Level 4"
      title="Build A Mini State Manager"
      summary="A global store built from scratch with `subscribe`, `getState`, and `dispatch`, then consumed through `useSyncExternalStore`."
    >
      <div className="store-shell">
        <div className="store-actions">
          <button type="button" onClick={() => store.dispatch({ type: 'decrement' })}>-1</button>
          <button type="button" onClick={() => store.dispatch({ type: 'increment' })}>+1</button>
          <button type="button" onClick={() => store.dispatch({ type: 'toggleTheme' })}>Toggle theme</button>
          <button type="button" onClick={() => store.dispatch({ type: 'reset' })}>Reset</button>
        </div>
        <div className="store-grid">
          <article className="store-metric">
            <strong>Count</strong>
            <p>{state.count}</p>
          </article>
          <article className="store-metric">
            <strong>Theme</strong>
            <p>{state.theme}</p>
          </article>
          <article className="store-metric">
            <strong>Last action</strong>
            <p>{state.lastAction}</p>
          </article>
        </div>
      </div>
    </ChallengePage>
  )
}
