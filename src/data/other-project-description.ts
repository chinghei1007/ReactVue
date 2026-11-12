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
    improve: 'Rebuilding the single-file HTML into reusable React components to make the project easier to maintain and extend. The exported CSS could also be made easier to adapt to different applications.',
  },
  'ai-security-scanner': {
    built: 'An AI-assisted security scanner created to experiment with Groq and cloud services. It accepts source code for analysis and presents structured findings for users to review.',
    learned: 'Connecting an AI provider with a database and bot protection offered practical experience of how different services fit together. Working within free plans also provided a chance to observe response times and service limits.',
    improve: 'Further work could focus on response times and how the application handles increased usage or service limits.',
  },
  'pdf-tools': {
    built: 'A browser-based PDF toolkit inspired by Weeny Software on Android. It brings two PDF engines together in one workspace, with tools for working with pages, text, metadata, annotations, images, forms and other common PDF tasks.',
    learned: 'I started with an initial testing page to compare a smaller PDF library with a fuller one. The comparison turned into a useful lesson: each engine has its own strengths, so a shared interface and clear engine switch make more sense than trying to force everything through one library.',
    improve: 'I would keep expanding the tool catalog and make the differences between the two engines easier to understand at a glance. More guided examples and a few extra end-to-end checks would also make the toolkit friendlier for first-time users.',
  },
}
