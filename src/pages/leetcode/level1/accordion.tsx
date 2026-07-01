import { useState } from 'react'
import ChallengePage from '../../../customElements/ChallengePage'
import '../../../styles/accordion.css'

const items = [
  { title: 'What is React state?', body: 'State stores data that changes over time and triggers re-rendering when updated.' },
  { title: 'What is conditional rendering?', body: 'It means showing different UI based on a condition or active selection.' },
  { title: 'Why use keys in lists?', body: 'Keys help React keep list items stable when data changes.' },
]

export default function AccordionPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <ChallengePage eyebrow="Level 1" title="Basic Accordion" summary="Open one answer at a time in a question list.">
      <div className="challenge-demo accordion-demo">
        {items.map((item, index) => (
          <section key={item.title} className="accordion-item">
            <button 
              type="button" 
              aria-expanded={openIndex === index}
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
            >
              {item.title}
            </button>
            {openIndex === index && (
              <div className="accordion-content">{item.body}</div>
            )}
          </section>
        ))}
      </div>
    </ChallengePage>
  )
}
