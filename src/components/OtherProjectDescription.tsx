import type { OtherProjectDescriptionItem } from '@/data/other-project-description'

type OtherProjectDescriptionProps = {
  items: OtherProjectDescriptionItem[]
}

export default function OtherProjectDescription({ items }: OtherProjectDescriptionProps) {
  if (items.length === 0) return null

  return (
    <section className="hero-panel project-description" aria-label="Project description">
      <header className="section-heading">
        <p className="section-heading-eyebrow">
          Description
        </p>
      </header>

      <div className="project-description-list">
        {items.map((item) => (
          <article key={item.title}>
            <h2 className="project-description-title">{item.title}</h2>
            <p className="project-description-copy">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
