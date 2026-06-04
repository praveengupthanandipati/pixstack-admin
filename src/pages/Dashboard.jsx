import React from 'react'
import StatCards         from '../components/Dashboard/StatCards'
import SalesChart        from '../components/Dashboard/SalesChart'
import DonutCharts       from '../components/Dashboard/DonutCharts'
import RecentOrdersTable from '../components/Dashboard/RecentOrdersTable'
import MapWidget         from '../components/Dashboard/MapWidget'
import TopBusinessTable  from '../components/Dashboard/TopBusinessTable'
import '../styles/Dashboard.scss'

const Dashboard = () => (
  <div className="dashboard">

    {/* Page title */}
    <div className="dash-page-header mb-4">
      <div>
        <h4 className="dash-page-title">Dashboard</h4>
        <p className="dash-page-sub">Welcome back, Admin — here's what's happening today.</p>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <span className="dash-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-1">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8"  y1="2" x2="8"  y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="3"  y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          June 4, 2025
        </span>
        <button className="btn btn-sm btn-danger px-3">+ New Report</button>
      </div>
    </div>

    {/* Row 1 — Stat cards */}
    <StatCards />

    {/* Row 2 — Chart + Donuts */}
    <div className="row g-3 mb-4">
      <div className="col-12 col-xl-8">
        <SalesChart />
      </div>
      <div className="col-12 col-xl-4">
        <DonutCharts />
      </div>
    </div>

    {/* Row 3 — Recent orders + Map */}
    <div className="row g-3 mb-4">
      <div className="col-12 col-xl-7">
        <RecentOrdersTable />
      </div>
      <div className="col-12 col-xl-5">
        <MapWidget />
      </div>
    </div>

    {/* Row 4 — Top business table */}
    <div className="row g-3">
      <div className="col-12">
        <TopBusinessTable />
      </div>
    </div>

  </div>
)

export default Dashboard
