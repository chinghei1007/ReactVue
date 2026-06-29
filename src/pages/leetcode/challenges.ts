import type { ChallengeCardData } from '../../customElements/ChallengeCard'

export type ChallengeSectionData = {
  eyebrow?: string
  title: string
  description?: string
  items: ChallengeCardData[]
}

export const heroProfile = {
  eyebrow: 'Frontend Developer',
  title: 'Building interactive UI with React, JavaScript, Vite, and Tailwind.',
  description:
    'I build client-side products and prototypes with Strapi, Python for machine learning workflows, Dify, RAG systems, and model routing through Dify extensions.',
  tags: ['React', 'JavaScript', 'Vite', 'Tailwind', 'Strapi', 'Python + ML', 'Dify', 'RAG', 'Model Routing'],
}

export const challengeSections: ChallengeSectionData[] = [
  {
    eyebrow: 'Level 1: The Basics',
    title: 'Mini-leetcode test',
    description: 'Syntax, basic reactivity, rendering lists, and handling simple events.',
    items: [
      { title: 'The Classic Counter', description: 'Increment, decrement, reset, and step control.', to: '/leetcode/level1/counter' },
      { title: 'Toggle Visibility', description: 'Show or hide content with a single button.', to: '/leetcode/level1/visibility' },
      { title: 'Simple Todo List', description: 'Add, complete, and delete todos.', to: '/leetcode/level1/todo' },
      { title: 'Interactive Star Rating', description: 'Hover and click to set a rating.', to: '/leetcode/level1/star-rating' },
      { title: 'Traffic Light', description: 'Auto-cycle through Red, Yellow, and Green.', to: '/leetcode/level1/traffic-light' },
      { title: 'Basic Accordion', description: 'Expand one answer at a time.', to: '/leetcode/level1/accordion' },
      { title: 'Tab Navigation', description: 'Switch between tab panels.', to: '/leetcode/level1/tabs' },
      { title: 'Tooltip', description: 'Hover to reveal contextual help.', to: '/leetcode/level1/tooltip' },
    ],
  },
  {
    eyebrow: 'Level 2: Intermediate State & Side Effects',
    title: 'Mini-leetcode test',
    description: 'Complex state, side effects, API fetching, and component communication.',
    items: [
      { title: 'Debounced Search Filter', description: 'Filter a large list with a 300ms debounce.', to: '/leetcode/level2/debounced-search' },
      { title: 'Stopwatch with Laps', description: 'Track time, laps, and resets.', to: '/leetcode/level2/stopwatch' },
      { title: 'Modal / Dialog Box', description: 'Open, close, and trap interaction cleanly.', to: '/leetcode/level2/modal' },
      { title: 'Image Carousel / Slider', description: 'Navigate images with autoplay and dots.', to: '/leetcode/level2/carousel' },
      { title: 'Multi-field Form Validation', description: 'Validate live and block invalid submit.', to: '/leetcode/level2/form-validation' },
      { title: 'Dark Mode with Persistence', description: 'Persist theme preference across reloads.', to: '/leetcode/level2/dark-mode' },
      { title: 'Memory Card Game', description: 'Flip, match, and track moves.', to: '/leetcode/level2/memory-card' },
      { title: 'Pagination Component', description: 'Page through remote content in chunks.', to: '/leetcode/level2/pagination' },
      { title: 'QR Code Generator', description: 'Generate QR codes from typed text.', to: '/leetcode/level2/qr-code' },
      { title: 'Tic-Tac-Toe', description: 'Play, detect outcomes, and review history.', to: '/leetcode/level2/tic-tac-toe' },
    ],
  },
]

export const challengeRouteMap = challengeSections.flatMap((section) => section.items)
