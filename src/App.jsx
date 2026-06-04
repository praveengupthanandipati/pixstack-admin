import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/App.scss'
import Header from './components/Header'
import Asidenav from './components/Asidenav'
import Footer from './components/Footer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'

// Admin shell — sidebar + header + content
const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Asidenav open={sidebarOpen} />
      <div className="d-flex flex-column" style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <Header sidebarOpen={sidebarOpen} onMenuToggle={() => setSidebarOpen(prev => !prev)} />
        <main className="flex-grow-1 overflow-auto p-4 bg-light">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Full-page login — no sidebar/header */}
        <Route path="/login" element={<Login />} />

        {/* Admin shell routes */}
        <Route path="/dashboard" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />
        <Route path="/users" element={
          <AdminLayout>
            <Users />
          </AdminLayout>
        } />       
      </Routes>
    </Router>
  )
}

export default App
