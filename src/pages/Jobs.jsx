import React, { useState, useMemo } from 'react'
import '../styles/Jobs.scss'

const JOBS = [
  {
    id: 'JOB001',
    title: 'Wedding Photographer',
    business: 'Raj Photo Studio',
    location: 'Hyderabad, Telangana',
    category: 'Photography',
    jobType: 'Full-time',
    experience: '3+ Years',
    salary: '₹30,000 – ₹45,000 / month',
    postedDate: '2025-05-01',
    openStatus: 'Open',
    isActive: true,
    skills: ['DSLR', 'Lightroom', 'Candid', 'Traditional'],
    description: 'We are looking for a skilled wedding photographer who can handle full-day shoots including all traditional ceremonies. Must have experience in both candid and traditional styles.',
    vacancies: 2,
  },
  {
    id: 'JOB002',
    title: 'Videographer & Editor',
    business: 'Motion Magic Films',
    location: 'Secunderabad, Telangana',
    category: 'Videography',
    jobType: 'Full-time',
    experience: '2+ Years',
    salary: '₹25,000 – ₹38,000 / month',
    postedDate: '2025-05-04',
    openStatus: 'Open',
    isActive: true,
    skills: ['Premiere Pro', 'After Effects', 'Color Grading', 'Drone'],
    description: 'Looking for a creative videographer who can shoot and edit wedding films. Experience with cinematic storytelling and drone footage is a plus.',
    vacancies: 1,
  },
  {
    id: 'JOB003',
    title: 'Photo Retouching Artist',
    business: 'AlbumCraft Designs',
    location: 'Banjara Hills, Hyderabad',
    category: 'Editing',
    jobType: 'Remote',
    experience: '1+ Year',
    salary: '₹15,000 – ₹22,000 / month',
    postedDate: '2025-04-20',
    openStatus: 'Open',
    isActive: true,
    skills: ['Photoshop', 'Lightroom', 'Color Correction', 'Skin Retouching'],
    description: 'We need a detail-oriented photo retouching artist to handle post-processing for wedding and event shoots. Remote work with flexible hours.',
    vacancies: 3,
  },
  {
    id: 'JOB004',
    title: 'Studio Assistant',
    business: 'Lens & Light Co.',
    location: 'Jubilee Hills, Hyderabad',
    category: 'Assistance',
    jobType: 'Part-time',
    experience: 'Fresher',
    salary: '₹8,000 – ₹12,000 / month',
    postedDate: '2025-04-15',
    openStatus: 'Closed',
    isActive: false,
    skills: ['Equipment Handling', 'Lighting Setup', 'Client Coordination'],
    description: 'Part-time studio assistant needed for weekend shoots. Responsibilities include lighting setup, equipment management and assisting the lead photographer.',
    vacancies: 1,
  },
  {
    id: 'JOB005',
    title: 'Event Photographer',
    business: 'Frame Perfect Films',
    location: 'Gachibowli, Hyderabad',
    category: 'Photography',
    jobType: 'Freelance',
    experience: '2+ Years',
    salary: '₹3,000 – ₹6,000 / event',
    postedDate: '2025-05-10',
    openStatus: 'Open',
    isActive: true,
    skills: ['Event Coverage', 'Low-light Photography', 'Quick Editing'],
    description: 'We need freelance event photographers for corporate events, product launches and private parties. Flexible schedule, per-event payment.',
    vacancies: 5,
  },
  {
    id: 'JOB006',
    title: 'Drone Pilot & Cinematographer',
    business: 'Digital Zone Labs',
    location: 'HITEC City, Hyderabad',
    category: 'Videography',
    jobType: 'Contract',
    experience: '3+ Years',
    salary: '₹40,000 – ₹60,000 / month',
    postedDate: '2025-03-28',
    openStatus: 'Closed',
    isActive: true,
    skills: ['DJI Mavic', 'Aerial Cinematography', 'FAA Certified', 'FPV'],
    description: 'Contract position for certified drone pilot to cover weddings and large outdoor events. Must hold valid DGCA UAS certification.',
    vacancies: 1,
  },
  {
    id: 'JOB007',
    title: 'Social Media Content Creator',
    business: 'GoldenFrame Studio',
    location: 'Madhapur, Hyderabad',
    category: 'Content',
    jobType: 'Full-time',
    experience: '1+ Year',
    salary: '₹18,000 – ₹28,000 / month',
    postedDate: '2025-05-18',
    openStatus: 'Open',
    isActive: true,
    skills: ['Instagram Reels', 'Canva', 'Copywriting', 'Photography'],
    description: 'Create engaging reels, stories and posts for our studio social media channels. Should have an eye for aesthetics and basic photo/video editing.',
    vacancies: 1,
  },
  {
    id: 'JOB008',
    title: 'Second Shooter – Weddings',
    business: 'Raj Photo Studio',
    location: 'Hyderabad, Telangana',
    category: 'Photography',
    jobType: 'Freelance',
    experience: '1+ Year',
    salary: '₹2,500 – ₹4,000 / event',
    postedDate: '2025-05-22',
    openStatus: 'Open',
    isActive: true,
    skills: ['DSLR', 'Mirrorless', 'Wedding Coverage', 'Adobe Lightroom'],
    description: 'We are seeking reliable second shooters for busy wedding weekends. Must be available on short notice and comfortable shooting both ceremonies and receptions.',
    vacancies: 4,
  },
  {
    id: 'JOB009',
    title: 'Album Design Specialist',
    business: 'AlbumCraft Designs',
    location: 'Remote',
    category: 'Editing',
    jobType: 'Remote',
    experience: '2+ Years',
    salary: '₹20,000 – ₹30,000 / month',
    postedDate: '2025-04-08',
    openStatus: 'Open',
    isActive: true,
    skills: ['Fundy', 'Canva', 'SmartAlbums', 'InDesign'],
    description: 'Full-time remote position designing premium wedding and portrait albums. Proficiency in at least one album design software is required.',
    vacancies: 2,
  },
  {
    id: 'JOB010',
    title: 'Product Photographer',
    business: 'Pixel Arts Studio',
    location: 'Kukatpally, Hyderabad',
    category: 'Photography',
    jobType: 'Full-time',
    experience: '2+ Years',
    salary: '₹22,000 – ₹32,000 / month',
    postedDate: '2025-03-12',
    openStatus: 'Closed',
    isActive: false,
    skills: ['Studio Lighting', 'Flat Lay', 'E-commerce', 'Photoshop'],
    description: 'Experienced product photographer needed for e-commerce catalogue shoots. Must have a strong portfolio of product and lifestyle imagery.',
    vacancies: 1,
  },
  {
    id: 'JOB011',
    title: 'Videography Intern',
    business: 'Motion Magic Films',
    location: 'Secunderabad, Telangana',
    category: 'Videography',
    jobType: 'Internship',
    experience: 'Fresher',
    salary: '₹5,000 – ₹8,000 / month',
    postedDate: '2025-05-30',
    openStatus: 'Open',
    isActive: true,
    skills: ['DaVinci Resolve', 'Basic Camera Operation', 'BTS Coverage'],
    description: '3-month internship with hands-on training in wedding videography. Freshers with a passion for filmmaking are encouraged to apply.',
    vacancies: 2,
  },
  {
    id: 'JOB012',
    title: 'Photography Trainer',
    business: 'Lens & Light Co.',
    location: 'Jubilee Hills, Hyderabad',
    category: 'Training',
    jobType: 'Part-time',
    experience: '5+ Years',
    salary: '₹500 – ₹800 / hour',
    postedDate: '2025-04-25',
    openStatus: 'Open',
    isActive: false,
    skills: ['Teaching', 'Composition', 'Lighting Theory', 'Post-Processing'],
    description: 'Looking for an experienced photographer to conduct weekend workshops for beginners and intermediate students at our studio.',
    vacancies: 1,
  },
]

