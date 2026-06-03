import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/App.scss'
import Header from './components/Header'
import Asidenav from './components/Asidenav'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Router>
      <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>

        {/* ── Left sidebar — 20% ── */}
        <Asidenav open={sidebarOpen} />

        {/* ── Right panel — fills remaining 80% ── */}
        <div className="d-flex flex-column" style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <Header sidebarOpen={sidebarOpen} onMenuToggle={() => setSidebarOpen(prev => !prev)} />
          <main className="flex-grow-1 overflow-auto p-4 bg-light">
            <Routes>
              <Route path="/" element={<div className="text-muted">Dashboard</div>} />
              <Route path="/users" element={<div className="text-muted">Users</div>} />
              <Route path="/business-users/*" element={<div className="text-muted">Business Users</div>} />
              <Route path="/texting-records/*" element={<div className="text-muted">Texting Records</div>} />
            </Routes>
          </main>
        </div>

      </div>
    </Router>
  )
}

export default App
