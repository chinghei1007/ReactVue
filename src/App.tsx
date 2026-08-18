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
      <div className="app-shell">
        <Navbar />
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
        <main className="page-content">
          {useRoutes(routes)}
        </main>
        <Footer />
      </div>
  )
}
