export type ProjectDescriptionValue = string | string[]

export type OtherProjectDescription = {
  built?: ProjectDescriptionValue
  learned?: ProjectDescriptionValue
  improve?: ProjectDescriptionValue
}

export const otherProjectDescriptions: Record<string, OtherProjectDescription> = {
  'ai-security-scanner': {
    built: 'Summarise the project outcome and the problem it was designed to solve.',
    learned: [
      'Capture the technical decisions made while building the project.',
      'Record the most useful lessons from the implementation.',
    ],
    improve: 'Record the next iteration, remaining trade-offs, or areas that need more work.',
  },
}
