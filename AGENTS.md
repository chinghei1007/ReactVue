# Agent Instructions

Keep this file short. Read only what is needed for the task.

## Project Scope
- Frontend only.
- React + TypeScript + Vite + Tailwind.
- No backend, API routes, or database work.

## Implementation Rules
- Follow the PRD and do not add extra features.
- Prefer reusable shared components when they are clearly global.
- Keep Web Audio/WebGL logic out of React state when performance matters.
- Use local file uploads if browser access causes CORS issues.

## Styling Rules
- Use `src/styles/` for page-specific CSS.
- Use shared reusable components only when multiple pages truly need them.
- Support light and dark mode through app-wide CSS tokens.

## Working Rules
- Inspect only the files needed for the task.
- Reuse existing components and data structures before creating new ones.
- Run a build after meaningful changes.

