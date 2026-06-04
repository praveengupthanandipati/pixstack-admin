import React, { useState } from 'react'

const ORDERS = [
  { id: '#ORD-0091', name: 'Arjun Mehta',     email: 'arjun@gmail.com',    type: 'Photographer',   date: '04 Jun 2025', amount: '$240', status: 'Completed' },
  { id: '#ORD-0090', name: 'Sarah Williams',  email: 'sarah@outlook.com',  type: 'Video Grapher',  date: '03 Jun 2025', amount: '$380', status: 'Pending'   },
  { id: '#ORD-0089', name: 'Raj Studio',      email: 'raj@studio.in',      type: 'Photo Studio',   date: '03 Jun 2025', amount: '$950', status: 'Completed' },
  { id: '#ORD-0088', name: 'Emily Carter',    email: 'emily@gmail.com',    type: 'Freelancer',     date: '02 Jun 2025', amount: '$120', status: 'Cancelled' },
  { id: '#ORD-0087', name: 'Digital Zone',    email: 'info@dzone.com',     type: 'Digital Lab',    date: '02 Jun 2025', amount: '$680', status: 'Completed' },
  { id: '#ORD-0086', name: 'Marco Ricci',     email: 'marco@ricci.it',     type: 'Editor',         date: '01 Jun 2025', amount: '$200', status: 'Pending'   },
  { id: '#ORD-0085', name: 'Priya Sharma',    email: 'priya@design.co',    type: 'Album Designer', date: '01 Jun 2025', amount: '$310', status: 'Completed' },
  { id: '#ORD-0084', name: 'James O\'Brien',  email: 'james@jbphotos.ie',  type: 'Photographer',   date: '31 May 2025', amount: '$445', status: 'Pending'   },
  { id: '#ORD-0083', name: 'Lens & Light Co', email: 'hello@lenslight.com',type: 'Photo Studio',   date: '30 May 2025', amount: '$1,200','status': 'Completed'},
  { id: '#ORD-0082', name: 'Tanya Nair',      email: 'tanya@gmail.com',    type: 'Freelancer',     date: '29 May 2025', amount: '$95',  status: 'Cancelled' },
]

const STATUS_STYLE = {
  Completed: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  Pending:   { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  Cancelled: { bg: 'rgba(239,68,68,0.1)',  color: '#ef4444' },
}

const RecentOrdersTable = () => {
  const [search, setSearch] = useState('')

  const rows = ORDERS.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.type.toLowerCase().includes(search.toLowerCase()) ||
    o.status.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dash-card">
      <div className="dash-card__head">
        <div>
          <h6 className="dash-card__title">Recent Orders</h6>
          <p className="dash-card__sub">Latest 10 transactions</p>
        </div>
        <input
          className="dash-search"
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover dash-table mb-0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(o => {
              const s = STATUS_STYLE[o.status]
              return (
                <tr key={o.id}>
                  <td className="fw-semibold text-primary">{o.id}</td>
                  <td>
                    <div className="td-user">
                      <div className="td-avatar">{o.name.charAt(0)}</div>
                      <div>
                        <div className="td-name">{o.name}</div>
                        <div className="td-email">{o.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{o.type}</td>
                  <td className="text-muted">{o.date}</td>
                  <td className="fw-semibold">{o.amount}</td>
                  <td>
                    <span className="status-pill" style={{ background: s.bg, color: s.color }}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrdersTable
