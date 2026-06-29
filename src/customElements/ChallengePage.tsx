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
    <article className={`challenge-page ${className ?? ''}`.trim()}>
      <SectionHeading eyebrow={eyebrow} title={title} description={summary} />
      <div className="challenge-body">
        {content ? <p>{content}</p> : null}
        {children}
      </div>
    </article>
  )
}
