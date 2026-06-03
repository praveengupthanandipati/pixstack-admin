import React, { useEffect, useRef, useState } from 'react'
import '../styles/Header.scss'

const Header = ({ onMenuToggle, sidebarOpen }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleOutside)
    return () => document.removeEventListener('click', handleOutside)
  }, [])

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className={`menu-btn${!sidebarOpen ? ' menu-btn--open' : ''}`}
          aria-label={sidebarOpen ? 'Hide menu' : 'Show menu'}
          onClick={() => onMenuToggle && onMenuToggle()}
        >
          {/* Hamburger — shown when sidebar is visible */}
          <span className="menu-icon menu-icon--hamburger">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <rect y="1"  width="20" height="2" rx="1" fill="currentColor" />
              <rect y="6"  width="20" height="2" rx="1" fill="currentColor" />
              <rect y="11" width="20" height="2" rx="1" fill="currentColor" />
            </svg>
          </span>

          {/* Close X — shown when sidebar is hidden */}
          <span className="menu-icon menu-icon--close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>

      <div className="header-right">
        <button className="icon-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2z" fill="currentColor" />
            <path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 10-3 0v.68C7.63 5.36 6 7.92 6 11v5l-1.99 2H20l-2-2z" fill="currentColor" />
          </svg>
          <span className="badge">3</span>
        </button>

        <div className="user-menu" ref={dropdownRef}>
          <button className="user-btn" onClick={() => setOpen((s) => !s)} aria-haspopup="true" aria-expanded={open}>
            <span className="avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="currentColor" />
                <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill="currentColor" />
              </svg>
            </span>
            <span className="username">Admin</span>
            <span className="caret">▾</span>
          </button>

          {open && (
            <div className="dropdown" role="menu">
              <button role="menuitem">Profile</button>
              <button role="menuitem">Settings</button>
              <div className="divider" />
              <button role="menuitem">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
