import { Calendar, Users, ShieldAlert, UserCheck, MapPin, Clock, ExternalLink } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

export default function DashboardTab({
  events,
  reports,
  CHART_ANALYTICS_DATA,
  COLLEGE_BAR_DATA,
  setCurrentTab
}) {
  return (
    <div>
      {/* Cards row */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p>Events Scheduled</p>
            <h3>{events.length}</h3>
          </div>
          <div className="stat-icon teal">
            <Calendar size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Cumulative RSVPs</p>
            <h3>{events.reduce((acc, curr) => acc + (curr.attendee_count || 0), 0)}</h3>
          </div>
          <div className="stat-icon purple">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Open Reports</p>
            <h3>{reports.filter(r => r.status === "OPEN").length}</h3>
          </div>
          <div className="stat-icon pink">
            <ShieldAlert size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Avg Match spark</p>
            <h3>84%</h3>
          </div>
          <div className="stat-icon orange">
            <UserCheck size={24} />
          </div>
        </div>
      </section>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Main Area Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Engagement Overview</h3>
            <span className="text-dim text-xs">Total RSVP Registrations (6 Month)</span>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <AreaChart data={CHART_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRsvps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0b665c" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0b665c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="RSVPs" stroke="#0b665c" strokeWidth={3} fillOpacity={1} fill="url(#colorRsvps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart / Right Card */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>RSVP by College</h3>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={COLLEGE_BAR_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={32}>
                  {COLLEGE_BAR_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Teaser events listing */}
      <div className="events-section">
        <div className="section-header">
          <h3>Live Active Events</h3>
          <button onClick={() => setCurrentTab("events")} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            Open Event Manager
            <ExternalLink size={14} />
          </button>
        </div>
        <div className="events-table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Details</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>RSVP Count</th>
                <th>College Category</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 3).map(evt => (
                <tr key={evt.id}>
                  <td>
                    <div className="event-cell-info">
                      <img src={evt.image_url} alt="" className="event-img" />
                      <div className="event-title-meta">
                        <h4>{evt.title}</h4>
                        <p className="line-clamp-1">{evt.description.slice(0, 70)}...</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 text-sm text-muted">
                      <MapPin size={14} className="text-primary-light inline mr-1" style={{ color: 'var(--primary-light)' }} />
                      {evt.location}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 text-sm text-muted">
                      <Clock size={14} className="text-primary-light inline mr-1" style={{ color: 'var(--primary-light)' }} />
                      {new Date(evt.date_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td>
                    <span className="badge-rsvp going">
                      {evt.attendee_count} attending
                    </span>
                  </td>
                  <td>
                    <span className="event-tag">{evt.tags?.[0] || "General"}</span>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center" style={{ padding: '40px', color: 'var(--text-dim)' }}>
                    No events scheduled at this time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
