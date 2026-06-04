import React, { useState } from 'react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const REVENUE = [4200, 5800, 4900, 7200, 6100, 8400, 7800, 9200, 8600, 11200, 9800, 12400]
const ORDERS  = [310,  460,  390,  580,  490,  670,  620,  740,  700,  890,   780,  980]

const W = 560
const H = 180
const PAD_L = 40
const PAD_B = 28
const PAD_T = 16
const INNER_W = W - PAD_L
const INNER_H = H - PAD_B - PAD_T

const normalize = (data) => {
  const max = Math.max(...data)
  return data.map(v => INNER_H - (v / max) * INNER_H + PAD_T)
}

const toPath = (ys) =>
  ys.map((y, i) => {
    const x = PAD_L + (i / (ys.length - 1)) * INNER_W
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')

const toArea = (ys) => {
  const line = toPath(ys)
  const lastX = (PAD_L + INNER_W).toFixed(1)
  const firstX = PAD_L.toFixed(1)
  const bottom = (PAD_T + INNER_H).toFixed(1)
  return `${line} L${lastX},${bottom} L${firstX},${bottom} Z`
}

const SalesChart = () => {
  const [active, setActive] = useState(null)
  const revY = normalize(REVENUE)
  const ordY = normalize(ORDERS)

  return (
    <div className="dash-card h-100">
      <div className="dash-card__head">
        <div>
          <h6 className="dash-card__title">Revenue Overview</h6>
          <p className="dash-card__sub">Monthly revenue vs orders — 2024</p>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <span className="chart-legend"><span className="legend-dot" style={{ background: '#e42929' }} />Revenue</span>
          <span className="chart-legend"><span className="legend-dot" style={{ background: '#3b82f6' }} />Orders</span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 320 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e42929" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#e42929" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0,1,2,3,4].map(i => {
            const y = PAD_T + (i / 4) * INNER_H
            return <line key={i} x1={PAD_L} y1={y} x2={W} y2={y} stroke="#f0f0f0" strokeWidth="1"/>
          })}

          {/* Area fills */}
          <path d={toArea(ordY)} fill="url(#ordGrad)"/>
          <path d={toArea(revY)} fill="url(#revGrad)"/>

          {/* Lines */}
          <path d={toPath(ordY)} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={toPath(revY)} fill="none" stroke="#e42929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

          {/* Month labels + hover dots */}
          {MONTHS.map((m, i) => {
            const x = PAD_L + (i / (MONTHS.length - 1)) * INNER_W
            const isActive = active === i
            return (
              <g key={m} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} style={{ cursor: 'default' }}>
                <rect x={x - 20} y={PAD_T} width={40} height={INNER_H} fill="transparent"/>
                <text x={x} y={H - 8} textAnchor="middle" fontSize="10" fill="#94a3b8">{m}</text>
                {isActive && (
                  <>
                    <line x1={x} y1={PAD_T} x2={x} y2={PAD_T + INNER_H} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3"/>
                    {/* Revenue dot */}
                    <circle cx={x} cy={revY[i]} r="4" fill="#fff" stroke="#e42929" strokeWidth="2"/>
                    {/* Orders dot */}
                    <circle cx={x} cy={ordY[i]} r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                    {/* Tooltip */}
                    <g>
                      <rect x={x - 44} y={revY[i] - 42} width={88} height={36} rx="6" fill="#1e293b"/>
                      <text x={x} y={revY[i] - 28} textAnchor="middle" fontSize="10" fill="#94a3b8">Revenue / Orders</text>
                      <text x={x} y={revY[i] - 14} textAnchor="middle" fontSize="10" fontWeight="700" fill="#f1f5f9">
                        ${REVENUE[i].toLocaleString()} · {ORDERS[i]}
                      </text>
                    </g>
                  </>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default SalesChart
