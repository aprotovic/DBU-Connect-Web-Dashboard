import { LayoutDashboard, Calendar, ShieldAlert, LogOut, CalendarDays } from 'lucide-react';

export default function Sidebar({
  currentTab,
  setCurrentTab,
  adminProfile,
  handleLogout
}) {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">
          <CalendarDays size={24} className="text-white" />
        </div>
        <div className="logo-text">
          <h2>DBU Connect</h2>
          <p>Admin Portal</p>
        </div>
      </div>

      <nav className="nav-links">
        <button
          onClick={() => setCurrentTab("dashboard")}
          className={`nav-item ${currentTab === "dashboard" ? "active" : ""}`}
        >
          <LayoutDashboard size={20} />
          Overview Dashboard
        </button>
        <button
          onClick={() => setCurrentTab("events")}
          className={`nav-item ${currentTab === "events" ? "active" : ""}`}
        >
          <Calendar size={20} />
          Event Manager
        </button>
        <button
          onClick={() => setCurrentTab("moderation")}
          className={`nav-item ${currentTab === "moderation" ? "active" : ""}`}
        >
          <ShieldAlert size={20} />
          Moderation Hub
        </button>
      </nav>

      <div className="sidebar-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '16px 12px', background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid var(--border)', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden', flex: 1 }}>
          {adminProfile?.photo ? (
            <img
              src={adminProfile.photo}
              alt=""
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-glow)' }}
            />
          ) : (
            <div
              className="admin-avatar"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '14px',
                flexShrink: 0
              }}
            >
              {adminProfile?.name ? adminProfile.name.slice(0, 2).toUpperCase() : 'AD'}
            </div>
          )}
          <div className="admin-info" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {adminProfile?.name || 'DBU Admin'}
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: '2px 0 0 0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {adminProfile?.department || 'Superuser'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="action-btn"
          title="Log Out"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
