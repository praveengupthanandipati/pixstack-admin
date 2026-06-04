import React, { useState, useRef } from 'react'
import RichTextEditor from '../components/RichTextEditor'
import '../styles/Blogs.scss'
import img01 from '../assets/gallery/listitemimg01.jpg'
import img02 from '../assets/gallery/listitemimg02.jpg'
import img03 from '../assets/gallery/listitemimg03.jpg'
import img04 from '../assets/gallery/listitemimg04.jpg'
import img05 from '../assets/gallery/listitemimg05.jpg'
import img06 from '../assets/gallery/listitemimg06.jpg'
import img07 from '../assets/gallery/listitemimg07.jpg'
import img08 from '../assets/gallery/listitemimg08.jpg'

// ── strip HTML for card excerpt ───────────────────────────────────────────────
const stripHtml = html => html.replace(/<[^>]*>/g, '').trim()

// ── seed data ─────────────────────────────────────────────────────────────────
const SEED_BLOGS = [
  {
    id: 'BLG001',
    title:       '10 Tips for Perfect Wedding Photography',
    description: '<p>Wedding photography is one of the most demanding genres. In this guide we cover composition, lighting, and gear choices to help you deliver stunning results every time.</p>',
    image:       img01,
    category:    'Photography Tips',
    author:      'Admin',
    date:        '2025-05-28',
    status:      'Published',
  },
  {
    id: 'BLG002',
    title:       'How to Edit Cinematic Wedding Videos',
    description: '<p>From colour grading to audio sync, learn the post-production workflow that top videographers use to create emotional, cinematic wedding films.</p>',
    image:       img02,
    category:    'Video',
    author:      'Admin',
    date:        '2025-05-22',
    status:      'Published',
  },
  {
    id: 'BLG003',
    title:       'Growing Your Photography Studio in 2025',
    description: '<p>Marketing, pricing, and client retention strategies specifically for photography studio owners looking to scale their business this year.</p>',
    image:       img03,
    category:    'Business',
    author:      'Admin',
    date:        '2025-06-01',
    status:      'Draft',
  },
  {
    id: 'BLG004',
    title:       'The Ultimate Pre-Wedding Shoot Guide',
    description: '<p>Everything you need to know about planning, shooting and delivering a stunning pre-wedding session — from location scouting to final album delivery.</p>',
    image:       img04,
    category:    'Wedding',
    author:      'Admin',
    date:        '2025-04-15',
    status:      'Published',
  },
  {
    id: 'BLG005',
    title:       'Lightroom vs Capture One: Which Is Right for You?',
    description: '<p>A detailed comparison of the two industry-leading RAW editors for professional photographers, covering performance, colour science and pricing.</p>',
    image:       img05,
    category:    'Tutorial',
    author:      'Admin',
    date:        '2025-03-30',
    status:      'Published',
  },
  {
    id: 'BLG006',
    title:       'Inspiring Studio Setups from Around India',
    description: '<p>A visual tour of ten beautifully designed photography and video studios across Mumbai, Delhi, Bengaluru and Chennai.</p>',
    image:       img06,
    category:    'Inspiration',
    author:      'Admin',
    date:        '2025-06-03',
    status:      'Draft',
  },
  {
    id: 'BLG007',
    title:       'Album Design Trends for 2025',
    description: '<p>Discover the hottest layout styles, paper types and cover materials that top album designers are recommending for this wedding season.</p>',
    image:       img07,
    category:    'Photography Tips',
    author:      'Admin',
    date:        '2025-05-10',
    status:      'Published',
  },
  {
    id: 'BLG008',
    title:       'How to Build a Winning Photographer Portfolio',
    description: '<p>A step-by-step guide to curating your best work, writing compelling captions, and building an online presence that attracts premium clients.</p>',
    image:       img08,
    category:    'Business',
    author:      'Admin',
    date:        '2025-05-18',
    status:      'Published',
  },
]

const CATEGORIES = ['Photography Tips', 'Wedding', 'Video', 'Business', 'Tutorial', 'Inspiration']

