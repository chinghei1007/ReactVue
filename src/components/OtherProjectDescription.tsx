import type { ReactNode } from 'react'
import {
  otherProjectDescriptions,
  type ProjectDescriptionValue,
} from '@/data/other-project-description'

type OtherProjectDescriptionProps = {
  projectId: string
  children?: ReactNode
}

const sectionLabels = {
  built: 'What I built',
  learned: 'What I learned',
  improve: 'What I would improve',
} as const

function ProjectDescriptionContent({ value }: { value: ProjectDescriptionValue }) {
  if (Array.isArray(value)) {
    return (
      <ul className="project-description-points">
        {value.map((point) => <li key={point}>{point}</li>)}
      </ul>
    )
  }

  return <p className="project-description-copy">{value}</p>
}

export default function OtherProjectDescription({
  projectId,
  children,
}: OtherProjectDescriptionProps) {
  const description = otherProjectDescriptions[projectId]

  if (!description && !children) return null

  const sections = description
    ? (Object.keys(sectionLabels) as Array<keyof typeof sectionLabels>)
        .filter((key) => description[key])
    : []

  return (
    <section
      className={`hero-panel project-description project-description--${projectId}`}
      aria-label="Project description"
    >
      <header className="section-heading">
        <p className="section-heading-eyebrow">
          Description
        </p>
      </header>

      <div className="project-description-list">
        {sections.map((key) => (
          <article key={key} className="project-description-item">
            <h2 className="project-description-title">{sectionLabels[key]}</h2>
            <ProjectDescriptionContent value={description![key]!} />
          </article>
        ))}
        {children && <div className="project-description-custom">{children}</div>}
      </div>
    </section>
  )
}
