import React from 'react'

const DONUTS = [
  { label: 'Photographers', value: '4,210', pct: 68, color: '#e42929', track: '#fde8e8' },
  { label: 'Videographers',  value: '2,840', pct: 52, color: '#3b82f6', track: '#dbeafe' },
  { label: 'Photo Studios',  value: '1,630', pct: 38, color: '#10b981', track: '#d1fae5' },
  { label: 'Digital Labs',   value: '980',   pct: 24, color: '#f59e0b', track: '#fef3c7' },
]

const Donut = ({ pct, color, track, label, value }) => {
  const r = 36
  const circ = 2 * Math.PI * r
  const filled = (pct / 100) * circ

  return (
    <div className="donut-item">
      <div className="donut-svg-wrap">
        <svg width="92" height="92" viewBox="0 0 92 92">
          <circle cx="46" cy="46" r={r} fill="none" stroke={track} strokeWidth="9"/>
          <circle
            cx="46" cy="46" r={r} fill="none"
            stroke={color} strokeWidth="9"
            strokeDasharray={`${filled} ${circ - filled}`}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '46px 46px', transition: 'stroke-dasharray 0.6s ease' }}
          />
          <text x="46" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">{pct}%</text>
          <text x="46" y="55" textAnchor="middle" fontSize="8" fill="#94a3b8">share</text>
        </svg>
      </div>
      <p className="donut-label">{label}</p>
      <p className="donut-value" style={{ color }}>{value}</p>
    </div>
  )
}

const DonutCharts = () => (
  <div className="dash-card h-100">
    <div className="dash-card__head">
      <div>
        <h6 className="dash-card__title">Business Breakdown</h6>
        <p className="dash-card__sub">Top categories by user share</p>
      </div>
    </div>
    <div className="donut-grid">
      {DONUTS.map(d => <Donut key={d.label} {...d}/>)}
    </div>
  </div>
)

export default DonutCharts
