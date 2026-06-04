import React from 'react'

const InfoRow = ({ label, value }) => (
  <div className="oc-info-row">
    <span className="oc-info-label">{label}</span>
    <span className="oc-info-value">{value}</span>
  </div>
)

const StatCard = ({ label, value, color }) => (
  <div className="oc-stat" style={{ borderTop: `3px solid ${color}` }}>
    <p className="oc-stat-val" style={{ color }}>{value}</p>
    <p className="oc-stat-label">{label}</p>
  </div>
)

const ACTIVITY = [
  { action: 'Profile updated',       date: '02 Jun 2025', status: 'Success' },
  { action: 'Password changed',      date: '28 May 2025', status: 'Success' },
  { action: 'Login from new device', date: '20 May 2025', status: 'Warning' },
  { action: 'Email verified',        date: '15 May 2025', status: 'Success' },
  { action: 'Account created',       date: '10 May 2025', status: 'Success' },
]

const STATUS_COLOR = { Success: '#10b981', Warning: '#f59e0b', Danger: '#ef4444' }

const UserOffCanvas = ({ user, onClose }) => {
  if (!user) return null

  return (
    <>
      {/* Backdrop */}
      <div className="oc-backdrop" onClick={onClose} />

      {/* Panel */}
      <div className="oc-panel">

        {/* Header */}
        <div className="oc-header">
          <div>
            <h5 className="oc-header-title">User Details</h5>
            <p className="oc-header-sub">#{user.id} — Full profile overview</p>
          </div>
          <button className="oc-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="oc-body">

          {/* Profile hero */}
          <div className="oc-profile-hero">
            <div className="oc-avatar-lg">{user.name.charAt(0)}</div>
            <div className="oc-profile-info">
              <h4 className="oc-profile-name">{user.name}</h4>
              <p className="oc-profile-email">{user.email}</p>
              <div className="d-flex gap-2 flex-wrap mt-1">
                <span
                  className="oc-status-badge"
                  style={user.active
                    ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' }
                    : { background: 'rgba(100,116,139,0.1)', color: '#64748b' }}
                >
                  {user.active ? '● Active' : '○ Deactivated'}
                </span>
                <span className="oc-city-badge">{user.city}, {user.state}</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="oc-stats-row">
            <StatCard label="Total Orders"   value="24"          color="#e42929"/>
            <StatCard label="Reviews Given"  value="11"          color="#3b82f6"/>
            <StatCard label="Days Active"    value="82"          color="#10b981"/>
            <StatCard label="Support Tickets" value="3"          color="#f59e0b"/>
          </div>

          <div className="oc-divider"/>

          {/* Two-column detail grid */}
          <div className="oc-detail-grid">

            <div className="oc-detail-card">
              <h6 className="oc-detail-heading">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-1">
                  <circle cx="12" cy="8" r="4" fill="currentColor"/>
                  <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill="currentColor"/>
                </svg>
                Personal Info
              </h6>
              <InfoRow label="Full Name"    value={user.name}/>
              <InfoRow label="Date of Birth" value={user.dob}/>
              <InfoRow label="Phone"        value={user.phone}/>
              <InfoRow label="Email"        value={user.email}/>
            </div>

            <div className="oc-detail-card">
              <h6 className="oc-detail-heading">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-1">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" fill="currentColor"/>
                  <circle cx="12" cy="10" r="3" fill="#fff"/>
                </svg>
                Location
              </h6>
              <InfoRow label="Address"  value={user.address}/>
              <InfoRow label="City"     value={user.city}/>
              <InfoRow label="State"    value={user.state}/>
              <InfoRow label="Country"  value="India"/>
            </div>

            <div className="oc-detail-card">
              <h6 className="oc-detail-heading">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-1">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Account Info
              </h6>
              <InfoRow label="User ID"     value={`#${user.id}`}/>
              <InfoRow label="Joined"      value={user.joined}/>
              <InfoRow label="Last Login"  value={user.lastLogin}/>
              <InfoRow label="Status"      value={user.active ? 'Active' : 'Deactivated'}/>
            </div>

            <div className="oc-detail-card">
              <h6 className="oc-detail-heading">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-1">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Contact
              </h6>
              <InfoRow label="Primary"    value={user.phone}/>
              <InfoRow label="Email"      value={user.email}/>
              <InfoRow label="Alt Phone"  value="—"/>
              <InfoRow label="WhatsApp"   value={user.phone}/>
            </div>

          </div>

          <div className="oc-divider"/>

          {/* Activity log */}
          <h6 className="oc-section-title">Recent Activity</h6>
          <div className="table-responsive">
            <table className="table oc-activity-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Action</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVITY.map((a, i) => (
                  <tr key={i}>
                    <td className="text-muted">{i + 1}</td>
                    <td>{a.action}</td>
                    <td className="text-muted">{a.date}</td>
                    <td>
                      <span
                        className="status-dot"
                        style={{ background: STATUS_COLOR[a.status], color: STATUS_COLOR[a.status] }}
                      >
                        ● {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer actions */}
        <div className="oc-footer">
          <button className="oc-btn oc-btn--ghost" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            Close
          </button>
          <div className="d-flex gap-2">
            <button className="oc-btn oc-btn--outline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit User
            </button>
            <button className="oc-btn oc-btn--danger">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Deactivate
            </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default UserOffCanvas
