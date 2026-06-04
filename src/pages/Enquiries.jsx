import React, { useState, useMemo } from 'react'
import '../styles/Enquiries.scss'

// ── seed data ─────────────────────────────────────────────────────────────────
const BUSINESSES = [
  'Raj Photo Studio',
  'Lens & Light Co.',
  'Digital Zone Labs',
  'Frame Perfect Films',
  'Pixel Arts Studio',
  'GoldenFrame Studio',
  'AlbumCraft Designs',
  'Motion Magic Films',
]

const MESSAGES = [
  'I would like to know more about your wedding photography packages and pricing.',
  'Can you share availability for December 2025 for a destination wedding shoot?',
  'Looking for a full-day coverage package including pre-wedding and ceremony.',
  'Please share your portfolio and price list for corporate event coverage.',
  'Interested in your cinematic wedding film package. What is included?',
  'Do you offer photo + video combos? Need details for a budget of ₹50,000.',
  'Looking for a birthday party photographer available on 15 July 2025.',
  'Enquiring about album design services. What paper and size options do you offer?',
  'Need a team of two photographers for a three-day wedding event in Goa.',
  'Can you shoot product photography for our e-commerce catalogue?',
]

const SEED = [
  { id:'ENQ001', date:'2025-06-01', business:'Raj Photo Studio',    name:'Meera Pillai',   phone:'+91 98001 11111', email:'meera.pillai@gmail.com',   message: MESSAGES[0], status:'New'     },
  { id:'ENQ002', date:'2025-06-01', business:'Lens & Light Co.',    name:'Sunil Gupta',    phone:'+91 97001 22222', email:'sunil.gupta@outlook.com',   message: MESSAGES[1], status:'Replied' },
  { id:'ENQ003', date:'2025-05-30', business:'Digital Zone Labs',   name:'Divya Menon',    phone:'+91 96001 33333', email:'divya.menon@gmail.com',     message: MESSAGES[2], status:'New'     },
  { id:'ENQ004', date:'2025-05-29', business:'Frame Perfect Films', name:'Rajan Shah',     phone:'+91 95001 44444', email:'rajan.shah@yahoo.com',      message: MESSAGES[3], status:'Closed'  },
  { id:'ENQ005', date:'2025-05-28', business:'Raj Photo Studio',    name:'Anita Rao',      phone:'+91 94001 55555', email:'anita.rao@gmail.com',       message: MESSAGES[4], status:'Replied' },
  { id:'ENQ006', date:'2025-05-27', business:'Pixel Arts Studio',   name:'Arjun Mehta',    phone:'+91 98201 34567', email:'arjun.mehta@gmail.com',     message: MESSAGES[5], status:'New'     },
  { id:'ENQ007', date:'2025-05-26', business:'GoldenFrame Studio',  name:'Priya Sharma',   phone:'+91 97301 55678', email:'priya.sharma@yahoo.com',    message: MESSAGES[6], status:'New'     },
  { id:'ENQ008', date:'2025-05-25', business:'AlbumCraft Designs',  name:'Vikram Singh',   phone:'+91 98111 43210', email:'vikram.singh@gmail.com',    message: MESSAGES[7], status:'Replied' },
  { id:'ENQ009', date:'2025-05-24', business:'Motion Magic Films',  name:'Sneha Patel',    phone:'+91 99001 76543', email:'sneha.patel@gmail.com',     message: MESSAGES[8], status:'Closed'  },
  { id:'ENQ010', date:'2025-05-23', business:'Lens & Light Co.',    name:'Rahul Verma',    phone:'+91 99001 11223', email:'rahul.verma@outlook.com',   message: MESSAGES[9], status:'New'     },
  { id:'ENQ011', date:'2025-05-22', business:'Digital Zone Labs',   name:'Pooja Desai',    phone:'+91 98981 44556', email:'pooja.desai@gmail.com',     message: MESSAGES[0], status:'Replied' },
  { id:'ENQ012', date:'2025-05-21', business:'Raj Photo Studio',    name:'Kiran Reddy',    phone:'+91 97001 54321', email:'kiran.reddy@yahoo.com',     message: MESSAGES[1], status:'New'     },
  { id:'ENQ013', date:'2025-05-20', business:'Frame Perfect Films', name:'Tanvi Joshi',    phone:'+91 98221 34890', email:'tanvi.joshi@gmail.com',     message: MESSAGES[2], status:'Closed'  },
  { id:'ENQ014', date:'2025-05-19', business:'Pixel Arts Studio',   name:'Anjali Nair',    phone:'+91 96001 87654', email:'anjali.nair@hotmail.com',   message: MESSAGES[3], status:'New'     },
  { id:'ENQ015', date:'2025-05-18', business:'GoldenFrame Studio',  name:'Mohammed Zubair',phone:'+91 95501 65432', email:'zubair.m@gmail.com',        message: MESSAGES[4], status:'Replied' },
]

