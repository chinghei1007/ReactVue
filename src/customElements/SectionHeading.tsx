type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="flex flex-col gap-1">
      {eyebrow ? <p className="m-0 text-xs font-semibold tracking-[0.12em] text-content-muted uppercase">{eyebrow}</p> : null}
      <h2 className="m-0 text-2xl font-semibold text-content">{title}</h2>
      {description ? <p className="m-0 text-content-muted">{description}</p> : null}
    </header>
  )
}
