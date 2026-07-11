// src/components/Navbar.tsx
import { useState } from 'react'
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
function renderSecondLevel(
  items: { label: string; to: string }[],
  onLinkClick: () => void,
) {
  return (
    <ul className="dropdown-sub">
      {items.map((sub) => (
        <li key={sub.label}>
          <Link to={sub.to} onClick={onLinkClick}>{sub.label}</Link>
        </li>
      ))}
    </ul>
  )
}

function renderFirstLevel(
  items: SecondLevelItem[],
  openSubPanel: string | null,
  setOpenSubPanel: React.Dispatch<React.SetStateAction<string | null>>,
  onLinkClick: () => void,
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
                {renderSecondLevel(child.children, onLinkClick)}
              </div>
            </>
          ) : (
            <Link to={child.to} onClick={onLinkClick}>{child.label}</Link>
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

  const handleLinkClick = () => {
    setMobileOpen(false)
    setOpenPanel(null)
    setOpenSubPanel(null)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link
          to="/"
          className="navbar-brand"
          onClick={handleLinkClick}
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
                  <div className={`nav-panel ${openPanel === item.label ? 'is-open' : ''}`}>
                    {renderFirstLevel(item.children, openSubPanel, setOpenSubPanel, handleLinkClick)}
                  </div>
                </>
              ) : (
                <Link
                  to={item.to}
                  className="nav-link"
                  onClick={handleLinkClick}
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
