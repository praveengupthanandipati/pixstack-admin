import React, { useState } from 'react'
import '../styles/Rolespermissions.scss'

// ── Permission modules & actions ───────────────────────────────────────────────
const MODULES = [
  { key: 'dashboard',  label: 'Dashboard',           actions: ['view'] },
  { key: 'users',      label: 'Users',               actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'partners',   label: 'Business Partners',   actions: ['view', 'create', 'edit', 'delete', 'approve'] },
  { key: 'listings',   label: 'Listings',            actions: ['view', 'edit', 'publish', 'delete'] },
  { key: 'events',     label: 'Events',              actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'blogs',      label: 'Blogs',               actions: ['view', 'create', 'edit', 'delete', 'publish'] },
  { key: 'enquiries',  label: 'Enquiries',           actions: ['view', 'reply', 'delete'] },
  { key: 'requests',   label: 'Requests',            actions: ['view', 'respond', 'close', 'delete'] },
  { key: 'jobs',       label: 'Jobs',                actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'reports',    label: 'Reports',             actions: ['view', 'export'] },
  { key: 'settings',   label: 'Settings',            actions: ['view', 'edit'] },
  { key: 'roles',      label: 'Roles & Permissions', actions: ['view', 'create', 'edit', 'delete'] },
]

const ACTION_COLORS = {
  view:    { bg: 'rgba(59,130,246,0.12)',   color: '#3b82f6' },
  create:  { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  edit:    { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },
  delete:  { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444' },
  publish: { bg: 'rgba(139,92,246,0.12)',  color: '#8b5cf6' },
  approve: { bg: 'rgba(20,184,166,0.12)',  color: '#14b8a6' },
  reply:   { bg: 'rgba(236,72,153,0.12)',  color: '#ec4899' },
  respond: { bg: 'rgba(249,115,22,0.12)',  color: '#f97316' },
  close:   { bg: 'rgba(100,116,139,0.12)', color: '#64748b' },
  export:  { bg: 'rgba(99,102,241,0.12)',  color: '#6366f1' },
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const emptyPerms = () => {
  const p = {}
  MODULES.forEach(m => m.actions.forEach(a => { p[`${m.key}_${a}`] = false }))
  return p
}
const allPerms = () => {
  const p = {}
  MODULES.forEach(m => m.actions.forEach(a => { p[`${m.key}_${a}`] = true }))
  return p
}
const viewOnlyPerms = () => {
  const p = emptyPerms()
  MODULES.forEach(m => { if (m.actions.includes('view')) p[`${m.key}_view`] = true })
  return p
}
const countPerms  = perms => Object.values(perms).filter(Boolean).length
const totalPerms  = () => Object.keys(emptyPerms()).length

// ── Seed data ──────────────────────────────────────────────────────────────────
const SEED_ROLES = [
  {
    id: 'ROLE001', name: 'Super Admin', type: 'user', color: '#e42929',
    description: 'Full unrestricted access to all modules and platform settings.',
    members: 2, isSystem: true,
    permissions: allPerms(),
  },
  {
    id: 'ROLE002', name: 'Admin', type: 'user', color: '#3b82f6',
    description: 'Full access to all modules except role management and system settings.',
    members: 5, isSystem: true,
    permissions: (() => {
      const p = allPerms()
      p.roles_create = false; p.roles_edit = false; p.roles_delete = false
      p.settings_edit = false
      return p
    })(),
  },
  {
    id: 'ROLE003', name: 'Moderator', type: 'user', color: '#8b5cf6',
    description: 'Reviews and moderates content — blogs, events, enquiries and requests.',
    members: 8, isSystem: false,
    permissions: (() => {
      const p = emptyPerms()
      p.dashboard_view = true
      p.users_view = true
      p.partners_view = true
      p.listings_view = true
      p.events_view = true; p.events_create = true; p.events_edit = true
      p.blogs_view = true; p.blogs_create = true; p.blogs_edit = true; p.blogs_publish = true
      p.enquiries_view = true; p.enquiries_reply = true
      p.requests_view = true; p.requests_respond = true
      return p
    })(),
  },
  {
    id: 'ROLE004', name: 'Support Agent', type: 'user', color: '#f59e0b',
    description: 'Handles enquiries and requests. Read-only access to all other modules.',
    members: 12, isSystem: false,
    permissions: (() => {
      const p = emptyPerms()
      p.dashboard_view = true
      p.users_view = true
      p.partners_view = true
      p.enquiries_view = true; p.enquiries_reply = true
      p.requests_view = true; p.requests_respond = true; p.requests_close = true
      return p
    })(),
  },
  {
    id: 'ROLE005', name: 'Business Owner', type: 'business', color: '#10b981',
    description: 'Complete access to all business modules, listings, jobs and analytics.',
    members: 24, isSystem: true,
    permissions: (() => {
      const p = emptyPerms()
      p.dashboard_view = true
      p.partners_view = true; p.partners_create = true; p.partners_edit = true
      p.listings_view = true; p.listings_edit = true; p.listings_publish = true; p.listings_delete = true
      p.events_view = true; p.events_create = true; p.events_edit = true; p.events_delete = true
      p.blogs_view = true; p.blogs_create = true; p.blogs_edit = true; p.blogs_delete = true; p.blogs_publish = true
      p.enquiries_view = true; p.enquiries_reply = true
      p.requests_view = true; p.requests_respond = true; p.requests_close = true
      p.jobs_view = true; p.jobs_create = true; p.jobs_edit = true; p.jobs_delete = true
      p.reports_view = true; p.reports_export = true
      p.settings_view = true; p.settings_edit = true
      return p
    })(),
  },
  {
    id: 'ROLE006', name: 'Studio Manager', type: 'business', color: '#14b8a6',
    description: 'Manages listings, jobs, requests and enquiries on behalf of the business.',
    members: 31, isSystem: false,
    permissions: (() => {
      const p = emptyPerms()
      p.dashboard_view = true
      p.listings_view = true; p.listings_edit = true; p.listings_publish = true
      p.jobs_view = true; p.jobs_create = true; p.jobs_edit = true; p.jobs_delete = true
      p.requests_view = true; p.requests_respond = true; p.requests_close = true
      p.enquiries_view = true; p.enquiries_reply = true
      p.reports_view = true
      return p
    })(),
  },
  {
    id: 'ROLE007', name: 'Photographer', type: 'business', color: '#f97316',
    description: 'Can view listings, post jobs and respond to assigned requests.',
    members: 18, isSystem: false,
    permissions: (() => {
      const p = emptyPerms()
      p.dashboard_view = true
      p.listings_view = true
      p.jobs_view = true; p.jobs_create = true
      p.requests_view = true; p.requests_respond = true
      p.enquiries_view = true
      return p
    })(),
  },
  {
    id: 'ROLE008', name: 'Content Editor', type: 'business', color: '#ec4899',
    description: 'Manages all content — blogs and events — for the business profile.',
    members: 9, isSystem: false,
    permissions: (() => {
      const p = emptyPerms()
      p.dashboard_view = true
      p.listings_view = true
      p.events_view = true; p.events_create = true; p.events_edit = true; p.events_delete = true
      p.blogs_view = true; p.blogs_create = true; p.blogs_edit = true; p.blogs_delete = true; p.blogs_publish = true
      return p
    })(),
  },
]

// ── Permission Matrix ──────────────────────────────────────────────────────────
const PermissionMatrix = ({ permissions, onChange, readOnly = false }) => {
  const moduleStatus = mod => {
    const total   = mod.actions.length
    const enabled = mod.actions.filter(a => permissions[`${mod.key}_${a}`]).length
    if (enabled === 0)     return 'none'
    if (enabled === total) return 'all'
    return 'partial'
  }

  const toggleModule = mod => {
    if (readOnly) return
    const all = mod.actions.every(a => permissions[`${mod.key}_${a}`])
    const p = { ...permissions }
    mod.actions.forEach(a => { p[`${mod.key}_${a}`] = !all })
    onChange(p)
  }

  const togglePerm = key => {
    if (readOnly) return
    onChange({ ...permissions, [key]: !permissions[key] })
  }

  return (
    <div className="rp-matrix">
      {MODULES.map(mod => {
        const status = moduleStatus(mod)
        return (
          <div key={mod.key} className="rp-matrix-row">
            <div className="rp-matrix-left">
              <label className="rp-all-check" title="Toggle all">
                <input
                  type="checkbox"
                  checked={status === 'all'}
                  onChange={() => toggleModule(mod)}
                  disabled={readOnly}
                  ref={el => { if (el) el.indeterminate = status === 'partial' }}
                />
              </label>
              <span className="rp-module-name">{mod.label}</span>
            </div>
            <div className="rp-matrix-pills">
              {mod.actions.map(action => {
                const key     = `${mod.key}_${action}`
                const enabled = permissions[key]
                const clr     = ACTION_COLORS[action] || ACTION_COLORS.view
                return (
                  <button
                    key={action}
                    type="button"
                    disabled={readOnly}
                    className={`rp-perm-pill ${enabled ? 'rp-perm-pill--on' : ''} ${readOnly ? 'rp-perm-pill--ro' : ''}`}
                    style={enabled ? { background: clr.bg, color: clr.color, borderColor: clr.color + '40' } : {}}
                    onClick={() => togglePerm(key)}
                  >
                    {enabled
                      ? <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    }
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Role Card ──────────────────────────────────────────────────────────────────
const RoleCard = ({ role, onManage, onEdit, onDelete }) => {
  const [confirmDel, setConfirmDel] = useState(false)
  const count = countPerms(role.permissions)
  const total = totalPerms()
  const pct   = Math.round((count / total) * 100)

  return (
    <div className="rp-card">
      <div className="rp-card__bar" style={{ background: role.color }} />

      <div className="rp-card__head">
        <div className="rp-card__avatar" style={{ background: role.color + '20', color: role.color }}>
          {role.name.charAt(0)}
        </div>
        <div className="rp-card__meta">
          <h6 className="rp-card__name">{role.name}</h6>
          <span className={`rp-card__typetag rp-card__typetag--${role.type}`}>
            {role.type === 'user' ? 'User Role' : 'Business Role'}
          </span>
        </div>
        {role.isSystem && <span className="rp-card__sys">System</span>}
      </div>

      <p className="rp-card__desc">{role.description}</p>

      <div className="rp-card__stats">
        <div className="rp-card__stat">
          <span className="rp-card__stat-n">{role.members}</span>
          <span className="rp-card__stat-l">Members</span>
        </div>
        <div className="rp-card__stat">
          <span className="rp-card__stat-n">{count}</span>
          <span className="rp-card__stat-l">Permissions</span>
        </div>
        <div className="rp-card__stat">
          <span className="rp-card__stat-n">{pct}%</span>
          <span className="rp-card__stat-l">Access</span>
        </div>
      </div>

      <div className="rp-progress">
        <div className="rp-progress__fill" style={{ width: `${pct}%`, background: role.color }} />
      </div>

      <div className="rp-card__foot">
        <button className="rp-manage-btn" style={{ '--c': role.color }} onClick={onManage}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          View Permissions
        </button>

        <button className="rp-edit-icon-btn" title="Edit permissions" onClick={onEdit}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {!role.isSystem && (
          confirmDel ? (
            <div className="rp-confirm-del">
              <span>Delete?</span>
              <button className="rp-confirm-yes" onClick={onDelete}>Yes</button>
              <button className="rp-confirm-no"  onClick={() => setConfirmDel(false)}>No</button>
            </div>
          ) : (
            <button className="rp-del-btn" title="Delete role" onClick={() => setConfirmDel(true)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )
        )}
      </div>
    </div>
  )
}

// ── Permissions Modal ──────────────────────────────────────────────────────────
const PermissionsModal = ({ role, onClose, onSave, initialEdit = false }) => {
  const [editing, setEditing] = useState(initialEdit)
  const [perms,   setPerms]   = useState({ ...role.permissions })

  const count = countPerms(editing ? perms : role.permissions)

  const handleSave = () => {
    onSave(role.id, perms)
    setEditing(false)
  }
  const handleCancel = () => {
    setPerms({ ...role.permissions })
    setEditing(false)
  }

  return (
    <div className="rp-overlay" onClick={onClose}>
      <div className="rp-modal" onClick={e => e.stopPropagation()}>

        <div className="rp-modal__hdr">
          <div className="d-flex align-items-center gap-3">
            <div className="rp-modal__dot" style={{ background: role.color }} />
            <div>
              <h5 className="rp-modal__title">{role.name}</h5>
              <p className="rp-modal__sub">
                {role.type === 'user' ? 'User Role' : 'Business Role'}
                &nbsp;·&nbsp;
                <strong>{count}</strong> of <strong>{totalPerms()}</strong> permissions enabled
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            {!editing && (
              <button className="rp-edit-btn" onClick={() => setEditing(true)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit Permissions
              </button>
            )}
            <button className="rp-close-btn" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {editing && (
          <div className="rp-modal__toolbar">
            <span className="rp-toolbar-label">Quick set:</span>
            <button className="rp-qset-btn" onClick={() => setPerms(allPerms())}>Enable All</button>
            <button className="rp-qset-btn" onClick={() => setPerms(viewOnlyPerms())}>View Only</button>
            <button className="rp-qset-btn rp-qset-btn--clear" onClick={() => setPerms(emptyPerms())}>Clear All</button>
          </div>
        )}

        <div className="rp-modal__body">
          <PermissionMatrix
            permissions={editing ? perms : role.permissions}
            onChange={setPerms}
            readOnly={!editing}
          />
        </div>

        <div className="rp-modal__ftr">
          {editing ? (
            <>
              <button className="rp-btn rp-btn--ghost"   onClick={handleCancel}>Cancel</button>
              <button className="rp-btn rp-btn--primary" onClick={handleSave}>Save Changes</button>
            </>
          ) : (
            <button className="rp-btn rp-btn--ghost" onClick={onClose}>Close</button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Create Role Modal ──────────────────────────────────────────────────────────
const ROLE_COLORS = ['#e42929','#3b82f6','#8b5cf6','#10b981','#f59e0b','#14b8a6','#f97316','#ec4899','#6366f1','#0ea5e9']

const CreateRoleModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: '', description: '', type: 'user', color: ROLE_COLORS[2],
    permissions: emptyPerms(),
  })
  const [errors, setErrors] = useState({})

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Role name is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCreate = () => {
    if (!validate()) return
    onCreate({
      id: `ROLE${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim() || 'Custom role.',
      type: form.type,
      color: form.color,
      members: 0,
      isSystem: false,
      permissions: form.permissions,
    })
    onClose()
  }

  return (
    <div className="rp-overlay" onClick={onClose}>
      <div className="rp-modal rp-modal--create" onClick={e => e.stopPropagation()}>

        <div className="rp-modal__hdr">
          <h5 className="rp-modal__title">Create New Role</h5>
          <button className="rp-close-btn" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="rp-modal__body">

          {/* ── Role Details ── */}
          <div className="rp-form-section">
            <p className="rp-form-section__title">Role Details</p>

            <div className="rp-form-row">
              <div className="rp-form-group" style={{ flex: 1 }}>
                <label className="rp-label">Role Name <span className="rp-required">*</span></label>
                <input
                  className={`rp-input ${errors.name ? 'rp-input--error' : ''}`}
                  placeholder="e.g. Content Manager"
                  value={form.name}
                  onChange={e => { set('name', e.target.value); setErrors({}) }}
                />
                {errors.name && <span className="rp-error-msg">{errors.name}</span>}
              </div>
            </div>

            <div className="rp-form-group">
              <label className="rp-label">Description</label>
              <textarea
                className="rp-textarea"
                rows={2}
                placeholder="Briefly describe this role's responsibilities…"
                value={form.description}
                onChange={e => set('description', e.target.value)}
              />
            </div>

            <div className="rp-form-row rp-form-row--spread">
              <div className="rp-form-group">
                <label className="rp-label">Role Type</label>
                <div className="rp-type-tabs">
                  <button
                    type="button"
                    className={`rp-type-tab ${form.type === 'user' ? 'rp-type-tab--active' : ''}`}
                    onClick={() => set('type', 'user')}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    User Role
                  </button>
                  <button
                    type="button"
                    className={`rp-type-tab ${form.type === 'business' ? 'rp-type-tab--active' : ''}`}
                    onClick={() => set('type', 'business')}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M3 21h18M3 7h18M6 7V4h12v3M9 21V11m6 10V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Business Role
                  </button>
                </div>
              </div>

              <div className="rp-form-group">
                <label className="rp-label">Role Colour</label>
                <div className="rp-color-swatches">
                  {ROLE_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`rp-swatch ${form.color === c ? 'rp-swatch--active' : ''}`}
                      style={{ background: c }}
                      onClick={() => set('color', c)}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Permissions ── */}
          <div className="rp-form-section">
            <div className="rp-perm-header">
              <p className="rp-form-section__title">Permissions</p>
              <div className="rp-qset-row">
                <button className="rp-qset-btn" onClick={() => set('permissions', allPerms())}>Enable All</button>
                <button className="rp-qset-btn" onClick={() => set('permissions', viewOnlyPerms())}>View Only</button>
                <button className="rp-qset-btn rp-qset-btn--clear" onClick={() => set('permissions', emptyPerms())}>Clear All</button>
              </div>
            </div>
            <PermissionMatrix
              permissions={form.permissions}
              onChange={p => set('permissions', p)}
              readOnly={false}
            />
          </div>

        </div>

        <div className="rp-modal__ftr">
          <button className="rp-btn rp-btn--ghost"   onClick={onClose}>Cancel</button>
          <button
            className="rp-btn rp-btn--primary"
            onClick={handleCreate}
            disabled={!form.name.trim()}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            Create Role
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
const Rolespermissions = () => {
  const [roles,       setRoles]       = useState(SEED_ROLES)
  const [tab,         setTab]         = useState('user')
  const [viewRole,    setViewRole]    = useState(null)
  const [editMode,    setEditMode]    = useState(false)
  const [showCreate,  setShowCreate]  = useState(false)

  const userRoles = roles.filter(r => r.type === 'user')
  const bizRoles  = roles.filter(r => r.type === 'business')
  const displayed = tab === 'user' ? userRoles : bizRoles

  const handleSavePerms = (id, newPerms) => {
    setRoles(prev => prev.map(r => r.id === id ? { ...r, permissions: newPerms } : r))
  }
  const handleCreate = newRole => setRoles(prev => [...prev, newRole])
  const handleDelete = id => {
    setRoles(prev => prev.filter(r => r.id !== id))
    if (viewRole?.id === id) setViewRole(null)
  }

  const openView = role => { setViewRole(role); setEditMode(false) }
  const openEdit = role => { setViewRole(role); setEditMode(true)  }

  const liveViewRole = viewRole ? roles.find(r => r.id === viewRole.id) : null

  return (
    <div className="rp-page">

      {/* Header */}
      <div className="rp-page-hdr mb-4">
        <div>
          <h4 className="rp-page-title">Roles &amp; Permissions</h4>
          <p className="rp-page-sub">Manage access levels for User and Business accounts</p>
        </div>
        <button className="rp-create-btn" onClick={() => setShowCreate(true)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Create New Role
        </button>
      </div>

      {/* Tabs */}
      <div className="rp-tabs mb-4">
        <button
          className={`rp-tab ${tab === 'user' ? 'rp-tab--active' : ''}`}
          onClick={() => setTab('user')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          </svg>
          User Roles
          <span className="rp-tab-pill">{userRoles.length}</span>
        </button>
        <button
          className={`rp-tab ${tab === 'business' ? 'rp-tab--active' : ''}`}
          onClick={() => setTab('business')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 21h18M3 7h18M6 7V4h12v3M9 21V11m6 10V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Business Roles
          <span className="rp-tab-pill">{bizRoles.length}</span>
        </button>
      </div>

      {/* Role cards */}
      <div className="rp-grid">
        {displayed.map(role => (
          <RoleCard
            key={role.id}
            role={role}
            onManage={() => openView(role)}
            onEdit={() => openEdit(role)}
            onDelete={() => handleDelete(role.id)}
          />
        ))}
      </div>

      {/* Permissions modal */}
      {liveViewRole && (
        <PermissionsModal
          role={liveViewRole}
          onClose={() => { setViewRole(null); setEditMode(false) }}
          onSave={handleSavePerms}
          initialEdit={editMode}
        />
      )}

      {/* Create modal */}
      {showCreate && (
        <CreateRoleModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  )
}

export default Rolespermissions