const CATEGORIES  = [...new Set(JOBS.map(j => j.category))].sort()
const JOB_TYPES   = [...new Set(JOBS.map(j => j.jobType))].sort()

const fmtDate = iso =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

const OPEN_STYLE = {
  Open:   { bg: 'rgba(16,185,129,0.1)',  color: '#10b981' },
  Closed: { bg: 'rgba(100,116,139,0.12)', color: '#64748b' },
}

const TYPE_STYLE = {
  'Full-time':  { bg: 'rgba(59,130,246,0.1)',   color: '#3b82f6' },
  'Part-time':  { bg: 'rgba(139,92,246,0.1)',   color: '#8b5cf6' },
  'Freelance':  { bg: 'rgba(245,158,11,0.1)',   color: '#f59e0b' },
  'Remote':     { bg: 'rgba(20,184,166,0.1)',   color: '#14b8a6' },
  'Contract':   { bg: 'rgba(249,115,22,0.1)',   color: '#f97316' },
  'Internship': { bg: 'rgba(236,72,153,0.1)',   color: '#ec4899' },
}

// ── Toggle switch ──────────────────────────────────────────────────────────────
const Toggle = ({ active, onChange }) => (
  <button
    className={`jobs-toggle ${active ? 'jobs-toggle--on' : ''}`}
    onClick={e => { e.stopPropagation(); onChange(!active) }}
    title={active ? 'Deactivate' : 'Activate'}
  >
    <span className="jobs-toggle__thumb" />
  </button>
)

