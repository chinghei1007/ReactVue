type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="section-heading-eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading-title">{title}</h2>
      {description ? <p className="section-heading-description">{description}</p> : null}
    </header>
  )
}
