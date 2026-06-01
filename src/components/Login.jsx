import { CalendarDays } from 'lucide-react';

export default function Login({
  handleLogin,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  authError,
  authLoading
}) {
  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-logo">
          <CalendarDays size={28} className="text-white" style={{ color: '#ffffff' }} />
        </div>
        <h2>DBU Connect</h2>
        <p>Campus Event & Moderation Admin Hub</p>

        {authError && (
          <div className="alert-danger">
            ⚠️ {authError}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div className="form-group">
            <label>Administrator Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="universty email"
              required
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '28px' }}>
            <label>Security Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="*******"
              required
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }} 
            disabled={authLoading}
          >
            {authLoading ? "signing..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
