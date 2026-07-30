import SectionHeading from './SectionHeading'

type ChallengePageProps = {
  title: string
  eyebrow: string
  summary: string
  content?: string
  className?: string
  children?: React.ReactNode
}

export default function ChallengePage({ title, eyebrow, summary, content, className, children }: ChallengePageProps) {
  return (
    <article className={`flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6 text-content shadow-panel ${className ?? ''}`.trim()}>
      <SectionHeading eyebrow={eyebrow} title={title} description={summary} />
      <div className="text-content-muted">
        {content ? <p>{content}</p> : null}
        {children}
      </div>
    </article>
  )
}
