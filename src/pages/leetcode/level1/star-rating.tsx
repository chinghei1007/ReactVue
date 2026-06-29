import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/star-rating.css'

export default function StarRatingPage() {
  const [rating, setRating] = useState(3)
  const [hovered, setHovered] = useState(0)

  return (
    <ChallengePage eyebrow="Level 1" title="Interactive Star Rating" summary="Hover to preview a rating and click to select it.">
      <div className="challenge-demo">
        <div className="challenge-stars" aria-label={`Rating ${rating} out of 5`}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = hovered ? star <= hovered : star <= rating
            return (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(star)}
                aria-label={`Set rating to ${star}`}
              >
                {active ? '★' : '☆'}
              </button>
            )
          })}
        </div>
        <p className="challenge-copy">Current rating: {hovered || rating}</p>
      </div>
    </ChallengePage>
  )
}
