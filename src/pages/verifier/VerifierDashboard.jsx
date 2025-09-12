import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { verifyByTxId, verifyByCredentialId } from "../../service/mockAPI";

/**
 * Verifier Dashboard - HR Credential Verification
 * Modern design inspired by the provided images with gradient backgrounds and glowing effects
 */
export default function VerifierDashboard() {
  const { session, setSession } = useAuth();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("txId");
  const [searchValue, setSearchValue] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  function handleLogout() {
    setSession(null);
    navigate("/login", { replace: true });
  }

  async function handleVerify(e) {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsSearching(true);
    try {
      let result;
      if (searchType === "txId") {
        result = await verifyByTxId(searchValue);
      } else {
        result = await verifyByCredentialId(searchValue);
      }
      setVerificationResult(result);
    } catch (error) {
      setVerificationResult({ 
        valid: false, 
        error: "Credential not found or invalid. Please check the ID and try again." 
      });
    }
    setIsSearching(false);
  }

  function clearResult() {
    setVerificationResult(null);
    setSearchValue("");
  }

  return (
    <div className="verifier-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h2 className="dashboard-title">🔍 HR Credential Verification</h2>
            <p className="welcome-text">Welcome, <strong>{session?.name || "HR Verifier"}</strong></p>
            <p className="subtitle">Verify candidate credentials by entering their Transaction ID or Credential ID.</p>
          </div>
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="search-card">
        <h3>Candidate Credential Check</h3>
        <p>Enter the candidate's credential information to verify their skills and qualifications.</p>
        
        <form onSubmit={handleVerify} className="verification-form">
          <div className="form-group">
            <label className="form-label">Search Type</label>
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              className="form-input"
            >
              <option value="txId">Transaction ID</option>
              <option value="credentialId">Credential ID</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              {searchType === "txId" ? "Transaction ID" : "Credential ID"}
            </label>
            <input
              type="text"
              placeholder={`Enter ${searchType === "txId" ? "Transaction" : "Credential"} ID`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`btn-primary ${isSearching ? 'loading' : ''}`}
            disabled={isSearching || !searchValue.trim()}
          >
            {isSearching ? "Verifying..." : "Verify Candidate Credential"}
          </button>
        </form>
      </div>

      {verificationResult && (
        <div className="result-card">
          <div className="result-header">
            <h3>Verification Result</h3>
            <button onClick={clearResult} className="btn-secondary">
              Clear Result
            </button>
          </div>

          {verificationResult.valid ? (
            <div className="success-result">
              <div className="status-badge success">
                ✅ Credential Verified - Candidate Qualified
              </div>
              
              <div className="credential-details">
                <h4>Candidate Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Student Name:</span>
                    <span className="detail-value">{verificationResult.credential.studentName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Student ID:</span>
                    <span className="detail-value">{verificationResult.credential.studentId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Assessment ID:</span>
                    <span className="detail-value">{verificationResult.credential.assessmentId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Performance Score:</span>
                    <span className={`score-badge ${verificationResult.credential.score >= 70 ? 'pass' : verificationResult.credential.score >= 50 ? 'partial' : 'fail'}`}>
                      {verificationResult.credential.score}%
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Issue Date:</span>
                    <span className="detail-value">
                      {new Date(verificationResult.credential.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Transaction ID:</span>
                    <span className="tx-id">{verificationResult.credential.txId}</span>
                  </div>
                </div>
              </div>

              <div className="blockchain-info">
                <h4>Blockchain Verification</h4>
                <div className="verification-details">
                  <div className="verification-item">
                    <span className="verification-label">Status:</span>
                    <span className="status-valid">✓ Verified on Blockchain</span>
                  </div>
                  <div className="verification-item">
                    <span className="verification-label">Integrity:</span>
                    <span className="status-valid">✓ Data Tamper-Proof</span>
                  </div>
                  <div className="verification-item">
                    <span className="verification-label">Issuer:</span>
                    <span className="detail-value">Education Provider</span>
                  </div>
                </div>
              </div>

              <div className="recommendation">
                <h4>HR Recommendation</h4>
                <p>
                  {verificationResult.credential.score >= 70 
                    ? "✅ This candidate has demonstrated strong performance and is recommended for the position."
                    : verificationResult.credential.score >= 50
                    ? "⚠️ This candidate shows moderate performance. Consider additional evaluation."
                    : "❌ This candidate's performance does not meet the required standards."
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="error-result">
              <div className="status-badge error">
                ❌ Credential Verification Failed
              </div>
              <p className="error-message">
                {verificationResult.error || "The credential could not be verified. Please check the ID and try again."}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="help-card">
        <h3>About HR Credential Verification</h3>
        <div className="help-content">
          <div className="help-section">
            <h4>How it works:</h4>
            <ul>
              <li>Enter the candidate's Transaction ID or Credential ID</li>
              <li>Our system verifies the credential against the blockchain</li>
              <li>View detailed candidate information and performance scores</li>
              <li>Make informed hiring decisions based on verified data</li>
            </ul>
          </div>
          <div className="help-section">
            <h4>Benefits for HR:</h4>
            <ul>
              <li>Instant verification of candidate credentials</li>
              <li>Tamper-proof data from blockchain technology</li>
              <li>Detailed performance metrics and recommendations</li>
              <li>Streamlined hiring process with verified qualifications</li>
            </ul>
          </div>
        </div>
        <p className="help-footer">
          This system ensures that all candidate credentials are authentic and verified, 
          helping you make confident hiring decisions based on reliable data.
        </p>
      </div>

      <style jsx>{`
        .verifier-dashboard {
          min-height: 100vh;
          background: var(--digital-dark);
          padding: 32px;
          position: relative;
          overflow: hidden;
        }

        .verifier-dashboard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(46, 134, 171, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .dashboard-header {
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 24px;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary-green) 0%, var(--digital-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }

        .welcome-text {
          color: white;
          font-size: 1.2rem;
          margin-bottom: 8px;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
        }

        .search-card, .result-card, .help-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .search-card h3, .result-card h3, .help-card h3 {
          color: var(--gray-800);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .search-card p, .help-card p {
          color: var(--gray-600);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .verification-form {
          margin-top: 24px;
        }

        .form-group {
          margin-bottom: 20px;
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
          border-radius: 12px;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-green);
          box-shadow: 
            0 0 0 4px rgba(78, 205, 196, 0.1),
            0 4px 12px rgba(78, 205, 196, 0.15);
          transform: translateY(-2px);
        }

        .btn-primary, .btn-secondary, .btn-danger {
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary-green) 0%, #10B981 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--digital-blue) 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(46, 134, 171, 0.3);
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(46, 134, 171, 0.4);
        }

        .btn-danger {
          background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .status-badge {
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 24px;
          text-align: center;
        }

        .status-badge.success {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .status-badge.error {
          background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .credential-details, .blockchain-info, .recommendation {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
          border: 1px solid var(--gray-200);
        }

        .credential-details h4, .blockchain-info h4, .recommendation h4 {
          color: var(--gray-800);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--gray-100);
        }

        .detail-label {
          font-weight: 600;
          color: var(--gray-700);
        }

        .detail-value {
          color: var(--gray-600);
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .score-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .score-badge.pass {
          background: #10B981;
          color: white;
        }

        .score-badge.partial {
          background: #F59E0B;
          color: white;
        }

        .score-badge.fail {
          background: #EF4444;
          color: white;
        }

        .tx-id {
          font-family: 'Monaco', 'Menlo', monospace;
          background: var(--gray-100);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .verification-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .verification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .verification-label {
          font-weight: 600;
          color: var(--gray-700);
        }

        .status-valid {
          color: #10B981;
          font-weight: 600;
        }

        .error-result {
          text-align: center;
        }

        .error-message {
          color: #DC2626;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .help-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .help-section h4 {
          color: var(--gray-800);
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .help-section ul {
          list-style: none;
          padding: 0;
        }

        .help-section li {
          color: var(--gray-600);
          padding: 4px 0;
          position: relative;
          padding-left: 20px;
        }

        .help-section li::before {
          content: '•';
          color: var(--primary-green);
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .help-footer {
          background: linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(46, 134, 171, 0.1) 100%);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(78, 205, 196, 0.2);
          font-style: italic;
          color: var(--gray-700);
        }

        @media (max-width: 768px) {
          .verifier-dashboard {
            padding: 20px;
          }
          
          .header-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .dashboard-title {
            font-size: 2rem;
          }
          
          .detail-grid, .verification-details {
            grid-template-columns: 1fr;
          }
          
          .help-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}