import { ShieldAlert, UserCheck, Lock } from 'lucide-react';

export default function ModerationTab({
  reports,
  handleReportAction
}) {
  return (
    <div className="events-section">
      <div className="section-header">
        <h3>Active Student Reports</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reports.map(rep => (
          <div key={rep.id} className="report-card">
            <div className="report-header">
              <div className="report-users">
                <ShieldAlert size={18} className="text-rose-500" style={{ color: '#f43f5e' }} />
                <span>Reporter: <strong>{rep.reporter_name || rep.reporter_email}</strong></span>
                <span className="text-dim">→</span>
                <span>Reported: <strong className="text-rose-400" style={{ color: '#fb7185' }}>{rep.reported_name || rep.reported_email}</strong></span>
              </div>
              <span className={`badge-status ${rep.status.toLowerCase()}`}>
                {rep.status}
              </span>
            </div>

            <div className="report-body">
              <h5>Reason: {rep.reason}</h5>
              <p>{rep.details || "No further details submitted by the reporter."}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '8px' }}>
                Submitted: {new Date(rep.created_at).toLocaleString()}
              </p>
            </div>

            {rep.status === "OPEN" && (
              <div className="report-actions">
                <button
                  onClick={() => handleReportAction(rep.id, "REVIEWED")}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '13px', background: 'var(--primary)' }}
                >
                  <UserCheck size={14} />
                  Keep & Dismiss
                </button>
                <button
                  onClick={() => handleReportAction(rep.id, "ACTIONED")}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '13px', background: 'linear-gradient(135deg, #e11d48, #be123c)', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)' }}
                >
                  <Lock size={14} />
                  Restrict & Ban User
                </button>
              </div>
            )}
          </div>
        ))}
        {reports.length === 0 && (
          <div className="text-center" style={{ padding: '40px', color: 'var(--text-dim)' }}>
            No student profile reports logged at this time.
          </div>
        )}
      </div>
    </div>
  );
}
