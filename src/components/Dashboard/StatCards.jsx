import React from 'react'

const STATS = [
  {
    label: 'Total Users',
    value: '12,480',
    change: '+8.2%',
    up: true,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" fill="currentColor"/>
        <path d="M2 21c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 3.5a4 4 0 0 1 0 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M22 21c0-3.5-2.5-6.5-6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Business Users',
    value: '3,640',
    change: '+4.5%',
    up: true,
    color: '#e42929',
    bg: 'rgba(228,41,41,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M3 7h18M6 7V4h12v3M9 21V11m6 10V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Messages Sent',
    value: '84,320',
    change: '+12.1%',
    up: true,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Total Revenue',
    value: '$48,290',
    change: '-2.3%',
    up: false,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const UpArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const DownArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const StatCards = () => (
  <div className="row g-3 mb-4">
    {STATS.map(({ label, value, change, up, color, bg, icon }) => (
      <div className="col-12 col-sm-6 col-xl-3" key={label}>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: bg, color }}>
            {icon}
          </div>
          <div className="stat-body">
            <p className="stat-label">{label}</p>
            <h3 className="stat-value">{value}</h3>
            <span className={`stat-change ${up ? 'stat-change--up' : 'stat-change--down'}`}>
              {up ? <UpArrow /> : <DownArrow />}
              {change} vs last month
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default StatCards
