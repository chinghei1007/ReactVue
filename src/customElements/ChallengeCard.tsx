import { Link } from 'react-router-dom'

export type ChallengeCardData = {
  title: string
  description: string
  to: string
}

export default function ChallengeCard({ title, description, to }: ChallengeCardData) {
  return (
    <Link to={to} className="card card--link">
      <h3 className="card-title">{title}</h3>
      <p className="card-copy">{description}</p>
      <span className="card-action">Open exercise</span>
    </Link>
  )
}
