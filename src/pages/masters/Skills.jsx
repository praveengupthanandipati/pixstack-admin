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
const CATEGORIES = ["Photography", "Videography", "Editing", "Equipment", "Styling", "Other"];

const CATEGORY_COLORS = {
  Photography: { bg: "rgba(228,41,41,0.10)",   color: "#E42929" },
  Videography: { bg: "rgba(59,130,246,0.10)",  color: "#3b82f6" },
  Editing:     { bg: "rgba(139,92,246,0.10)",  color: "#8b5cf6" },
  Equipment:   { bg: "rgba(245,158,11,0.10)",  color: "#f59e0b" },
  Styling:     { bg: "rgba(236,72,153,0.10)",  color: "#ec4899" },
  Other:       { bg: "rgba(100,116,139,0.10)", color: "#64748b" },
};

const SEED = [
  { id: 1,  name: "Candid Photography",   category: "Photography", userCount: 84, status: true  },
  { id: 2,  name: "Portrait Photography", category: "Photography", userCount: 96, status: true  },
  { id: 3,  name: "Aerial / Drone",       category: "Photography", userCount: 32, status: true  },
  { id: 4,  name: "Wedding Photography",  category: "Photography", userCount: 78, status: true  },
  { id: 5,  name: "Cinematic Video",      category: "Videography", userCount: 55, status: true  },
  { id: 6,  name: "Drone Videography",    category: "Videography", userCount: 28, status: true  },
  { id: 7,  name: "Video Editing",        category: "Editing",     userCount: 61, status: true  },
  { id: 8,  name: "Color Grading",        category: "Editing",     userCount: 44, status: true  },
  { id: 9,  name: "Photo Retouching",     category: "Editing",     userCount: 39, status: false },
  { id: 10, name: "Studio Lighting",      category: "Equipment",   userCount: 37, status: true  },
  { id: 11, name: "Bridal Styling",       category: "Styling",     userCount: 22, status: true  },
  { id: 12, name: "Event Coordination",   category: "Other",       userCount: 18, status: false },
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

// ── Category badge ─────────────────────────────────────────────────────────
const CategoryBadge = ({ category }) => {
  const s = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  return (
    <span className="sk-cat-badge" style={{ background: s.bg, color: s.color }}>
      {category}
    </span>
  );
};

// ── Add / Edit Modal ───────────────────────────────────────────────────────
const SkillModal = ({ item, onClose, onSave }) => {
  const isEdit = !!item;
  const [form, setForm] = useState(
    isEdit ? { ...item } : { name: "", category: CATEGORIES[0], status: true }
  );
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleSave = () => {
    if (!form.name.trim()) { setErrors({ name: "Skill name is required" }); return; }
    onSave(isEdit ? { ...form, id: item.id } : form);
  };

  return (
    <div className="ms-overlay" onClick={onClose}>
      <div className="ms-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ms-modal-hdr">
          <h3 className="ms-modal-title">{isEdit ? "Edit Skill" : "Add New Skill"}</h3>
          <button className="ms-modal-close" onClick={onClose}><XIcon /></button>
        </div>

        <div className="ms-modal-body">
          <div className="ms-form-group">
            <label className="ms-form-label">
              Skill Name <span className="ms-required">*</span>
            </label>
            <input
              type="text"
              className={`ms-input${errors.name ? " ms-input--err" : ""}`}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Candid Photography"
              autoFocus
            />
            {errors.name && <p className="ms-field-err">{errors.name}</p>}
          </div>

          <div className="ms-form-group">
            <label className="ms-form-label">Category</label>
            <select
              className="ms-select"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
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
            {isEdit ? "Save Changes" : "Add Skill"}
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
      <h4 className="ms-confirm-title">Delete Skill?</h4>
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
const Skills = () => {
  const [items, setItems]             = useState(SEED);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatus]     = useState("all");
  const [categoryFilter, setCategory] = useState("all");
  const [modal, setModal]             = useState(null);
  const [deleteTarget, setDel]        = useState(null);

  const activeCount = items.filter((i) => i.status).length;

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch   = !search || item.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus   = statusFilter === "all" || (statusFilter === "active" ? item.status : !item.status);
      const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [items, search, statusFilter, categoryFilter]);

  const handleSave = (saved) => {
    setItems((prev) => {
      if (saved.id !== undefined && prev.some((i) => i.id === saved.id)) {
        return prev.map((i) => (i.id === saved.id ? saved : i));
      }
      const maxId = prev.reduce((m, i) => Math.max(m, i.id), 0);
      return [...prev, { ...saved, id: maxId + 1, userCount: 0 }];
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
          <h1 className="ms-page-title">Skills</h1>
          <p className="ms-page-sub">Manage skills and expertise tags for photographers and vendors.</p>
        </div>
        <button
          className="ms-btn ms-btn--primary"
          onClick={() => setModal({ mode: "add", item: null })}
        >
          <PlusIcon />
          Add Skill
        </button>
      </div>

      {/* Stats */}
      <div className="ms-stats">
        <div className="ms-stat-card">
          <span className="ms-stat-num">{items.length}</span>
          <span className="ms-stat-label">Total Skills</span>
        </div>
        <div className="ms-stat-card ms-stat-card--green">
          <span className="ms-stat-num">{activeCount}</span>
          <span className="ms-stat-label">Active</span>
        </div>
        <div className="ms-stat-card ms-stat-card--gray">
          <span className="ms-stat-num">{items.length - activeCount}</span>
          <span className="ms-stat-label">Inactive</span>
        </div>
        <div className="ms-stat-card" style={{ borderLeftColor: "#8b5cf6" }}>
          <span className="ms-stat-num">
            {items.reduce((sum, i) => sum + (i.userCount || 0), 0)}
          </span>
          <span className="ms-stat-label">Total Users</span>
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
              placeholder="Search skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ms-filter-group">
            <select
              className="sk-cat-filter"
              value={categoryFilter}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
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

        <div className="ms-table-wrap">
          <table className="ms-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Skill Name</th>
                <th>Category</th>
                <th>Users</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="ms-empty">No skills found</td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const s = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;
                  return (
                    <tr key={item.id}>
                      <td className="ms-td-num">{idx + 1}</td>
                      <td>
                        <div className="ms-td-name">
                          <span
                            className="ms-name-avatar"
                            style={{ background: s.bg, color: s.color }}
                          >
                            {initials(item.name)}
                          </span>
                          <span className="ms-name-text">{item.name}</span>
                        </div>
                      </td>
                      <td><CategoryBadge category={item.category} /></td>
                      <td>
                        <span className="sk-user-count">{item.userCount} users</span>
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
          Showing {filtered.length} of {items.length} skills
        </div>
      </div>

      {modal && (
        <SkillModal
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

export default Skills;
