import React from 'react'

const BUSINESSES = [
  { rank: 1,  name: 'Raj Photo Studio',    category: 'Photo Studio',   location: 'Mumbai, IN',     rating: 4.9, bookings: 312, revenue: '$18,400', status: 'Active'    },
  { rank: 2,  name: 'Lens & Light Co.',    category: 'Photographer',   location: 'London, UK',     rating: 4.8, bookings: 284, revenue: '$14,200', status: 'Active'    },
  { rank: 3,  name: 'Digital Zone Labs',   category: 'Digital Lab',    location: 'Dubai, UAE',     rating: 4.7, bookings: 260, revenue: '$12,800', status: 'Active'    },
  { rank: 4,  name: 'Frame Perfect',       category: 'Video Grapher',  location: 'New York, US',   rating: 4.7, bookings: 241, revenue: '$11,500', status: 'Active'    },
  { rank: 5,  name: 'Pixel Arts Studio',   category: 'Photo Studio',   location: 'Sydney, AU',     rating: 4.6, bookings: 218, revenue: '$10,900', status: 'Active'    },
  { rank: 6,  name: 'Creative Visuals',    category: 'Editor',         location: 'Toronto, CA',    rating: 4.5, bookings: 196, revenue: '$9,200',  status: 'Active'    },
  { rank: 7,  name: 'Vivid Album House',   category: 'Album Designer', location: 'Bangalore, IN',  rating: 4.5, bookings: 184, revenue: '$8,600',  status: 'Inactive'  },
  { rank: 8,  name: 'Snap & Story',        category: 'Freelancer',     location: 'Singapore, SG',  rating: 4.4, bookings: 172, revenue: '$7,800',  status: 'Active'    },
  { rank: 9,  name: 'GoldenFrame Studio',  category: 'Photo Studio',   location: 'Tokyo, JP',      rating: 4.3, bookings: 155, revenue: '$7,100',  status: 'Active'    },
  { rank: 10, name: 'Twilight Reels',      category: 'Video Grapher',  location: 'São Paulo, BR',  rating: 4.2, bookings: 140, revenue: '$6,400',  status: 'Inactive'  },
]

const Stars = ({ n }) => (
  <span className="stars">
    {'★'.repeat(Math.floor(n))}{'☆'.repeat(5 - Math.floor(n))}
    <span className="stars-val">{n}</span>
  </span>
)

const TopBusinessTable = () => (
  <div className="dash-card">
    <div className="dash-card__head">
      <div>
        <h6 className="dash-card__title">Top Business Users</h6>
        <p className="dash-card__sub">Ranked by total revenue generated</p>
      </div>
      <button className="btn btn-sm btn-outline-secondary" style={{ fontSize: 12 }}>Export CSV</button>
    </div>

    <div className="table-responsive">
      <table className="table table-hover dash-table mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Business Name</th>
            <th>Category</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Bookings</th>
            <th>Revenue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {BUSINESSES.map(b => (
            <tr key={b.rank}>
              <td>
                <span className={`rank-badge rank-badge--${b.rank <= 3 ? b.rank : 'other'}`}>
                  {b.rank}
                </span>
              </td>
              <td className="td-name fw-semibold">{b.name}</td>
              <td>
                <span className="type-tag">{b.category}</span>
              </td>
              <td className="text-muted" style={{ fontSize: 12.5 }}>{b.location}</td>
              <td><Stars n={b.rating}/></td>
              <td className="fw-semibold text-center">{b.bookings}</td>
              <td className="fw-bold" style={{ color: '#10b981' }}>{b.revenue}</td>
              <td>
                <span
                  className="status-pill"
                  style={
                    b.status === 'Active'
                      ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' }
                      : { background: 'rgba(100,116,139,0.1)', color: '#64748b' }
                  }
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default TopBusinessTable
