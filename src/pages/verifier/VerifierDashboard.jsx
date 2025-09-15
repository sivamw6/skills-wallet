import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { 
  verifyByTxId, 
  verifyByCredentialId, 
  getStudentCredentials, 
  verifyCredentialToken 
} from "../../service/mockAPI";
import { 
  Button, 
  Typography, 
  Container, 
  Card, 
  Badge, 
  Input, 
  Select, 
  FormGroup 
} from "../../components/ui";
import VerificationForm from "../../components/verifier/VerificationForm";
import VerificationResult from "../../components/verifier/VerificationResult";
import HelpSection from "../../components/verifier/HelpSection";

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
  const [studentId, setStudentId] = useState("");
  const [studentCredentials, setStudentCredentials] = useState(null);
  const [isLoadingStudent, setIsLoadingStudent] = useState(false);

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
    } catch {
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

  async function handleStudentSearch(e) {
    e.preventDefault();
    if (!studentId.trim()) return;

    setIsLoadingStudent(true);
    try {
      const result = await getStudentCredentials(studentId);
      setStudentCredentials(result);
    } catch {
      setStudentCredentials({ 
        success: false, 
        error: "Failed to load student credentials. Please try again." 
      });
    }
    setIsLoadingStudent(false);
  }

  async function handleTokenVerify(tokenId) {
    try {
      const result = await verifyCredentialToken(tokenId);
      setVerificationResult(result);
    } catch {
      setVerificationResult({ 
        valid: false, 
        error: "Failed to verify token. Please try again." 
      });
    }
  }

  function clearStudentResults() {
    setStudentCredentials(null);
    setStudentId("");
  }

  return (
    <Container variant="default" size="lg">
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '3rem' 
      }}>
        <div>
          <Typography variant="h1" color="primary">
            🔍 HR Credential Verification
          </Typography>
          <Typography variant="body" color="white">
            Welcome, <strong>{session?.name || "HR Verifier"}</strong>
          </Typography>
          <Typography variant="body" color="white">
            Verify candidate credentials by entering their Transaction ID or Credential ID.
          </Typography>
        </div>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Verification Options */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '2rem', 
        marginBottom: '3rem' 
      }}>
        {/* Individual Token Verification */}
        <Card variant="glass" spacing="lg">
          <Typography variant="h3" color="primary" style={{ marginBottom: '1rem' }}>
            🔍 Individual Token Verification
          </Typography>
          <Typography variant="body" color="white" style={{ marginBottom: '2rem' }}>
            Verify a specific credential by entering its Transaction ID or Credential ID.
          </Typography>
          
          <VerificationForm
            searchType={searchType}
            setSearchType={setSearchType}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSubmit={handleVerify}
            isSearching={isSearching}
          />
        </Card>

        {/* Student ID Search */}
        <Card variant="glass" spacing="lg">
          <Typography variant="h3" color="primary" style={{ marginBottom: '1rem' }}>
            👤 Student Credentials Lookup
          </Typography>
          <Typography variant="body" color="white" style={{ marginBottom: '2rem' }}>
            Enter a student ID to view all their credentials and exam results.
          </Typography>
          
          <form onSubmit={handleStudentSearch}>
            <FormGroup>
              <Input
                label="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID (e.g., student_001)"
                required
              />
            </FormGroup>
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              loading={isLoadingStudent}
            >
              {isLoadingStudent ? "Searching..." : "Search Student"}
            </Button>
          </form>
        </Card>
      </div>

      {/* Verification Result Section */}
      <VerificationResult 
        result={verificationResult} 
        onClear={clearResult} 
      />

      {/* Student Credentials Results */}
      {studentCredentials && (
        <Card variant="glass" spacing="lg" style={{ marginBottom: '3rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <Typography variant="h3" color="primary">
              Student Credentials Results
            </Typography>
            <Button variant="secondary" size="sm" onClick={clearStudentResults}>
              Clear Results
            </Button>
          </div>

          {studentCredentials.success ? (
            <>
              {/* Student Summary */}
              <Card variant="dark" spacing="md" style={{ marginBottom: '2rem' }}>
                <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
                  📊 Student Summary
                </Typography>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Typography variant="body" color="white">
                      <strong>Student Name:</strong><br />
                      {studentCredentials.studentName}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body" color="white">
                      <strong>Student ID:</strong><br />
                      {studentCredentials.studentId}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body" color="white">
                      <strong>Total Credentials:</strong><br />
                      {studentCredentials.totalCredentials}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body" color="white">
                      <strong>Average Score:</strong><br />
                      <Badge variant="success" size="lg">
                        {studentCredentials.averageScore}%
                      </Badge>
                    </Typography>
                  </div>
                </div>
              </Card>

              {/* Individual Credentials */}
              <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
                🎓 Individual Credentials
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {studentCredentials.credentials.map((cred, index) => (
                  <Card key={cred.credentialId} variant="dark" spacing="md">
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <Typography variant="h5" color="primary" style={{ marginBottom: '0.5rem' }}>
                          Credential #{index + 1}
                        </Typography>
                        <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                          <strong>Assessment/Exam ID:</strong> {cred.assessmentId || cred.examId}
                        </Typography>
                        <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                          <strong>Issued Date:</strong> {new Date(cred.timestamp).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                          <strong>Transaction ID:</strong> 
                          <span style={{ 
                            fontFamily: 'monospace', 
                            fontSize: '0.875rem',
                            wordBreak: 'break-all',
                            marginLeft: '0.5rem'
                          }}>
                            {cred.txId}
                          </span>
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <Badge 
                          variant={cred.score >= 70 ? 'success' : cred.score >= 50 ? 'warning' : 'error'}
                          size="lg"
                        >
                          {cred.score}%
                        </Badge>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleTokenVerify(cred.txId)}
                        >
                          Verify This Token
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card variant="dark" spacing="md">
              <Typography variant="h4" color="error" style={{ marginBottom: '1rem' }}>
                ❌ No Credentials Found
              </Typography>
              <Typography variant="body" color="white">
                {studentCredentials.error}
              </Typography>
            </Card>
          )}
        </Card>
      )}

      {/* Help Section */}
      <HelpSection />
    </Container>
  );
}