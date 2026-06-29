import { Link } from 'react-router-dom'

export type ChallengeCardData = {
  title: string
  description: string
  to: string
}

export default function ChallengeCard({ title, description, to }: ChallengeCardData) {
  return (
    <Link to={to} className="mini-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>Open exercise</span>
    </Link>
  )
}
