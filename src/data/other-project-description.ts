export type ProjectDescriptionValue = string | string[]

export type OtherProjectDescription = {
  built?: ProjectDescriptionValue
  learned?: ProjectDescriptionValue
  improve?: ProjectDescriptionValue
}

export const otherProjectDescriptions: Record<string, OtherProjectDescription> = {
  'design-tester': {
    built: 'An education-themed design playground that helps designers, developers and customers explore school dashboard layouts together. Rendered previews give everyone a clearer picture of the design, while an exported App.css provides developers with a starting point.',
    learned: 'Turning choices such as color, typography and spacing into interactive controls made design decisions easier to explore and discuss. A shared preview also gives customers an opportunity to respond before implementation begins.',
    improve: 'Refactoring the single-file implementation into reusable React components would make the project easier to maintain and extend. The exported CSS could also be made easier to adapt to different applications.',
  },
  'ai-security-scanner': {
    built: 'An AI-assisted security scanner created to experiment with Groq and cloud services. It accepts source code for analysis and presents structured findings for users to review.',
    learned: 'Connecting an AI provider with a database and bot protection offered practical experience of how different services fit together. Working within free plans also provided a chance to observe response times and service limits.',
    improve: 'Further work could focus on response times and how the application handles increased usage or service limits.',
  },
}
