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

// ── Seed data ──────────────────────────────────────────────────────────────
const SEED = [
  { id: 1,  city: "Mumbai",      state: "Maharashtra",  pincode: "400001", partnerCount: 45, status: true  },
  { id: 2,  city: "Delhi",       state: "Delhi",        pincode: "110001", partnerCount: 38, status: true  },
  { id: 3,  city: "Bangalore",   state: "Karnataka",    pincode: "560001", partnerCount: 52, status: true  },
  { id: 4,  city: "Chennai",     state: "Tamil Nadu",   pincode: "600001", partnerCount: 29, status: true  },
  { id: 5,  city: "Hyderabad",   state: "Telangana",    pincode: "500001", partnerCount: 34, status: true  },
  { id: 6,  city: "Pune",        state: "Maharashtra",  pincode: "411001", partnerCount: 22, status: true  },
  { id: 7,  city: "Kolkata",     state: "West Bengal",  pincode: "700001", partnerCount: 18, status: false },
  { id: 8,  city: "Jaipur",      state: "Rajasthan",    pincode: "302001", partnerCount: 15, status: true  },
  { id: 9,  city: "Ahmedabad",   state: "Gujarat",      pincode: "380001", partnerCount: 20, status: true  },
  { id: 10, city: "Surat",       state: "Gujarat",      pincode: "395001", partnerCount: 11, status: false },
];

const ACCENT = ["#E42929","#3b82f6","#10b981","#f59e0b","#8b5cf6","#ec4899","#06b6d4","#84cc16"];

const nameColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return ACCENT[Math.abs(hash) % ACCENT.length];
};

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

// ── Add / Edit Modal ───────────────────────────────────────────────────────
const LocationModal = ({ item, onClose, onSave }) => {
  const isEdit = !!item;
  const [form, setForm] = useState(
    isEdit
      ? { ...item }
      : { city: "", state: "", pincode: "", status: true }
  );
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.city.trim())  errs.city  = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(isEdit ? { ...form, id: item.id } : form);
  };

  return (
    <div className="ms-overlay" onClick={onClose}>
      <div className="ms-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ms-modal-hdr">
          <h3 className="ms-modal-title">{isEdit ? "Edit Location" : "Add New Location"}</h3>
          <button className="ms-modal-close" onClick={onClose}><XIcon /></button>
        </div>

        <div className="ms-modal-body">
          <div className="ms-form-group">
            <label className="ms-form-label">City <span className="ms-required">*</span></label>
            <input
              type="text"
              className={`ms-input${errors.city ? " ms-input--err" : ""}`}
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="e.g. Mumbai"
              autoFocus
            />
            {errors.city && <p className="ms-field-err">{errors.city}</p>}
          </div>

          <div className="ms-form-group">
            <label className="ms-form-label">State <span className="ms-required">*</span></label>
            <input
              type="text"
              className={`ms-input${errors.state ? " ms-input--err" : ""}`}
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
              placeholder="e.g. Maharashtra"
            />
            {errors.state && <p className="ms-field-err">{errors.state}</p>}
          </div>

          <div className="ms-form-group">
            <label className="ms-form-label">Pincode</label>
            <input
              type="text"
              className="ms-input"
              value={form.pincode}
              onChange={(e) => set("pincode", e.target.value)}
              placeholder="e.g. 400001"
              maxLength={6}
            />
          </div>

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
            {isEdit ? "Save Changes" : "Add Location"}
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
      <h4 className="ms-confirm-title">Delete Location?</h4>
      <p className="ms-confirm-msg">
        Are you sure you want to delete <strong>{item.city}, {item.state}</strong>? This action cannot be undone.
      </p>
      <div className="ms-confirm-btns">
        <button className="ms-btn ms-btn--ghost" onClick={onCancel}>Cancel</button>
        <button className="ms-btn ms-btn--danger" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

// ── Main page ──────────────────────────────────────────────────────────────
const Locations = () => {
  const [items, setItems]         = useState(SEED);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [modal, setModal]         = useState(null);
  const [deleteTarget, setDel]    = useState(null);

  const activeCount = items.filter((i) => i.status).length;

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        !search ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        item.state.toLowerCase().includes(search.toLowerCase()) ||
        item.pincode.includes(search);
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? item.status : !item.status);
      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  const handleSave = (saved) => {
    setItems((prev) => {
      if (saved.id !== undefined && prev.some((i) => i.id === saved.id)) {
        return prev.map((i) => (i.id === saved.id ? saved : i));
      }
      const maxId = prev.reduce((m, i) => Math.max(m, i.id), 0);
      return [...prev, { ...saved, id: maxId + 1, partnerCount: 0 }];
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
          <h1 className="ms-page-title">Locations</h1>
          <p className="ms-page-sub">Manage service-available cities and locations across India.</p>
        </div>
        <button
          className="ms-btn ms-btn--primary"
          onClick={() => setModal({ mode: "add", item: null })}
        >
          <PlusIcon />
          Add Location
        </button>
      </div>

      {/* Stats */}
      <div className="ms-stats">
        <div className="ms-stat-card">
          <span className="ms-stat-num">{items.length}</span>
          <span className="ms-stat-label">Total Locations</span>
        </div>
        <div className="ms-stat-card ms-stat-card--green">
          <span className="ms-stat-num">{activeCount}</span>
          <span className="ms-stat-label">Active</span>
        </div>
        <div className="ms-stat-card ms-stat-card--gray">
          <span className="ms-stat-num">{items.length - activeCount}</span>
          <span className="ms-stat-label">Inactive</span>
        </div>
        <div className="ms-stat-card" style={{ borderLeftColor: "#3b82f6" }}>
          <span className="ms-stat-num">
            {items.reduce((sum, i) => sum + (i.partnerCount || 0), 0)}
          </span>
          <span className="ms-stat-label">Total Partners</span>
        </div>
      </div>

      {/* Table card */}
      <div className="ms-card">
        <div className="ms-toolbar">
          <div className="ms-search-wrap">
            <SearchIcon />
            <input
              type="text"
              className="ms-search"
              placeholder="Search by city, state or pincode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ms-filter-group">
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

        <div className="ms-table-wrap">
          <table className="ms-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Partners</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="ms-empty">No locations found</td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const color = nameColor(item.city);
                  return (
                    <tr key={item.id}>
                      <td className="ms-td-num">{idx + 1}</td>
                      <td>
                        <div className="ms-td-name">
                          <span
                            className="ms-name-avatar"
                            style={{ background: `${color}1a`, color }}
                          >
                            {initials(item.city)}
                          </span>
                          <span className="ms-name-text">{item.city}</span>
                        </div>
                      </td>
                      <td>{item.state}</td>
                      <td style={{ fontFamily: "monospace", fontSize: 12 }}>{item.pincode}</td>
                      <td>
                        <span className="ms-partner-count">{item.partnerCount} partners</span>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="ms-table-footer">
          Showing {filtered.length} of {items.length} locations
        </div>
      </div>

      {modal && (
        <LocationModal
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

export default Locations;
