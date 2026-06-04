import React, { useState, useRef } from 'react'
import RichTextEditor from '../components/RichTextEditor'
import '../styles/Events.scss'
import img01 from '../assets/gallery/listitemimg01.jpg'
import img02 from '../assets/gallery/listitemimg02.jpg'
import img03 from '../assets/gallery/listitemimg03.jpg'
import img04 from '../assets/gallery/listitemimg04.jpg'
import img05 from '../assets/gallery/listitemimg05.jpg'
import img06 from '../assets/gallery/listitemimg06.jpg'

// ── helpers ──────────────────────────────────────────────────────────────────
const formatDate = iso => {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const eventStatus = iso => {
  const now  = new Date()
  const date = new Date(iso)
  if (date > now) return 'Upcoming'
  if (date.toDateString() === now.toDateString()) return 'Ongoing'
  return 'Completed'
}

// ── seed data ─────────────────────────────────────────────────────────────────
const SEED_EVENTS = [
  {
    id: 'EVT001',
    title:       'Grand Wedding Photography Expo 2025',
    description: 'India\'s largest gathering of wedding photographers, studios and cinematographers. Live demos, portfolio showcases and industry talks.',
    date:        '2025-08-15',
    venue:       'Bombay Exhibition Centre, Mumbai, Maharashtra',
    banner:      img01,
    createdAt:   '2025-06-01',
  },
  {
    id: 'EVT002',
    title:       'Digital Creators Summit — South India',
    description: 'A two-day summit for digital labs, editors and content creators to share best practices and the latest post-production workflows.',
    date:        '2025-09-05',
    venue:       'Chennai Trade Centre, Chennai, Tamil Nadu',
    banner:      img02,
    createdAt:   '2025-06-02',
  },
  {
    id: 'EVT003',
    title:       'Album Design Masterclass',
    description: 'Intensive one-day masterclass by award-winning album designers. Limited to 30 participants. Certification provided.',
    date:        '2025-07-20',
    venue:       'Pixel Hub Co-working, Bengaluru, Karnataka',
    banner:      img03,
    createdAt:   '2025-05-28',
  },
  {
    id: 'EVT004',
    title:       'Freelance Photographers Meet-up',
    description: 'Casual networking meet-up for freelance photographers across Hyderabad. Open portfolio reviews and gear swap.',
    date:        '2025-07-05',
    venue:       'Café Lens, Banjara Hills, Hyderabad',
    banner:      img04,
    createdAt:   '2025-05-20',
  },
  {
    id: 'EVT005',
    title:       'Corporate Event Videography Workshop',
    description: 'Learn how to shoot, edit and deliver corporate video projects. Hands-on sessions with professional gear.',
    date:        '2025-06-28',
    venue:       'ITC Maratha, Andheri East, Mumbai',
    banner:      img05,
    createdAt:   '2025-05-15',
  },
  {
    id: 'EVT006',
    title:       'Pixstack Partner Felicitation Night 2025',
    description: 'Annual celebration honouring top-performing listing partners. Awards across 8 categories. Black-tie dress code.',
    date:        '2025-12-10',
    venue:       'Leela Palace, New Delhi',
    banner:      img06,
    createdAt:   '2025-06-03',
  },
]

const STATUS_STYLE = {
  Upcoming:  { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  Ongoing:   { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  Completed: { bg: 'rgba(100,116,139,0.12)', color: '#64748b' },
}

// ── CreateEventDrawer ─────────────────────────────────────────────────────────
const EMPTY_FORM = { title: '', description: '', date: '', venue: '', banner: null, bannerPreview: '' }

const CreateEventDrawer = ({ open, onClose, onSave }) => {
  const [form, setForm]     = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const fileRef             = useRef(null)

  const set = k => v => setForm(f => ({ ...f, [k]: v }))

  const handleBanner = e => {
    const file = e.target.files[0]
    if (!file) return
    setForm(f => ({ ...f, banner: file, bannerPreview: URL.createObjectURL(file) }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim())       e.title       = 'Title is required'
    const descText = form.description.replace(/<[^>]*>/g, '').trim()
    if (!descText) e.description = 'Description is required'
    if (!form.date)               e.date        = 'Event date is required'
    if (!form.venue.trim())       e.venue       = 'Venue is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave({
      id:          `EVT${String(Date.now()).slice(-3)}`,
      title:       form.title,
      description: form.description,
      date:        form.date,
      venue:       form.venue,
      banner:      form.bannerPreview || img01,
      createdAt:   new Date().toISOString().slice(0, 10),
    })
    setForm(EMPTY_FORM)
    setErrors({})
    onClose()
  }

  const handleClose = () => { setForm(EMPTY_FORM); setErrors({}); onClose() }

  if (!open) return null

  return (
    <>
      <div className="ev-backdrop" onClick={handleClose} />
      <div className="ev-drawer">

        <div className="ev-drawer__header">
          <div>
            <h5 className="ev-drawer__title">Create New Event</h5>
            <p className="ev-drawer__sub">Fill in the details for the upcoming event</p>
          </div>
          <button className="ev-close-btn" onClick={handleClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="ev-drawer__body">

          {/* Banner upload */}
          <div className="ev-form-group">
            <label className="ev-label">Event Banner</label>
            <div
              className="ev-banner-upload"
              onClick={() => fileRef.current.click()}
              style={form.bannerPreview ? { backgroundImage: `url(${form.bannerPreview})` } : {}}
            >
              {!form.bannerPreview && (
                <div className="ev-banner-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Click to upload banner image</p>
                  <span>JPG, PNG — recommended 1200 × 400 px</span>
                </div>
              )}
              {form.bannerPreview && (
                <button
                  className="ev-banner-change"
                  onClick={e => { e.stopPropagation(); fileRef.current.click() }}
                >
                  Change Image
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleBanner} />
          </div>

          {/* Title */}
          <div className="ev-form-group">
            <label className="ev-label">Event Title <span className="ev-req">*</span></label>
            <input
              className={`ev-input${errors.title ? ' ev-input--error' : ''}`}
              placeholder="e.g. Grand Wedding Photography Expo 2025"
              value={form.title}
              onChange={e => set('title')(e.target.value)}
            />
            {errors.title && <span className="ev-error">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="ev-form-group">
            <label className="ev-label">Event Description <span className="ev-req">*</span></label>
            <RichTextEditor
              value={form.description}
              onChange={set('description')}
              placeholder="Write event description here — supports bold, lists, headings…"
              hasError={!!errors.description}
            />
            {errors.description && <span className="ev-error">{errors.description}</span>}
          </div>

          {/* Date + Venue side by side */}
          <div className="ev-form-row">
            <div className="ev-form-group">
              <label className="ev-label">Event Date <span className="ev-req">*</span></label>
              <input
                type="date"
                className={`ev-input${errors.date ? ' ev-input--error' : ''}`}
                value={form.date}
                onChange={e => set('date')(e.target.value)}
              />
              {errors.date && <span className="ev-error">{errors.date}</span>}
            </div>
            <div className="ev-form-group">
              <label className="ev-label">Event Venue / Location <span className="ev-req">*</span></label>
              <input
                className={`ev-input${errors.venue ? ' ev-input--error' : ''}`}
                placeholder="Venue name, City, State"
                value={form.venue}
                onChange={e => set('venue')(e.target.value)}
              />
              {errors.venue && <span className="ev-error">{errors.venue}</span>}
            </div>
          </div>

        </div>

        <div className="ev-drawer__footer">
          <button className="ev-btn ev-btn--ghost" onClick={handleClose}>Cancel</button>
          <button className="ev-btn ev-btn--primary" onClick={handleSave}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create Event
          </button>
        </div>

      </div>
    </>
  )
}

// ── EventCard ─────────────────────────────────────────────────────────────────
const EventCard = ({ event, onDelete }) => {
  const status     = eventStatus(event.date)
  const statusSt   = STATUS_STYLE[status]
  const isPast     = status === 'Completed'

  return (
    <div className={`ev-card${isPast ? ' ev-card--past' : ''}`}>
      <div className="ev-card__banner">
        <img src={event.banner} alt={event.title} className="ev-card__img" />
        <span className="ev-card__status" style={{ background: statusSt.bg, color: statusSt.color }}>
          {status}
        </span>
      </div>
      <div className="ev-card__body">
        <h5 className="ev-card__title">{event.title}</h5>
        <p className="ev-card__desc">{event.description}</p>
        <div className="ev-card__meta">
          <span className="ev-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.8"/>
              <line x1="8"  y1="2" x2="8"  y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {formatDate(event.date)}
          </span>
          <span className="ev-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            {event.venue}
          </span>
        </div>
      </div>
      <div className="ev-card__footer">
        <span className="ev-card__id">{event.id}</span>
        <div className="d-flex gap-2">
          <button className="ev-icon-btn ev-icon-btn--edit" title="Edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="ev-icon-btn ev-icon-btn--delete" title="Delete" onClick={() => onDelete(event.id)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
const Events = () => {
  const [events,      setEvents]      = useState(SEED_EVENTS)
  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [filter,      setFilter]      = useState('All')
  const [search,      setSearch]      = useState('')

  const handleCreate = newEvent => setEvents(ev => [newEvent, ...ev])
  const handleDelete = id        => setEvents(ev => ev.filter(e => e.id !== id))

  const displayed = events.filter(e => {
    const matchStatus = filter === 'All' || eventStatus(e.date) === filter
    const q           = search.toLowerCase()
    const matchSearch = !q || e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const counts = {
    All:       events.length,
    Upcoming:  events.filter(e => eventStatus(e.date) === 'Upcoming').length,
    Ongoing:   events.filter(e => eventStatus(e.date) === 'Ongoing').length,
    Completed: events.filter(e => eventStatus(e.date) === 'Completed').length,
  }

  return (
    <div className="ev-page">

      {/* Header */}
      <div className="ev-page-header mb-4">
        <div>
          <h4 className="ev-page-title">Events</h4>
          <p className="ev-page-sub">{events.length} events registered</p>
        </div>
        <button className="ev-btn ev-btn--primary" onClick={() => setDrawerOpen(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          Create New Event
        </button>
      </div>

      {/* Toolbar */}
      <div className="ev-toolbar mb-4">
        {/* Search */}
        <div className="ev-search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ev-search-icon">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            className="ev-search"
            placeholder="Search events…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Status filter tabs */}
        <div className="ev-filter-tabs">
          {['All', 'Upcoming', 'Ongoing', 'Completed'].map(f => (
            <button
              key={f}
              className={`ev-filter-tab${filter === f ? ' ev-filter-tab--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="ev-filter-count">{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Event cards grid */}
      {displayed.length === 0
        ? (
          <div className="ev-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#cbd5e1" strokeWidth="1.5"/>
              <line x1="3"  y1="10" x2="21" y2="10" stroke="#cbd5e1" strokeWidth="1.5"/>
              <line x1="8"  y1="2"  x2="8"  y2="6"  stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="16" y1="2"  x2="16" y2="6"  stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p>No events found.</p>
            <button className="ev-btn ev-btn--primary mt-2" onClick={() => setDrawerOpen(true)}>Create First Event</button>
          </div>
        )
        : (
          <div className="ev-grid">
            {displayed.map(e => (
              <EventCard key={e.id} event={e} onDelete={handleDelete} />
            ))}
          </div>
        )
      }

      {/* Create drawer */}
      <CreateEventDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleCreate}
      />

    </div>
  )
}

export default Events
