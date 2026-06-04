import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PARTNERS } from "../data/partners";
import "../styles/ListingPartners.scss";

const _UNUSED = [
  {
    id: "BIZ001",
    name: "Raj Photo Studio",
    profession: "Photo Studio",
    estYear: 2015,
    teamSize: 12,
    state: "Maharashtra",
    city: "Mumbai",
    status: "Active",
  },
  {
    id: "BIZ002",
    name: "Lens & Light Co.",
    profession: "Photographer",
    estYear: 2018,
    teamSize: 3,
    state: "Karnataka",
    city: "Bengaluru",
    status: "Active",
  },
  {
    id: "BIZ003",
    name: "Digital Zone Labs",
    profession: "Digital Lab",
    estYear: 2012,
    teamSize: 28,
    state: "Telangana",
    city: "Hyderabad",
    status: "Active",
  },
  {
    id: "BIZ004",
    name: "Frame Perfect Films",
    profession: "Video Grapher",
    estYear: 2019,
    teamSize: 6,
    state: "Delhi",
    city: "New Delhi",
    status: "Inactive",
  },
  {
    id: "BIZ005",
    name: "Pixel Arts Studio",
    profession: "Photo Studio",
    estYear: 2016,
    teamSize: 9,
    state: "Tamil Nadu",
    city: "Chennai",
    status: "Active",
  },
  {
    id: "BIZ006",
    name: "Creative Visuals",
    profession: "Editor",
    estYear: 2020,
    teamSize: 4,
    state: "Gujarat",
    city: "Ahmedabad",
    status: "Active",
  },
  {
    id: "BIZ007",
    name: "Vivid Album House",
    profession: "Album Designer",
    estYear: 2017,
    teamSize: 7,
    state: "Karnataka",
    city: "Bengaluru",
    status: "Inactive",
  },
  {
    id: "BIZ008",
    name: "Snap & Story Studio",
    profession: "Photographer",
    estYear: 2021,
    teamSize: 2,
    state: "Kerala",
    city: "Kochi",
    status: "Active",
  },
  {
    id: "BIZ009",
    name: "GoldenFrame Studio",
    profession: "Photo Studio",
    estYear: 2014,
    teamSize: 15,
    state: "Punjab",
    city: "Chandigarh",
    status: "Active",
  },
  {
    id: "BIZ010",
    name: "Twilight Reels",
    profession: "Video Grapher",
    estYear: 2018,
    teamSize: 5,
    state: "West Bengal",
    city: "Kolkata",
    status: "Active",
  },
  {
    id: "BIZ011",
    name: "Shutter Speed Pro",
    profession: "Photographer",
    estYear: 2022,
    teamSize: 1,
    state: "Rajasthan",
    city: "Jaipur",
    status: "Inactive",
  },
  {
    id: "BIZ012",
    name: "AlbumCraft Designs",
    profession: "Album Designer",
    estYear: 2016,
    teamSize: 8,
    state: "Maharashtra",
    city: "Pune",
    status: "Active",
  },
  {
    id: "BIZ013",
    name: "InkFrame Editors",
    profession: "Editor",
    estYear: 2019,
    teamSize: 5,
    state: "Tamil Nadu",
    city: "Coimbatore",
    status: "Active",
  },
  {
    id: "BIZ014",
    name: "Horizon Digital Labs",
    profession: "Digital Lab",
    estYear: 2011,
    teamSize: 40,
    state: "Gujarat",
    city: "Surat",
    status: "Active",
  },
  {
    id: "BIZ015",
    name: "Canvas & Click",
    profession: "Photo Studio",
    estYear: 2020,
    teamSize: 6,
    state: "Madhya Pradesh",
    city: "Bhopal",
    status: "Inactive",
  },
  {
    id: "BIZ016",
    name: "Motion Magic Films",
    profession: "Video Grapher",
    estYear: 2017,
    teamSize: 11,
    state: "Uttar Pradesh",
    city: "Lucknow",
    status: "Active",
  },
  {
    id: "BIZ017",
    name: "Prism Color Lab",
    profession: "Digital Lab",
    estYear: 2013,
    teamSize: 22,
    state: "Telangana",
    city: "Warangal",
    status: "Active",
  },
  {
    id: "BIZ018",
    name: "Freelance Frames",
    profession: "Freelancer",
    estYear: 2021,
    teamSize: 1,
    state: "Kerala",
    city: "Thiruvananthapuram",
    status: "Active",
  },
  {
    id: "BIZ019",
    name: "StoryTell Studios",
    profession: "Video Grapher",
    estYear: 2015,
    teamSize: 8,
    state: "Karnataka",
    city: "Mysuru",
    status: "Inactive",
  },
  {
    id: "BIZ020",
    name: "Memories Made Studio",
    profession: "Photo Studio",
    estYear: 2018,
    teamSize: 14,
    state: "Delhi",
    city: "New Delhi",
    status: "Active",
  },
];

