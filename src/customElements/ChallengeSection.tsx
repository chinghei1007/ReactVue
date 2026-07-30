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
    <section className="flex flex-col gap-4">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {items.map((item) => (
          <ChallengeCard key={item.to} {...item} />
        ))}
      </div>
    </section>
  )
}
