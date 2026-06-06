import React, { useState, useRef } from 'react'
import '../styles/Settings.scss'

// ── Reusable toggle ────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    className={`st-toggle ${checked ? 'st-toggle--on' : ''}`}
    onClick={() => onChange(!checked)}
  >
    <span className="st-toggle__thumb" />
  </button>
)

// ── Save button with brief "Saved!" feedback ───────────────────────────────────
const SaveBtn = ({ onSave }) => {
  const [saved, setSaved] = useState(false)
  const handle = () => {
    onSave()
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }
  return (
    <button type="button" className={`st-save-btn ${saved ? 'st-save-btn--saved' : ''}`} onClick={handle}>
      {saved ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Saved
        </>
      ) : 'Save Changes'}
    </button>
  )
}

// ── Section header ─────────────────────────────────────────────────────────────
const SectionHeader = ({ title, desc }) => (
  <div className="st-section-hdr">
    <h6 className="st-section-title">{title}</h6>
    {desc && <p className="st-section-desc">{desc}</p>}
  </div>
)

// ── Field row (label + control) ────────────────────────────────────────────────
const FieldRow = ({ label, sub, children }) => (
  <div className="st-field-row">
    <div className="st-field-label-wrap">
      <span className="st-field-label">{label}</span>
      {sub && <span className="st-field-sub">{sub}</span>}
    </div>
    <div className="st-field-control">{children}</div>
  </div>
)

