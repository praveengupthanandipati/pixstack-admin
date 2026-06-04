import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PARTNERS } from '../data/partners'
import '../styles/ListingDetail.scss'
import img01 from '../assets/gallery/listitemimg01.jpg'
import img02 from '../assets/gallery/listitemimg02.jpg'
import img03 from '../assets/gallery/listitemimg03.jpg'
import img04 from '../assets/gallery/listitemimg04.jpg'
import img05 from '../assets/gallery/listitemimg05.jpg'
import img06 from '../assets/gallery/listitemimg06.jpg'
import img07 from '../assets/gallery/listitemimg07.jpg'
import img08 from '../assets/gallery/listitemimg08.jpg'
import img09 from '../assets/gallery/listitemimg09.jpg'
import img10 from '../assets/gallery/listitemimg10.jpg'

// ── Reusable edit-field ──────────────────────────────────────────────────────
const Field = ({ label, value, editing, onChange, type = 'text', wide }) => (
  <div className={`ld-field${wide ? ' ld-field--wide' : ''}`}>
    <label className="ld-field-label">{label}</label>
    {editing
      ? type === 'textarea'
        ? <textarea className="ld-input" rows={3} value={value} onChange={e => onChange(e.target.value)} />
        : type === 'select'
          ? null
          : <input type={type} className="ld-input" value={value} onChange={e => onChange(e.target.value)} />
      : <span className="ld-field-value">{value || '—'}</span>
    }
  </div>
)

const SelectField = ({ label, value, editing, onChange, options }) => (
  <div className="ld-field">
    <label className="ld-field-label">{label}</label>
    {editing
      ? <select className="ld-input ld-select" value={value} onChange={e => onChange(e.target.value)}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      : <span className="ld-field-value">{value || '—'}</span>
    }
  </div>
)

// ── Tab section wrapper ──────────────────────────────────────────────────────
const Section = ({ title, children, onEdit, onSave, editing }) => (
  <div className="ld-section">
    <div className="ld-section-head">
      <h6 className="ld-section-title">{title}</h6>
      {editing
        ? <button className="ld-btn ld-btn--save" onClick={onSave}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Save Changes
          </button>
        : <button className="ld-btn ld-btn--edit" onClick={onEdit}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Edit
          </button>
      }
    </div>
    {children}
  </div>
)

