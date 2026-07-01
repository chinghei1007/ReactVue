import { useMemo, useState } from 'react'
import { marked } from 'marked'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/leetcode-level4-markdown-previewer.css'

const initialMarkdown = `# Live Preview

- Uses the \`marked\` package
- Parses local markdown on every change
- Renders headings, lists, and code blocks

\`\`\`ts
const fps = 60
console.log('previewing markdown', fps)
\`\`\`
`

marked.setOptions({ breaks: true })

export default function MarkdownPreviewerPage() {
  const [markdown, setMarkdown] = useState(initialMarkdown)
  const html = useMemo(() => marked.parse(markdown, { async: false }), [markdown])

  return (
    <ChallengePage
      eyebrow="Level 4"
      title="Markdown Live Previewer"
      summary="Split-screen markdown editor with live HTML rendering powered by the `marked` npm package."
    >
      <div className="preview-shell">
        <div className="preview-grid">
          <textarea value={markdown} onChange={(event) => setMarkdown(event.target.value)} />
          <div className="preview-output" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </ChallengePage>
  )
}
