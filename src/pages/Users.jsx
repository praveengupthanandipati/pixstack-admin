import React, { useState, useMemo } from "react";
import UserOffCanvas from "../components/Users/UserOffCanvas";
import "../styles/Users.scss";

const USERS = [
  {
    id: "USR001",
    name: "Arjun Mehta",
    address: "12, MG Road, Andheri West",
    dob: "14 Mar 1992",
    phone: "+91 98201 34567",
    email: "arjun.mehta@gmail.com",
    city: "Mumbai",
    state: "Maharashtra",
    active: true,
    joined: "10 Jan 2024",
    lastLogin: "03 Jun 2025",
  },
  {
    id: "USR002",
    name: "Priya Sharma",
    address: "45, Nehru Nagar, Sector 12",
    dob: "22 Jul 1995",
    phone: "+91 97301 55678",
    email: "priya.sharma@yahoo.com",
    city: "Pune",
    state: "Maharashtra",
    active: true,
    joined: "15 Feb 2024",
    lastLogin: "02 Jun 2025",
  },
  {
    id: "USR003",
    name: "Ravi Kumar",
    address: "8, Gandhi Street, T Nagar",
    dob: "05 Nov 1988",
    phone: "+91 94401 22345",
    email: "ravi.kumar@outlook.com",
    city: "Chennai",
    state: "Tamil Nadu",
    active: false,
    joined: "20 Mar 2024",
    lastLogin: "10 Apr 2025",
  },
  {
    id: "USR004",
    name: "Sneha Patel",
    address: "32, CG Road, Navrangpura",
    dob: "18 Apr 1993",
    phone: "+91 99001 76543",
    email: "sneha.patel@gmail.com",
    city: "Ahmedabad",
    state: "Gujarat",
    active: true,
    joined: "05 Apr 2024",
    lastLogin: "04 Jun 2025",
  },
  {
    id: "USR005",
    name: "Vikram Singh",
    address: "67, Janpath Lane, Connaught",
    dob: "30 Jan 1990",
    phone: "+91 98111 43210",
    email: "vikram.singh@gmail.com",
    city: "New Delhi",
    state: "Delhi",
    active: true,
    joined: "12 May 2024",
    lastLogin: "01 Jun 2025",
  },
  {
    id: "USR006",
    name: "Anjali Nair",
    address: "3, Marine Drive, Ernakulam",
    dob: "09 Sep 1997",
    phone: "+91 96001 87654",
    email: "anjali.nair@hotmail.com",
    city: "Kochi",
    state: "Kerala",
    active: false,
    joined: "18 Jun 2024",
    lastLogin: "15 May 2025",
  },
  {
    id: "USR007",
    name: "Mohammed Zubair",
    address: "21, Banjara Hills, Road No 5",
    dob: "25 Dec 1991",
    phone: "+91 95501 65432",
    email: "zubair.m@gmail.com",
    city: "Hyderabad",
    state: "Telangana",
    active: true,
    joined: "22 Jul 2024",
    lastLogin: "03 Jun 2025",
  },
  {
    id: "USR008",
    name: "Tanvi Joshi",
    address: "14, FC Road, Shivajinagar",
    dob: "11 Feb 1996",
    phone: "+91 98221 34890",
    email: "tanvi.joshi@gmail.com",
    city: "Pune",
    state: "Maharashtra",
    active: true,
    joined: "01 Aug 2024",
    lastLogin: "04 Jun 2025",
  },
  {
    id: "USR009",
    name: "Kiran Reddy",
    address: "55, Jubilee Hills, Road 36",
    dob: "03 Jun 1989",
    phone: "+91 97001 54321",
    email: "kiran.reddy@yahoo.com",
    city: "Hyderabad",
    state: "Telangana",
    active: true,
    joined: "10 Sep 2024",
    lastLogin: "31 May 2025",
  },
  {
    id: "USR010",
    name: "Deepa Menon",
    address: "9, Anna Salai, Teynampet",
    dob: "27 Aug 1994",
    phone: "+91 94401 98765",
    email: "deepa.menon@gmail.com",
    city: "Chennai",
    state: "Tamil Nadu",
    active: false,
    joined: "05 Oct 2024",
    lastLogin: "20 Apr 2025",
  },
  {
    id: "USR011",
    name: "Rahul Verma",
    address: "18, Hazratganj, Lucknow",
    dob: "15 May 1993",
    phone: "+91 99001 11223",
    email: "rahul.verma@outlook.com",
    city: "Lucknow",
    state: "Uttar Pradesh",
    active: true,
    joined: "15 Nov 2024",
    lastLogin: "02 Jun 2025",
  },
  {
    id: "USR012",
    name: "Pooja Desai",
    address: "77, SG Highway, Bodakdev",
    dob: "08 Oct 1990",
    phone: "+91 98981 44556",
    email: "pooja.desai@gmail.com",
    city: "Ahmedabad",
    state: "Gujarat",
    active: true,
    joined: "20 Dec 2024",
    lastLogin: "04 Jun 2025",
  },
  {
    id: "USR013",
    name: "Suresh Iyer",
    address: "6, Brigade Road, Shivaji Nagar",
    dob: "19 Jul 1987",
    phone: "+91 96661 77889",
    email: "suresh.iyer@gmail.com",
    city: "Bengaluru",
    state: "Karnataka",
    active: false,
    joined: "08 Jan 2025",
    lastLogin: "01 Mar 2025",
  },
  {
    id: "USR014",
    name: "Nisha Kapoor",
    address: "29, South Ex, Part II",
    dob: "01 Mar 1998",
    phone: "+91 95551 22334",
    email: "nisha.kapoor@gmail.com",
    city: "New Delhi",
    state: "Delhi",
    active: true,
    joined: "14 Feb 2025",
    lastLogin: "03 Jun 2025",
  },
  {
    id: "USR015",
    name: "Aditya Bhatt",
    address: "40, Vastrapur Lake Road",
    dob: "23 Nov 1995",
    phone: "+91 97971 33445",
    email: "aditya.bhatt@yahoo.com",
    city: "Ahmedabad",
    state: "Gujarat",
    active: true,
    joined: "01 Mar 2025",
    lastLogin: "04 Jun 2025",
  },
];

