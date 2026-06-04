import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/Asidenav.scss";

// ── Icons ──────────────────────────────────────────────────────────────────
const DashboardIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
  </svg>
);

const UsersIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="4" fill="currentColor" />
    <path
      d="M2 21c0-3.866 3.134-7 7-7s7 3.134 7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 3.5a4 4 0 0 1 0 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M22 21c0-3.5-2.5-6.5-6-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PartnersIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M23 21v-2a4 4 0 0 0-3-3.87"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 3.13a4 4 0 0 1 0 7.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EventsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="16"
      y1="2"
      x2="16"
      y2="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="8"
      y1="2"
      x2="8"
      y2="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="3"
      y1="10"
      x2="21"
      y2="10"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="8" cy="15" r="1.5" fill="currentColor" />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    <circle cx="16" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const BlogsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="14,2 14,8 20,8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="16"
      y1="13"
      x2="8"
      y2="13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="17"
      x2="8"
      y2="17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="9"
      x2="8"
      y2="9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const SubscribersIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21a2 2 0 0 1-3.46 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EnquiriesIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="12"
      y1="8"
      x2="12"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="16"
      x2="12.01"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const RequestsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="9"
      y="3"
      width="6"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="9"
      y1="12"
      x2="15"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="9"
      y1="16"
      x2="13"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const JobsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="7"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="12"
      y1="12"
      x2="12"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="14"
      x2="14"
      y2="14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const RolesIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="9,12 11,14 15,10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const MastersIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <ellipse
      cx="12"
      cy="5"
      rx="9"
      ry="3"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="16 17 21 12 16 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="21"
      y1="12"
      x2="9"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    className={`chevron${open ? " chevron--open" : ""}`}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SubDot = () => (
  <svg
    width="5"
    height="5"
    viewBox="0 0 6 6"
    fill="currentColor"
    className="sub-dot"
  >
    <circle cx="3" cy="3" r="3" />
  </svg>
);

// ── Masters dropdown items ─────────────────────────────────────────────────
const MASTERS_ITEMS = [
  { label: "Categories", badge: null },
  { label: "Sub Categories", badge: null },
  { label: "Locations", badge: null },
  { label: "Skills", badge: null },
  { label: "Service Types", badge: null },
  { label: "Packages", badge: null },
  { label: "Tags", badge: null },
];

const toSlug = (str) => str.toLowerCase().replace(/\s+/g, "-");

// ── Dropdown accordion group ───────────────────────────────────────────────
const DropdownGroup = ({ label, icon, items, basePath, isOpen, onToggle }) => (
  <li className={`nav-group${isOpen ? " nav-group--open" : ""}`}>
    <button
      className="nav-item nav-item--toggle d-flex align-items-center w-100"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="nav-icon">{icon}</span>
      <span className="nav-label flex-grow-1">{label}</span>
      <ChevronIcon open={isOpen} />
    </button>
    <div className={`nav-sub-wrapper${isOpen ? " nav-sub-wrapper--open" : ""}`}>
      <ul className="nav-sub list-unstyled mb-0">
        {items.map(({ label: itemLabel, badge }) => (
          <li key={itemLabel}>
            <NavLink
              to={`${basePath}/${toSlug(itemLabel)}`}
              className={({ isActive }) =>
                `nav-sub-item d-flex align-items-center gap-2${isActive ? " active" : ""}`
              }
            >
              <SubDot />
              <span className="flex-grow-1">{itemLabel}</span>
              {badge && (
                <span className="badge rounded-pill nav-badge">{badge}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </li>
);

// ── Simple nav link ────────────────────────────────────────────────────────
const NavItem = ({ to, icon, label, badge }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-item d-flex align-items-center gap-2${isActive ? " active" : ""}`
      }
    >
      <span className="nav-icon">{icon}</span>
      <span className="nav-label flex-grow-1">{label}</span>
      {badge && <span className="badge rounded-pill nav-badge">{badge}</span>}
    </NavLink>
  </li>
);

// ── Asidenav ───────────────────────────────────────────────────────────────
const Asidenav = ({ open }) => {
  const [openGroup, setOpenGroup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setOpenGroup(null);
  }, [open]);

  const toggle = (key) => setOpenGroup((prev) => (prev === key ? null : key));

  return (
    <aside className={`asidenav${open ? "" : " asidenav--collapsed"}`}>
      {/* Brand */}
      <div className="sidebar-brand px-3 mb-3">
        <div className="brand-logo-wrap d-flex align-items-center justify-content-between">
          <div className="brand-logo-pill">
            <img src={logo} alt="Pixstack" className="sidebar-logo" />
          </div>
          <span className="badge bg-danger brand-badge">Admin</span>
        </div>
      </div>

      <div className="sidebar-divider mb-2" />

      {/* ── Main menu ── */}
      <nav>
        <p className="nav-section-label px-3">MAIN MENU</p>
        <ul className="nav-list list-unstyled mb-0 px-2">
          <NavItem to="/dashboard" icon={<DashboardIcon />} label="Dashboard" />
          <NavItem to="/users" icon={<UsersIcon />} label="Users" badge="New" />
          <NavItem
            to="/partners"
            icon={<PartnersIcon />}
            label="Listing Partners"
          />
          <NavItem to="/events" icon={<EventsIcon />} label="Events" />
          <NavItem to="/blogs" icon={<BlogsIcon />} label="Blogs" />
          <NavItem
            to="/subscribers"
            icon={<SubscribersIcon />}
            label="Subscribers"
          />
          <NavItem
            to="/enquiries"
            icon={<EnquiriesIcon />}
            label="Enquiries"
            badge="5"
          />
          <NavItem
            to="/requests"
            icon={<RequestsIcon />}
            label="Requests"
            badge="3"
          />
          <NavItem to="/jobs" icon={<JobsIcon />} label="Jobs" />
        </ul>
      </nav>

      <div className="sidebar-divider my-2 mx-2" />

      {/* ── System menu ── */}
      <nav>
        <p className="nav-section-label px-3">SYSTEM</p>
        <ul className="nav-list list-unstyled mb-0 px-2">
          <NavItem
            to="/roles"
            icon={<RolesIcon />}
            label="Roles & Permissions"
          />
          <NavItem to="/settings" icon={<SettingsIcon />} label="Settings" />

          <DropdownGroup
            label="Masters"
            icon={<MastersIcon />}
            items={MASTERS_ITEMS}
            basePath="/masters"
            isOpen={openGroup === "masters"}
            onToggle={() => toggle("masters")}
          />
        </ul>
      </nav>

      {/* ── Logout ── */}
      <div className="sidebar-divider mt-3 mb-2 mx-2" />
      <ul className="nav-list list-unstyled mb-0 px-2">
        <li>
          <button
            className="nav-item nav-item--logout d-flex align-items-center gap-2 w-100"
            onClick={() => navigate("/login")}
          >
            <span className="nav-icon">
              <LogoutIcon />
            </span>
            <span className="nav-label">Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Asidenav;
