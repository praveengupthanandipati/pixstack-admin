import React, { useState, useMemo } from 'react'
import '../styles/Requests.scss'

const REQUESTS = [
  {
    id: 'REQ001',
    icon: '💒',
    eventName: 'Wedding',
    eventDate: '2025-02-14',
    duration: '8 Hours',
    expectedGuests: 350,
    budgetRange: '₹25,000 – ₹45,000',
    venueShort: 'Taj Falaknuma Palace',
    venueFull: 'Taj Falaknuma Palace, Engine Bowli, Falaknuma – 500053, Hyderabad, Telangana',
    specialRequirements: 'Candid + traditional shots needed. Need a second photographer.',
    weddingType: 'Hindu',
    numberOfDays: '3 Days',
    preWeddingShoot: true,
    albums: true,
    videography: true,
    events: ['Mehndi', 'Sangeet', 'Haldi', 'Ceremony', 'Reception'],
    status: 'Completed',
    sender: { name: 'Rohan Sharma', phone: '+91 98001 12345', email: 'rohan.sharma@gmail.com', city: 'Hyderabad, Telangana' },
  },
  {
    id: 'REQ002',
    icon: '🎂',
    eventName: 'Birthday',
    eventDate: '2025-05-10',
    duration: '4 Hours',
    expectedGuests: 80,
    budgetRange: '₹8,000 – ₹15,000',
    venueShort: 'Park Hyatt Hyderabad',
    venueFull: 'Park Hyatt Hyderabad, Road No. 2, Banjara Hills – 500034, Hyderabad, Telangana',
    specialRequirements: 'Surprise entry setup, need candid shots during cake cutting.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: true,
    videography: false,
    events: ['Cake Cutting', 'Group Photos', 'Dinner'],
    status: 'Pending',
    sender: { name: 'Priya Mehta', phone: '+91 97320 56789', email: 'priya.mehta@outlook.com', city: 'Hyderabad, Telangana' },
  },
  {
    id: 'REQ003',
    icon: '💒',
    eventName: 'Wedding',
    eventDate: '2025-03-22',
    duration: '10 Hours',
    expectedGuests: 500,
    budgetRange: '₹50,000 – ₹80,000',
    venueShort: 'The Westin Hyderabad',
    venueFull: 'The Westin Hyderabad Mindspace, HITEC City – 500081, Hyderabad, Telangana',
    specialRequirements: 'Church ceremony + reception. Need wide-angle lens for church interior.',
    weddingType: 'Christian',
    numberOfDays: '2 Days',
    preWeddingShoot: true,
    albums: true,
    videography: true,
    events: ['Church Ceremony', 'Cocktail', 'Reception'],
    status: 'Completed',
    sender: { name: 'Anita D\'Souza', phone: '+91 99001 34567', email: 'anita.dsouza@gmail.com', city: 'Secunderabad, Telangana' },
  },
  {
    id: 'REQ004',
    icon: '💍',
    eventName: 'Engagement',
    eventDate: '2025-04-20',
    duration: '5 Hours',
    expectedGuests: 150,
    budgetRange: '₹10,000 – ₹20,000',
    venueShort: 'ITC Kohenur',
    venueFull: 'ITC Kohenur, Madhapur – 500081, Hyderabad, Telangana',
    specialRequirements: 'Need drone shots for outdoor garden area. Portrait session for couple.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: true,
    videography: true,
    events: ['Ring Ceremony', 'Reception Dinner'],
    status: 'Pending',
    sender: { name: 'Kiran Reddy', phone: '+91 97001 54321', email: 'kiran.reddy@yahoo.com', city: 'Hyderabad, Telangana' },
  },
  {
    id: 'REQ005',
    icon: '🎓',
    eventName: 'Graduation',
    eventDate: '2025-06-15',
    duration: '3 Hours',
    expectedGuests: 200,
    budgetRange: '₹5,000 – ₹10,000',
    venueShort: 'JNTU Hyderabad Auditorium',
    venueFull: 'JNTU Hyderabad, Kukatpally – 500072, Hyderabad, Telangana',
    specialRequirements: 'Stage photography, candid moments during degree collection.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: true,
    videography: false,
    events: ['Convocation', 'Group Photos', 'Family Portraits'],
    status: 'Pending',
    sender: { name: 'Suresh Babu', phone: '+91 96001 87654', email: 'suresh.babu@gmail.com', city: 'Kukatpally, Hyderabad' },
  },
  {
    id: 'REQ006',
    icon: '🎊',
    eventName: 'Anniversary',
    eventDate: '2025-01-08',
    duration: '6 Hours',
    expectedGuests: 120,
    budgetRange: '₹12,000 – ₹22,000',
    venueShort: 'Novotel Hyderabad Airport',
    venueFull: 'Novotel Hyderabad Airport, Shamshabad – 501218, Hyderabad, Telangana',
    specialRequirements: '25th anniversary, gold theme décor. Couple portrait mandatory.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: true,
    videography: true,
    events: ['Cake Ceremony', 'Dance Performance', 'Dinner'],
    status: 'Completed',
    sender: { name: 'Vijay Kumar', phone: '+91 98221 43210', email: 'vijay.kumar@gmail.com', city: 'Shamshabad, Hyderabad' },
  },
  {
    id: 'REQ007',
    icon: '👶',
    eventName: 'Baby Shower',
    eventDate: '2025-07-03',
    duration: '3 Hours',
    expectedGuests: 60,
    budgetRange: '₹4,000 – ₹8,000',
    venueShort: 'Radisson Blu Plaza Hotel',
    venueFull: 'Radisson Blu Plaza Hotel, Banjara Hills Road No. 1 – 500034, Hyderabad, Telangana',
    specialRequirements: 'Pastel theme, soft natural lighting preferred.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: true,
    videography: false,
    events: ['Gift Unwrapping', 'Games', 'Cake Cutting'],
    status: 'Pending',
    sender: { name: 'Deepa Nair', phone: '+91 95501 65432', email: 'deepa.nair@hotmail.com', city: 'Banjara Hills, Hyderabad' },
  },
  {
    id: 'REQ008',
    icon: '🏢',
    eventName: 'Corporate Event',
    eventDate: '2025-08-21',
    duration: '8 Hours',
    expectedGuests: 400,
    budgetRange: '₹30,000 – ₹60,000',
    venueShort: 'HICC Hyderabad',
    venueFull: 'Hyderabad International Convention Centre, Novotel Complex, HITEC City – 500081, Hyderabad, Telangana',
    specialRequirements: 'Product launch event. Require headshots for 20 executives.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: false,
    videography: true,
    events: ['Keynote', 'Product Demo', 'Panel Discussion', 'Networking Dinner'],
    status: 'Pending',
    sender: { name: 'Arjun Mehta', phone: '+91 98201 34567', email: 'arjun.mehta@techcorp.com', city: 'HITEC City, Hyderabad' },
  },
  {
    id: 'REQ009',
    icon: '💒',
    eventName: 'Wedding',
    eventDate: '2025-11-30',
    duration: '12 Hours',
    expectedGuests: 600,
    budgetRange: '₹75,000 – ₹1,20,000',
    venueShort: 'Leonia Holistic Destination',
    venueFull: 'Leonia Holistic Destination, Shameerpet – 500078, Hyderabad, Telangana',
    specialRequirements: 'Grand Rajasthani theme. Need 3 photographers and full drone coverage.',
    weddingType: 'Hindu',
    numberOfDays: '4 Days',
    preWeddingShoot: true,
    albums: true,
    videography: true,
    events: ['Mehendi', 'Haldi', 'Sangeet', 'Baraat', 'Ceremony', 'Reception'],
    status: 'Pending',
    sender: { name: 'Ramesh Agarwal', phone: '+91 99001 11223', email: 'ramesh.agarwal@gmail.com', city: 'Jubilee Hills, Hyderabad' },
  },
  {
    id: 'REQ010',
    icon: '🍼',
    eventName: 'Naming Ceremony',
    eventDate: '2025-09-14',
    duration: '2 Hours',
    expectedGuests: 50,
    budgetRange: '₹3,000 – ₹6,000',
    venueShort: 'Residence – Gachibowli',
    venueFull: 'Private Residence, Nallagandla, Gachibowli – 500019, Hyderabad, Telangana',
    specialRequirements: 'Indoor event, natural lighting. Infant-safe flash usage only.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: true,
    videography: false,
    events: ['Naming Ritual', 'Family Photos', 'Lunch'],
    status: 'Completed',
    sender: { name: 'Sneha Patel', phone: '+91 99001 76543', email: 'sneha.patel@gmail.com', city: 'Gachibowli, Hyderabad' },
  },
  {
    id: 'REQ011',
    icon: '🎉',
    eventName: 'Farewell Party',
    eventDate: '2025-10-05',
    duration: '3 Hours',
    expectedGuests: 90,
    budgetRange: '₹6,000 – ₹12,000',
    venueShort: 'The Golkonda Hotel',
    venueFull: 'The Golkonda Hotel, Masab Tank – 500028, Hyderabad, Telangana',
    specialRequirements: 'Candid group shots, individual farewell moments for 5 team leads.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: false,
    videography: true,
    events: ['Speeches', 'Group Photos', 'Dinner', 'Award Ceremony'],
    status: 'Cancelled',
    sender: { name: 'Mohammed Zubair', phone: '+91 95501 65432', email: 'zubair.m@gmail.com', city: 'Masab Tank, Hyderabad' },
  },
  {
    id: 'REQ012',
    icon: '🛍️',
    eventName: 'Product Launch',
    eventDate: '2025-12-12',
    duration: '5 Hours',
    expectedGuests: 180,
    budgetRange: '₹20,000 – ₹35,000',
    venueShort: 'T-Hub Hyderabad',
    venueFull: 'T-Hub, Raidurgam, IIIT Hyderabad Campus – 500032, Hyderabad, Telangana',
    specialRequirements: 'Product detail shots, influencer headshots, stage coverage.',
    weddingType: null,
    numberOfDays: '1 Day',
    preWeddingShoot: false,
    albums: false,
    videography: true,
    events: ['Product Reveal', 'Press Conference', 'Networking', 'Dinner'],
    status: 'Pending',
    sender: { name: 'Tanvi Joshi', phone: '+91 98221 34890', email: 'tanvi.joshi@startup.in', city: 'Gachibowli, Hyderabad' },
  },
]

