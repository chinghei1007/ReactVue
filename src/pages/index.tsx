import SectionHeading from '@/customElements/SectionHeading'
import FoldableChallengeSection from '@/customElements/FoldableChallengeSection'
import { challengeSections, heroProfile } from '@/pages/leetcode/challenges'

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-[var(--hero-bg)] p-8 text-white">
        <SectionHeading eyebrow={heroProfile.eyebrow} title={heroProfile.title} />
        <div className="mt-4 max-w-3xl leading-relaxed text-slate-200"> {heroProfile.description.map((text, index) => ( <p key={index}>{text}</p> ))} </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {heroProfile.tags.map((tag) => (
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-200" key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <FoldableChallengeSection sections={challengeSections} />
    </div>
  )
}
