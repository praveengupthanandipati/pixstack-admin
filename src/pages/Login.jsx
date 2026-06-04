import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import '../styles/Login.scss'

const EyeIcon = ({ off }) =>
  off ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )

const DEFAULT_EMAIL    = 'admin@pixstack.com'
const DEFAULT_PASSWORD = 'Admin@123'

const Login = () => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
        navigate('/')
      } else {
        setError('Invalid email or password.')
      }
    }, 1200)
  }

  return (
    <div className="login-page">

      {/* ── Left panel ── */}
      <div className="login-left">
        <div className="login-left__inner">
          <div className="login-brand">
            <img src={logo} alt="Pixstack" className="login-logo" />
          </div>
          <h2 className="login-tagline">Welcome back,<br />Admin</h2>
          <p className="login-sub">Manage your platform, users and business accounts from one place.</p>

          <div className="login-decoration">
            <div className="deco-circle deco-circle--lg" />
            <div className="deco-circle deco-circle--sm" />
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="login-right">
        <div className="login-card">

          <div className="login-card__header">
            <h1 className="login-title">Sign in</h1>
            <p className="login-hint">Use your admin credentials to continue</p>
          </div>

          {/* Default credentials hint */}
          <div className="login-credentials-hint">
            <div className="hint-rows">
              <div className="hint-row">
                <span className="hint-key">Email</span>
                <span className="hint-val">{DEFAULT_EMAIL}</span>
              </div>
              <div className="hint-divider" />
              <div className="hint-row">
                <span className="hint-key">Password</span>
                <span className="hint-val">{DEFAULT_PASSWORD}</span>
              </div>
            </div>
            <button
              type="button"
              className="hint-fill-btn"
              onClick={() => { setEmail(DEFAULT_EMAIL); setPassword(DEFAULT_PASSWORD) }}
            >
              Use defaults
            </button>
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3 mb-3" role="alert" style={{ fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="login-field mb-3">
              <label htmlFor="email" className="login-label">Email address</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  className="login-input"
                  placeholder="admin@pixstack.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field mb-3">
              <label htmlFor="password" className="login-label">Password</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPwd(s => !s)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon off={showPwd} />
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="login-row mb-4">
              <label className="login-check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>             
            </div>

            {/* Submit */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Signing in…
                </>
              ) : 'Sign in'}
            </button>

          </form>

          <p className="login-footer">
            &copy; {new Date().getFullYear()} Pixstack. All rights reserved.
          </p>
        </div>
      </div>

    </div>
  )
}

export default Login
