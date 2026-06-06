import React, { useState, useMemo } from "react";
import "../../styles/Masters.scss";

// ── Icons ──────────────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── Constants ──────────────────────────────────────────────────────────────
const PALETTE = [
  "#E42929", "#3b82f6", "#10b981", "#f59e0b",
  "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#64748b",
];

const EVENT_TYPES = ["Wedding", "Social", "Corporate", "Religious", "Personal"];

const TYPE_COLORS = {
  Wedding:   { bg: "rgba(236,72,153,0.10)",  color: "#ec4899" },
  Social:    { bg: "rgba(59,130,246,0.10)",  color: "#3b82f6" },
  Corporate: { bg: "rgba(6,182,212,0.10)",   color: "#06b6d4" },
  Religious: { bg: "rgba(245,158,11,0.10)",  color: "#f59e0b" },
  Personal:  { bg: "rgba(139,92,246,0.10)",  color: "#8b5cf6" },
};

const SEED = [
  { id: 1,  name: "Wedding",          type: "Wedding",   description: "Hindu, Christian and civil wedding ceremonies",      color: "#ec4899", requestCount: 142, status: true  },
  { id: 2,  name: "Pre-Wedding Shoot",type: "Wedding",   description: "Couple shoots before the wedding day",               color: "#E42929", requestCount: 98,  status: true  },
  { id: 3,  name: "Engagement",       type: "Wedding",   description: "Ring ceremony and engagement celebrations",           color: "#f59e0b", requestCount: 76,  status: true  },
  { id: 4,  name: "Reception",        type: "Wedding",   description: "Post-wedding reception and dinner events",            color: "#8b5cf6", requestCount: 64,  status: true  },
  { id: 5,  name: "Birthday",         type: "Social",    description: "Birthday parties and surprise celebrations",          color: "#10b981", requestCount: 88,  status: true  },
  { id: 6,  name: "Anniversary",      type: "Social",    description: "Milestone anniversaries and couples celebrations",    color: "#f97316", requestCount: 43,  status: true  },
  { id: 7,  name: "Baby Shower",      type: "Social",    description: "Baby shower and gender reveal events",                color: "#3b82f6", requestCount: 31,  status: true  },
  { id: 8,  name: "Graduation",       type: "Social",    description: "Graduation ceremonies and convocation events",        color: "#84cc16", requestCount: 27,  status: true  },
  { id: 9,  name: "Corporate Event",  type: "Corporate", description: "Office parties, team outings and conferences",        color: "#06b6d4", requestCount: 55,  status: true  },
  { id: 10, name: "Product Launch",   type: "Corporate", description: "Product reveal and brand launch events",              color: "#64748b", requestCount: 22,  status: false },
  { id: 11, name: "Naming Ceremony",  type: "Religious", description: "Baby naming and welcoming ceremonies",                color: "#f59e0b", requestCount: 19,  status: true  },
  { id: 12, name: "Farewell Party",   type: "Personal",  description: "Farewell and send-off parties for individuals",       color: "#E42929", requestCount: 14,  status: false },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const initials = (name) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

// ── Toggle ─────────────────────────────────────────────────────────────────
const Toggle = ({ value, onChange }) => (
  <button
    type="button"
    className={`ms-toggle${value ? " ms-toggle--on" : ""}`}
    onClick={() => onChange(!value)}
    aria-label="Toggle status"
  >
    <span className="ms-toggle__thumb" />
  </button>
);

// ── Type badge ─────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const s = TYPE_COLORS[type] || { bg: "rgba(100,116,139,0.1)", color: "#64748b" };
  return (
    <span className="ev-type-badge" style={{ background: s.bg, color: s.color }}>
      {type}
    </span>
  );
};

