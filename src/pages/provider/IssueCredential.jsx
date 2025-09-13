import { useState, useEffect } from "react";
import { issueCredential, getAssessment } from "../../service/mockAPI";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./IssueCredential.module.scss";

/**
 * Issue Credential Page - Education Provider issues credentials after assessment
 * Can be accessed directly or after completing an assessment
 */
export default function IssueCredential() {
  const navigate = useNavigate();
  const location = useLocation();
  const [studentId, setStudentId] = useState("student_001");
  const [studentName, setStudentName] = useState("");
  const [assessmentId, setAssessmentId] = useState("assess_001");
  const [score, setScore] = useState(null);
  const [isIssued, setIsIssued] = useState(false);
  const [issuedCredential, setIssuedCredential] = useState(null);

  // Get assessment data
  const assessment = getAssessment(assessmentId);

  // Handle data from assessment completion
  useEffect(() => {
    if (location.state) {
      const { assessmentId: stateAssessmentId, score: stateScore } = location.state;
      if (stateAssessmentId) setAssessmentId(stateAssessmentId);
      if (stateScore !== undefined) setScore(stateScore);
    }
  }, [location.state]);

  function handleIssueCredential(e) {
    e.preventDefault();
    
    if (score === null) {
      alert("Please complete an assessment first or enter a score manually.");
      return;
    }

    const result = issueCredential({
      studentId,
      studentName: studentName || "Student A",
      assessmentId,
      score
    });

    setIssuedCredential(result.credential);
    setIsIssued(true);
  }

  function handleManualScoreChange(e) {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 100) {
      setScore(value);
    }
  }

  return (
    <div className={styles.issueContainer}>
      <div className={styles.header}>
        <h1>🎓 Issue Digital Credential</h1>
        <p>Create and issue a blockchain-verified digital credential for a student's assessment completion.</p>
      </div>

      {!isIssued ? (
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Credential Details</h2>
            <p>Fill in the student information and assessment details to issue a credential.</p>
          </div>

          <form onSubmit={handleIssueCredential}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="assessmentId">Assessment ID</label>
                <select
                  id="assessmentId"
                  value={assessmentId}
                  onChange={(e) => setAssessmentId(e.target.value)}
                >
                  <option value="assess_001">Assessment 001 - Basic Skills</option>
                  <option value="assess_002">Assessment 002 - Advanced Topics</option>
                  <option value="assess_003">Assessment 003 - Practical Application</option>
                </select>
              </div>
            </div>

            <div className={styles.scoreSection}>
              <h3>Assessment Score</h3>
              {score !== null ? (
                <div className={styles.scoreDisplay}>
                  <div className={styles.scoreValue}>{score}%</div>
                  <div className={styles.scoreLabel}>Final Score</div>
                </div>
              ) : (
                <div className={styles.manualScore}>
                  <label>Manual Score:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    onChange={handleManualScoreChange}
                  />
                </div>
              )}
            </div>

            <div className={styles.actionButtons}>
              <button type="submit" className={styles.primaryButton}>
                Issue Credential
              </button>
              <button 
                type="button" 
                onClick={() => navigate("/provider/dashboard")}
                className={styles.secondaryButton}
              >
                Back to Dashboard
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.credentialDisplay}>
          <h3>✅ Credential Successfully Issued!</h3>
          
          <div className={styles.credentialInfo}>
            <div className={styles.infoItem}>
              <div className={styles.label}>Student Name</div>
              <div className={styles.value}>{issuedCredential.studentName}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.label}>Student ID</div>
              <div className={styles.value}>{issuedCredential.studentId}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.label}>Assessment</div>
              <div className={styles.value}>{issuedCredential.assessmentId}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.label}>Credential ID</div>
              <div className={styles.value}>{issuedCredential.credentialId}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.label}>Issue Date</div>
              <div className={styles.value}>{new Date(issuedCredential.timestamp).toLocaleDateString()}</div>
            </div>
            <div className={`${styles.infoItem} ${styles.score}`}>
              <div className={styles.label}>Score</div>
              <div className={styles.value}>{issuedCredential.score}%</div>
            </div>
          </div>

          <div className={styles.txInfo}>
            <div className={styles.label}>Blockchain Transaction ID</div>
            <div className={styles.txId}>{issuedCredential.txId}</div>
          </div>

          <div className={styles.successMessage}>
            <span className={styles.icon}>🔗</span>
            <span>This credential has been recorded on the blockchain and is now verifiable by any HR department.</span>
          </div>

          <div className={styles.actionButtons}>
            <button 
              onClick={() => navigate("/provider/dashboard")}
              className={styles.primaryButton}
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate("/provider/chain")}
              className={styles.secondaryButton}
            >
              View All Records
            </button>
          </div>
        </div>
      )}
    </div>
  );
}