// ── Detail Modal ───────────────────────────────────────────────────────────────
const JobModal = ({ job, onClose }) => {
  const open = OPEN_STYLE[job.openStatus]
  const type = TYPE_STYLE[job.jobType] || { bg: '#f1f5f9', color: '#475569' }
  return (
    <div className="jobs-modal-overlay" onClick={onClose}>
      <div className="jobs-modal" onClick={e => e.stopPropagation()}>

        <div className="jobs-modal__header">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="jobs-modal__badge" style={{ background: type.bg, color: type.color }}>
                {job.jobType}
              </span>
              <span className="jobs-modal__badge" style={{ background: open.bg, color: open.color }}>
                {job.openStatus}
              </span>
              <span className={`jobs-modal__badge ${job.isActive ? 'jobs-modal__badge--active' : 'jobs-modal__badge--inactive'}`}>
                {job.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <h5 className="jobs-modal__title">{job.title}</h5>
            <p className="jobs-modal__sub">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M3 21h18M3 7h18M6 7V4h12v3M9 21V11m6 10V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {job.business}
              <span className="jobs-modal__dot"/>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {job.location}
            </p>
          </div>
          <button className="jobs-close-btn" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="jobs-modal__body">

          {/* Key stats */}
          <div className="jobs-stat-grid">
            <div className="jobs-stat-item">
              <span className="jobs-stat-label">Category</span>
              <span className="jobs-stat-val">{job.category}</span>
            </div>
            <div className="jobs-stat-item">
              <span className="jobs-stat-label">Experience</span>
              <span className="jobs-stat-val">{job.experience}</span>
            </div>
            <div className="jobs-stat-item">
              <span className="jobs-stat-label">Vacancies</span>
              <span className="jobs-stat-val">{job.vacancies}</span>
            </div>
            <div className="jobs-stat-item">
              <span className="jobs-stat-label">Salary / Pay</span>
              <span className="jobs-stat-val">{job.salary}</span>
            </div>
            <div className="jobs-stat-item">
              <span className="jobs-stat-label">Posted Date</span>
              <span className="jobs-stat-val">{fmtDate(job.postedDate)}</span>
            </div>
            <div className="jobs-stat-item">
              <span className="jobs-stat-label">Job ID</span>
              <span className="jobs-stat-val">{job.id}</span>
            </div>
          </div>

          {/* Description */}
          <div className="jobs-modal-section">
            <p className="jobs-modal-section__title">Job Description</p>
            <p className="jobs-modal-section__text">{job.description}</p>
          </div>

          {/* Skills */}
          <div className="jobs-modal-section">
            <p className="jobs-modal-section__title">Skills Required</p>
            <div className="jobs-skills-wrap">
              {job.skills.map(s => (
                <span key={s} className="jobs-skill-tag">{s}</span>
              ))}
            </div>
          </div>

        </div>

        <div className="jobs-modal__footer">
          <button className="jobs-btn jobs-btn--ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
const Jobs = () => {
  const [jobs,          setJobs]         = useState(JOBS)
  const [selected,      setSelected]     = useState(null)
  const [search,        setSearch]       = useState('')
  const [categoryFilter,setCategoryFilter] = useState('')
  const [typeFilter,    setTypeFilter]   = useState('')
  const [openFilter,    setOpenFilter]   = useState('')
  const [activeFilter,  setActiveFilter] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return jobs.filter(j => {
      const matchSearch   = !q
        || j.title.toLowerCase().includes(q)
        || j.business.toLowerCase().includes(q)
        || j.location.toLowerCase().includes(q)
        || j.id.toLowerCase().includes(q)
      const matchCategory = !categoryFilter || j.category    === categoryFilter
      const matchType     = !typeFilter     || j.jobType     === typeFilter
      const matchOpen     = !openFilter     || j.openStatus  === openFilter
      const matchActive   = !activeFilter   ||
        (activeFilter === 'Active' ? j.isActive : !j.isActive)
      return matchSearch && matchCategory && matchType && matchOpen && matchActive
    })
  }, [jobs, search, categoryFilter, typeFilter, openFilter, activeFilter])

  const hasFilters = search || categoryFilter || typeFilter || openFilter || activeFilter
  const reset = () => {
    setSearch(''); setCategoryFilter(''); setTypeFilter('')
    setOpenFilter(''); setActiveFilter('')
  }

  const toggleActive = (id, val) =>
    setJobs(prev => prev.map(j => j.id === id ? { ...j, isActive: val } : j))

  const counts = {
    total:    jobs.length,
    open:     jobs.filter(j => j.openStatus === 'Open').length,
    active:   jobs.filter(j => j.isActive).length,
    inactive: jobs.filter(j => !j.isActive).length,
  }

  return (
    <div className="jobs-page">

      {/* Page header */}
      <div className="jobs-page-header mb-4">
        <div>
          <h4 className="jobs-page-title">Jobs</h4>
          <p className="jobs-page-sub">Manage job listings posted by business partners</p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <span className="jobs-chip jobs-chip--total">{counts.total} Total</span>
          <span className="jobs-chip jobs-chip--open">{counts.open} Open</span>
          <span className="jobs-chip jobs-chip--active">{counts.active} Active</span>
          <span className="jobs-chip jobs-chip--inactive">{counts.inactive} Inactive</span>
        </div>
      </div>

      <div className="jobs-card">

        {/* Toolbar */}
        <div className="jobs-toolbar">

          {/* Search */}
          <div className="jobs-search-wrap">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="jobs-search-icon">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              className="jobs-search"
              placeholder="Search title, business, location…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="jobs-search-clear" onClick={() => setSearch('')}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          <div className="jobs-filters">

            {/* Category */}
            <div className="jobs-filter-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="jobs-filter-icon">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <select className="jobs-select" value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}>
                <option value="">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Job Type */}
            <div className="jobs-filter-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="jobs-filter-icon">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <select className="jobs-select" value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Open / Closed */}
            <div className="jobs-filter-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="jobs-filter-icon">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <select className="jobs-select" value={openFilter}
                onChange={e => setOpenFilter(e.target.value)}>
                <option value="">Open &amp; Closed</option>
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>

            {/* Active / Inactive */}
            <div className="jobs-filter-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="jobs-filter-icon">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <select className="jobs-select" value={activeFilter}
                onChange={e => setActiveFilter(e.target.value)}>
                <option value="">Active &amp; Inactive</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            {hasFilters && (
              <button className="jobs-reset-btn" onClick={reset}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
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
          <div className="jobs-result-bar">
            <span className="jobs-result-text">
              Showing <strong>{filtered.length}</strong> of <strong>{jobs.length}</strong> jobs
            </span>
          </div>
        )}

        {/* Table */}
        <div className="table-responsive">
          <table className="table jobs-table mb-0">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Job Title</th>
                <th>Business</th>
                <th>Category</th>
                <th>Type</th>
                <th>Posted Date</th>
                <th className="text-center">Job Status</th>
                <th className="text-center">Active</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="jobs-empty-row">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="7" width="20" height="14" rx="2" stroke="#cbd5e1" strokeWidth="1.5"/>
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p>No jobs match your filters.</p>
                    <button className="jobs-reset-btn mt-2" onClick={reset}>Clear Filters</button>
                  </td>
                </tr>
              ) : filtered.map((job, i) => {
                const open = OPEN_STYLE[job.openStatus]
                const type = TYPE_STYLE[job.jobType] || { bg: '#f1f5f9', color: '#475569' }
                return (
                  <tr key={job.id}>
                    <td className="jobs-sno">{i + 1}</td>
                    <td>
                      <button className="jobs-title-btn" onClick={() => setSelected(job)}>
                        {job.title}
                      </button>
                      <p className="jobs-location">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {job.location}
                      </p>
                    </td>
                    <td>
                      <div className="jobs-biz">
                        <div className="jobs-biz-avatar">{job.business.charAt(0)}</div>
                        <span className="jobs-biz-name">{job.business}</span>
                      </div>
                    </td>
                    <td>
                      <span className="jobs-category-tag">{job.category}</span>
                    </td>
                    <td>
                      <span className="jobs-type-badge"
                        style={{ background: type.bg, color: type.color }}>
                        {job.jobType}
                      </span>
                    </td>
                    <td className="text-nowrap">{fmtDate(job.postedDate)}</td>
                    <td className="text-center">
                      <span className="jobs-open-badge"
                        style={{ background: open.bg, color: open.color }}>
                        <span className="jobs-open-dot" />
                        {job.openStatus}
                      </span>
                    </td>
                    <td className="text-center">
                      <Toggle
                        active={job.isActive}
                        onChange={val => toggleActive(job.id, val)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>

      {selected && (
        <JobModal
          job={jobs.find(j => j.id === selected.id) || selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

export default Jobs
