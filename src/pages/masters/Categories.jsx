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

const SEED = [
  { id: 1,  name: "Photography",     description: "Professional photo services for all events",   color: "#E42929", status: true  },
  { id: 2,  name: "Videography",     description: "Video production and filmmaking services",      color: "#3b82f6", status: true  },
  { id: 3,  name: "Wedding",         description: "Complete wedding coverage and planning",         color: "#ec4899", status: true  },
  { id: 4,  name: "Pre-Wedding",     description: "Pre-wedding shoots and couple sessions",         color: "#f59e0b", status: true  },
  { id: 5,  name: "Engagement",      description: "Engagement ceremony and ring ceremony coverage", color: "#8b5cf6", status: true  },
  { id: 6,  name: "Birthday",        description: "Birthday parties and milestone celebrations",    color: "#10b981", status: true  },
  { id: 7,  name: "Corporate",       description: "Corporate events, conferences and team events",  color: "#06b6d4", status: false },
  { id: 8,  name: "Naming Ceremony", description: "Baby naming and welcoming ceremonies",           color: "#84cc16", status: true  },
  { id: 9,  name: "Anniversary",     description: "Anniversary and milestone event coverage",       color: "#f97316", status: true  },
  { id: 10, name: "Graduation",      description: "Graduation and convocation event photography",   color: "#64748b", status: false },
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

// ── Add / Edit Modal ───────────────────────────────────────────────────────
const CategoryModal = ({ item, onClose, onSave }) => {
  const isEdit = !!item;
  const [form, setForm] = useState(
    isEdit
      ? { ...item }
      : { name: "", description: "", color: PALETTE[0], status: true }
  );
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Category name is required";
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
          <h3 className="ms-modal-title">
            {isEdit ? "Edit Category" : "Add New Category"}
          </h3>
          <button className="ms-modal-close" onClick={onClose}><XIcon /></button>
        </div>

        <div className="ms-modal-body">
          {/* Name */}
          <div className="ms-form-group">
            <label className="ms-form-label">
              Category Name <span className="ms-required">*</span>
            </label>
            <input
              type="text"
              className={`ms-input${errors.name ? " ms-input--err" : ""}`}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Wedding Photography"
              autoFocus
            />
            {errors.name && <p className="ms-field-err">{errors.name}</p>}
          </div>

          {/* Description */}
          <div className="ms-form-group">
            <label className="ms-form-label">Description</label>
            <textarea
              className="ms-textarea"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description of this category..."
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
            {isEdit ? "Save Changes" : "Add Category"}
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
      <h4 className="ms-confirm-title">Delete Category?</h4>
      <p className="ms-confirm-msg">
        Are you sure you want to delete <strong>"{item.name}"</strong>?
        This will also affect all linked sub-categories. This action cannot be undone.
      </p>
      <div className="ms-confirm-btns">
        <button className="ms-btn ms-btn--ghost" onClick={onCancel}>Cancel</button>
        <button className="ms-btn ms-btn--danger" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

// ── Main page ──────────────────────────────────────────────────────────────
const Categories = () => {
  const [items, setItems]         = useState(SEED);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [modal, setModal]         = useState(null); // null | { mode, item }
  const [deleteTarget, setDel]    = useState(null);

  const activeCount = items.filter((i) => i.status).length;

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
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
      return [...prev, { ...saved, id: maxId + 1, subCount: 0 }];
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
          <h1 className="ms-page-title">Categories</h1>
          <p className="ms-page-sub">
            Manage event and photography categories used across the platform.
          </p>
        </div>
        <button
          className="ms-btn ms-btn--primary"
          onClick={() => setModal({ mode: "add", item: null })}
        >
          <PlusIcon />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="ms-stats">
        <div className="ms-stat-card">
          <span className="ms-stat-num">{items.length}</span>
          <span className="ms-stat-label">Total Categories</span>
        </div>
        <div className="ms-stat-card ms-stat-card--green">
          <span className="ms-stat-num">{activeCount}</span>
          <span className="ms-stat-label">Active</span>
        </div>
        <div className="ms-stat-card ms-stat-card--gray">
          <span className="ms-stat-num">{items.length - activeCount}</span>
          <span className="ms-stat-label">Inactive</span>
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
              placeholder="Search categories..."
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

        {/* Table */}
        <div className="ms-table-wrap">
          <table className="ms-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Category Name</th>
                <th>Color</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="ms-empty">
                    No categories found
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="ms-td-num">{idx + 1}</td>
                    <td>
                      <div className="ms-td-name">
                        <span
                          className="ms-name-avatar"
                          style={{
                            background: `${item.color}1a`,
                            color: item.color,
                          }}
                        >
                          {initials(item.name)}
                        </span>
                        <span className="ms-name-text">{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="ms-color-dot"
                        style={{ background: item.color }}
                        title={item.color}
                      />
                    </td>
                    <td>
                      <span className="ms-td-truncate">{item.description}</span>
                    </td>
                    <td>
                      <Toggle
                        value={item.status}
                        onChange={() => toggleStatus(item.id)}
                      />
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
          Showing {filtered.length} of {items.length} categories
        </div>
      </div>

      {modal && (
        <CategoryModal
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

export default Categories;