const CATEGORY_COLORS = {
  'Photography Tips': { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6' },
  'Wedding':          { bg: 'rgba(236,72,153,0.1)',  color: '#ec4899' },
  'Video':            { bg: 'rgba(139,92,246,0.1)',  color: '#8b5cf6' },
  'Business':         { bg: 'rgba(16,185,129,0.1)',  color: '#10b981' },
  'Tutorial':         { bg: 'rgba(245,158,11,0.1)',  color: '#f59e0b' },
  'Inspiration':      { bg: 'rgba(228,41,41,0.1)',   color: '#e42929' },
}

// ── CreateBlogDrawer ──────────────────────────────────────────────────────────
const EMPTY = { title: '', description: '', category: CATEGORIES[0], image: null, imagePreview: '', status: 'Draft' }

const CreateBlogDrawer = ({ open, onClose, onSave }) => {
  const [form,   setForm]   = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const fileRef             = useRef(null)

  const set = k => v => setForm(f => ({ ...f, [k]: v }))

  const handleImage = e => {
    const file = e.target.files[0]
    if (!file) return
    setForm(f => ({ ...f, image: file, imagePreview: URL.createObjectURL(file) }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim())                                     e.title       = 'Blog title is required'
    if (!stripHtml(form.description))                           e.description = 'Blog description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave({
      id:          `BLG${String(Date.now()).slice(-3)}`,
      title:       form.title,
      description: form.description,
      image:       form.imagePreview || img01,
      category:    form.category,
      author:      'Admin',
      date:        new Date().toISOString().slice(0, 10),
      status:      form.status,
    })
    setForm(EMPTY)
    setErrors({})
    onClose()
  }

  const handleClose = () => { setForm(EMPTY); setErrors({}); onClose() }

  if (!open) return null

  return (
    <>
      <div className="bl-backdrop" onClick={handleClose} />
      <div className="bl-drawer">

        <div className="bl-drawer__header">
          <div>
            <h5 className="bl-drawer__title">Create New Blog</h5>
            <p className="bl-drawer__sub">Add a new article to publish on the platform</p>
          </div>
          <button className="bl-close-btn" onClick={handleClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="bl-drawer__body">

          {/* Blog Image */}
          <div className="bl-form-group">
            <label className="bl-label">Blog Image</label>
            <div
              className="bl-image-upload"
              onClick={() => fileRef.current.click()}
              style={form.imagePreview ? { backgroundImage: `url(${form.imagePreview})` } : {}}
            >
              {!form.imagePreview && (
                <div className="bl-image-placeholder">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Click to upload cover image</p>
                  <span>JPG, PNG — recommended 800 × 450 px</span>
                </div>
              )}
              {form.imagePreview && (
                <button className="bl-image-change" onClick={e => { e.stopPropagation(); fileRef.current.click() }}>
                  Change Image
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImage} />
          </div>

          {/* Blog Title */}
          <div className="bl-form-group">
            <label className="bl-label">Blog Title <span className="bl-req">*</span></label>
            <input
              className={`bl-input${errors.title ? ' bl-input--error' : ''}`}
              placeholder="e.g. 10 Tips for Perfect Wedding Photography"
              value={form.title}
              onChange={e => set('title')(e.target.value)}
            />
            {errors.title && <span className="bl-error">{errors.title}</span>}
          </div>

          {/* Blog Description — Rich Text Editor */}
          <div className="bl-form-group">
            <label className="bl-label">Blog Description <span className="bl-req">*</span></label>
            <RichTextEditor
              value={form.description}
              onChange={set('description')}
              placeholder="Write your blog content here — supports bold, headings, lists…"
              hasError={!!errors.description}
            />
            {errors.description && <span className="bl-error">{errors.description}</span>}
          </div>

          {/* Category + Status */}
          <div className="bl-form-row">
            <div className="bl-form-group">
              <label className="bl-label">Category</label>
              <select className="bl-input bl-select" value={form.category} onChange={e => set('category')(e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="bl-form-group">
              <label className="bl-label">Publish Status</label>
              <select className="bl-input bl-select" value={form.status} onChange={e => set('status')(e.target.value)}>
                <option>Draft</option>
                <option>Published</option>
                <option>Unpublished</option>
              </select>
            </div>
          </div>

        </div>

        <div className="bl-drawer__footer">
          <button className="bl-btn bl-btn--ghost" onClick={handleClose}>Cancel</button>
          <button className="bl-btn bl-btn--primary" onClick={handleSave}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Publish Blog
          </button>
        </div>

      </div>
    </>
  )
}

// ── BlogCard ──────────────────────────────────────────────────────────────────
const BlogCard = ({ blog, onDelete }) => {
  const catStyle = CATEGORY_COLORS[blog.category] || { bg: '#f1f5f9', color: '#475569' }
  const excerpt  = stripHtml(blog.description).slice(0, 120) + (stripHtml(blog.description).length > 120 ? '…' : '')
  const isPublished = blog.status === 'Published'

  return (
    <div className="bl-card">
      <div className="bl-card__image-wrap">
        <img src={blog.image} alt={blog.title} className="bl-card__img" />
        <span
          className="bl-card__status"
          style={
            blog.status === 'Published'   ? { background: 'rgba(16,185,129,0.12)',  color: '#10b981' } :
            blog.status === 'Unpublished' ? { background: 'rgba(239,68,68,0.12)',   color: '#ef4444' } :
                                            { background: 'rgba(245,158,11,0.12)',  color: '#f59e0b' }
          }
        >
          {blog.status}
        </span>
        <span className="bl-card__category" style={{ background: catStyle.bg, color: catStyle.color }}>
          {blog.category}
        </span>
      </div>

      <div className="bl-card__body">
        <h5 className="bl-card__title">{blog.title}</h5>
        <p className="bl-card__excerpt">{excerpt}</p>
      </div>

      <div className="bl-card__footer">
        <div className="bl-card__meta">
          <span className="bl-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="currentColor"/>
              <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill="currentColor"/>
            </svg>
            {blog.author}
          </span>
          <span className="bl-meta-sep">·</span>
          <span className="bl-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            {new Date(blog.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className="d-flex gap-2">
          <button className="bl-icon-btn bl-icon-btn--edit" title="Edit">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="bl-icon-btn bl-icon-btn--delete" title="Delete" onClick={() => onDelete(blog.id)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
const Blogs = () => {
  const [blogs,       setBlogs]       = useState(SEED_BLOGS)
  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [filter,      setFilter]      = useState('All')
  const [search,      setSearch]      = useState('')

  const handleCreate = b => setBlogs(prev => [b, ...prev])
  const handleDelete = id => setBlogs(prev => prev.filter(b => b.id !== id))

  const displayed = blogs.filter(b => {
    const matchFilter = filter === 'All' || b.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  const counts = {
    All:          blogs.length,
    Published:    blogs.filter(b => b.status === 'Published').length,
    Draft:        blogs.filter(b => b.status === 'Draft').length,
    Unpublished:  blogs.filter(b => b.status === 'Unpublished').length,
  }

  return (
    <div className="bl-page">

      {/* Header */}
      <div className="bl-page-header mb-4">
        <div>
          <h4 className="bl-page-title">Blogs</h4>
          <p className="bl-page-sub">{blogs.length} articles total</p>
        </div>
        <button className="bl-btn bl-btn--primary" onClick={() => setDrawerOpen(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          Create Blog
        </button>
      </div>

      {/* Toolbar */}
      <div className="bl-toolbar mb-4">
        <div className="bl-search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="bl-search-icon">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            className="bl-search"
            placeholder="Search blogs…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="bl-filter-tabs">
          {['All', 'Published', 'Draft', 'Unpublished'].map(f => (
            <button
              key={f}
              className={`bl-filter-tab${filter === f ? ' bl-filter-tab--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="bl-filter-count">{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {displayed.length === 0
        ? (
          <div className="bl-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14,2 14,8 20,8" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>No blogs found.</p>
            <button className="bl-btn bl-btn--primary mt-2" onClick={() => setDrawerOpen(true)}>Write First Blog</button>
          </div>
        )
        : (
          <div className="bl-grid">
            {displayed.map(b => <BlogCard key={b.id} blog={b} onDelete={handleDelete} />)}
          </div>
        )
      }

      <CreateBlogDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleCreate}
      />
    </div>
  )
}

export default Blogs
