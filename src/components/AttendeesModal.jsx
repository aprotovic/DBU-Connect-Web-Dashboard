export default function AttendeesModal({
  selectedEvent,
  setSelectedEvent,
  selectedAttendees
}) {
  return (
    <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '18px' }}>{selectedEvent.title}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Student RSVP attendance sheet.
            </p>
          </div>
          <button onClick={() => setSelectedEvent(null)} className="action-btn" style={{ border: 'none' }}>✕</button>
        </div>

        <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {selectedAttendees.length === 0 ? (
            <div className="text-center" style={{ padding: '24px', color: 'var(--text-dim)' }}>
              No RSVPs have checked into this event yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedAttendees.map((att, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '14px', 
                    background: 'rgba(255,255,255,0.02)', 
                    padding: '10px 16px', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border)' 
                  }}
                >
                  <img src={att.photo} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600' }}>{att.name}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {att.department} • Year {att.year}
                    </p>
                  </div>
                  <span className="badge-rsvp going">
                    {att.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={() => setSelectedEvent(null)} className="btn-secondary">Close Sheet</button>
        </div>
      </div>
    </div>
  );
}
