// src/App.tsx
import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
      <div className="app-layout" data-theme={theme}>
        <Navbar />
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