const PROFESSIONS = [...new Set(PARTNERS.map((p) => p.profession))].sort();
const STATES = [...new Set(PARTNERS.map((p) => p.state))].sort();
const PAGE_SIZE = 8;

const PROFESSION_COLOR = {
  "Photo Studio": { bg: "rgba(59,130,246,0.1)", color: "#3b82f6" },
  Photographer: { bg: "rgba(139,92,246,0.1)", color: "#8b5cf6" },
  "Video Grapher": { bg: "rgba(236,72,153,0.1)", color: "#ec4899" },
  "Digital Lab": { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
  Editor: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  "Album Designer": { bg: "rgba(6,182,212,0.1)", color: "#06b6d4" },
  Freelancer: { bg: "rgba(228,41,41,0.1)", color: "#e42929" },
};

const ListingPartners = () => {
  const navigate = useNavigate();
  const [search,       setSearch]       = useState("");
  const [profession,   setProfession]   = useState("");
  const [state,        setState]        = useState("");
  const [statusFilter, setStatusFilter] = useState("");   // '' | 'Active' | 'Inactive'
  const [page,         setPage]         = useState(1);
  const [sortCol,      setSortCol]      = useState("id");
  const [sortDir,      setSortDir]      = useState("asc");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PARTNERS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.profession.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.estYear.toString().includes(q);
      const matchProfession = !profession    || p.profession === profession;
      const matchState      = !state         || p.state      === state;
      const matchStatus     = !statusFilter  || p.status     === statusFilter;
      return matchSearch && matchProfession && matchState && matchStatus;
    }).sort((a, b) => {
      let va = a[sortCol];
      let vb = b[sortCol];
      if (typeof va === "number") return sortDir === "asc" ? va - vb : vb - va;
      va = va?.toString().toLowerCase() ?? "";
      vb = vb?.toString().toLowerCase() ?? "";
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }, [search, profession, state, statusFilter, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const resetFilters = () => {
    setSearch("");
    setProfession("");
    setState("");
    setStatusFilter("");
    setPage(1);
  };
  const hasFilters = search || profession || state || statusFilter;

  const SortIcon = ({ col }) => (
    <span className={`sort-icon${sortCol === col ? " sort-icon--active" : ""}`}>
      {sortCol === col ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕"}
    </span>
  );

  // summary counts
  const activeCount = PARTNERS.filter((p) => p.status === "Active").length;
  const inactiveCount = PARTNERS.length - activeCount;

  return (
    <div className="lp-page">
      {/* Page header */}
      <div className="lp-header mb-4">
        <div>
          <h4 className="lp-title">Listing Partners</h4>
          <p className="lp-sub">Manage all registered business partners</p>
        </div>
        {/* Summary chips */}
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <span className="lp-chip lp-chip--total">
            <span className="lp-chip__dot" style={{ background: "#64748b" }} />
            {PARTNERS.length} Total
          </span>
          <span className="lp-chip lp-chip--active">
            <span className="lp-chip__dot" style={{ background: "#10b981" }} />
            {activeCount} Active
          </span>
          <span className="lp-chip lp-chip--inactive">
            <span className="lp-chip__dot" style={{ background: "#f59e0b" }} />
            {inactiveCount} Inactive
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="lp-card">
        {/* ── Toolbar ── */}
        <div className="lp-toolbar">
          {/* Global search */}
          <div className="lp-search-wrap">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              className="lp-search-icon"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              className="lp-search"
              placeholder="Search by ID, name, city, year…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            {search && (
              <button
                className="lp-search-clear"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Filter group */}
          <div className="lp-filters">
            <div className="lp-filter-item">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                className="lp-filter-icon"
              >
                <rect
                  x="2"
                  y="7"
                  width="20"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <select
                className="lp-select"
                value={profession}
                onChange={(e) => {
                  setProfession(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Professions</option>
                {PROFESSIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="lp-filter-item">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                className="lp-filter-icon"
              >
                <path
                  d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <select
                className="lp-select"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All States</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Status toggle buttons */}
            <div className="lp-status-btns">
              <button
                className={`lp-status-btn lp-status-btn--active${statusFilter === 'Active' ? ' is-selected' : ''}`}
                onClick={() => { setStatusFilter(s => s === 'Active' ? '' : 'Active'); setPage(1) }}
              >
                <span className="lp-status-btn__dot" />
                Active
              </button>
              <button
                className={`lp-status-btn lp-status-btn--inactive${statusFilter === 'Inactive' ? ' is-selected' : ''}`}
                onClick={() => { setStatusFilter(s => s === 'Inactive' ? '' : 'Inactive'); setPage(1) }}
              >
                <span className="lp-status-btn__dot" />
                Inactive
              </button>
            </div>

            {hasFilters && (
              <button className="lp-reset-btn" onClick={resetFilters}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="lp-result-bar">
          <span className="lp-result-text">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{PARTNERS.length}</strong> partners
            {profession && (
              <>
                {" "}
                · <span className="lp-filter-tag">{profession}</span>
              </>
            )}
            {state && (
              <>
                {" "}
                · <span className="lp-filter-tag">{state}</span>
              </>
            )}
          </span>
        </div>

        {/* ── Table ── */}
        <div className="table-responsive">
          <table className="table lp-table mb-0">
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort("id")}>
                  Business ID <SortIcon col="id" />
                </th>
                <th className="sortable" onClick={() => handleSort("name")}>
                  Business Name <SortIcon col="name" />
                </th>
                <th
                  className="sortable"
                  onClick={() => handleSort("profession")}
                >
                  Type of Business <SortIcon col="profession" />
                </th>
                <th
                  className="sortable text-center"
                  onClick={() => handleSort("estYear")}
                >
                  Est. Year <SortIcon col="estYear" />
                </th>
                <th
                  className="sortable text-center"
                  onClick={() => handleSort("teamSize")}
                >
                  Team Size <SortIcon col="teamSize" />
                </th>
                <th className="sortable" onClick={() => handleSort("state")}>
                  State <SortIcon col="state" />
                </th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="lp-empty">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mb-2"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="8"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M21 21l-4.35-4.35"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p>No partners match your filters.</p>
                    <button className="lp-reset-btn" onClick={resetFilters}>
                      Clear filters
                    </button>
                  </td>
                </tr>
              ) : (
                pageRows.map((p, i) => {
                  const profStyle = PROFESSION_COLOR[p.profession] || {
                    bg: "#f1f5f9",
                    color: "#475569",
                  };
                  const isActive = p.status === "Active";
                  return (
                    <tr key={p.id}>
                      <td>
                        <span className="lp-id">{p.id}</span>
                      </td>
                      <td>
                        <div className="lp-biz-cell">
                          <div
                            className="lp-biz-avatar"
                            style={{
                              background: profStyle.bg,
                              color: profStyle.color,
                            }}
                          >
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <button className="lp-biz-name lp-biz-name--link" onClick={() => navigate(`/partners/${p.id}`)}>{p.name}</button>
                            <div className="lp-biz-city">{p.city}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className="lp-profession-tag"
                          style={{
                            background: profStyle.bg,
                            color: profStyle.color,
                          }}
                        >
                          {p.profession}
                        </span>
                      </td>
                      <td className="text-center fw-semibold">{p.estYear}</td>
                      <td className="text-center">
                        <span className="lp-team-size">{p.teamSize}</span>
                      </td>
                      <td className="text-muted" style={{ fontSize: 12.5 }}>
                        {p.state}
                      </td>
                      <td className="text-center">
                        <span
                          className={`lp-status ${isActive ? "lp-status--active" : "lp-status--inactive"}`}
                        >
                          <span className="lp-status__dot" />
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="lp-pagination">
          <span className="pagination-info">
            {filtered.length === 0
              ? "No results"
              : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
          </span>
          <div className="d-flex gap-1">
            <button
              className="pg-btn"
              disabled={page === 1}
              onClick={() => setPage(1)}
            >
              «
            </button>
            <button
              className="pg-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1,
              )
              .reduce((acc, n, idx, arr) => {
                if (idx > 0 && n - arr[idx - 1] > 1) acc.push("…");
                acc.push(n);
                return acc;
              }, [])
              .map((n, i) =>
                n === "…" ? (
                  <span key={`e${i}`} className="pg-ellipsis">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    className={`pg-btn${n === page ? " pg-btn--active" : ""}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ),
              )}
            <button
              className="pg-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              ›
            </button>
            <button
              className="pg-btn"
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPartners;
