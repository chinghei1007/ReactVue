import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/todo.css'

type Todo = { id: number; text: string; done: boolean }

export default function TodoPage() {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Review the prompt', done: true },
    { id: 2, text: 'Build the UI', done: false },
  ])

  const addTodo = () => {
    const text = value.trim()
    if (!text) return
    setTodos((current) => [...current, { id: Date.now(), text, done: false }])
    setValue('')
  }

  return (
    <ChallengePage eyebrow="Level 1" title="Simple Todo List" summary="Add todos, mark them complete, and delete entries.">
      <div className="challenge-demo">
        <div className="challenge-actions">
          <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Add a todo" />
          <button type="button" onClick={addTodo}>Add</button>
        </div>
        <ul className="challenge-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <button type="button" onClick={() => setTodos((current) => current.map((item) => item.id === todo.id ? { ...item, done: !item.done } : item))}>
                {todo.done ? '✓' : '○'} {todo.text}
              </button>
              <button type="button" onClick={() => setTodos((current) => current.filter((item) => item.id !== todo.id))}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </ChallengePage>
  )
}
