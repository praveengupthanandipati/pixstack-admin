import React from 'react'
import '../styles/Footer.scss'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <div className="footer-left">
        <span className="footer-copy">
          &copy; {year} <strong>Pixstack</strong>. All rights reserved.
        </span>
        <span className="footer-sep">·</span>
        <span className="footer-version">v1.0.0</span>
      </div>

      <div className="footer-right">
        <a href="#" className="footer-link">Privacy Policy</a>
        <span className="footer-sep">·</span>
        <a href="#" className="footer-link">Terms of Use</a>
        <span className="footer-sep">·</span>
        <a href="#" className="footer-link">Support</a>
      </div>
    </footer>
  )
}

export default Footer