// ── Toggle row ─────────────────────────────────────────────────────────────────
const ToggleRow = ({ label, sub, checked, onChange }) => (
  <div className="st-field-row">
    <div className="st-field-label-wrap">
      <span className="st-field-label">{label}</span>
      {sub && <span className="st-field-sub">{sub}</span>}
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
//  SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

// 1. General ──────────────────────────────────────────────────────────────────
const GeneralSection = () => {
  const [form, setForm] = useState({
    siteName:    'Pixstack Admin',
    tagline:     'Photography & Studio Management Platform',
    siteUrl:     'https://pixstack.in',
    adminEmail:  'admin@pixstack.in',
    supportEmail:'support@pixstack.in',
    timezone:    'Asia/Kolkata',
    dateFormat:  'DD MMM YYYY',
    language:    'en',
    maintenance: false,
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="st-section">
      <SectionHeader title="General Settings" desc="Basic platform identity and regional configuration." />

      <div className="st-card">
        <div className="st-card-group">
          <p className="st-group-label">Platform Identity</p>
          <FieldRow label="Platform Name" sub="Shown in the browser tab and emails">
            <input className="st-input" value={form.siteName} onChange={e => set('siteName', e.target.value)} />
          </FieldRow>
          <FieldRow label="Tagline" sub="Short description of your platform">
            <input className="st-input" value={form.tagline} onChange={e => set('tagline', e.target.value)} />
          </FieldRow>
          <FieldRow label="Platform URL" sub="Primary public URL">
            <input className="st-input" value={form.siteUrl} onChange={e => set('siteUrl', e.target.value)} />
          </FieldRow>
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">Contact</p>
          <FieldRow label="Admin Email" sub="Used for critical system alerts">
            <input className="st-input" type="email" value={form.adminEmail} onChange={e => set('adminEmail', e.target.value)} />
          </FieldRow>
          <FieldRow label="Support Email" sub="Shown to users in help pages">
            <input className="st-input" type="email" value={form.supportEmail} onChange={e => set('supportEmail', e.target.value)} />
          </FieldRow>
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">Localisation</p>
          <FieldRow label="Timezone">
            <select className="st-select" value={form.timezone} onChange={e => set('timezone', e.target.value)}>
              <option value="Asia/Kolkata">Asia/Kolkata (IST, UTC+5:30)</option>
              <option value="Asia/Dubai">Asia/Dubai (GST, UTC+4)</option>
              <option value="Europe/London">Europe/London (GMT, UTC+0)</option>
              <option value="America/New_York">America/New_York (EST, UTC-5)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST, UTC-8)</option>
            </select>
          </FieldRow>
          <FieldRow label="Date Format">
            <select className="st-select" value={form.dateFormat} onChange={e => set('dateFormat', e.target.value)}>
              <option value="DD MMM YYYY">DD MMM YYYY — 06 Jun 2026</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY — 06/06/2026</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY — 06/06/2026</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD — 2026-06-06</option>
            </select>
          </FieldRow>
          <FieldRow label="Language">
            <select className="st-select" value={form.language} onChange={e => set('language', e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
            </select>
          </FieldRow>
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">Maintenance</p>
          <ToggleRow
            label="Maintenance Mode"
            sub="Puts the site in read-only mode for non-admin users"
            checked={form.maintenance}
            onChange={v => set('maintenance', v)}
          />
        </div>
      </div>

      <div className="st-footer"><SaveBtn onSave={() => {}} /></div>
    </div>
  )
}

// 2. Profile ───────────────────────────────────────────────────────────────────
const ProfileSection = () => {
  const [form, setForm] = useState({
    name:     'Super Admin',
    email:    'admin@pixstack.in',
    phone:    '+91 98001 00000',
    bio:      'Platform administrator for Pixstack.',
    avatar:   'A',
  })
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [pwErr, setPwErr]   = useState('')
  const set   = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setPw = (k, v) => setPwForm(f => ({ ...f, [k]: v }))

  const handlePwSave = () => {
    if (!pwForm.current)             return setPwErr('Enter your current password')
    if (pwForm.newPw.length < 8)     return setPwErr('New password must be at least 8 characters')
    if (pwForm.newPw !== pwForm.confirm) return setPwErr('Passwords do not match')
    setPwErr('')
    setPwForm({ current: '', newPw: '', confirm: '' })
  }

  return (
    <div className="st-section">
      <SectionHeader title="My Profile" desc="Manage your admin account details and password." />

      <div className="st-card">
        <div className="st-card-group">
          <p className="st-group-label">Account Details</p>
          <div className="st-avatar-row">
            <div className="st-avatar">{form.avatar}</div>
            <div>
              <p className="st-avatar-name">{form.name}</p>
              <p className="st-avatar-role">Super Admin</p>
            </div>
          </div>
          <FieldRow label="Full Name">
            <input className="st-input" value={form.name} onChange={e => set('name', e.target.value)} />
          </FieldRow>
          <FieldRow label="Email Address">
            <input className="st-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </FieldRow>
          <FieldRow label="Phone Number">
            <input className="st-input" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </FieldRow>
          <FieldRow label="Bio" sub="Short description shown on your profile">
            <textarea className="st-textarea" rows={2} value={form.bio} onChange={e => set('bio', e.target.value)} />
          </FieldRow>
        </div>
      </div>
      <div className="st-footer"><SaveBtn onSave={() => {}} /></div>

      <div className="st-card mt-3">
        <div className="st-card-group">
          <div className="st-pw-header">
            <div>
              <p className="st-group-label" style={{ margin: 0 }}>Change Password</p>
              <span className="st-field-sub">Update your account password</span>
            </div>
            <button className="st-ghost-btn" onClick={() => { setShowPw(s => !s); setPwErr('') }}>
              {showPw ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPw && (
            <div className="st-pw-form mt-3">
              {pwErr && <p className="st-pw-err">{pwErr}</p>}
              <FieldRow label="Current Password">
                <input className="st-input" type="password" placeholder="••••••••" value={pwForm.current} onChange={e => setPw('current', e.target.value)} />
              </FieldRow>
              <FieldRow label="New Password" sub="Minimum 8 characters">
                <input className="st-input" type="password" placeholder="••••••••" value={pwForm.newPw} onChange={e => setPw('newPw', e.target.value)} />
              </FieldRow>
              <FieldRow label="Confirm New Password">
                <input className="st-input" type="password" placeholder="••••••••" value={pwForm.confirm} onChange={e => setPw('confirm', e.target.value)} />
              </FieldRow>
              <div className="st-footer"><SaveBtn onSave={handlePwSave} /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 3. Notifications ─────────────────────────────────────────────────────────────
const NotificationsSection = () => {
  const [email, setEmail] = useState({
    newUser:       true,
    newPartner:    true,
    partnerApprove:true,
    newEnquiry:    true,
    newRequest:    true,
    newJob:        false,
    newBlog:       false,
    newSubscriber: true,
    systemAlert:   true,
    weeklyReport:  false,
  })
  const [push, setPush] = useState({
    newEnquiry:  true,
    newRequest:  true,
    systemAlert: true,
  })
  const setE = (k, v) => setEmail(f => ({ ...f, [k]: v }))
  const setP = (k, v) => setPush(f => ({ ...f, [k]: v }))

  return (
    <div className="st-section">
      <SectionHeader title="Notifications" desc="Choose which events trigger email and push notifications." />

      <div className="st-card">
        <div className="st-card-group">
          <p className="st-group-label">Email Notifications</p>
          <ToggleRow label="New User Registration"       sub="Notify when a new user signs up"                  checked={email.newUser}        onChange={v => setE('newUser', v)} />
          <ToggleRow label="New Partner Registration"    sub="Notify when a business registers"                 checked={email.newPartner}     onChange={v => setE('newPartner', v)} />
          <ToggleRow label="Partner Approved / Rejected" sub="Notify on partner review decisions"               checked={email.partnerApprove} onChange={v => setE('partnerApprove', v)} />
          <ToggleRow label="New Enquiry Received"        sub="Notify when an enquiry is submitted"              checked={email.newEnquiry}     onChange={v => setE('newEnquiry', v)} />
          <ToggleRow label="New Request Received"        sub="Notify when a photography request is submitted"   checked={email.newRequest}     onChange={v => setE('newRequest', v)} />
          <ToggleRow label="New Job Posted"              sub="Notify when a business posts a job"               checked={email.newJob}         onChange={v => setE('newJob', v)} />
          <ToggleRow label="New Blog Published"          sub="Notify when a blog post goes live"                checked={email.newBlog}        onChange={v => setE('newBlog', v)} />
          <ToggleRow label="New Subscriber"              sub="Notify on newsletter signups"                     checked={email.newSubscriber}  onChange={v => setE('newSubscriber', v)} />
          <ToggleRow label="System Alerts"               sub="Critical errors and security warnings"            checked={email.systemAlert}    onChange={v => setE('systemAlert', v)} />
          <ToggleRow label="Weekly Summary Report"       sub="Weekly digest of platform activity"               checked={email.weeklyReport}   onChange={v => setE('weeklyReport', v)} />
        </div>
      </div>

      <div className="st-card mt-3">
        <div className="st-card-group">
          <p className="st-group-label">In-App / Push Notifications</p>
          <ToggleRow label="New Enquiry"   sub="Show in-app badge for new enquiries" checked={push.newEnquiry}  onChange={v => setP('newEnquiry', v)} />
          <ToggleRow label="New Request"   sub="Show in-app badge for new requests"  checked={push.newRequest}  onChange={v => setP('newRequest', v)} />
          <ToggleRow label="System Alerts" sub="Show critical warnings in the UI"    checked={push.systemAlert} onChange={v => setP('systemAlert', v)} />
        </div>
      </div>

      <div className="st-footer"><SaveBtn onSave={() => {}} /></div>
    </div>
  )
}

// 4. Security ──────────────────────────────────────────────────────────────────
const SecuritySection = () => {
  const [form, setForm] = useState({
    sessionTimeout:  '60',
    maxLoginAttempts:'5',
    lockoutDuration: '15',
    twoFactor:       false,
    forceHttps:      true,
    loginAlerts:     true,
    minPasswordLen:  '8',
    requireUppercase:true,
    requireNumber:   true,
    requireSymbol:   false,
    ipWhitelist:     '',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="st-section">
      <SectionHeader title="Security" desc="Configure authentication, session rules and password policies." />

      <div className="st-card">
        <div className="st-card-group">
          <p className="st-group-label">Session & Login</p>
          <FieldRow label="Session Timeout" sub="Auto-logout after inactivity">
            <select className="st-select st-select--sm" value={form.sessionTimeout} onChange={e => set('sessionTimeout', e.target.value)}>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="240">4 hours</option>
              <option value="480">8 hours</option>
              <option value="1440">24 hours</option>
            </select>
          </FieldRow>
          <FieldRow label="Max Login Attempts" sub="Before account is temporarily locked">
            <select className="st-select st-select--sm" value={form.maxLoginAttempts} onChange={e => set('maxLoginAttempts', e.target.value)}>
              <option value="3">3 attempts</option>
              <option value="5">5 attempts</option>
              <option value="10">10 attempts</option>
            </select>
          </FieldRow>
          <FieldRow label="Lockout Duration" sub="Minutes account stays locked after failed attempts">
            <select className="st-select st-select--sm" value={form.lockoutDuration} onChange={e => set('lockoutDuration', e.target.value)}>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </FieldRow>
          <ToggleRow label="Two-Factor Authentication" sub="Require OTP for admin logins"          checked={form.twoFactor}   onChange={v => set('twoFactor', v)} />
          <ToggleRow label="Login Activity Alerts"     sub="Email on new device or location login" checked={form.loginAlerts} onChange={v => set('loginAlerts', v)} />
          <ToggleRow label="Force HTTPS"               sub="Redirect all HTTP requests to HTTPS"   checked={form.forceHttps}  onChange={v => set('forceHttps', v)} />
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">Password Policy</p>
          <FieldRow label="Minimum Length">
            <select className="st-select st-select--sm" value={form.minPasswordLen} onChange={e => set('minPasswordLen', e.target.value)}>
              {['6','8','10','12','16'].map(n => <option key={n} value={n}>{n} characters</option>)}
            </select>
          </FieldRow>
          <ToggleRow label="Require Uppercase Letter" sub="At least one A–Z character"     checked={form.requireUppercase} onChange={v => set('requireUppercase', v)} />
          <ToggleRow label="Require Number"           sub="At least one 0–9 digit"         checked={form.requireNumber}    onChange={v => set('requireNumber', v)} />
          <ToggleRow label="Require Special Character" sub="At least one !@#$%^&* symbol"  checked={form.requireSymbol}    onChange={v => set('requireSymbol', v)} />
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">IP Restrictions</p>
          <FieldRow label="Admin IP Whitelist" sub="Comma-separated IPs. Leave blank to allow all.">
            <input className="st-input" placeholder="e.g. 192.168.1.1, 203.0.113.0" value={form.ipWhitelist} onChange={e => set('ipWhitelist', e.target.value)} />
          </FieldRow>
        </div>
      </div>

      <div className="st-footer"><SaveBtn onSave={() => {}} /></div>
    </div>
  )
}

// 5. Appearance ────────────────────────────────────────────────────────────────
const THEME_COLORS = [
  { label: 'Red',    value: '#e42929' },
  { label: 'Blue',   value: '#3b82f6' },
  { label: 'Purple', value: '#8b5cf6' },
  { label: 'Green',  value: '#10b981' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Pink',   value: '#ec4899' },
  { label: 'Teal',   value: '#14b8a6' },
  { label: 'Indigo', value: '#6366f1' },
]

const AppearanceSection = () => {
  const [form, setForm] = useState({
    primaryColor:   '#e42929',
    darkMode:       false,
    compactSidebar: false,
    tableDensity:   'comfortable',
    sidebarPosition:'left',
    showFooter:     true,
    animationsOn:   true,
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="st-section">
      <SectionHeader title="Appearance" desc="Customise the look and feel of the admin panel." />

      <div className="st-card">
        <div className="st-card-group">
          <p className="st-group-label">Theme Colour</p>
          <FieldRow label="Primary Colour" sub="Used for buttons, links and highlights">
            <div className="st-color-row">
              {THEME_COLORS.map(c => (
                <button
                  key={c.value}
                  type="button"
                  title={c.label}
                  className={`st-color-swatch ${form.primaryColor === c.value ? 'st-color-swatch--active' : ''}`}
                  style={{ background: c.value }}
                  onClick={() => set('primaryColor', c.value)}
                />
              ))}
            </div>
          </FieldRow>
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">Layout</p>
          <ToggleRow label="Dark Mode"       sub="Switch to a dark colour scheme"          checked={form.darkMode}       onChange={v => set('darkMode', v)} />
          <ToggleRow label="Compact Sidebar" sub="Reduce sidebar width to icon-only"       checked={form.compactSidebar} onChange={v => set('compactSidebar', v)} />
          <ToggleRow label="Show Footer"     sub="Display the footer bar in the admin shell" checked={form.showFooter}   onChange={v => set('showFooter', v)} />
          <ToggleRow label="UI Animations"   sub="Enable transitions and motion effects"   checked={form.animationsOn}   onChange={v => set('animationsOn', v)} />
          <FieldRow label="Table Density" sub="Row spacing in data tables">
            <div className="st-radio-group">
              {['comfortable', 'compact'].map(opt => (
                <label key={opt} className={`st-radio-opt ${form.tableDensity === opt ? 'st-radio-opt--active' : ''}`}>
                  <input type="radio" name="tableDensity" value={opt} checked={form.tableDensity === opt} onChange={() => set('tableDensity', opt)} />
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </label>
              ))}
            </div>
          </FieldRow>
        </div>
      </div>

      <div className="st-footer"><SaveBtn onSave={() => {}} /></div>
    </div>
  )
}

// 6. Content & Features ────────────────────────────────────────────────────────
const ContentSection = () => {
  const [modules, setModules] = useState({
    blogs:              true,
    events:             true,
    jobs:               true,
    requests:           true,
    enquiries:          true,
    subscribers:        true,
  })
  const [partner, setPartner] = useState({
    selfRegistration:   true,
    requireApproval:    true,
    allowListingEdit:   true,
    maxListingsPerBiz:  '5',
  })
  const [content, setContent] = useState({
    allowComments:      false,
    moderateComments:   true,
    maxBlogLength:      '5000',
    allowGuestEnquiry:  true,
  })
  const setM = (k, v) => setModules(f => ({ ...f, [k]: v }))
  const setP = (k, v) => setPartner(f => ({ ...f, [k]: v }))
  const setC = (k, v) => setContent(f => ({ ...f, [k]: v }))

  return (
    <div className="st-section">
      <SectionHeader title="Content & Features" desc="Enable or disable platform modules and content rules." />

      <div className="st-card">
        <div className="st-card-group">
          <p className="st-group-label">Platform Modules</p>
          <ToggleRow label="Blogs"       sub="Enable the blog publishing module"              checked={modules.blogs}       onChange={v => setM('blogs', v)} />
          <ToggleRow label="Events"      sub="Enable the events listing module"               checked={modules.events}      onChange={v => setM('events', v)} />
          <ToggleRow label="Jobs"        sub="Enable the job posting module"                  checked={modules.jobs}        onChange={v => setM('jobs', v)} />
          <ToggleRow label="Requests"    sub="Enable the photography request module"          checked={modules.requests}    onChange={v => setM('requests', v)} />
          <ToggleRow label="Enquiries"   sub="Enable the business enquiry module"             checked={modules.enquiries}   onChange={v => setM('enquiries', v)} />
          <ToggleRow label="Subscribers" sub="Enable the newsletter subscriber module"        checked={modules.subscribers} onChange={v => setM('subscribers', v)} />
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">Business Partners</p>
          <ToggleRow label="Allow Self-Registration"  sub="Let businesses register without admin invite"  checked={partner.selfRegistration} onChange={v => setP('selfRegistration', v)} />
          <ToggleRow label="Require Admin Approval"   sub="New partners need approval before going live"  checked={partner.requireApproval}  onChange={v => setP('requireApproval', v)} />
          <ToggleRow label="Allow Listing Self-Edit"  sub="Partners can edit their own listings"          checked={partner.allowListingEdit} onChange={v => setP('allowListingEdit', v)} />
          <FieldRow  label="Max Listings per Business" sub="0 = unlimited">
            <select className="st-select st-select--sm" value={partner.maxListingsPerBiz} onChange={e => setP('maxListingsPerBiz', e.target.value)}>
              {['1','2','3','5','10','0'].map(n => <option key={n} value={n}>{n === '0' ? 'Unlimited' : n}</option>)}
            </select>
          </FieldRow>
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">Content Rules</p>
          <ToggleRow label="Allow Blog Comments"    sub="Let users comment on blog posts"          checked={content.allowComments}    onChange={v => setC('allowComments', v)} />
          <ToggleRow label="Moderate Comments"      sub="Hold comments for review before publishing" checked={content.moderateComments} onChange={v => setC('moderateComments', v)} />
          <ToggleRow label="Allow Guest Enquiries"  sub="Non-logged-in users can send enquiries"   checked={content.allowGuestEnquiry} onChange={v => setC('allowGuestEnquiry', v)} />
          <FieldRow  label="Max Blog Post Length"   sub="Characters (0 = no limit)">
            <input className="st-input st-input--sm" type="number" min="0" value={content.maxBlogLength} onChange={e => setC('maxBlogLength', e.target.value)} />
          </FieldRow>
        </div>
      </div>

      <div className="st-footer"><SaveBtn onSave={() => {}} /></div>
    </div>
  )
}

// 7. Email / SMTP ──────────────────────────────────────────────────────────────
const EmailSection = () => {
  const [form, setForm] = useState({
    senderName:  'Pixstack Admin',
    senderEmail: 'noreply@pixstack.in',
    replyTo:     'support@pixstack.in',
    smtpHost:    'smtp.gmail.com',
    smtpPort:    '587',
    smtpUser:    '',
    smtpPass:    '',
    encryption:  'TLS',
    testEmail:   '',
  })
  const [testSent,  setTestSent]  = useState(false)
  const [showPass,  setShowPass]  = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleTest = () => {
    if (!form.testEmail) return
    setTestSent(true)
    setTimeout(() => setTestSent(false), 3000)
  }

  return (
    <div className="st-section">
      <SectionHeader title="Email / SMTP" desc="Configure outgoing email delivery for system notifications." />

      <div className="st-card">
        <div className="st-card-group">
          <p className="st-group-label">Sender Info</p>
          <FieldRow label="Sender Name" sub="Name shown in the From field">
            <input className="st-input" value={form.senderName} onChange={e => set('senderName', e.target.value)} />
          </FieldRow>
          <FieldRow label="Sender Email">
            <input className="st-input" type="email" value={form.senderEmail} onChange={e => set('senderEmail', e.target.value)} />
          </FieldRow>
          <FieldRow label="Reply-To Email">
            <input className="st-input" type="email" value={form.replyTo} onChange={e => set('replyTo', e.target.value)} />
          </FieldRow>
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">SMTP Configuration</p>
          <FieldRow label="SMTP Host">
            <input className="st-input" placeholder="smtp.example.com" value={form.smtpHost} onChange={e => set('smtpHost', e.target.value)} />
          </FieldRow>
          <FieldRow label="Port">
            <select className="st-select st-select--sm" value={form.smtpPort} onChange={e => set('smtpPort', e.target.value)}>
              <option value="25">25</option>
              <option value="465">465 (SSL)</option>
              <option value="587">587 (TLS)</option>
              <option value="2525">2525</option>
            </select>
          </FieldRow>
          <FieldRow label="Encryption">
            <div className="st-radio-group">
              {['None','SSL','TLS'].map(opt => (
                <label key={opt} className={`st-radio-opt ${form.encryption === opt ? 'st-radio-opt--active' : ''}`}>
                  <input type="radio" name="encryption" value={opt} checked={form.encryption === opt} onChange={() => set('encryption', opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </FieldRow>
          <FieldRow label="SMTP Username">
            <input className="st-input" placeholder="your@email.com" value={form.smtpUser} onChange={e => set('smtpUser', e.target.value)} />
          </FieldRow>
          <FieldRow label="SMTP Password">
            <div className="st-pass-wrap">
              <input
                className="st-input"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={form.smtpPass}
                onChange={e => set('smtpPass', e.target.value)}
              />
              <button type="button" className="st-pass-eye" onClick={() => setShowPass(s => !s)}>
                {showPass
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                }
              </button>
            </div>
          </FieldRow>
        </div>

        <div className="st-divider" />

        <div className="st-card-group">
          <p className="st-group-label">Test Connection</p>
          <FieldRow label="Send Test Email" sub="Enter an address to verify the SMTP settings">
            <div className="st-test-row">
              <input className="st-input" type="email" placeholder="test@example.com" value={form.testEmail} onChange={e => set('testEmail', e.target.value)} />
              <button
                type="button"
                className={`st-test-btn ${testSent ? 'st-test-btn--sent' : ''}`}
                onClick={handleTest}
                disabled={!form.testEmail}
              >
                {testSent ? 'Sent!' : 'Send Test'}
              </button>
            </div>
          </FieldRow>
        </div>
      </div>

      <div className="st-footer"><SaveBtn onSave={() => {}} /></div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  NAV ITEMS
// ─────────────────────────────────────────────────────────────────────────────
const NAV = [
  {
    id: 'general', label: 'General',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/></svg>,
  },
  {
    id: 'profile', label: 'Profile',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>,
  },
  {
    id: 'notifications', label: 'Notifications',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    id: 'security', label: 'Security',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    id: 'appearance', label: 'Appearance',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 2a10 10 0 0 1 0 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  },
  {
    id: 'content', label: 'Content & Features',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  },
  {
    id: 'email', label: 'Email / SMTP',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
]

const SECTION_MAP = {
  general:       <GeneralSection />,
  profile:       <ProfileSection />,
  notifications: <NotificationsSection />,
  security:      <SecuritySection />,
  appearance:    <AppearanceSection />,
  content:       <ContentSection />,
  email:         <EmailSection />,
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
const Settings = () => {
  const [active, setActive] = useState('general')
  const current = NAV.find(n => n.id === active)

  return (
    <div className="st-page">

      <div className="st-page-hdr mb-4">
        <div>
          <h4 className="st-page-title">Settings</h4>
          <p className="st-page-sub">Manage platform configuration and admin preferences</p>
        </div>
      </div>

      <div className="st-layout">

        {/* Left nav */}
        <nav className="st-nav">
          {NAV.map(n => (
            <button
              key={n.id}
              type="button"
              className={`st-nav-item ${active === n.id ? 'st-nav-item--active' : ''}`}
              onClick={() => setActive(n.id)}
            >
              <span className="st-nav-icon">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        {/* Content panel */}
        <div className="st-content">
          <div className="st-content-header">
            <span className="st-content-icon">{current.icon}</span>
            <h5 className="st-content-title">{current.label}</h5>
          </div>
          {SECTION_MAP[active]}
        </div>

      </div>
    </div>
  )
}

export default Settings
