import { useState, useEffect } from "react";
import { issueCredential } from "../../service/mockAPI";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Button, 
  Card, 
  Typography, 
  Container, 
  Input,
  Select,
  FormGroup,
  Grid,
  Badge,
  Divider
} from "../../components/ui";

/**
 * Issue Credential Page - Education Provider issues credentials after exam
 * Can be accessed directly or after completing an exam
 */
export default function IssueCredential() {
  const navigate = useNavigate();
  const location = useLocation();
  const [studentId, setStudentId] = useState("student_001");
  const [studentName, setStudentName] = useState("");
  const [examId, setExamId] = useState("exam_001");
  const [score, setScore] = useState(null);
  const [isIssued, setIsIssued] = useState(false);
  const [issuedCredential, setIssuedCredential] = useState(null);

  // Get exam data (for future use)
  // const exam = getExam(examId);

  // Handle data from exam completion
  useEffect(() => {
    if (location.state) {
      const { examId: stateExamId, score: stateScore } = location.state;
      if (stateExamId) setExamId(stateExamId);
      if (stateScore !== undefined) setScore(stateScore);
    }
  }, [location.state]);

  function handleIssueCredential(e) {
    e.preventDefault();
    
    if (score === null) {
      alert("Please complete an exam first or enter a score manually.");
      return;
    }

    const result = issueCredential({
      studentId,
      studentName: studentName || "Student A",
      examId,
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
    <Container variant="default" size="lg" fullHeight>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <Typography variant="h1" gradient primary>
            🎓 Issue Digital Credential
          </Typography>
          <Typography variant="body" color="white" style={{ marginTop: '0.5rem' }}>
            Create and issue a blockchain-verified digital credential for a student's exam completion.
          </Typography>
        </div>
      </div>

      {!isIssued ? (
        <Card variant="glass" size="lg" spacing="lg">
          <Typography variant="h2" color="white" style={{ marginBottom: '1rem' }}>
            Credential Details
          </Typography>
          <Typography variant="body" color="white" style={{ marginBottom: '2rem' }}>
            Fill in the student information and exam details to issue a credential.
          </Typography>

          <form onSubmit={handleIssueCredential}>
            <Grid columns={2} gap="lg" responsive style={{ marginBottom: '2rem' }}>
              <FormGroup label="Student ID">
                <Input
                  variant="dark"
                  size="lg"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID"
                  required
                />
              </FormGroup>

              <FormGroup label="Student Name">
                <Input
                  variant="dark"
                  size="lg"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                  required
                />
              </FormGroup>

              <FormGroup label="Exam ID">
                <Select
                  variant="dark"
                  size="lg"
                   value={examId}
                   onChange={(e) => setExamId(e.target.value)}
                >
                  <option value="exam_001">Exam 001 - Basic Skills</option>
                  <option value="exam_002">Exam 002 - Advanced Topics</option>
                  <option value="exam_003">Exam 003 - Practical Application</option>
                </Select>
              </FormGroup>
            </Grid>

            <Divider />

            <Card variant="dark" style={{ marginBottom: '2rem' }}>
              <Typography variant="h3" color="white" style={{ marginBottom: '1rem' }}>
                Exam Score
              </Typography>
              {score !== null ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <Badge 
                    variant={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'error'} 
                    size="lg"
                    style={{ marginBottom: '1rem', display: 'block', fontSize: '2rem' }}
                  >
                    {score}%
                  </Badge>
                  <Typography variant="body" color="white">Final Score</Typography>
                </div>
              ) : (
                <FormGroup label="Manual Score">
                  <Input
                    variant="dark"
                    size="lg"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    onChange={handleManualScoreChange}
                  />
                </FormGroup>
              )}
            </Card>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
              >
                Issue Credential
              </Button>
              <Button 
                type="button" 
                variant="secondary"
                size="lg"
                onClick={() => navigate("/provider/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card variant="glass" size="lg" spacing="lg">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Typography variant="h2" color="success" style={{ marginBottom: '1rem' }}>
              ✅ Credential Successfully Issued!
            </Typography>
          </div>
          
          <Grid columns={2} gap="lg" responsive style={{ marginBottom: '2rem' }}>
            <Card variant="dark" size="sm">
              <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>Student Name:</Typography>
              <Typography 
                variant="h5" 
                color="primary" 
                style={{ 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                onClick={() => navigate(`/provider/student/${issuedCredential.studentId}`)}
              >
                {issuedCredential.studentName}
              </Typography>
            </Card>
            <Card variant="dark" size="sm">
              <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>Student ID:</Typography>
              <Typography variant="h5" color="white">{issuedCredential.studentId}</Typography>
            </Card>
            <Card variant="dark" size="sm">
              <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>Exam:</Typography>
              <Typography variant="h5" color="white">{issuedCredential.examId}</Typography>
            </Card>
            <Card variant="dark" size="sm">
              <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>Credential ID:</Typography>
              <Typography variant="h5" color="white">{issuedCredential.credentialId}</Typography>
            </Card>
            <Card variant="dark" size="sm">
              <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>Issue Date:</Typography>
              <Typography variant="h5" color="white">{new Date(issuedCredential.timestamp).toLocaleDateString()}</Typography>
            </Card>
            <Card variant="dark" size="sm">
              <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>Score:</Typography>
              <Badge 
                variant={issuedCredential.score >= 70 ? 'success' : issuedCredential.score >= 50 ? 'warning' : 'error'} 
                size="lg"
              >
                {issuedCredential.score}%
              </Badge>
            </Card>
          </Grid>

          <Card variant="glass" size="sm" style={{ marginBottom: '2rem' }}>
            <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>Blockchain Transaction ID:</Typography>
            <Typography variant="h5" color="primary" style={{ 
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              background: 'rgba(78, 205, 196, 0.1)',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(78, 205, 196, 0.2)'
            }}>
              {issuedCredential.txId}
            </Typography>
          </Card>

          <Card variant="glass" size="sm" style={{ 
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Typography variant="h3">🔗</Typography>
              <Typography variant="body" color="white">
                This credential has been recorded on the blockchain and is now verifiable by any HR department.
              </Typography>
            </div>
          </Card>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="primary"
              size="lg"
              onClick={() => navigate("/provider/dashboard")}
            >
              Back to Dashboard
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => navigate("/provider/chain")}
            >
              View All Records
            </Button>
          </div>
        </Card>
      )}
    </Container>
  );
}