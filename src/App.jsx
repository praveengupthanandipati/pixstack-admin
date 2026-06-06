import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/App.scss'
import Header from './components/Header'
import Asidenav from './components/Asidenav'
import Footer from './components/Footer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Listingpartners from './pages/Listingpartners'
import Listingdetail from './pages/Listingdetail'
import Events from './pages/Events'
import Blogs from './pages/Blogs'
import Subscribers from './pages/Subscribers'
import Enquiries from './pages/Enquiries'
import Requests from './pages/Requests'
import Jobs from './pages/Jobs'
import Rolespermissions from './pages/Rolespermissions'
import Settings from './pages/Settings'
import Categories from './pages/masters/Categories'
import Locations from './pages/masters/Locations'
import Skills from './pages/masters/Skills'
import Eventsmaster from './pages/masters/Eventsmaster';
import Servicetype from './pages/masters/Servicetype';

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
        {/* Root → dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
        <Route path="/partners" element={
          <AdminLayout>
            <Listingpartners />
          </AdminLayout>
        } />
        <Route path="/partners/:id" element={
          <AdminLayout>
            <Listingdetail />
          </AdminLayout>
        } />
        <Route path="/events" element={
          <AdminLayout>
            <Events />
          </AdminLayout>
        } />
        <Route path="/blogs" element={
          <AdminLayout>
            <Blogs />
          </AdminLayout>
        } />
        <Route path="/subscribers" element={
          <AdminLayout>
            <Subscribers />
          </AdminLayout>
        } />
        <Route path="/enquiries" element={
          <AdminLayout>
            <Enquiries />
          </AdminLayout>
        } />
        <Route path="/requests" element={
          <AdminLayout>
            <Requests />
          </AdminLayout>
        } />
        <Route path="/jobs" element={
          <AdminLayout>
            <Jobs />
          </AdminLayout>
        } />
        <Route path="/roles-permissions" element={
          <AdminLayout>
            <Rolespermissions />
          </AdminLayout>
        } />
        <Route path="/settings" element={
          <AdminLayout>
            <Settings />
          </AdminLayout>
        } />

        {/* Redirect old /categories route to new location */}
        <Route path="/categories" element={<Navigate to="/masters/categories" replace />} />

        {/* Masters — specific routes first, then wildcard */}
        <Route path="/masters/categories" element={
          <AdminLayout>
            <Categories />
          </AdminLayout>
        } />
        <Route path="/masters/locations" element={
          <AdminLayout>
            <Locations />
          </AdminLayout>
        } />
        <Route path="/masters/skills" element={
          <AdminLayout>
            <Skills />
          </AdminLayout>
        } />
        <Route path="/masters/events" element={
          <AdminLayout>
            <Events />
          </AdminLayout>
        } />
        <Route path="/masters/eventsmaster" element={
          <AdminLayout>
            <Eventsmaster />
          </AdminLayout>
        } />
        <Route path="/masters/servicetype" element={
          <AdminLayout>
            <Servicetype />
          </AdminLayout>
        } />

        {/* Catch-all → dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