const PAGE_SIZE = 10

const fmtDate = iso =>
  new Date(iso).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })

const STATUS_STYLE = {
  New:     { bg:'rgba(59,130,246,0.1)',  color:'#3b82f6' },
  Replied: { bg:'rgba(16,185,129,0.1)', color:'#10b981' },
  Closed:  { bg:'rgba(100,116,139,0.1)',color:'#64748b' },
}

// ── Message preview modal ─────────────────────────────────────────────────────
const MessageModal = ({ enq, onClose }) => (
  <div className="enq-modal-overlay" onClick={onClose}>
    <div className="enq-modal" onClick={e => e.stopPropagation()}>
      <div className="enq-modal__header">
        <div>
          <h5 className="enq-modal__title">Enquiry Message</h5>
          <p className="enq-modal__sub">{enq.id} · {fmtDate(enq.date)}</p>
        </div>
        <button className="enq-close-btn" onClick={onClose}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <div className="enq-modal__body">
        <div className="enq-detail-row"><span className="enq-detail-label">From</span><span className="enq-detail-val">{enq.name}</span></div>
        <div className="enq-detail-row"><span className="enq-detail-label">Business</span><span className="enq-detail-val">{enq.business}</span></div>
        <div className="enq-detail-row"><span className="enq-detail-label">Email</span><span className="enq-detail-val">{enq.email}</span></div>
        <div className="enq-detail-row"><span className="enq-detail-label">Phone</span><span className="enq-detail-val">{enq.phone}</span></div>
        <div className="enq-divider"/>
        <p className="enq-label mb-1">Message</p>
        <p className="enq-message-full">{enq.message}</p>
      </div>
      <div className="enq-modal__footer">
        <button className="enq-btn enq-btn--ghost" onClick={onClose}>Close</button>
        <button className="enq-btn enq-btn--primary">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Reply
        </button>
      </div>
    </div>
  </div>
)

// ── Main page ─────────────────────────────────────────────────────────────────
const Enquiries = () => {
  const [enquiries,   setEnquiries]  = useState(SEED)
  const [search,      setSearch]     = useState('')
  const [bizFilter,   setBizFilter]  = useState('')
  const [dateFrom,    setDateFrom]   = useState('')
  const [dateTo,      setDateTo]     = useState('')
  const [statusFilter,setStatusFilter] = useState('')
  const [page,        setPage]       = useState(1)
  const [preview,     setPreview]    = useState(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return SEED.filter(e => {
      const matchSearch = !q
        || e.name.toLowerCase().includes(q)
        || e.email.toLowerCase().includes(q)
        || e.phone.includes(q)
        || e.id.toLowerCase().includes(q)
      const matchBiz    = !bizFilter    || e.business === bizFilter
      const matchStatus = !statusFilter || e.status   === statusFilter
      const matchFrom   = !dateFrom     || e.date >= dateFrom
      const matchTo     = !dateTo       || e.date <= dateTo
      return matchSearch && matchBiz && matchStatus && matchFrom && matchTo
    })
  }, [search, bizFilter, dateFrom, dateTo, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const hasFilters = search || bizFilter || dateFrom || dateTo || statusFilter
  const reset = () => { setSearch(''); setBizFilter(''); setDateFrom(''); setDateTo(''); setStatusFilter(''); setPage(1) }

  const counts = {
    New:     SEED.filter(e => e.status === 'New').length,
    Replied: SEED.filter(e => e.status === 'Replied').length,
    Closed:  SEED.filter(e => e.status === 'Closed').length,
  }

  return (
    <div className="enq-page">

      {/* Header */}
      <div className="enq-page-header mb-4">
        <div>
          <h4 className="enq-page-title">Enquiries</h4>
          <p className="enq-page-sub">{SEED.length} total enquiries</p>
        </div>
        {/* Summary chips */}
        <div className="d-flex gap-2 flex-wrap">
          {Object.entries(counts).map(([s, n]) => (
            <span key={s} className="enq-summary-chip" style={STATUS_STYLE[s]}>
              <span className="enq-chip-dot"/>
              {n} {s}
            </span>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="enq-card">

        {/* ── Toolbar ── */}
        <div className="enq-toolbar">

          {/* Global search */}
          <div className="enq-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="enq-search-icon">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              className="enq-search"
              placeholder="Search by name, email, phone…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
            {search && (
              <button className="enq-search-clear" onClick={() => { setSearch(''); setPage(1) }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filters row */}
          <div className="enq-filters">

            {/* Business Name filter */}
            <div className="enq-filter-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="enq-filter-icon">
                <path d="M3 21h18M3 7h18M6 7V4h12v3M9 21V11m6 10V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <select
                className="enq-select"
                value={bizFilter}
                onChange={e => { setBizFilter(e.target.value); setPage(1) }}
              >
                <option value="">All Businesses</option>
                {BUSINESSES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Status filter */}
            <div className="enq-filter-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="enq-filter-icon">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <select
                className="enq-select"
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
              >
                <option value="">All Status</option>
                <option>New</option>
                <option>Replied</option>
                <option>Closed</option>
              </select>
            </div>

            {/* Date From */}
            <div className="enq-filter-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="enq-filter-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="8"  y1="2" x2="8"  y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="date"
                className="enq-date-input"
                value={dateFrom}
                onChange={e => { setDateFrom(e.target.value); setPage(1) }}
                title="Date from"
              />
            </div>

            {/* Date To */}
            <div className="enq-filter-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="enq-filter-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="8"  y1="2" x2="8"  y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="date"
                className="enq-date-input"
                value={dateTo}
                onChange={e => { setDateTo(e.target.value); setPage(1) }}
                title="Date to"
              />
            </div>

            {hasFilters && (
              <button className="enq-reset-btn" onClick={reset}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reset
              </button>
            )}

          </div>
        </div>

        {/* Result bar */}
        {hasFilters && (
          <div className="enq-result-bar">
            <span className="enq-result-text">
              Showing <strong>{filtered.length}</strong> of <strong>{SEED.length}</strong> enquiries
            </span>
          </div>
        )}

        {/* Table */}
        <div className="table-responsive">
          <table className="table enq-table mb-0">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date of Enquiry</th>
                <th>Business Name</th>
                <th>Enquirer Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Message</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="enq-empty-row">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>No enquiries match your filters.</p>
                    <button className="enq-reset-btn mt-2" onClick={reset}>Clear Filters</button>
                  </td>
                </tr>
              ) : pageRows.map((e, i) => {
                const s = STATUS_STYLE[e.status]
                return (
                  <tr key={e.id}>
                    <td className="enq-sno">{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td className="text-nowrap">{fmtDate(e.date)}</td>
                    <td>
                      <span className="enq-biz-name">{e.business}</span>
                    </td>
                    <td>
                      <div className="enq-person">
                        <div className="enq-avatar">{e.name.charAt(0)}</div>
                        <span>{e.name}</span>
                      </div>
                    </td>
                    <td className="text-nowrap">{e.phone}</td>
                    <td className="enq-email-cell">{e.email}</td>
                    <td className="enq-msg-cell">
                      <span className="enq-msg-preview">{e.message.slice(0, 55)}…</span>
                    </td>
                    <td className="text-center">
                      <span className="enq-status" style={{ background: s.bg, color: s.color }}>
                        {e.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="enq-view-btn" onClick={() => setPreview(e)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="enq-pagination">
          <span className="enq-pagination-info">
            {filtered.length === 0
              ? 'No results'
              : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`
            }
          </span>
          <div className="d-flex gap-1">
            <button className="pg-btn" disabled={page === 1} onClick={() => setPage(1)}>«</button>
            <button className="pg-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
              .reduce((acc, n, idx, arr) => {
                if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…')
                acc.push(n); return acc
              }, [])
              .map((n, j) => n === '…'
                ? <span key={`e${j}`} className="pg-ellipsis">…</span>
                : <button key={n} className={`pg-btn${n === page ? ' pg-btn--active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              )
            }
            <button className="pg-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            <button className="pg-btn" disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
          </div>
        </div>
      </div>

      {/* Message preview modal */}
      {preview && <MessageModal enq={preview} onClose={() => setPreview(null)} />}

    </div>
  )
}

export default Enquiries
