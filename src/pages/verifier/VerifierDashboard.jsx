import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { verifyByTxId, verifyByCredentialId } from "../../service/mockAPI";
import { 
  Button, 
  Card, 
  Input, 
  Typography, 
  Container, 
  Grid,
  Badge 
} from "../../components/ui";

/**
 * Verifier Dashboard - HR Credential Verification
 * Modern design with gradient backgrounds and glowing effects
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
    <div className={styles.verifierContainer}>
      <div className={styles.header}>
        <div className={styles.welcomeSection}>
          <h1>🔍 HR Credential Verification</h1>
          <p>Welcome, <strong>{session?.name || "HR Verifier"}</strong></p>
          <p>Verify candidate credentials by entering their Transaction ID or Credential ID.</p>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      <div className={styles.verificationSection}>
        <div className={styles.sectionHeader}>
          <h2>Candidate Credential Check</h2>
          <p>Enter the candidate's credential information to verify their skills and qualifications.</p>
        </div>
        
        <form onSubmit={handleVerify} className={styles.verificationForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Search Type</label>
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              className={styles.formInput}
            >
              <option value="txId">Transaction ID</option>
              <option value="credentialId">Credential ID</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              {searchType === "txId" ? "Transaction ID" : "Credential ID"}
            </label>
            <input
              type="text"
              placeholder={`Enter ${searchType === "txId" ? "Transaction" : "Credential"} ID`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`${styles.verifyButton} ${isSearching ? styles.loading : ''}`}
            disabled={isSearching || !searchValue.trim()}
          >
            {isSearching ? "Verifying..." : "Verify Candidate Credential"}
          </button>
        </form>
      </div>

      {verificationResult && (
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            <h3>Verification Result</h3>
            <button onClick={clearResult} className={styles.secondaryButton}>
              Clear Result
            </button>
          </div>

          {verificationResult.valid ? (
            <div className={styles.successResult}>
              <div className={`${styles.verificationStatus} ${styles.valid}`}>
                <span className={styles.statusIcon}>✅</span>
                <span className={styles.statusText}>Credential Verified - Candidate Qualified</span>
              </div>
              
              <div className={styles.credentialDetails}>
                <h4>Candidate Information</h4>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <div className={styles.label}>Student Name:</div>
                    <div className={styles.value}>{verificationResult.credential.studentName}</div>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.label}>Student ID:</div>
                    <div className={styles.value}>{verificationResult.credential.studentId}</div>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.label}>Assessment ID:</div>
                    <div className={styles.value}>{verificationResult.credential.assessmentId}</div>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.label}>Performance Score:</div>
                    <div className={`${styles.value} ${styles.score}`}>
                      {verificationResult.credential.score}%
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.label}>Issue Date:</div>
                    <div className={styles.value}>
                      {new Date(verificationResult.credential.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.label}>Transaction ID:</div>
                    <div className={styles.txId}>{verificationResult.credential.txId}</div>
                  </div>
                </div>
              </div>

              <div className={styles.blockchainInfo}>
                <h4>Blockchain Verification</h4>
                <div className={styles.verificationDetails}>
                  <div className={styles.verificationItem}>
                    <span className={styles.verificationLabel}>Status:</span>
                    <span className={styles.statusValid}>✓ Verified on Blockchain</span>
                  </div>
                  <div className={styles.verificationItem}>
                    <span className={styles.verificationLabel}>Integrity:</span>
                    <span className={styles.statusValid}>✓ Data Tamper-Proof</span>
                  </div>
                  <div className={styles.verificationItem}>
                    <span className={styles.verificationLabel}>Issuer:</span>
                    <span className={styles.detailValue}>Education Provider</span>
                  </div>
                </div>
              </div>

              <div className={styles.recommendation}>
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
            <div className={styles.errorResult}>
              <div className={`${styles.verificationStatus} ${styles.invalid}`}>
                <span className={styles.statusIcon}>❌</span>
                <span className={styles.statusText}>Credential Verification Failed</span>
              </div>
              <p className={styles.errorMessage}>
                {verificationResult.error || "The credential could not be verified. Please check the ID and try again."}
              </p>
            </div>
          )}
        </div>
      )}

      <div className={styles.helpSection}>
        <h3>About HR Credential Verification</h3>
        <div className={styles.helpContent}>
          <div className={styles.helpItem}>
            <h4>How it works:</h4>
            <ul>
              <li>Enter the candidate's Transaction ID or Credential ID</li>
              <li>Our system verifies the credential against the blockchain</li>
              <li>View detailed candidate information and performance scores</li>
              <li>Make informed hiring decisions based on verified data</li>
            </ul>
          </div>
          <div className={styles.helpItem}>
            <h4>Benefits for HR:</h4>
            <ul>
              <li>Instant verification of candidate credentials</li>
              <li>Tamper-proof data from blockchain technology</li>
              <li>Detailed performance metrics and recommendations</li>
              <li>Streamlined hiring process with verified qualifications</li>
            </ul>
          </div>
        </div>
        <p className={styles.helpFooter}>
          This system ensures that all candidate credentials are authentic and verified, 
          helping you make confident hiring decisions based on reliable data.
        </p>
      </div>
    </div>
  );
}