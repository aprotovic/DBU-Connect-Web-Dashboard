import { Search, MapPin, Clock, Users, Edit3, Trash2 } from 'lucide-react';

export default function EventsTab({
  searchQuery,
  setSearchQuery,
  filteredEvents,
  openAttendeesModal,
  openEditModal,
  handleDeleteEvent
}) {
  return (
    <div className="events-section">
      <div className="section-header">
        <div className="search-bar">
          <Search size={18} className="text-dim" />
          <input
            type="text"
            placeholder="Search by title or venue..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="events-table-wrapper">
        <table className="events-table">
          <thead>
            <tr>
              <th>Event Details</th>
              <th>Location / Venue</th>
              <th>Scheduled Date</th>
              <th>RSVP Status</th>
              <th>Category Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(evt => (
              <tr key={evt.id}>
                <td>
                  <div className="event-cell-info">
                    <img src={evt.image_url} alt="" className="event-img" />
                    <div className="event-title-meta">
                      <h4>{evt.title}</h4>
                      <p>{evt.description.slice(0, 60)}...</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm text-muted">
                    <MapPin size={14} className="text-primary-light inline mr-1" style={{ color: 'var(--primary-light)' }} />
                    {evt.location}
                  </div>
                </td>
                <td>
                  <div className="text-sm text-muted">
                    <Clock size={14} className="text-primary-light inline mr-1" style={{ color: 'var(--primary-light)' }} />
                    {new Date(evt.date_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => openAttendeesModal(evt)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', gap: '6px' }}
                  >
                    <Users size={12} />
                    {evt.attendee_count} Attendees
                  </button>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {evt.tags?.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="event-tag">{tag}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => openEditModal(evt)} className="action-btn" title="Edit Event Details">
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDeleteEvent(evt.id)} className="action-btn delete" title="Delete Event">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEvents.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center" style={{ padding: '40px', color: 'var(--text-dim)' }}>
                  No matching scheduled events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
