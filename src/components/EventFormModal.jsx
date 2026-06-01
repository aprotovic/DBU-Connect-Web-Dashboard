export default function EventFormModal({
  isEditing,
  closeFormModal,
  handleCreateOrUpdateEvent,
  formTitle,
  setFormTitle,
  formDesc,
  setFormDesc,
  formDateTime,
  setFormDateTime,
  formEndTime,
  setFormEndTime,
  formLocation,
  setFormLocation,
  formImageUrl,
  setFormImageUrl,
  formTags,
  setFormTags,
  loading
}) {
  return (
    <div className="modal-overlay" onClick={closeFormModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? "Edit Campus Event" : "Create New Campus Event"}</h3>
          <button onClick={closeFormModal} className="action-btn" style={{ border: 'none' }}>✕</button>
        </div>

        <form onSubmit={handleCreateOrUpdateEvent}>
          <div className="modal-body">
            <div className="form-group">
              <label>Event Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Acoustic Night & Bonfire"
                required
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Explain what the event is, who it is for, and why students should match and attend..."
                value={formDesc}
                onChange={e => setFormDesc(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Start Date & Time *</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  required
                  value={formDateTime}
                  onChange={e => setFormDateTime(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formEndTime}
                  onChange={e => setFormEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Venue / Location *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Asrat Woldeyes Main Auditorium"
                required
                value={formLocation}
                onChange={e => setFormLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Poster Image URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://images.unsplash.com/photo-..."
                value={formImageUrl}
                onChange={e => setFormImageUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Category Tags (Comma separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Computing, Hackathon, Social"
                value={formTags}
                onChange={e => setFormTags(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={closeFormModal} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Deploying..." : (isEditing ? "Save Changes" : "Deploy to Campus")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
