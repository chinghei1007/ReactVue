// src/App.tsx
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTheme } from '@/theme/ThemeContext'
import '@/App.css'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <button
          type="button"
          className="fixed right-4 bottom-4 z-[1001] cursor-pointer rounded-full border border-line bg-surface px-4 py-3 text-content shadow-panel hover:border-accent"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
        <main className="mx-auto w-full max-w-300 flex-1 p-4 md:p-8">
          {useRoutes(routes)}
        </main>
        <Footer />
      </div>
  )
}
