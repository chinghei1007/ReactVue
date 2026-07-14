import SectionHeading from '../customElements/SectionHeading'
import FoldableChallengeSection from '../customElements/FoldableChallengeSection'
import { challengeSections, heroProfile } from './leetcode/challenges'

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-panel">
        <SectionHeading eyebrow={heroProfile.eyebrow} title={heroProfile.title} />
        <div className="hero-copy"> {heroProfile.description.map((text, index) => ( <p key={index}>{text}</p> ))} </div>
        <div className="hero-tags">
          {heroProfile.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <FoldableChallengeSection sections={challengeSections} />
    </div>
  )
}
