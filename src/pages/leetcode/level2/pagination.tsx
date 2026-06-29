import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/pagination.css'

const items = Array.from({ length: 25 }, (_, index) => `Item ${index + 1}`)

export default function PaginationPage() {
  const [page, setPage] = useState(1)
  const pageSize = 5
  const start = (page - 1) * pageSize

  return (
    <ChallengePage eyebrow="Level 2" title="Pagination Component" summary="Move through a longer list page by page.">
      <div className="challenge-demo">
        <ul className="challenge-list">
          {items.slice(start, start + pageSize).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="challenge-actions">
          <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))}>Prev</button>
          <button type="button" onClick={() => setPage((current) => Math.min(Math.ceil(items.length / pageSize), current + 1))}>Next</button>
        </div>
      </div>
    </ChallengePage>
  )
}
