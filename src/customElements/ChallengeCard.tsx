import { Link } from 'react-router-dom'

export type ChallengeCardData = {
  title: string
  description: string
  to: string
}

export default function ChallengeCard({ title, description, to }: ChallengeCardData) {
  return (
    <Link to={to} className="flex min-h-38 flex-col gap-3 rounded-3xl border border-line bg-surface-raised p-5 text-content no-underline shadow-sm hover:border-accent">
      <h3 className="m-0 text-lg font-semibold">{title}</h3>
      <p className="m-0 leading-relaxed text-content-muted">{description}</p>
      <span className="mt-auto font-semibold text-accent">Open exercise</span>
    </Link>
  )
}
