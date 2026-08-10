import type { OtherProjectDescriptionItem } from '@/data/other-project-description'

type OtherProjectDescriptionProps = {
  items: OtherProjectDescriptionItem[]
}

export default function OtherProjectDescription({ items }: OtherProjectDescriptionProps) {
  if (items.length === 0) return null

  return (
    <section
      className="mt-8 rounded-3xl bg-[var(--hero-bg)] p-8 text-white"
      aria-label="Project description"
    >
      <header>
        <p className="m-0 text-xs font-semibold tracking-[0.12em] text-content-muted uppercase">
          Description
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-6">
        {items.map((item) => (
          <article key={item.title}>
            <h2 className="m-0 text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 mb-0 leading-relaxed text-slate-200">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
