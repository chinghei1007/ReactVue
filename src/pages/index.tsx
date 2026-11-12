import '@/styles/home.css'
import ChallengeCard from '@/customElements/ChallengeCard'
import SectionHeading from '@/customElements/SectionHeading'
import FoldableChallengeSection from '@/customElements/FoldableChallengeSection'
import { challengeSections, heroProfile } from '@/pages/leetcode/challenges'

export default function Home() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <SectionHeading eyebrow={heroProfile.eyebrow} title={heroProfile.title} />
        <div className="hero-copy"> {heroProfile.description.map((text, index) => ( <p key={index}>{text}</p> ))} </div>
      </section>

      <section className="panel other-projects">
        <h2>Other Projects</h2>
        <div className="card-grid">
          <ChallengeCard title="AI Security Scanner for Python" description="" to="/nextwork/ai-security-scanner" action="View project" />
          <ChallengeCard title="Design Tester" description="" to="/designTester" action="View project" />
          <ChallengeCard title="PDF Tools" description="" to="/pdfTools" action="View project" />
        </div>
      </section>

      <FoldableChallengeSection sections={challengeSections} />
    </div>
  )
}
