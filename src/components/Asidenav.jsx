import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../styles/Asidenav.scss'

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
  </svg>
)

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="4" fill="currentColor" />
    <path d="M2 21c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 3.5a4 4 0 0 1 0 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 21c0-3.5-2.5-6.5-6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const BusinessIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M3 7h18M6 7V4h12v3M9 21V11m6 10V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronIcon = ({ open }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    className={`chevron${open ? ' chevron--open' : ''}`}
  >
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SubDot = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" className="sub-dot">
    <circle cx="3" cy="3" r="3" />
  </svg>
)

const BUSINESS_USERS_ITEMS = [
  { label: 'Photographers',    badge: null },
  { label: 'Video Graphers',   badge: null },
  { label: 'Photo Studios',    badge: null },
  { label: 'Digital Labs',     badge: null },
  { label: 'Freelancers',      badge: null },
  { label: 'Editors',          badge: null },
  { label: 'Album Designers',  badge: null },
]

const TEXTING_RECORDS_ITEMS = [
  { label: 'All Messages',       badge: null },
  { label: 'Sent Messages',      badge: null },
  { label: 'Received Messages',  badge: '12' },
  { label: 'Draft Messages',     badge: '4'  },
  { label: 'Scheduled Messages', badge: null },
  { label: 'Bulk Campaigns',     badge: null },
  { label: 'Message Templates',  badge: null },
  { label: 'Message Reports',    badge: null },
  { label: 'Blocked Numbers',    badge: null },
  { label: 'Message Settings',   badge: null },
]

const toSlug = (str) => str.toLowerCase().replace(/\s+/g, '-')

const DropdownGroup = ({ label, icon, items, basePath, isOpen, onToggle }) => (
  <li className={`nav-group${isOpen ? ' nav-group--open' : ''}`}>
    <button
      className="nav-item nav-item--toggle d-flex align-items-center w-100"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="nav-icon">{icon}</span>
      <span className="nav-label flex-grow-1">{label}</span>
      <ChevronIcon open={isOpen} />
    </button>

    <div className={`nav-sub-wrapper${isOpen ? ' nav-sub-wrapper--open' : ''}`}>
      <ul className="nav-sub list-unstyled mb-0">
        {items.map(({ label: itemLabel, badge }) => (
          <li key={itemLabel}>
            <NavLink
              to={`${basePath}/${toSlug(itemLabel)}`}
              className={({ isActive }) => `nav-sub-item d-flex align-items-center gap-2${isActive ? ' active' : ''}`}
            >
              <SubDot />
              <span className="flex-grow-1">{itemLabel}</span>
              {badge && (
                <span className="badge rounded-pill nav-badge">{badge}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </li>
)

const Asidenav = ({ open }) => {
  const [openGroup, setOpenGroup] = useState(null)

  useEffect(() => {
    if (!open) setOpenGroup(null)
  }, [open])

  const handleToggle = (key) =>
    setOpenGroup(prev => (prev === key ? null : key))

  return (
    <aside className={`asidenav${open ? '' : ' asidenav--collapsed'}`}>

      {/* Brand / logo area */}
      <div className="sidebar-brand px-3 mb-3">
        <div className="brand-logo-wrap d-flex align-items-center justify-content-between">
          <div className="brand-logo-pill">
            <img src={logo} alt="Pixstack" className="sidebar-logo" />
          </div>
          <span className="badge bg-danger brand-badge">Admin</span>
        </div>
      </div>

      <div className="sidebar-divider mb-2" />

      <nav>
        <p className="nav-section-label px-3">MAIN MENU</p>
        <ul className="nav-list list-unstyled mb-0 px-2">

          {/* Dashboard */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-item d-flex align-items-center gap-2${isActive ? ' active' : ''}`
              }
            >
              <span className="nav-icon"><DashboardIcon /></span>
              <span className="nav-label">Dashboard</span>
            </NavLink>
          </li>

            {/* Categories */}
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `nav-item d-flex align-items-center gap-2${isActive ? ' active' : ''}`
              }
            >
              <span className="nav-icon"><UsersIcon /></span>
              <span className="nav-label flex-grow-1">Categories</span>
              <span className="badge rounded-pill nav-badge">New</span>
            </NavLink>
          </li>

          {/* Users */}
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `nav-item d-flex align-items-center gap-2${isActive ? ' active' : ''}`
              }
            >
              <span className="nav-icon"><UsersIcon /></span>
              <span className="nav-label flex-grow-1">Users</span>
              <span className="badge rounded-pill nav-badge">New</span>
            </NavLink>
          </li>

          {/* Business Users accordion */}
          <DropdownGroup
            label="Business Users"
            icon={<BusinessIcon />}
            items={BUSINESS_USERS_ITEMS}
            basePath="/business-users"
            isOpen={openGroup === 'business'}
            onToggle={() => handleToggle('business')}
          />

          {/* Texting Records accordion */}
          <DropdownGroup
            label="Texting Records"
            icon={<MessageIcon />}
            items={TEXTING_RECORDS_ITEMS}
            basePath="/texting-records"
            isOpen={openGroup === 'texting'}
            onToggle={() => handleToggle('texting')}
          />

        </ul>
      </nav>
    </aside>
  )
}

export default Asidenav