// ── TABS ─────────────────────────────────────────────────────────────────────
const TABS = [
  { key: 'basic',    label: 'Basic Details',    icon: '🏢' },
  { key: 'jobs',     label: 'Jobs Posted',       icon: '💼' },
  { key: 'about',    label: 'About Business',    icon: '📋' },
  { key: 'services', label: 'Services',          icon: '⚙️'  },
  { key: 'gallery',  label: 'Gallery',           icon: '🖼️'  },
  { key: 'reviews',  label: 'Reviews',           icon: '⭐' },
  { key: 'enquiries',label: 'Enquiries',         icon: '💬' },
  { key: 'social',   label: 'Social Media',      icon: '🔗' },
  { key: 'hours',    label: 'Working Hours',     icon: '🕐' },
]

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 — Basic Details
// ─────────────────────────────────────────────────────────────────────────────
const BasicTab = ({ partner }) => {
  const [editing, setEditing] = useState(false)
  const [data, setData] = useState({
    name:      partner.name,
    profession: partner.profession,
    estYear:   String(partner.estYear),
    teamSize:  String(partner.teamSize),
    city:      partner.city,
    state:     partner.state,
    pincode:   '400001',
    phone:     '+91 98201 00001',
    email:     `info@${partner.name.toLowerCase().replace(/\s+/g,'')}.com`,
    website:   `www.${partner.name.toLowerCase().replace(/\s+/g,'')}.com`,
    gst:       '27AABCU9603R1ZX',
    status:    partner.status,
  })
  const set = k => v => setData(d => ({ ...d, [k]: v }))

  return (
    <Section title="Basic Details" editing={editing} onEdit={() => setEditing(true)} onSave={() => setEditing(false)}>
      <div className="ld-grid">
        <Field label="Business Name"    value={data.name}       editing={editing} onChange={set('name')} />
        <SelectField label="Profession" value={data.profession} editing={editing} onChange={set('profession')}
          options={['Photo Studio','Photographer','Video Grapher','Digital Lab','Editor','Album Designer','Freelancer']} />
        <Field label="Established Year" value={data.estYear}    editing={editing} onChange={set('estYear')} type="number" />
        <Field label="Team Size"        value={data.teamSize}   editing={editing} onChange={set('teamSize')} type="number" />
        <Field label="City"             value={data.city}       editing={editing} onChange={set('city')} />
        <Field label="State"            value={data.state}      editing={editing} onChange={set('state')} />
        <Field label="Pincode"          value={data.pincode}    editing={editing} onChange={set('pincode')} />
        <Field label="Phone"            value={data.phone}      editing={editing} onChange={set('phone')} type="tel" />
        <Field label="Email"            value={data.email}      editing={editing} onChange={set('email')} type="email" />
        <Field label="Website"          value={data.website}    editing={editing} onChange={set('website')} />
        <Field label="GST Number"       value={data.gst}        editing={editing} onChange={set('gst')} />
        <SelectField label="Status"     value={data.status}     editing={editing} onChange={set('status')} options={['Active','Inactive']} />
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 — Jobs Posted
// ─────────────────────────────────────────────────────────────────────────────
const INIT_JOBS = [
  { id: 'JOB001', title: 'Wedding Photographer',    type: 'Full Time',  location: 'Mumbai',    posted: '01 Jun 2025', status: 'Open',   applicants: 12 },
  { id: 'JOB002', title: 'Video Editor',             type: 'Part Time',  location: 'Pune',      posted: '28 May 2025', status: 'Open',   applicants: 7  },
  { id: 'JOB003', title: 'Studio Assistant',         type: 'Internship', location: 'Mumbai',    posted: '20 May 2025', status: 'Closed', applicants: 24 },
  { id: 'JOB004', title: 'Social Media Manager',     type: 'Remote',     location: 'Remote',    posted: '15 May 2025', status: 'Open',   applicants: 18 },
  { id: 'JOB005', title: 'Album Design Specialist',  type: 'Full Time',  location: 'Mumbai',    posted: '10 May 2025', status: 'Closed', applicants: 9  },
]

const JobsTab = () => {
  const [jobs, setJobs] = useState(INIT_JOBS)
  const [editing, setEditing] = useState(false)
  const set = (id, k) => v => setJobs(js => js.map(j => j.id === id ? { ...j, [k]: v } : j))

  return (
    <Section title="Jobs Posted" editing={editing} onEdit={() => setEditing(true)} onSave={() => setEditing(false)}>
      <div className="table-responsive">
        <table className="table ld-table mb-0">
          <thead>
            <tr><th>Job ID</th><th>Title</th><th>Type</th><th>Location</th><th>Posted</th><th>Applicants</th><th>Status</th></tr>
          </thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.id}>
                <td><span className="ld-mono">{j.id}</span></td>
                <td>{editing ? <input className="ld-input ld-input--sm" value={j.title}    onChange={e => set(j.id,'title')(e.target.value)}    /> : <strong>{j.title}</strong>}</td>
                <td>{editing ? <input className="ld-input ld-input--sm" value={j.type}     onChange={e => set(j.id,'type')(e.target.value)}     /> : <span className="ld-tag">{j.type}</span>}</td>
                <td>{editing ? <input className="ld-input ld-input--sm" value={j.location} onChange={e => set(j.id,'location')(e.target.value)} /> : j.location}</td>
                <td className="text-muted">{j.posted}</td>
                <td className="text-center fw-semibold">{j.applicants}</td>
                <td>
                  {editing
                    ? <select className="ld-input ld-input--sm ld-select" value={j.status} onChange={e => set(j.id,'status')(e.target.value)}>
                        <option>Open</option><option>Closed</option>
                      </select>
                    : <span className={`ld-badge ${j.status === 'Open' ? 'ld-badge--green' : 'ld-badge--gray'}`}>{j.status}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 — About Business
// ─────────────────────────────────────────────────────────────────────────────
const AboutTab = ({ partner }) => {
  const [editing, setEditing] = useState(false)
  const [data, setData] = useState({
    description: `${partner.name} is one of the leading ${partner.profession.toLowerCase()} businesses based in ${partner.city}, ${partner.state}. Established in ${partner.estYear}, we have been delivering exceptional quality to our clients for over ${new Date().getFullYear() - partner.estYear} years.`,
    mission:     "To capture life's most precious moments with creativity, passion, and precision — delivering memories that last a lifetime.",
    vision:      "To be the most trusted and innovative visual media partner across India.",
    tagline:     'Where Moments Become Memories.',
    founder:     'Rajesh Kumar',
    employees:   String(partner.teamSize),
    awards:      'Best Studio Award 2022, Top Creative Agency 2023',
    certifications: 'ISO 9001:2015, Professional Photographers of India (PPI)',
  })
  const set = k => v => setData(d => ({ ...d, [k]: v }))

  return (
    <Section title="About Business" editing={editing} onEdit={() => setEditing(true)} onSave={() => setEditing(false)}>
      <div className="ld-grid">
        <Field label="Tagline"        value={data.tagline}       editing={editing} onChange={set('tagline')} wide />
        <Field label="Founder / CEO"  value={data.founder}       editing={editing} onChange={set('founder')} />
        <Field label="Total Employees"value={data.employees}     editing={editing} onChange={set('employees')} type="number" />
        <Field label="Awards"         value={data.awards}        editing={editing} onChange={set('awards')} wide />
        <Field label="Certifications" value={data.certifications}editing={editing} onChange={set('certifications')} wide />
        <Field label="Description"    value={data.description}   editing={editing} onChange={set('description')} type="textarea" wide />
        <Field label="Mission"        value={data.mission}       editing={editing} onChange={set('mission')}     type="textarea" wide />
        <Field label="Vision"         value={data.vision}        editing={editing} onChange={set('vision')}      type="textarea" wide />
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 — Services
// ─────────────────────────────────────────────────────────────────────────────
const INIT_SERVICES = [
  { id: 'SVC001', name: 'Wedding Photography',    category: 'Photography', price: '₹25,000', duration: '8 hrs',  status: 'Active'   },
  { id: 'SVC002', name: 'Pre-Wedding Shoot',      category: 'Photography', price: '₹12,000', duration: '4 hrs',  status: 'Active'   },
  { id: 'SVC003', name: 'Candid Photography',     category: 'Photography', price: '₹18,000', duration: '6 hrs',  status: 'Active'   },
  { id: 'SVC004', name: 'Wedding Videography',    category: 'Videography', price: '₹35,000', duration: 'Full Day',status: 'Active'  },
  { id: 'SVC005', name: 'Highlight Reel',         category: 'Videography', price: '₹8,000',  duration: '2 hrs',  status: 'Inactive' },
  { id: 'SVC006', name: 'Album Design (Premium)', category: 'Post Prod.', price: '₹6,500',   duration: '7 days', status: 'Active'   },
]

const ServicesTab = () => {
  const [services, setServices] = useState(INIT_SERVICES)
  const [editing, setEditing] = useState(false)
  const set = (id, k) => v => setServices(ss => ss.map(s => s.id === id ? { ...s, [k]: v } : s))

  return (
    <Section title="Services Offered" editing={editing} onEdit={() => setEditing(true)} onSave={() => setEditing(false)}>
      <div className="table-responsive">
        <table className="table ld-table mb-0">
          <thead>
            <tr><th>ID</th><th>Service Name</th><th>Category</th><th>Price</th><th>Duration</th><th>Status</th></tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id}>
                <td><span className="ld-mono">{s.id}</span></td>
                <td>{editing ? <input className="ld-input ld-input--sm" value={s.name}     onChange={e => set(s.id,'name')(e.target.value)}     /> : <strong>{s.name}</strong>}</td>
                <td>{editing ? <input className="ld-input ld-input--sm" value={s.category} onChange={e => set(s.id,'category')(e.target.value)} /> : <span className="ld-tag">{s.category}</span>}</td>
                <td>{editing ? <input className="ld-input ld-input--sm" value={s.price}    onChange={e => set(s.id,'price')(e.target.value)}    /> : <span className="fw-semibold text-success">{s.price}</span>}</td>
                <td>{editing ? <input className="ld-input ld-input--sm" value={s.duration} onChange={e => set(s.id,'duration')(e.target.value)} /> : s.duration}</td>
                <td>
                  {editing
                    ? <select className="ld-input ld-input--sm ld-select" value={s.status} onChange={e => set(s.id,'status')(e.target.value)}>
                        <option>Active</option><option>Inactive</option>
                      </select>
                    : <span className={`ld-badge ${s.status === 'Active' ? 'ld-badge--green' : 'ld-badge--gray'}`}>{s.status}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5 — Gallery
// ─────────────────────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img10]
const IMAGE_TAGS     = ['Wedding', 'Portrait', 'Pre-Wedding', 'Candid', 'Event', 'Studio', 'Corporate', 'Birthday', 'Family', 'Fashion']

const INIT_IMAGES = GALLERY_IMAGES.map((src, i) => ({
  id: `IMG${String(i + 1).padStart(3, '0')}`,
  type: 'image',
  tag: IMAGE_TAGS[i],
  src,
  removed: false,
}))

const SAMPLE_VIDEOS = [
  { id: 'VID001', type: 'video', tag: 'Highlights', videoId: 'dQw4w9WgXcQ',  label: 'Wedding Highlights Reel'   },
  { id: 'VID002', type: 'video', tag: 'Cinematic',  videoId: 'kJQP7kiw5Fk',  label: 'Cinematic Wedding Film'    },
  { id: 'VID003', type: 'video', tag: 'Pre-Wedding',videoId: 'L_jWHffIx5E',  label: 'Pre-Wedding Short Film'    },
  { id: 'VID004', type: 'video', tag: 'Teaser',     videoId: '9bZkp7q19f0',  label: 'Event Teaser'              },
].map(v => ({ ...v, removed: false }))

const YT_THUMB = id => `https://img.youtube.com/vi/${id}/mqdefault.jpg`

const GalleryTab = () => {
  const [images,   setImages]   = useState(INIT_IMAGES)
  const [videos,   setVideos]   = useState(SAMPLE_VIDEOS)
  const [editing,  setEditing]  = useState(false)
  const [lightbox, setLightbox] = useState(null)   // { type:'image'|'video', src, videoId, tag }

  const visibleImages = images.filter(g => !g.removed)
  const visibleVideos = videos.filter(v => !v.removed)
  const totalCount    = visibleImages.length + visibleVideos.length

  const removeImage = id => setImages(gs => gs.map(g => g.id === id ? { ...g, removed: true } : g))
  const removeVideo = id => setVideos(vs => vs.map(v => v.id === id ? { ...v, removed: true } : v))

  return (
    <Section
      title={`Gallery — ${visibleImages.length} Photos · ${visibleVideos.length} Videos`}
      editing={editing}
      onEdit={() => setEditing(true)}
      onSave={() => setEditing(false)}
    >
      {/* ── Photos ── */}
      <p className="ld-gallery-section-label">Photos</p>
      <div className="ld-gallery-grid mb-4">
        {visibleImages.map(g => (
          <div key={g.id} className="ld-gallery-item">
            <div
              className="ld-gallery-thumb"
              onClick={() => !editing && setLightbox({ type: 'image', src: g.src, tag: g.tag })}
              style={{ cursor: editing ? 'default' : 'zoom-in' }}
            >
              <img src={g.src} alt={g.tag} className="ld-gallery-img" />
              {editing && (
                <button className="ld-gallery-del" title="Remove" onClick={e => { e.stopPropagation(); removeImage(g.id) }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
              {!editing && (
                <div className="ld-gallery-overlay">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M11 8v6M8 11h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </div>
            <span className="ld-gallery-tag">{g.tag}</span>
          </div>
        ))}
      </div>

      {/* ── Videos ── */}
      <p className="ld-gallery-section-label">Videos</p>
      <div className="ld-gallery-grid">
        {visibleVideos.map(v => (
          <div key={v.id} className="ld-gallery-item">
            <div
              className="ld-gallery-thumb ld-gallery-thumb--video"
              onClick={() => !editing && setLightbox({ type: 'video', videoId: v.videoId, tag: v.tag, label: v.label })}
              style={{ cursor: editing ? 'default' : 'pointer' }}
            >
              <img src={YT_THUMB(v.videoId)} alt={v.label} className="ld-gallery-img" />
              {/* YouTube play button */}
              {!editing && (
                <div className="ld-gallery-play">
                  <div className="ld-play-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <polygon points="5,3 19,12 5,21" fill="#fff"/>
                    </svg>
                  </div>
                </div>
              )}
              {editing && (
                <button className="ld-gallery-del" title="Remove" onClick={e => { e.stopPropagation(); removeVideo(v.id) }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
            <span className="ld-gallery-tag ld-gallery-tag--video">▶ {v.tag}</span>
          </div>
        ))}
      </div>

      {editing && (
        <div className="d-flex gap-2 mt-3">
          <button className="ld-btn ld-btn--outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            Add Photo
          </button>
          <button className="ld-btn ld-btn--outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg>
            Add Video
          </button>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="ld-lightbox" onClick={() => setLightbox(null)}>
          <div className="ld-lightbox__inner" onClick={e => e.stopPropagation()}>
            <button className="ld-lightbox__close" onClick={() => setLightbox(null)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>

            {lightbox.type === 'image'
              ? <img src={lightbox.src} alt={lightbox.tag} className="ld-lightbox__img" />
              : <div className="ld-lightbox__video">
                  <iframe
                    src={`https://www.youtube.com/embed/${lightbox.videoId}?autoplay=1`}
                    title={lightbox.label}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="ld-lightbox__iframe"
                  />
                </div>
            }

            <div className="ld-lightbox__caption">
              {lightbox.type === 'video'
                ? <span className="ld-lightbox__title">▶ {lightbox.label}</span>
                : <span className="ld-lightbox__title">{lightbox.tag}</span>
              }
              <span className="ld-gallery-tag">{lightbox.tag}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 6 — Customer Reviews
// ─────────────────────────────────────────────────────────────────────────────
const INIT_REVIEWS = [
  { id: 'REV001', reviewer: 'Amit Desai',    rating: 5, comment: 'Outstanding work! The wedding photos were absolutely stunning. Very professional team.', date: '01 Jun 2025', status: 'Published' },
  { id: 'REV002', reviewer: 'Sunita Verma',  rating: 4, comment: 'Great experience overall. The team was punctual and delivered on time.', date: '28 May 2025', status: 'Published' },
  { id: 'REV003', reviewer: 'Rajiv Nair',    rating: 3, comment: 'Photos were good but delivery was delayed by 2 days.', date: '20 May 2025', status: 'Pending'   },
  { id: 'REV004', reviewer: 'Priya Kapoor',  rating: 5, comment: 'Best studio in Mumbai! Highly recommended for weddings.', date: '15 May 2025', status: 'Published' },
  { id: 'REV005', reviewer: 'Karan Mehta',   rating: 2, comment: 'Average quality. Expected better for the price paid.', date: '10 May 2025', status: 'Hidden'    },
]

const Stars = ({ n }) => '★'.repeat(n) + '☆'.repeat(5 - n)

const ReviewsTab = () => {
  const [reviews, setReviews] = useState(INIT_REVIEWS)
  const [editing, setEditing] = useState(false)
  const set = (id, k) => v => setReviews(rs => rs.map(r => r.id === id ? { ...r, [k]: v } : r))
  const STATUS_COLORS = { Published: 'ld-badge--green', Pending: 'ld-badge--yellow', Hidden: 'ld-badge--gray' }

  return (
    <Section title="Customer Reviews" editing={editing} onEdit={() => setEditing(true)} onSave={() => setEditing(false)}>
      <div className="table-responsive">
        <table className="table ld-table mb-0">
          <thead>
            <tr><th>ID</th><th>Reviewer</th><th>Rating</th><th>Comment</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id}>
                <td><span className="ld-mono">{r.id}</span></td>
                <td><strong>{r.reviewer}</strong></td>
                <td>
                  {editing
                    ? <select className="ld-input ld-input--sm ld-select" value={r.rating} onChange={e => set(r.id,'rating')(Number(e.target.value))}>
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ★</option>)}
                      </select>
                    : <span className="ld-stars">{Stars(r.rating)} <span className="ld-stars-val">{r.rating}</span></span>
                  }
                </td>
                <td className="ld-comment-cell">
                  {editing
                    ? <textarea className="ld-input ld-input--sm" rows={2} value={r.comment} onChange={e => set(r.id,'comment')(e.target.value)} />
                    : <span className="ld-comment">{r.comment}</span>
                  }
                </td>
                <td className="text-muted text-nowrap">{r.date}</td>
                <td>
                  {editing
                    ? <select className="ld-input ld-input--sm ld-select" value={r.status} onChange={e => set(r.id,'status')(e.target.value)}>
                        <option>Published</option><option>Pending</option><option>Hidden</option>
                      </select>
                    : <span className={`ld-badge ${STATUS_COLORS[r.status]}`}>{r.status}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 7 — Enquiries
// ─────────────────────────────────────────────────────────────────────────────
const INIT_ENQUIRIES = [
  { id: 'ENQ001', name: 'Meera Pillai',  email: 'meera@gmail.com',  phone: '+91 98001 11111', message: 'Need quote for wedding photography in December 2025.', date: '04 Jun 2025', status: 'New'      },
  { id: 'ENQ002', name: 'Sunil Gupta',   email: 'sunil@yahoo.com',  phone: '+91 97001 22222', message: 'Looking for pre-wedding shoot package.', date: '03 Jun 2025', status: 'Replied'  },
  { id: 'ENQ003', name: 'Divya Menon',   email: 'divya@gmail.com',  phone: '+91 96001 33333', message: 'Interested in corporate event photography.', date: '02 Jun 2025', status: 'New'      },
  { id: 'ENQ004', name: 'Rajan Shah',    email: 'rajan@outlook.com',phone: '+91 95001 44444', message: 'What is your availability for June 28?', date: '01 Jun 2025', status: 'Closed'   },
  { id: 'ENQ005', name: 'Anita Rao',     email: 'anita@gmail.com',  phone: '+91 94001 55555', message: 'Looking for birthday party photography.', date: '30 May 2025', status: 'Replied'  },
]

const EnquiriesTab = () => {
  const [enquiries, setEnquiries] = useState(INIT_ENQUIRIES)
  const [editing, setEditing] = useState(false)
  const set = (id, k) => v => setEnquiries(es => es.map(e => e.id === id ? { ...e, [k]: v } : e))
  const STATUS_COLORS = { New: 'ld-badge--blue', Replied: 'ld-badge--green', Closed: 'ld-badge--gray' }

  return (
    <Section title="Enquiries" editing={editing} onEdit={() => setEditing(true)} onSave={() => setEditing(false)}>
      <div className="table-responsive">
        <table className="table ld-table mb-0">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Phone</th><th>Message</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {enquiries.map(e => (
              <tr key={e.id}>
                <td><span className="ld-mono">{e.id}</span></td>
                <td>
                  <div className="ld-enq-name">{e.name}</div>
                  <div className="ld-enq-email">{e.email}</div>
                </td>
                <td className="text-nowrap">{e.phone}</td>
                <td className="ld-comment-cell"><span className="ld-comment">{e.message}</span></td>
                <td className="text-muted text-nowrap">{e.date}</td>
                <td>
                  {editing
                    ? <select className="ld-input ld-input--sm ld-select" value={e.status} onChange={ev => set(e.id,'status')(ev.target.value)}>
                        <option>New</option><option>Replied</option><option>Closed</option>
                      </select>
                    : <span className={`ld-badge ${STATUS_COLORS[e.status]}`}>{e.status}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 8 — Social Media
// ─────────────────────────────────────────────────────────────────────────────
const SOCIAL_ICONS = {
  Instagram: { color: '#e1306c', bg: 'rgba(225,48,108,0.1)' },
  Facebook:  { color: '#1877f2', bg: 'rgba(24,119,242,0.1)' },
  YouTube:   { color: '#ff0000', bg: 'rgba(255,0,0,0.1)'    },
  Twitter:   { color: '#1da1f2', bg: 'rgba(29,161,242,0.1)' },
  LinkedIn:  { color: '#0a66c2', bg: 'rgba(10,102,194,0.1)' },
}

const SocialTab = ({ partner }) => {
  const [editing, setEditing] = useState(false)
  const slug = partner.name.toLowerCase().replace(/\s+/g,'')
  const [data, setData] = useState({
    Instagram: { url: `https://instagram.com/${slug}`,  followers: '4.2K' },
    Facebook:  { url: `https://facebook.com/${slug}`,   followers: '8.1K' },
    YouTube:   { url: `https://youtube.com/@${slug}`,   followers: '1.3K' },
    Twitter:   { url: `https://twitter.com/${slug}`,    followers: '920'  },
    LinkedIn:  { url: `https://linkedin.com/in/${slug}`,followers: '540'  },
  })
  const set = (platform, k) => v => setData(d => ({ ...d, [platform]: { ...d[platform], [k]: v } }))

  return (
    <Section title="Social Media" editing={editing} onEdit={() => setEditing(true)} onSave={() => setEditing(false)}>
      <div className="ld-social-list">
        {Object.entries(data).map(([platform, info]) => {
          const style = SOCIAL_ICONS[platform]
          return (
            <div key={platform} className="ld-social-row">
              <div className="ld-social-icon" style={{ background: style.bg, color: style.color }}>
                {platform[0]}
              </div>
              <div className="ld-social-name">{platform}</div>
              <div className="ld-social-url">
                {editing
                  ? <input className="ld-input ld-input--sm" value={info.url} onChange={e => set(platform,'url')(e.target.value)} />
                  : <a href={info.url} target="_blank" rel="noreferrer" className="ld-link">{info.url}</a>
                }
              </div>
              <div className="ld-social-followers">
                {editing
                  ? <input className="ld-input ld-input--sm ld-input--xs" value={info.followers} onChange={e => set(platform,'followers')(e.target.value)} />
                  : <span className="ld-badge ld-badge--blue">{info.followers} followers</span>
                }
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 9 — Working Hours
// ─────────────────────────────────────────────────────────────────────────────
const INIT_HOURS = [
  { day: 'Monday',    open: '09:00', close: '18:00', isOpen: true  },
  { day: 'Tuesday',   open: '09:00', close: '18:00', isOpen: true  },
  { day: 'Wednesday', open: '09:00', close: '18:00', isOpen: true  },
  { day: 'Thursday',  open: '09:00', close: '18:00', isOpen: true  },
  { day: 'Friday',    open: '09:00', close: '18:00', isOpen: true  },
  { day: 'Saturday',  open: '10:00', close: '16:00', isOpen: true  },
  { day: 'Sunday',    open: '',      close: '',       isOpen: false },
]

const WorkingHoursTab = () => {
  const [hours, setHours] = useState(INIT_HOURS)
  const [editing, setEditing] = useState(false)
  const set = (day, k) => v => setHours(hs => hs.map(h => h.day === day ? { ...h, [k]: v } : h))

  return (
    <Section title="Working Hours" editing={editing} onEdit={() => setEditing(true)} onSave={() => setEditing(false)}>
      <div className="table-responsive">
        <table className="table ld-table mb-0">
          <thead>
            <tr><th>Day</th><th>Open Time</th><th>Close Time</th><th>Status</th></tr>
          </thead>
          <tbody>
            {hours.map(h => (
              <tr key={h.day}>
                <td><strong>{h.day}</strong></td>
                <td>
                  {editing
                    ? <input type="time" className="ld-input ld-input--sm" value={h.open}  onChange={e => set(h.day,'open')(e.target.value)}  disabled={!h.isOpen} />
                    : <span>{h.isOpen ? h.open : '—'}</span>
                  }
                </td>
                <td>
                  {editing
                    ? <input type="time" className="ld-input ld-input--sm" value={h.close} onChange={e => set(h.day,'close')(e.target.value)} disabled={!h.isOpen} />
                    : <span>{h.isOpen ? h.close : '—'}</span>
                  }
                </td>
                <td>
                  {editing
                    ? <label className="ld-toggle">
                        <input type="checkbox" checked={h.isOpen} onChange={e => set(h.day,'isOpen')(e.target.checked)} />
                        <span className="ld-toggle__slider" />
                        <span className="ms-2">{h.isOpen ? 'Open' : 'Closed'}</span>
                      </label>
                    : <span className={`ld-badge ${h.isOpen ? 'ld-badge--green' : 'ld-badge--gray'}`}>{h.isOpen ? 'Open' : 'Closed'}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
const Listingdetail = () => {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const partner    = PARTNERS.find(p => p.id === id)
  const [activeTab, setActiveTab] = useState('basic')

  if (!partner) return (
    <div className="ld-not-found">
      <h5>Partner not found</h5>
      <button className="ld-btn ld-btn--outline mt-3" onClick={() => navigate('/partners')}>← Back to Partners</button>
    </div>
  )

  const isActive = partner.status === 'Active'

  const renderTab = () => {
    switch (activeTab) {
      case 'basic':     return <BasicTab    partner={partner} />
      case 'jobs':      return <JobsTab />
      case 'about':     return <AboutTab    partner={partner} />
      case 'services':  return <ServicesTab />
      case 'gallery':   return <GalleryTab />
      case 'reviews':   return <ReviewsTab />
      case 'enquiries': return <EnquiriesTab />
      case 'social':    return <SocialTab   partner={partner} />
      case 'hours':     return <WorkingHoursTab />
      default:          return null
    }
  }

  return (
    <div className="ld-page">

      {/* Breadcrumb */}
      <div className="ld-breadcrumb mb-3">
        <button className="ld-back-btn" onClick={() => navigate('/partners')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Listing Partners
        </button>
        <span className="ld-bc-sep">/</span>
        <span className="ld-bc-current">{partner.name}</span>
      </div>

      {/* Profile banner */}
      <div className="ld-banner mb-4">
        <div className="ld-banner-avatar">{partner.name.charAt(0)}</div>
        <div className="ld-banner-info">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h4 className="ld-banner-name">{partner.name}</h4>
            <span className={`ld-badge ${isActive ? 'ld-badge--green' : 'ld-badge--yellow'}`}>{partner.status}</span>
          </div>
          <p className="ld-banner-meta">{partner.profession} · {partner.city}, {partner.state} · Est. {partner.estYear} · {partner.teamSize} team members</p>
          <span className="ld-banner-id">{partner.id}</span>
        </div>
      </div>

      {/* Tab nav */}
      <div className="ld-tabs-nav mb-3">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`ld-tab-btn${activeTab === t.key ? ' ld-tab-btn--active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="ld-tab-content">
        {renderTab()}
      </div>

    </div>
  )
}

export default Listingdetail