const EVENT_TYPES = [...new Set(REQUESTS.map(r => r.eventName))].sort()

const fmtDate = iso =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

const STATUS_STYLE = {
  Completed: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  Pending:   { bg: 'rgba(245,158,11,0.1)',  color: '#f59e0b' },
  Cancelled: { bg: 'rgba(100,116,139,0.1)', color: '#64748b' },
}

const YN = ({ val }) => (
  <span className={`req-yn ${val ? 'req-yn--yes' : 'req-yn--no'}`}>{val ? 'Yes' : 'No'}</span>
)

// ── Modal ─────────────────────────────────────────────────────────────────────
const RequestModal = ({ req, onClose }) => {
  const s = STATUS_STYLE[req.status]
  return (
    <div className="req-modal-overlay" onClick={onClose}>
      <div className="req-modal" onClick={e => e.stopPropagation()}>

        <div className="req-modal__header">
          <div className="d-flex align-items-center gap-3">
            <span className="req-modal__icon">{req.icon}</span>
            <div>
              <h5 className="req-modal__title">{req.eventName}</h5>
              <p className="req-modal__sub">{req.id} · {fmtDate(req.eventDate)}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="req-status-badge" style={{ background: s.bg, color: s.color }}>
              {req.status}
            </span>
            <button className="req-close-btn" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="req-modal__body">

          <div className="req-section">
            <p className="req-section-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Sender Details
            </p>
            <div className="req-sender-card">
              <div className="req-sender-avatar">{req.sender.name.charAt(0)}</div>
              <div className="req-sender-info">
                <p className="req-sender-name">{req.sender.name}</p>
                <p className="req-sender-meta">{req.sender.email}</p>
                <p className="req-sender-meta">{req.sender.phone} · {req.sender.city}</p>
              </div>
            </div>
          </div>

          <div className="req-section">
            <p className="req-section-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Event Details
            </p>
            <div className="req-detail-grid">
              <div className="req-detail-item">
                <span className="req-detail-label">Event Name</span>
                <span className="req-detail-val">{req.icon} {req.eventName}</span>
              </div>
              <div className="req-detail-item">
                <span className="req-detail-label">Event Date</span>
                <span className="req-detail-val">{fmtDate(req.eventDate)}</span>
              </div>
              <div className="req-detail-item">
                <span className="req-detail-label">Duration</span>
                <span className="req-detail-val">{req.duration}</span>
              </div>
              <div className="req-detail-item">
                <span className="req-detail-label">Number of Days</span>
                <span className="req-detail-val">{req.numberOfDays}</span>
              </div>
              <div className="req-detail-item">
                <span className="req-detail-label">Guests Expected</span>
                <span className="req-detail-val">{req.expectedGuests}</span>
              </div>
              <div className="req-detail-item">
                <span className="req-detail-label">Budget Range</span>
                <span className="req-detail-val">{req.budgetRange}</span>
              </div>
              {req.weddingType && (
                <div className="req-detail-item">
                  <span className="req-detail-label">Wedding Type</span>
                  <span className="req-detail-val">{req.weddingType}</span>
                </div>
              )}
            </div>
          </div>

          <div className="req-section">
            <p className="req-section-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Services Requested
            </p>
            <div className="req-detail-grid req-detail-grid--3">
              <div className="req-detail-item">
                <span className="req-detail-label">Pre-Wedding Shoot</span>
                <YN val={req.preWeddingShoot} />
              </div>
              <div className="req-detail-item">
                <span className="req-detail-label">Albums</span>
                <YN val={req.albums} />
              </div>
              <div className="req-detail-item">
                <span className="req-detail-label">Videography</span>
                <YN val={req.videography} />
              </div>
            </div>
          </div>

          <div className="req-section">
            <p className="req-section-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Venue
            </p>
            <p className="req-detail-text">{req.venueFull}</p>
          </div>

          <div className="req-section">
            <p className="req-section-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Special Requirements
            </p>
            <p className="req-detail-text">{req.specialRequirements}</p>
          </div>

          <div className="req-section">
            <p className="req-section-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Events
            </p>
            <div className="req-events-wrap">
              {req.events.map(ev => (
                <span key={ev} className="req-event-tag">{ev}</span>
              ))}
            </div>
          </div>

        </div>

        <div className="req-modal__footer">
          <button className="req-btn req-btn--ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
const Requests = () => {
  const [selected,    setSelected]    = useState(null)
  const [eventFilter, setEventFilter] = useState('')
  const [dateFrom,    setDateFrom]    = useState('')
  const [dateTo,      setDateTo]      = useState('')

  const filtered = useMemo(() => {
    return REQUESTS.filter(r => {
      const matchEvent = !eventFilter || r.eventName === eventFilter
      const matchFrom  = !dateFrom    || r.eventDate >= dateFrom
      const matchTo    = !dateTo      || r.eventDate <= dateTo
      return matchEvent && matchFrom && matchTo
    })
  }, [eventFilter, dateFrom, dateTo])

  const hasFilters = eventFilter || dateFrom || dateTo
  const reset = () => { setEventFilter(''); setDateFrom(''); setDateTo('') }

  return (
    <div className="req-page">

      <div className="req-page-header mb-4">
        <div>
          <h4 className="req-page-title">Requests</h4>
          <p className="req-page-sub">{REQUESTS.length} total requests</p>
        </div>
      </div>

      <div className="req-card">

        {/* ── Toolbar ── */}
        <div className="req-toolbar">

          {/* Event Type filter */}
          <div className="req-filter-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="req-filter-icon">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <select
              className="req-select"
              value={eventFilter}
              onChange={e => setEventFilter(e.target.value)}
            >
              <option value="">All Event Types</option>
              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Date From */}
          <div className="req-filter-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="req-filter-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="3"  y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="8"  y1="2"  x2="8"  y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="16" y1="2"  x2="16" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="date"
              className="req-date-input"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              title="Event date from"
            />
          </div>

          {/* Date To */}
          <div className="req-filter-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="req-filter-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="3"  y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="8"  y1="2"  x2="8"  y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="16" y1="2"  x2="16" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="date"
              className="req-date-input"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              title="Event date to"
            />
          </div>

          {hasFilters && (
            <button className="req-reset-btn" onClick={reset}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Reset
            </button>
          )}
        </div>

        {/* Result bar */}
        {hasFilters && (
          <div className="req-result-bar">
            <span className="req-result-text">
              Showing <strong>{filtered.length}</strong> of <strong>{REQUESTS.length}</strong> requests
            </span>
          </div>
        )}

        {/* Table */}
        <div className="table-responsive">
          <table className="table req-table mb-0">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Event</th>
                <th>Event Date</th>
                <th>Venue</th>
                <th>Guests</th>
                <th>Budget</th>
                <th>Sender</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="req-empty-row">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="#cbd5e1" strokeWidth="1.5"/>
                      <path d="M21 21l-4.35-4.35" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p>No requests match your filters.</p>
                    <button className="req-reset-btn mt-2" onClick={reset}>Clear Filters</button>
                  </td>
                </tr>
              ) : filtered.map((req, i) => {
                const s = STATUS_STYLE[req.status]
                return (
                  <tr key={req.id}>
                    <td className="req-sno">{i + 1}</td>
                    <td>
                      <button className="req-event-btn" onClick={() => setSelected(req)}>
                        <span className="req-event-icon">{req.icon}</span>
                        <span>{req.eventName}</span>
                      </button>
                    </td>
                    <td className="text-nowrap">{fmtDate(req.eventDate)}</td>
                    <td className="req-venue-cell">{req.venueShort}</td>
                    <td>{req.expectedGuests}</td>
                    <td className="text-nowrap">{req.budgetRange}</td>
                    <td>
                      <div className="req-sender-row">
                        <div className="req-sender-avatar req-sender-avatar--sm">
                          {req.sender.name.charAt(0)}
                        </div>
                        <div>
                          <p className="req-sender-rowname">{req.sender.name}</p>
                          <p className="req-sender-rowsub">{req.sender.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="req-status-badge" style={{ background: s.bg, color: s.color }}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <RequestModal req={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default Requests
