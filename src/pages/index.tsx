import ChallengeSection from '../customElements/ChallengeSection'
import SectionHeading from '../customElements/SectionHeading'
import { challengeSections, heroProfile } from './leetcode/challenges'

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-panel">
        <SectionHeading eyebrow={heroProfile.eyebrow} title={heroProfile.title} />
        <p className="hero-copy">{heroProfile.description}</p>
        <div className="hero-tags">
          {heroProfile.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      {challengeSections.map((section) => (
        <ChallengeSection
          key={section.eyebrow}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          items={section.items}
        />
      ))}
    </div>
  )
}
