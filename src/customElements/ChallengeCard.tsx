import { Link } from 'react-router-dom'

export type ChallengeCardData = {
  title: string
  description: string
  to: string
  action?: string
}

export default function ChallengeCard({ title, description, to, action = 'Open exercise' }: ChallengeCardData) {
  return (
    <Link to={to} className="card card--link">
      <h3 className="card-title">{title}</h3>
      {description && <p className="card-copy">{description}</p>}
      <span className="card-action">{action}</span>
    </Link>
  )
}
