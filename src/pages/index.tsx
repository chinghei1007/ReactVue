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
          <ChallengeCard title="AI Security Scanner for Python" description="Analyze Python code with AI-assisted security checks." to="/nextwork/ai-security-scanner" action="View project" />
          <ChallengeCard title="Design Tester" description="Explore and compare education dashboard designs." to="/designTester" action="View project" />
          <ChallengeCard title="PDF Tools" description="Work with PDFs through a dual-engine browser toolkit." to="/pdfTools" action="View project" />
        </div>
      </section>

      <FoldableChallengeSection sections={challengeSections} />
    </div>
  )
}
