import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { LogoHeader } from './components/LogoHeader'
import { ListSamples } from './ListSamples'
import './App.css'

function App() {
  // Initialize theme from localStorage or default to dark
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme')
    return (savedTheme as 'light' | 'dark') || 'dark'
  })

  // Apply theme to document body and save to localStorage
  useEffect(() => {
    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light')
    } else {
      document.body.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Theme toggle button component
  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )

  return (
    <div className="app">
      <LogoHeader
        logoSrc="/nbg-tech-hub-logo.svg"
        logoAlt="NBG Tech Hub"
        title={<h1>List Component Demo</h1>}
        subtitle="Explore various List and ListItem component configurations"
        topRightControls={<ThemeToggle />}
      />
      <ListSamples />
    </div>
  )
}

export default App