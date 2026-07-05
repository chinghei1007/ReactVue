// src/App.tsx
import { useEffect, useState } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import routes from '~react-pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme === 'dark' ? 'dark' : 'light'
  })
  const location = useLocation()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
      <div className="app-layout" data-theme={theme}>
        <Navbar />
        <button
          type="button"
          className="scroll-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5"/>
            <path d="M5 12l7-7 7 7"/>
          </svg>
        </button>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
        <main className="main-content">
          {useRoutes(routes)}
        </main>
        <Footer />
      </div>
  )
}
