import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/tabs.css'

const tabs = [
  { id: 'overview', label: 'Overview', body: 'This tab shows the summary.' },
  { id: 'details', label: 'Details', body: 'This tab shows deeper content.' },
  { id: 'notes', label: 'Notes', body: 'This tab shows a short note.' },
]

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <ChallengePage eyebrow="Level 1" title="Tab Navigation" summary="Switch content by selecting different tabs.">
      <div className="challenge-demo">
        <div className="challenge-tabs">
          {tabs.map((tab) => (
            <button key={tab.id} type="button" aria-pressed={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>
        <p className="challenge-copy">{tabs.find((tab) => tab.id === activeTab)?.body}</p>
      </div>
    </ChallengePage>
  )
}