const PAGE_SIZE = 8;

const Users = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(USERS.map((u) => [u.id, u.active])),
  );
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return USERS.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.state.toLowerCase().includes(q) ||
        u.phone.includes(q),
    ).sort((a, b) => {
      const va = a[sortCol]?.toString().toLowerCase() ?? "";
      const vb = b[sortCol]?.toString().toLowerCase() ?? "";
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }, [search, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const toggleStatus = (id, e) => {
    e.stopPropagation();
    setStatuses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const SortIcon = ({ col }) => (
    <span className={`sort-icon${sortCol === col ? " sort-icon--active" : ""}`}>
      {sortCol === col ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕"}
    </span>
  );

  return (
    <div className="users-page">
      {/* Page header */}
      <div className="users-page-header mb-4">
        <div>
          <h4 className="users-page-title">Users</h4>
          <p className="users-page-sub">{filtered.length} users found</p>
        </div>
      </div>

      {/* Card */}
      <div className="users-card">
        {/* Toolbar */}
        <div className="users-toolbar">
          <div className="users-search-wrap">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              className="users-search-icon"
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
              className="users-search"
              placeholder="Search by name, email, city, state, phone…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            {search && (
              <button
                className="users-search-clear"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
              >
                ✕
              </button>
            )}
          </div>
          <div className="d-flex gap-2">
            <select className="users-filter-select">
              <option>All Status</option>
              <option>Active</option>
              <option>Deactivated</option>
            </select>
            <select className="users-filter-select">
              <option>All States</option>
              {[...new Set(USERS.map((u) => u.state))].sort().map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Responsive table */}
        <div className="table-responsive">
          <table className="table users-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th className="sortable" onClick={() => handleSort("name")}>
                  User Name <SortIcon col="name" />
                </th>
                <th>Address</th>
                <th className="sortable" onClick={() => handleSort("dob")}>
                  Date of Birth <SortIcon col="dob" />
                </th>
                <th>Phone Number</th>
                <th className="sortable" onClick={() => handleSort("email")}>
                  Email <SortIcon col="email" />
                </th>
                <th className="sortable" onClick={() => handleSort("city")}>
                  City <SortIcon col="city" />
                </th>
                <th className="sortable" onClick={() => handleSort("state")}>
                  State <SortIcon col="state" />
                </th>
                <th>Profile Status</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-5 text-muted">
                    No users match your search.
                  </td>
                </tr>
              ) : (
                pageRows.map((u, i) => {
                  const isActive = statuses[u.id];
                  return (
                    <tr key={u.id}>
                      <td className="text-muted">
                        {(page - 1) * PAGE_SIZE + i + 1}
                      </td>
                      <td>
                        <button
                          className="user-name-btn"
                          onClick={() =>
                            setSelected({ ...u, active: isActive })
                          }
                        >
                          <span className="user-avatar-sm">
                            {u.name.charAt(0)}
                          </span>
                          <span>{u.name}</span>
                        </button>
                      </td>
                      <td className="td-address">{u.address}</td>
                      <td className="text-nowrap">{u.dob}</td>
                      <td className="text-nowrap">{u.phone}</td>
                      <td className="td-email">{u.email}</td>
                      <td>{u.city}</td>
                      <td>{u.state}</td>
                      <td>
                        <button
                          className={`status-toggle ${isActive ? "status-toggle--active" : "status-toggle--inactive"}`}
                          onClick={(e) => toggleStatus(u.id, e)}
                        >
                          <span className="status-toggle__dot" />
                          {isActive ? "Active" : "Deactivated"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="users-pagination">
          <span className="pagination-info">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
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
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
              )
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`e${i}`} className="pg-ellipsis">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    className={`pg-btn${p === page ? " pg-btn--active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
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

      {/* Off-canvas */}
      <UserOffCanvas
        user={selected ? { ...selected, active: statuses[selected.id] } : null}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default Users;
