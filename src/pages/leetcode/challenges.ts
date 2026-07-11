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
    title: 'Level 1 Challenge Set',
    description: 'Syntax, basic reactivity, rendering lists, and handling simple events.',
    items: [
      { title: 'Counter Basics', description: 'Increment, decrement, reset, and step control.', to: '/leetcode/level1/counter' },
      { title: 'Toggle Visibility', description: 'Show or hide content with a single button.', to: '/leetcode/level1/visibility' },
      { title: 'Todo List', description: 'Add, complete, and delete todos.', to: '/leetcode/level1/todo' },
      { title: 'Star Rating', description: 'Hover and click to set a rating.', to: '/leetcode/level1/star-rating' },
      { title: 'Traffic Light', description: 'Auto-cycle through Red, Yellow, and Green.', to: '/leetcode/level1/traffic-light' },
      { title: 'Accordion', description: 'Expand one answer at a time.', to: '/leetcode/level1/accordion' },
      { title: 'Tabs', description: 'Switch between tab panels.', to: '/leetcode/level1/tabs' },
      { title: 'Tooltip', description: 'Hover to reveal contextual help.', to: '/leetcode/level1/tooltip' },
    ],
  },
  {
    eyebrow: 'Level 2: Intermediate State & Side Effects',
    title: 'Level 2 Challenge Set',
    description: 'Complex state, side effects, API fetching, and component communication.',
    items: [
      { title: 'Debounced Search', description: 'Filter a large list with a 300ms debounce.', to: '/leetcode/level2/debounced-search' },
      { title: 'Stopwatch', description: 'Track time, laps, and resets.', to: '/leetcode/level2/stopwatch' },
      { title: 'Modal', description: 'Open, close, and trap interaction cleanly.', to: '/leetcode/level2/modal' },
      { title: 'Carousel', description: 'Navigate images with autoplay and dots.', to: '/leetcode/level2/carousel' },
      { title: 'Form Validation', description: 'Validate live and block invalid submit.', to: '/leetcode/level2/form-validation' },
      { title: 'Memory Card Game', description: 'Flip, match, and track moves.', to: '/leetcode/level2/memory-card' },
      { title: 'Pagination', description: 'Page through remote content in chunks.', to: '/leetcode/level2/pagination' },
      { title: 'QR Code Generator', description: 'Generate QR codes from typed text.', to: '/leetcode/level2/qr-code' },
      { title: 'Tic-Tac-Toe', description: 'Play, detect outcomes, and review history.', to: '/leetcode/level2/tic-tac-toe' },
    ],
  },
  {
    eyebrow: 'Level 3: Advanced UI Patterns',
    title: 'Level 3 Challenge Set',
    description: 'Performance, complex DOM manipulation, and custom abstractions.',
    items: [
      { title: 'Infinite Scroll', description: 'Reveal 20 more mocked rows near the bottom.', to: '/leetcode/level3/infinite-scroll' },
      { title: 'Autocomplete', description: 'Filter 500 items with keyboard navigation.', to: '/leetcode/level3/autocomplete' },
      { title: 'Kanban Board', description: 'Move and reorder cards across three columns.', to: '/leetcode/level3/kanban' },
      { title: 'Virtualized List', description: 'Window a 10,000 row list smoothly.', to: '/leetcode/level3/virtualized-list' },
      { title: 'Wizard Form', description: 'Validate before advancing through four steps.', to: '/leetcode/level3/wizard-form' },
      { title: 'Undo Redo', description: 'Track past, present, and future editor state.', to: '/leetcode/level3/undo-redo' },
      { title: 'Custom Context Menu', description: 'Place a right-click menu at the pointer.', to: '/leetcode/level3/context-menu' },
      { title: 'Mini Paint', description: 'Mini paint app with brush, eraser, and clear.', to: '/leetcode/level3/mini-paint' },
    ],
  },
  {
    eyebrow: 'Level 4: Architecture, npm Integration & System Design',
    title: 'Level 4 Challenge Set',
    description: 'Building tools from scratch, npm integration, and performance-heavy architecture work.',
    items: [
      { title: 'Custom Router', description: 'Route with pushState and dynamic segments.', to: '/leetcode/level4/custom-router' },
      { title: 'Mini State Manager', description: 'Dispatch and subscribe against a custom store.', to: '/leetcode/level4/mini-state-manager' },
      { title: 'Data Grid', description: 'Edit, sort, and resize a 100 x 20 grid.', to: '/leetcode/level4/data-grid' },
      { title: 'Event Bus', description: 'Global pub/sub with toast notifications.', to: '/leetcode/level4/event-bus' },
      { title: 'Markdown Previewer', description: 'Parse markdown with an npm package and render HTML live.', to: '/leetcode/level4/markdown-previewer' },
      { title: 'Masonry Layout', description: 'Pack variable-height cards into the shortest column.', to: '/leetcode/level4/masonry-layout' },
    ],
  },
]

export const challengeRouteMap = challengeSections.flatMap((section) => section.items)
