import { useState, useEffect } from "react";
import { issueCredential, getAssessment } from "../../service/mockAPI";
import { useNavigate, useLocation } from "react-router-dom";

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
    setScore(isNaN(value) ? null : value);
  }

  return (
    <div style={{...container, backgroundColor: "#0f172a", color: "white", minHeight: "100vh"}}>
      <h2 style={{color: "#ff6b35", fontSize: "2rem", marginBottom: "20px"}}>Issue Digital Credential</h2>
      <p style={{color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem", marginBottom: "30px"}}>Issue a blockchain-based credential for a completed assessment.</p>

      <div style={{...infoCard, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", borderRadius: "12px"}}>
        <h3 style={{color: "#4ecdc4", fontSize: "1.3rem", marginBottom: "15px"}}>Assessment Information</h3>
        <p style={{color: "white", margin: "8px 0"}}><strong>Assessment:</strong> {assessment.title}</p>
        <p style={{color: "white", margin: "8px 0"}}><strong>Assessment ID:</strong> {assessment.assessmentId}</p>
        <p style={{color: "white", margin: "8px 0"}}><strong>Questions:</strong> {assessment.questions.length}</p>
      </div>

      <form onSubmit={handleIssueCredential} style={form}>
        <div style={formGroup}>
          <label style={{color: "white", fontSize: "1.1rem", marginBottom: "8px", display: "block"}}>
            Student ID
            <input
              style={{...input, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px"}}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g., student_001"
              required
            />
          </label>
        </div>

        <div style={formGroup}>
          <label style={{color: "white", fontSize: "1.1rem", marginBottom: "8px", display: "block"}}>
            Student Name
            <input
              style={{...input, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px"}}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g., Alex Johnson"
            />
          </label>
        </div>

        <div style={formGroup}>
          <label style={{color: "white", fontSize: "1.1rem", marginBottom: "8px", display: "block"}}>
            Assessment Score (%)
            <input
              type="number"
              style={{...input, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px"}}
              value={score || ""}
              onChange={handleManualScoreChange}
              placeholder="Enter score (0-100)"
              min="0"
              max="100"
              required
            />
          </label>
          <small style={{...helpText, color: "rgba(255, 255, 255, 0.7)"}}>
            {score !== null ? `Score: ${score}%` : "Enter the student's assessment score"}
          </small>
        </div>

        <button type="submit" style={{...submitBtn, backgroundColor: "#ff6b35", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "1.1rem"}} disabled={score === null}>
          Issue Credential
        </button>
      </form>

      {isIssued && issuedCredential && (
        <div style={{...successCard, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", borderRadius: "12px", padding: "20px"}}>
          <h3 style={{color: "#4ecdc4", fontSize: "1.5rem", marginBottom: "20px"}}>✅ Credential Successfully Issued!</h3>
          <div style={{...credentialInfo, backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "15px", borderRadius: "8px"}}>
            <p style={{color: "white", margin: "8px 0"}}><strong>Credential ID:</strong> <code style={{backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "2px 6px", borderRadius: "4px"}}>{issuedCredential.credentialId}</code></p>
            <p style={{color: "white", margin: "8px 0"}}><strong>Transaction ID:</strong> <code style={{backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "2px 6px", borderRadius: "4px"}}>{issuedCredential.txId}</code></p>
            <p style={{color: "white", margin: "8px 0"}}><strong>Student:</strong> {issuedCredential.studentName}</p>
            <p style={{color: "white", margin: "8px 0"}}><strong>Score:</strong> {issuedCredential.score}%</p>
            <p style={{color: "white", margin: "8px 0"}}><strong>Issued At:</strong> {new Date(issuedCredential.timestamp).toLocaleString()}</p>
          </div>
          
          <div style={actionButtons}>
            <button onClick={() => navigate("/provider/chain")} style={{...primaryBtn, backgroundColor: "#ff6b35", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "1.1rem"}}>
              View Blockchain Records
            </button>
            <button onClick={() => navigate("/verify")} style={{...secondaryBtn, backgroundColor: "#2e86ab", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "1.1rem"}}>
              Test Verification
            </button>
            <button onClick={() => navigate("/provider/dashboard")} style={{...secondaryBtn, backgroundColor: "#2e86ab", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "1.1rem"}}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Basic styles only
const container = { padding: 20 };
const infoCard = { padding: 15, border: "1px solid #ccc", marginBottom: 20 };
const form = { margin: "20px 0" };
const formGroup = { margin: "10px 0" };
const input = { width: "100%", padding: 8, margin: "5px 0" };
const helpText = { color: "#666", fontSize: 12 };
const submitBtn = { padding: "10px 20px", margin: "10px 0" };
const successCard = { marginTop: 20, padding: 15, backgroundColor: "#d4edda", border: "1px solid #c3e6cb" };
const credentialInfo = { padding: 15, backgroundColor: "white", marginBottom: 15 };
const actionButtons = { display: "flex", gap: 10, flexWrap: "wrap" };
const primaryBtn = { padding: "10px 20px", margin: "5px" };
const secondaryBtn = { padding: "10px 20px", margin: "5px" };