import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../App";

/**
 * Login Page - Modern design inspired by the provided images
 * Features gradient backgrounds, glowing effects, and modern typography
 */
export default function Login() {
  const { setSession } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("provider");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock user database for PoC
  const mockUsers = {
    provider: [
      { username: "admin", password: "admin123", name: "Education Admin", role: "provider" },
      { username: "teacher1", password: "teacher123", name: "Ms. Johnson", role: "provider" },
      { username: "school", password: "school123", name: "Springfield High", role: "provider" }
    ],
    verifier: [
      { username: "verifier1", password: "verify123", name: "HR Verifier", role: "verifier" },
      { username: "employer", password: "employer123", name: "Tech Corp", role: "verifier" },
      { username: "recruiter", password: "recruit123", name: "Talent Agency", role: "verifier" }
    ]
  };

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const users = mockUsers[role];
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        const session = { 
          role: user.role, 
          name: user.name,
          username: user.username,
          isAuthenticated: true
        };
        setSession(session);
        navigate(role === "provider" ? "/provider/dashboard" : "/verifier/dashboard", { replace: true });
      } else {
        setError("Invalid username or password for the selected role.");
      }
      setIsLoading(false);
    }, 800);
  }

  function handleDemoLogin(role) {
    const demoUsers = mockUsers[role];
    const demoUser = demoUsers[0]; // Use first demo user
    
    const session = { 
      role: demoUser.role, 
      name: demoUser.name,
      username: demoUser.username,
      isAuthenticated: true
    };
    setSession(session);
    navigate(role === "provider" ? "/provider/dashboard" : "/verifier/dashboard", { replace: true });
  }

  return (
    <div className="login-container">
      <div className="login-card fade-in-up">
        <div className="login-header">
          <h1 className="login-title">⚡ Skills Wallet</h1>
          <p className="login-subtitle">Digital Credential Management System</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="form-input"
            >
              <option value="provider">Education Provider</option>
              <option value="verifier">HR Verifier</option>
            </select>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || !username || !password}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="divider">
          <span>or try demo accounts</span>
        </div>

        <div className="demo-section">
          <h3>Demo Accounts</h3>
          <div className="demo-grid">
            <div className="demo-card">
              <h4>Education Provider</h4>
              <p>Username: <code>admin</code></p>
              <p>Password: <code>admin123</code></p>
              <button 
                onClick={() => handleDemoLogin("provider")} 
                className="btn-success"
              >
                Demo as Provider
              </button>
            </div>
            <div className="demo-card">
              <h4>HR Verifier</h4>
              <p>Username: <code>verifier1</code></p>
              <p>Password: <code>verify123</code></p>
              <button 
                onClick={() => handleDemoLogin("verifier")} 
                className="btn-success"
              >
                Demo as HR
              </button>
            </div>
          </div>
        </div>

        <div className="help-text">
          <h4>Available Demo Accounts:</h4>
          <div className="account-list">
            <div>
              <strong>Education Providers:</strong>
              <ul>
                <li>admin / admin123</li>
                <li>teacher1 / teacher123</li>
                <li>school / school123</li>
              </ul>
            </div>
            <div>
              <strong>HR Verifiers:</strong>
              <ul>
                <li>verifier1 / verify123</li>
                <li>employer / employer123</li>
                <li>recruiter / recruit123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--digital-dark);
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(46, 134, 171, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 48px;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          max-width: 500px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary-orange) 0%, var(--sunset-orange) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          text-shadow: 0 4px 8px rgba(255, 107, 53, 0.3);
        }

        .login-subtitle {
          color: var(--gray-600);
          font-size: 1.1rem;
          font-weight: 500;
        }

        .login-form {
          margin: 32px 0;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: var(--gray-700);
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid var(--gray-200);
          border-radius: 16px;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 
            0 0 0 4px rgba(46, 134, 171, 0.1),
            0 4px 12px rgba(46, 134, 171, 0.15);
          transform: translateY(-2px);
        }

        .error-message {
          background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
          color: #DC2626;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #FECACA;
          margin: 16px 0;
          font-weight: 500;
        }

        .btn-primary {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, var(--primary-orange) 0%, var(--sunset-orange) 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-success {
          padding: 12px 20px;
          background: linear-gradient(135deg, var(--primary-green) 0%, #10B981 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
        }

        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
        }

        .divider {
          text-align: center;
          margin: 32px 0;
          position: relative;
          color: var(--gray-500);
          font-weight: 500;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--gray-300) 50%, transparent 100%);
        }

        .demo-section {
          margin: 32px 0;
        }

        .demo-section h3 {
          text-align: center;
          color: var(--gray-700);
          margin-bottom: 20px;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .demo-card {
          background: linear-gradient(135deg, var(--gray-50) 0%, white 100%);
          border: 2px solid var(--gray-200);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .demo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-green);
        }

        .demo-card h4 {
          color: var(--gray-800);
          margin-bottom: 12px;
        }

        .demo-card p {
          color: var(--gray-600);
          font-size: 0.9rem;
          margin: 4px 0;
        }

        .demo-card code {
          background: var(--gray-100);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.85rem;
        }

        .help-text {
          margin-top: 32px;
          padding: 24px;
          background: linear-gradient(135deg, rgba(46, 134, 171, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%);
          border-radius: 16px;
          border: 1px solid rgba(46, 134, 171, 0.1);
        }

        .help-text h4 {
          color: var(--gray-700);
          margin-bottom: 16px;
          text-align: center;
        }

        .account-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .account-list div {
          background: white;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--gray-200);
        }

        .account-list strong {
          color: var(--gray-800);
          display: block;
          margin-bottom: 8px;
        }

        .account-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .account-list li {
          color: var(--gray-600);
          font-size: 0.9rem;
          padding: 2px 0;
        }

        @media (max-width: 768px) {
          .login-card {
            padding: 32px 24px;
            margin: 20px;
          }
          
          .login-title {
            font-size: 2.5rem;
          }
          
          .demo-grid {
            grid-template-columns: 1fr;
          }
          
          .account-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}