import React, { useState } from 'react'

const LOCATIONS = [
  { city: 'New York',  x: '18%',  y: '33%', users: 2840, color: '#e42929' },
  { city: 'London',    x: '44%',  y: '24%', users: 1920, color: '#3b82f6' },
  { city: 'Mumbai',    x: '62%',  y: '42%', users: 3210, color: '#f59e0b' },
  { city: 'Dubai',     x: '57%',  y: '38%', users: 1560, color: '#10b981' },
  { city: 'Singapore', x: '72%',  y: '50%', users: 980,  color: '#8b5cf6' },
  { city: 'Sydney',    x: '78%',  y: '70%', users: 720,  color: '#06b6d4' },
  { city: 'São Paulo', x: '28%',  y: '62%', users: 860,  color: '#f97316' },
  { city: 'Tokyo',     x: '80%',  y: '30%', users: 1140, color: '#ec4899' },
]

const REGIONS = [
  { name: 'South Asia',    users: 5840, pct: 82, color: '#f59e0b' },
  { name: 'North America', users: 3480, pct: 65, color: '#e42929' },
  { name: 'Europe',        users: 2610, pct: 54, color: '#3b82f6' },
  { name: 'Middle East',   users: 1560, pct: 38, color: '#10b981' },
  { name: 'East Asia',     users: 1140, pct: 28, color: '#ec4899' },
]

const MapWidget = () => {
  const [hovered, setHovered] = useState(null)
  const maxUsers = Math.max(...LOCATIONS.map(l => l.users))

  return (
    <div className="dash-card h-100">
      <div className="dash-card__head">
        <div>
          <h6 className="dash-card__title">User Distribution</h6>
          <p className="dash-card__sub">Active users by location</p>
        </div>
        <span className="badge" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6', fontSize: 11 }}>
          {LOCATIONS.reduce((a, l) => a + l.users, 0).toLocaleString()} total
        </span>
      </div>

      {/* Map area */}
      <div className="map-area">
        {/* Grid lines */}
        <svg className="map-grid" viewBox="0 0 400 200" preserveAspectRatio="none">
          {[1,2,3,4,5,6].map(i => (
            <line key={`v${i}`} x1={i*66} y1="0" x2={i*66} y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          ))}
          {[1,2,3].map(i => (
            <line key={`h${i}`} x1="0" y1={i*50} x2="400" y2={i*50} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          ))}
          {/* equator */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,4"/>
        </svg>

        {/* Location pins */}
        {LOCATIONS.map(loc => {
          const size = 8 + (loc.users / maxUsers) * 14
          const isHov = hovered === loc.city
          return (
            <div
              key={loc.city}
              className="map-pin"
              style={{ left: loc.x, top: loc.y }}
              onMouseEnter={() => setHovered(loc.city)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="map-pin__dot"
                style={{
                  width: size, height: size,
                  background: loc.color,
                  boxShadow: `0 0 0 ${isHov ? 6 : 3}px ${loc.color}33`,
                }}
              />
              {isHov && (
                <div className="map-tooltip">
                  <strong>{loc.city}</strong>
                  <span>{loc.users.toLocaleString()} users</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Region list */}
      <div className="map-regions mt-3">
        {REGIONS.map(r => (
          <div key={r.name} className="map-region-row">
            <span className="region-dot" style={{ background: r.color }}/>
            <span className="region-name">{r.name}</span>
            <div className="region-bar-wrap">
              <div className="region-bar" style={{ width: `${r.pct}%`, background: r.color }}/>
            </div>
            <span className="region-users">{r.users.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapWidget
