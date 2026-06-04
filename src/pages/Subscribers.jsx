import React, { useState, useMemo } from 'react'
import '../styles/Subscribers.scss'

// ── seed data ─────────────────────────────────────────────────────────────────
const SEED = [
  { id: 'SUB001', email: 'arjun.mehta@gmail.com',       date: '2025-01-05', welcomed: false },
  { id: 'SUB002', email: 'priya.sharma@yahoo.com',      date: '2025-01-12', welcomed: true  },
  { id: 'SUB003', email: 'ravi.kumar@outlook.com',      date: '2025-01-20', welcomed: false },
  { id: 'SUB004', email: 'sneha.patel@gmail.com',       date: '2025-02-03', welcomed: true  },
  { id: 'SUB005', email: 'vikram.singh@gmail.com',      date: '2025-02-14', welcomed: false },
  { id: 'SUB006', email: 'anjali.nair@hotmail.com',     date: '2025-02-22', welcomed: false },
  { id: 'SUB007', email: 'zubair.m@gmail.com',          date: '2025-03-01', welcomed: true  },
  { id: 'SUB008', email: 'tanvi.joshi@gmail.com',       date: '2025-03-08', welcomed: false },
  { id: 'SUB009', email: 'kiran.reddy@yahoo.com',       date: '2025-03-15', welcomed: true  },
  { id: 'SUB010', email: 'deepa.menon@gmail.com',       date: '2025-03-22', welcomed: false },
  { id: 'SUB011', email: 'rahul.verma@outlook.com',     date: '2025-04-02', welcomed: false },
  { id: 'SUB012', email: 'pooja.desai@gmail.com',       date: '2025-04-10', welcomed: true  },
  { id: 'SUB013', email: 'suresh.iyer@gmail.com',       date: '2025-04-18', welcomed: false },
  { id: 'SUB014', email: 'nisha.kapoor@gmail.com',      date: '2025-04-25', welcomed: false },
  { id: 'SUB015', email: 'aditya.bhatt@yahoo.com',      date: '2025-05-03', welcomed: true  },
  { id: 'SUB016', email: 'meera.pillai@gmail.com',      date: '2025-05-10', welcomed: false },
  { id: 'SUB017', email: 'sunil.gupta@outlook.com',     date: '2025-05-18', welcomed: false },
  { id: 'SUB018', email: 'divya.menon@gmail.com',       date: '2025-05-24', welcomed: true  },
  { id: 'SUB019', email: 'rajan.shah@gmail.com',        date: '2025-06-01', welcomed: false },
  { id: 'SUB020', email: 'anita.rao@gmail.com',         date: '2025-06-03', welcomed: false },
]

const PAGE_SIZE = 10

const fmtDate = iso =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

// ── Welcome message modal ─────────────────────────────────────────────────────
const DEFAULT_MSG = `Dear Subscriber,

Welcome to Pixstack! 🎉

We're thrilled to have you on board. As a valued subscriber, you'll be the first to know about our latest updates, featured photographers, upcoming events, and exclusive offers.

Stay connected — great things are coming your way!

Warm regards,
The Pixstack Team`

const WelcomeModal = ({ targets, onClose, onSent }) => {
  const [message, setMessage] = useState(DEFAULT_MSG)
  const [sending, setSending]  = useState(false)
  const [sent,    setSent]     = useState(false)

  const isBulk   = targets.length > 1
  const label    = isBulk ? `${targets.length} subscribers` : targets[0]?.email

  const handleSend = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setTimeout(() => { onSent(targets.map(t => t.id)); onClose() }, 900)
    }, 1200)
  }

  return (
    <div className="sb-modal-overlay" onClick={onClose}>
      <div className="sb-modal" onClick={e => e.stopPropagation()}>

        <div className="sb-modal__header">
          <div>
            <h5 className="sb-modal__title">Send Welcome Message</h5>
            <p className="sb-modal__sub">
              To: <strong>{label}</strong>
            </p>
          </div>
          <button className="sb-close-btn" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="sb-modal__body">
          <label className="sb-label">Message</label>
          <textarea
            className="sb-textarea"
            rows={12}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        <div className="sb-modal__footer">
          <button className="sb-btn sb-btn--ghost" onClick={onClose} disabled={sending}>Cancel</button>
          <button className="sb-btn sb-btn--primary" onClick={handleSend} disabled={sending || sent}>
            {sent ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sent!
              </>
            ) : sending ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status"/>
                Sending…
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polygon points="22,2 15,22 11,13 2,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                Send Message
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
const Subscribers = () => {
  const [subscribers, setSubscribers] = useState(SEED)
  const [search,      setSearch]      = useState('')
  const [filter,      setFilter]      = useState('All')
  const [selected,    setSelected]    = useState([])
  const [page,        setPage]        = useState(1)
  const [modal,       setModal]       = useState(null)   // null | { targets: [] }

  // filter + search
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return subscribers.filter(s => {
      const matchSearch = !q || s.email.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
      const matchFilter =
        filter === 'All'       ? true :
        filter === 'Welcomed'  ? s.welcomed :
        filter === 'Pending'   ? !s.welcomed : true
      return matchSearch && matchFilter
    })
  }, [subscribers, search, filter])

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // selection helpers
  const pageIds      = pageRows.map(s => s.id)
  const allPageSel   = pageIds.length > 0 && pageIds.every(id => selected.includes(id))
  const toggleAll    = () => setSelected(allPageSel ? selected.filter(id => !pageIds.includes(id)) : [...new Set([...selected, ...pageIds])])
  const toggleOne    = id => setSelected(s => s.includes(id) ? s.filter(i => i !== id) : [...s, id])
  const clearSel     = () => setSelected([])

  // mark as welcomed after sending
  const markWelcomed = ids => setSubscribers(prev => prev.map(s => ids.includes(s.id) ? { ...s, welcomed: true } : s))

  // send to single subscriber
  const sendSingle = sub => setModal({ targets: [sub] })

  // send to selected
  const sendBulk = () => {
    const targets = subscribers.filter(s => selected.includes(s.id))
    setModal({ targets })
  }

  const counts = {
    All:      subscribers.length,
    Welcomed: subscribers.filter(s => s.welcomed).length,
    Pending:  subscribers.filter(s => !s.welcomed).length,
  }

  return (
    <div className="sb-page">

      {/* Page header */}
      <div className="sb-page-header mb-4">
        <div>
          <h4 className="sb-page-title">Subscribers</h4>
          <p className="sb-page-sub">{subscribers.length} total subscribers</p>
        </div>
        {selected.length > 0 && (
          <div className="d-flex align-items-center gap-2">
            <span className="sb-sel-badge">{selected.length} selected</span>
            <button className="sb-btn sb-btn--primary" onClick={sendBulk}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polygon points="22,2 15,22 11,13 2,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              Send Welcome to Selected
            </button>
            <button className="sb-btn sb-btn--ghost" onClick={clearSel}>Clear</button>
          </div>
        )}
      </div>

      {/* Card */}
      <div className="sb-card">

        {/* Toolbar */}
        <div className="sb-toolbar">
          <div className="sb-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="sb-search-icon">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              className="sb-search"
              placeholder="Search by email or ID…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
            {search && (
              <button className="sb-search-clear" onClick={() => { setSearch(''); setPage(1) }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="sb-filter-tabs">
            {['All', 'Welcomed', 'Pending'].map(f => (
              <button
                key={f}
                className={`sb-filter-tab${filter === f ? ' sb-filter-tab--active' : ''}`}
                onClick={() => { setFilter(f); setPage(1) }}
              >
                {f}
                <span className="sb-filter-count">{counts[f]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table sb-table mb-0">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    className="sb-checkbox"
                    checked={allPageSel}
                    onChange={toggleAll}
                    title="Select all on this page"
                  />
                </th>
                <th style={{ width: 60 }}>S.No</th>
                <th>Email ID</th>
                <th>Date of Subscription</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="sb-empty-row">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="#cbd5e1" strokeWidth="1.5"/>
                      <polyline points="22,6 12,13 2,6" stroke="#cbd5e1" strokeWidth="1.5"/>
                    </svg>
                    <p>No subscribers found.</p>
                  </td>
                </tr>
              ) : pageRows.map((s, i) => (
                <tr key={s.id} className={selected.includes(s.id) ? 'sb-row--selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      className="sb-checkbox"
                      checked={selected.includes(s.id)}
                      onChange={() => toggleOne(s.id)}
                    />
                  </td>
                  <td className="sb-sno">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td>
                    <div className="sb-email-cell">
                      <div className="sb-email-avatar">{s.email.charAt(0).toUpperCase()}</div>
                      <span className="sb-email">{s.email}</span>
                    </div>
                  </td>
                  <td className="sb-date">{fmtDate(s.date)}</td>
                  <td className="text-center">
                    {s.welcomed
                      ? <span className="sb-status sb-status--welcomed">✓ Welcomed</span>
                      : <span className="sb-status sb-status--pending">Pending</span>
                    }
                  </td>
                  <td className="text-center">
                    <button
                      className={`sb-send-btn${s.welcomed ? ' sb-send-btn--resend' : ''}`}
                      onClick={() => sendSingle(s)}
                      title={s.welcomed ? 'Resend welcome message' : 'Send welcome message'}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polygon points="22,2 15,22 11,13 2,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                      {s.welcomed ? 'Resend' : 'Send Welcome'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="sb-pagination">
          <span className="sb-pagination-info">
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
              .map((n, i) => n === '…'
                ? <span key={`e${i}`} className="pg-ellipsis">…</span>
                : <button key={n} className={`pg-btn${n === page ? ' pg-btn--active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              )
            }
            <button className="pg-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            <button className="pg-btn" disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
          </div>
        </div>

      </div>

      {/* Welcome message modal */}
      {modal && (
        <WelcomeModal
          targets={modal.targets}
          onClose={() => setModal(null)}
          onSent={ids => { markWelcomed(ids); clearSel() }}
        />
      )}

    </div>
  )
}

export default Subscribers
