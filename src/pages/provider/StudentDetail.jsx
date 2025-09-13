import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listCredentials, listChainTx } from "../../service/mockAPI";
import { 
  Button, 
  Card, 
  Typography, 
  Container, 
  Badge,
  Grid
} from "../../components/ui";

/**
 * Student Detail Page - Shows comprehensive information about a specific student
 * Displays all credentials, blockchain records, and assessment history
 */
export default function StudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [studentCredentials, setStudentCredentials] = useState([]);
  const [studentTransactions, setStudentTransactions] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    // Get all credentials and filter by studentId
    const allCredentials = listCredentials();
    const allTransactions = listChainTx();
    
    const studentCreds = allCredentials.filter(cred => cred.studentId === studentId);
    const studentTxs = allTransactions.filter(tx => tx.studentId === studentId);
    
    setStudentCredentials(studentCreds);
    setStudentTransactions(studentTxs);
    
    // Get student info from the first credential (if exists)
    if (studentCreds.length > 0) {
      setStudentInfo({
        studentId: studentCreds[0].studentId,
        studentName: studentCreds[0].studentName,
        totalCredentials: studentCreds.length,
        averageScore: Math.round(studentCreds.reduce((sum, cred) => sum + cred.score, 0) / studentCreds.length),
        latestCredential: studentCreds[0] // Most recent
      });
    }
  }, [studentId]);

  function getScoreVariant(score) {
    if (score >= 90) return 'success';
    if (score >= 80) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  }

  if (!studentInfo) {
    return (
      <Container variant="default" size="lg" fullHeight>
        <Card variant="glass" size="lg" spacing="lg">
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>👤</Typography>
            <Typography variant="h3" color="white" style={{ marginBottom: '1rem' }}>
              Student Not Found
            </Typography>
            <Typography variant="body" color="white" style={{ marginBottom: '2rem' }}>
              No credentials found for student ID: {studentId}
            </Typography>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/provider/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </Container>
    );
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
            👤 Student Profile
          </Typography>
          <Typography variant="h3" color="white" style={{ marginTop: '0.5rem' }}>
            {studentInfo.studentName}
          </Typography>
          <Typography variant="body" color="white">
            Student ID: {studentInfo.studentId}
          </Typography>
        </div>
        <Button variant="secondary" onClick={() => navigate("/provider/dashboard")}>
          Back to Dashboard
        </Button>
      </div>

      {/* Student Stats */}
      <Grid columns={3} gap="lg" responsive style={{ marginBottom: '3rem' }}>
        <Card variant="glass" hover>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" color="primary" style={{ marginBottom: '0.5rem' }}>
              {studentInfo.totalCredentials}
            </Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
              Total Credentials
            </Typography>
            <Typography variant="body" color="white">
              Issued credentials
            </Typography>
          </div>
        </Card>
        
        <Card variant="glass" hover>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" color="secondary" style={{ marginBottom: '0.5rem' }}>
              {studentInfo.averageScore}%
            </Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
              Average Score
            </Typography>
            <Typography variant="body" color="white">
              Overall performance
            </Typography>
          </div>
        </Card>
        
        <Card variant="glass" hover>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" color="success" style={{ marginBottom: '0.5rem' }}>
              {studentCredentials.filter(c => c.score >= 70).length}
            </Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
              Passed Assessments
            </Typography>
            <Typography variant="body" color="white">
              Successful completions
            </Typography>
          </div>
        </Card>
      </Grid>

      {/* All Credentials */}
      <Card variant="glass" size="lg" spacing="lg" style={{ marginBottom: '3rem' }}>
        <Typography variant="h2" color="white" style={{ marginBottom: '2rem' }}>
          All Issued Credentials
        </Typography>
        
        {studentCredentials.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>📋</Typography>
            <Typography variant="body" color="white">
              No credentials issued yet for this student.
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {studentCredentials.map(cred => (
              <Card key={cred.credentialId} variant="dark" style={{ 
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <Typography variant="h5" color="white" style={{ marginBottom: '0.5rem' }}>
                      {cred.assessmentId}
                    </Typography>
                    <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                      <strong>Credential ID:</strong> {cred.credentialId}
                    </Typography>
                    <Typography variant="body" color="white">
                      <strong>Issued:</strong> {new Date(cred.timestamp).toLocaleDateString()}
                    </Typography>
                  </div>
                  <Badge 
                    variant={getScoreVariant(cred.score)}
                    size="lg"
                  >
                    {cred.score}%
                  </Badge>
                </div>
                
                <div style={{ 
                  background: 'rgba(78, 205, 196, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(78, 205, 196, 0.2)'
                }}>
                  <Typography variant="body" color="gray" style={{ marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                    <strong>Transaction ID (Token):</strong>
                  </Typography>
                  <Typography variant="body" color="primary" style={{ 
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    wordBreak: 'break-all'
                  }}>
                    {cred.txId}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Blockchain Records */}
      <Card variant="glass" size="lg" spacing="lg">
        <Typography variant="h2" color="white" style={{ marginBottom: '2rem' }}>
          Blockchain Transaction History
        </Typography>
        
        {studentTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>🔗</Typography>
            <Typography variant="body" color="white">
              No blockchain transactions found for this student.
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {studentTransactions.map(tx => (
              <Card key={tx.txId} variant="dark" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1.5rem'
              }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="body" color="primary" style={{ 
                    fontFamily: 'monospace',
                    marginBottom: '0.5rem',
                    wordBreak: 'break-all'
                  }}>
                    {tx.txId}
                  </Typography>
                  <Typography variant="h5" color="white" style={{ marginBottom: '0.5rem' }}>
                    {tx.assessmentId}
                  </Typography>
                  <Typography variant="body" color="gray">
                    Recorded {new Date(tx.timestamp).toLocaleDateString()}
                  </Typography>
                </div>
                <Badge 
                  variant={getScoreVariant(tx.score)}
                  size="lg"
                >
                  {tx.score}%
                </Badge>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </Container>
  );
}