// ── Add / Edit Modal ───────────────────────────────────────────────────────
const EventModal = ({ item, onClose, onSave }) => {
  const isEdit = !!item;
  const [form, setForm] = useState(
    isEdit
      ? { ...item }
      : { name: "", type: EVENT_TYPES[0], description: "", color: PALETTE[0], status: true }
  );
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleSave = () => {
    if (!form.name.trim()) { setErrors({ name: "Event name is required" }); return; }
    onSave(isEdit ? { ...form, id: item.id } : form);
  };

  return (
    <div className="ms-overlay" onClick={onClose}>
      <div className="ms-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ms-modal-hdr">
          <h3 className="ms-modal-title">{isEdit ? "Edit Event" : "Add New Event"}</h3>
          <button className="ms-modal-close" onClick={onClose}><XIcon /></button>
        </div>

        <div className="ms-modal-body">
          {/* Name */}
          <div className="ms-form-group">
            <label className="ms-form-label">
              Event Name <span className="ms-required">*</span>
            </label>
            <input
              type="text"
              className={`ms-input${errors.name ? " ms-input--err" : ""}`}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Wedding, Birthday"
              autoFocus
            />
            {errors.name && <p className="ms-field-err">{errors.name}</p>}
          </div>

          {/* Type */}
          <div className="ms-form-group">
            <label className="ms-form-label">Event Type</label>
            <select
              className="ms-select"
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
            >
              {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Description */}
          <div className="ms-form-group">
            <label className="ms-form-label">Description</label>
            <textarea
              className="ms-textarea"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description of this event type..."
              rows={3}
            />
          </div>

          {/* Color */}
          <div className="ms-form-group">
            <label className="ms-form-label">Color Tag</label>
            <div className="ms-color-palette">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`ms-palette-swatch${form.color === c ? " ms-palette-swatch--active" : ""}`}
                  style={{ background: c }}
                  onClick={() => set("color", c)}
                  aria-label={c}
                />
              ))}
            </div>
            <div className="ms-selected-color">
              <span className="ms-color-dot" style={{ background: form.color }} />
              <span className="ms-selected-color-label">{form.color}</span>
            </div>
          </div>

          {/* Status */}
          <div className="ms-form-group">
            <label className="ms-form-label">Status</label>
            <div className="ms-status-row">
              <Toggle value={form.status} onChange={(v) => set("status", v)} />
              <span className="ms-status-label">{form.status ? "Active" : "Inactive"}</span>
            </div>
          </div>
        </div>

        <div className="ms-modal-ftr">
          <button className="ms-btn ms-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="ms-btn ms-btn--primary" onClick={handleSave}>
            {isEdit ? "Save Changes" : "Add Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Delete Confirm ─────────────────────────────────────────────────────────
const DeleteConfirm = ({ item, onCancel, onConfirm }) => (
  <div className="ms-overlay" onClick={onCancel}>
    <div className="ms-confirm" onClick={(e) => e.stopPropagation()}>
      <div className="ms-confirm-icon"><TrashIcon /></div>
      <h4 className="ms-confirm-title">Delete Event?</h4>
      <p className="ms-confirm-msg">
        Are you sure you want to delete <strong>"{item.name}"</strong>? This action cannot be undone.
      </p>
      <div className="ms-confirm-btns">
        <button className="ms-btn ms-btn--ghost" onClick={onCancel}>Cancel</button>
        <button className="ms-btn ms-btn--danger" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

// ── Main page ──────────────────────────────────────────────────────────────
const Eventsmaster = () => {
  const [items, setItems]           = useState(SEED);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modal, setModal]           = useState(null);
  const [deleteTarget, setDel]      = useState(null);

  const activeCount = items.filter((i) => i.status).length;

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || (statusFilter === "active" ? item.status : !item.status);
      const matchType   = typeFilter === "all" || item.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [items, search, statusFilter, typeFilter]);

  const handleSave = (saved) => {
    setItems((prev) => {
      if (saved.id !== undefined && prev.some((i) => i.id === saved.id)) {
        return prev.map((i) => (i.id === saved.id ? saved : i));
      }
      const maxId = prev.reduce((m, i) => Math.max(m, i.id), 0);
      return [...prev, { ...saved, id: maxId + 1, requestCount: 0 }];
    });
    setModal(null);
  };

  const handleDelete = () => {
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDel(null);
  };

  const toggleStatus = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: !i.status } : i)));

  return (
    <div className="ms-page">
      {/* Header */}
      <div className="ms-page-hdr">
        <div>
          <h1 className="ms-page-title">Events Master</h1>
          <p className="ms-page-sub">Manage event types available for requests and bookings on the platform.</p>
        </div>
        <button
          className="ms-btn ms-btn--primary"
          onClick={() => setModal({ mode: "add", item: null })}
        >
          <PlusIcon />
          Add Event
        </button>
      </div>

      {/* Stats */}
      <div className="ms-stats">
        <div className="ms-stat-card">
          <span className="ms-stat-num">{items.length}</span>
          <span className="ms-stat-label">Total Events</span>
        </div>
        <div className="ms-stat-card ms-stat-card--green">
          <span className="ms-stat-num">{activeCount}</span>
          <span className="ms-stat-label">Active</span>
        </div>
        <div className="ms-stat-card ms-stat-card--gray">
          <span className="ms-stat-num">{items.length - activeCount}</span>
          <span className="ms-stat-label">Inactive</span>
        </div>
        <div className="ms-stat-card" style={{ borderLeftColor: "#ec4899" }}>
          <span className="ms-stat-num">
            {items.reduce((sum, i) => sum + (i.requestCount || 0), 0)}
          </span>
          <span className="ms-stat-label">Total Requests</span>
        </div>
      </div>

      {/* Table card */}
      <div className="ms-card">
        {/* Toolbar */}
        <div className="ms-toolbar">
          <div className="ms-search-wrap">
            <SearchIcon />
            <input
              type="text"
              className="ms-search"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ms-filter-group">
            <select
              className="sk-cat-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {[
              { key: "all",      label: `All (${items.length})` },
              { key: "active",   label: `Active (${activeCount})` },
              { key: "inactive", label: `Inactive (${items.length - activeCount})` },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`ms-filter-btn${statusFilter === key ? " ms-filter-btn--active" : ""}`}
                onClick={() => setStatus(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="ms-table-wrap">
          <table className="ms-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Event Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Requests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="ms-empty">No events found</td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="ms-td-num">{idx + 1}</td>
                    <td>
                      <div className="ms-td-name">
                        <span
                          className="ms-name-avatar"
                          style={{ background: `${item.color}1a`, color: item.color }}
                        >
                          {initials(item.name)}
                        </span>
                        <span className="ms-name-text">{item.name}</span>
                      </div>
                    </td>
                    <td><TypeBadge type={item.type} /></td>
                    <td><span className="ms-td-truncate">{item.description}</span></td>
                    <td>
                      <span className="ev-req-count">{item.requestCount}</span>
                    </td>
                    <td>
                      <Toggle value={item.status} onChange={() => toggleStatus(item.id)} />
                    </td>
                    <td>
                      <div className="ms-actions">
                        <button
                          className="ms-action-btn ms-action-btn--edit"
                          onClick={() => setModal({ mode: "edit", item })}
                          title="Edit"
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="ms-action-btn ms-action-btn--delete"
                          onClick={() => setDel(item)}
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="ms-table-footer">
          Showing {filtered.length} of {items.length} events
        </div>
      </div>

      {modal && (
        <EventModal
          item={modal.item}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteConfirm
          item={deleteTarget}
          onCancel={() => setDel(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Eventsmaster;
