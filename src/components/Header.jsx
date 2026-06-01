import { RefreshCw, Plus } from 'lucide-react';

export default function Header({
  currentTab,
  isLiveMode,
  fetchLiveDashboardData,
  loading,
  setShowAddModal
}) {
  return (
    <header className="header-panel">
      <div className="header-title">
        <h1>
          {currentTab === "dashboard" ? "Dashboard Analytics" : currentTab === "events" ? "Manage Campus Events" : "Student Moderation Hub"}
        </h1>
        <p>
          {currentTab === "dashboard" && "Track real-time student engagement, match trends, and college RSVPs."}
          {currentTab === "events" && "Deploy new events, schedule acoustic bonfires, and audit attendee lists."}
          {currentTab === "moderation" && "Process student reports, flag inappropriate profiles, and audit RLS bans."}
        </p>
      </div>

      <div className="header-actions">
        <div className={`badge-mode ${isLiveMode ? "live" : ""}`}>
          <div 
            className={`w-2.5 h-2.5 rounded-full ${isLiveMode ? "bg-green-500" : "bg-amber-500"}`} 
            style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isLiveMode ? '#22c55e' : '#f59e0b' }} 
          />
          {isLiveMode ? "Connected Live" : "Local Mock Sandbox"}
        </div>

        <button onClick={fetchLiveDashboardData} className="btn-secondary" disabled={loading}>
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Sync Data
        </button>

        {currentTab === "events" && (
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            <Plus size={18} />
            Create Event
          </button>
        )}
      </div>
    </header>
  );
}
