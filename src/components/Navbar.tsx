// src/components/Navbar.tsx
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

// --- Types ---
type TopNavItem =
  | { label: string; to: string }
  | { label: string; children: SecondLevelItem[] }

type SecondLevelItem =
  | { label: string; to: string }
  | { label: string; children: { label: string; to: string }[] }

// --- Data ---
const navItems: TopNavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Leetcode',
    children: [
      {
        label: 'Level 1',
        children: [
          { label: 'Counter', to: '/leetcode/level1/counter' },
          { label: 'Visibility', to: '/leetcode/level1/visibility' },
          { label: 'Todo', to: '/leetcode/level1/todo' },
          { label: 'Star Rating', to: '/leetcode/level1/star-rating' },
          { label: 'Traffic Light', to: '/leetcode/level1/traffic-light' },
          { label: 'Accordion', to: '/leetcode/level1/accordion' },
          { label: 'Tabs', to: '/leetcode/level1/tabs' },
          { label: 'Tooltip', to: '/leetcode/level1/tooltip' },
        ],
      },
      {
        label: 'Level 2',
        children: [
          { label: 'Debounced Search', to: '/leetcode/level2/debounced-search' },
          { label: 'Stopwatch', to: '/leetcode/level2/stopwatch' },
          { label: 'Modal', to: '/leetcode/level2/modal' },
          { label: 'Carousel', to: '/leetcode/level2/carousel' },
          { label: 'Form Validation', to: '/leetcode/level2/form-validation' },
          // { label: 'Dark Mode', to: '/leetcode/level2/dark-mode' },
          { label: 'Memory Card', to: '/leetcode/level2/memory-card' },
          { label: 'Pagination', to: '/leetcode/level2/pagination' },
          { label: 'QR Code', to: '/leetcode/level2/qr-code' },
          { label: 'Tic-Tac-Toe', to: '/leetcode/level2/tic-tac-toe' },
        ],
      },
      {
        label: 'Level 3',
        children: [
          { label: 'Infinite Scroll', to: '/leetcode/level3/infinite-scroll' },
          { label: 'Autocomplete', to: '/leetcode/level3/autocomplete' },
          { label: 'Kanban', to: '/leetcode/level3/kanban' },
          { label: 'Virtualized List', to: '/leetcode/level3/virtualized-list' },
          { label: 'Wizard Form', to: '/leetcode/level3/wizard-form' },
          { label: 'Undo / Redo', to: '/leetcode/level3/undo-redo' },
          { label: 'Context Menu', to: '/leetcode/level3/context-menu' },
          { label: 'Mini Paint', to: '/leetcode/level3/mini-paint' },
        ],
      },
      {
        label: 'Level 4',
        children: [
          { label: 'Custom Router', to: '/leetcode/level4/custom-router' },
          { label: 'Mini Store', to: '/leetcode/level4/mini-state-manager' },
          { label: 'Data Grid', to: '/leetcode/level4/data-grid' },
          { label: 'Event Bus', to: '/leetcode/level4/event-bus' },
          { label: 'Markdown Preview', to: '/leetcode/level4/markdown-previewer' },
          { label: 'Masonry Layout', to: '/leetcode/level4/masonry-layout' },
        ],
      },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// --- Render helpers ---
function renderSecondLevel(items: { label: string; to: string }[]) {
  return (
    <ul className="dropdown-sub">
      {items.map((sub) => (
        <li key={sub.label}>
          <Link to={sub.to}>{sub.label}</Link>
        </li>
      ))}
    </ul>
  )
}

function renderFirstLevel(
  items: SecondLevelItem[],
  openSubPanel: string | null,
  setOpenSubPanel: React.Dispatch<React.SetStateAction<string | null>>,
) {
  return (
    <ul className="dropdown">
      {items.map((child) => (
        <li key={child.label} className="dropdown-item">
          {'children' in child ? (
            <>
              <button
                type="button"
                className="dropdown-label has-sub"
                aria-expanded={openSubPanel === child.label}
                onClick={() => setOpenSubPanel((value) => (value === child.label ? null : child.label))}
              >
                {child.label}
              </button>
              <div className={`dropdown-sub-panel ${openSubPanel === child.label ? 'is-open' : ''}`}>
                {renderSecondLevel(child.children)}
              </div>
            </>
          ) : (
            <Link to={child.to}>{child.label}</Link>
          )}
        </li>
      ))}
    </ul>
  )
}

// --- Component ---
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openPanel, setOpenPanel] = useState<string | null>(null)
  const [openSubPanel, setOpenSubPanel] = useState<string | null>(null)
  const [dropdownPositions, setDropdownPositions] = useState<Record<string, 'left' | 'right'>>({})
  const navbarRef = useRef<HTMLDivElement>(null)

  // Detect if each dropdown panel fits within viewport
  useEffect(() => {
    const checkViewportFit = () => {
      if (!navbarRef.current) return

      console.log("Viewport width:", window.innerWidth)
      console.log("Viewport height:", window.innerHeight)

      // Find all open nav panels
      const openPanels = navbarRef.current.querySelectorAll('.nav-panel.is-open')
      
      const newPositions: Record<string, 'left' | 'right'> = {}

      openPanels.forEach((panel) => {
        const rect = panel.getBoundingClientRect()
        const panelElement = panel as HTMLElement
        
        // Get the parent nav-item label to use as key
        const navItem = panel.closest('.nav-item')
        const button = navItem?.querySelector('.nav-link.has-dropdown') as HTMLButtonElement
        const panelKey = button?.textContent?.trim() || ''

        const spaceOnRight = window.innerWidth - rect.right
        const spaceOnLeft = rect.left

        // Check if panel overflows on right side
        if (rect.right > window.innerWidth) {
          // Not enough space on right, try to align to right
          newPositions[panelKey] = 'right'
          console.log(`Panel "${panelKey}" overflows right (right: ${rect.right}, viewport: ${window.innerWidth}) - positioning right`)
        } 
        // Check if panel overflows on left side (when positioned right)
        else if (rect.left < 0) {
          // Overflows on left, position to left
          newPositions[panelKey] = 'left'
          console.log(`Panel "${panelKey}" overflows left (left: ${rect.left}) - positioning left`)
        } 
        // Check if there's enough space on right for minimum width
        else if (spaceOnRight < 220 && spaceOnLeft > 220) {
          newPositions[panelKey] = 'right'
          console.log(`Panel "${panelKey}" limited space on right (${spaceOnRight}px) - positioning right`)
        } 
        else {
          newPositions[panelKey] = 'left'
          console.log(`Panel "${panelKey}" fits well - positioning left`)
        }
      })

      setDropdownPositions(newPositions)
    }

    // Check on open and resize
    if (openPanel) {
      setTimeout(checkViewportFit, 0) // Wait for DOM to update
      window.addEventListener('resize', checkViewportFit)
      window.addEventListener('scroll', checkViewportFit, true)
    }

    return () => {
      window.removeEventListener('resize', checkViewportFit)
      window.removeEventListener('scroll', checkViewportFit, true)
    }
  }, [openPanel])

  return (
    <nav className="navbar">
      <div className="navbar-inner" ref={navbarRef}>
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => {
            setMobileOpen(false)
            setOpenPanel(null)
            setOpenSubPanel(null)
          }}
        >
          MyApp
        </Link>
        <button
          type="button"
          className={`navbar-toggle ${mobileOpen ? 'is-open' : ''}`}
          aria-expanded={mobileOpen}
          aria-controls="navbar-menu"
          onClick={() => {
            setMobileOpen((value) => !value)
            if (mobileOpen) {
              setOpenPanel(null)
              setOpenSubPanel(null)
            }
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <ul id="navbar-menu" className={`navbar-nav ${mobileOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.label} className="nav-item">
              {'children' in item ? (
                <>
                  <button
                    type="button"
                    className="nav-link has-dropdown"
                    aria-expanded={openPanel === item.label}
                    onClick={() => {
                      setOpenPanel((value) => (value === item.label ? null : item.label))
                      setOpenSubPanel(null)
                    }}
                  >
                    {item.label}
                  </button>
                  <div 
                    className={`nav-panel ${openPanel === item.label ? 'is-open' : ''}`}
                    style={{ 
                      left: dropdownPositions[item.label] === 'right' ? 'auto' : '0',
                      right: dropdownPositions[item.label] === 'right' ? '0' : 'auto'
                    }}
                  >
                    {renderFirstLevel(item.children, openSubPanel, setOpenSubPanel)}
                  </div>
                </>
              ) : (
                <Link
                  to={item.to}
                  className="nav-link"
                  onClick={() => {
                    setMobileOpen(false)
                    setOpenPanel(null)
                    setOpenSubPanel(null)
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
