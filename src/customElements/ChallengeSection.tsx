import ChallengeCard, { type ChallengeCardData } from './ChallengeCard'
import SectionHeading from './SectionHeading'

type ChallengeSectionProps = {
  eyebrow?: string
  title: string
  description?: string
  items: ChallengeCardData[]
}

export default function ChallengeSection({ eyebrow, title, description, items }: ChallengeSectionProps) {
  return (
    <section className="section-block">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="card-grid">
        {items.map((item) => (
          <ChallengeCard key={item.to} {...item} />
        ))}
      </div>
    </section>
  )
}
