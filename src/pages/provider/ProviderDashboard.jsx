import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { listCredentials, listAssessments } from "../../service/mockAPI";
import { 
  Button, 
  Card, 
  Typography, 
  Container, 
  Grid,
  Badge 
} from "../../components/ui";

/**
 * Education Provider Dashboard - Main hub for credential management
 * Shows available assessments, issued credentials, and quick actions
 */
export default function ProviderDashboard() {
  const { session, setSession } = useAuth();
  const navigate = useNavigate();
  const credentials = listCredentials();
  const assessments = listAssessments();

  function handleLogout() {
    setSession(null);
    navigate("/login", { replace: true });
  }
  
  return (
    <Container variant="default" size="lg" fullHeight>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <Typography variant="h1" gradient primary>
            🎓 Education Provider Dashboard
          </Typography>
          <Typography variant="body" color="white" style={{ marginTop: '0.5rem' }}>
            Welcome back, <strong>{session?.name || "Provider"}</strong>
          </Typography>
        </div>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      {/* Stats Grid */}
      <Grid columns={3} gap="lg" responsive style={{ marginBottom: '3rem' }}>
        <Card variant="glass" hover>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" color="primary" style={{ marginBottom: '0.5rem' }}>
              {assessments.length}
            </Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
              Available Assessments
            </Typography>
            <Typography variant="body" color="white">
              Total assessments in system
            </Typography>
          </div>
        </Card>
        
        <Card variant="glass" hover>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" color="secondary" style={{ marginBottom: '0.5rem' }}>
              {credentials.length}
            </Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
              Issued Credentials
            </Typography>
            <Typography variant="body" color="white">
              Total credentials issued
            </Typography>
          </div>
        </Card>
        
        <Card variant="glass" hover>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" color="success" style={{ marginBottom: '0.5rem' }}>
              {credentials.filter(c => c.score >= 70).length}
            </Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
              Passed Students
            </Typography>
            <Typography variant="body" color="white">
              Students with passing scores
            </Typography>
          </div>
        </Card>
      </Grid>

      {/* Actions Grid */}
      <Grid columns={3} gap="lg" responsive style={{ marginBottom: '3rem' }}>
        <Card variant="glass" hover clickable>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>📝</Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
              Take Assessment
            </Typography>
            <Typography variant="body" color="white" style={{ marginBottom: '1.5rem' }}>
              Complete an existing assessment to earn digital credentials.
            </Typography>
            <Button variant="primary" fullWidth as={Link} to="/assessment">
              Start Assessment
            </Button>
          </div>
        </Card>

        <Card variant="glass" hover clickable>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>🎓</Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
              Issue Credential
            </Typography>
            <Typography variant="body" color="white" style={{ marginBottom: '1.5rem' }}>
              Issue a digital credential for a completed assessment.
            </Typography>
            <Button variant="primary" fullWidth as={Link} to="/provider/issue">
              Issue Credential
            </Button>
          </div>
        </Card>

        <Card variant="glass" hover clickable>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>🔗</Typography>
            <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
              Blockchain Records
            </Typography>
            <Typography variant="body" color="white" style={{ marginBottom: '1.5rem' }}>
              View all issued credentials recorded on the blockchain.
            </Typography>
            <Button variant="primary" fullWidth as={Link} to="/provider/chain">
              View Records
            </Button>
          </div>
        </Card>
      </Grid>

      {/* Recent Credentials */}
      <Card variant="glass" size="lg">
        <Typography variant="h3" color="white" style={{ marginBottom: '2rem' }}>
          Recently Issued Credentials
        </Typography>
        
        {credentials.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>📋</Typography>
            <Typography variant="body" color="white" style={{ marginBottom: '0.5rem' }}>
              No credentials issued yet.
            </Typography>
            <Typography variant="body" color="white">
              Start by creating an assessment or issuing a credential manually.
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {credentials.slice(0, 5).map(cred => (
              <Card key={cred.credentialId} variant="dark" style={{ 
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <Typography 
                      variant="h5" 
                      color="primary" 
                      style={{ 
                        marginBottom: '0.5rem',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                      onClick={() => navigate(`/provider/student/${cred.studentId}`)}
                    >
                      {cred.studentName}
                    </Typography>
                    <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                      <strong>Assessment:</strong> {cred.assessmentId}
                    </Typography>
                    <Typography variant="body" color="white" style={{ marginBottom: '0.25rem' }}>
                      <strong>Student ID:</strong> {cred.studentId}
                    </Typography>
                    <Typography variant="body" color="white">
                      <strong>Issued:</strong> {new Date(cred.timestamp).toLocaleDateString()}
                    </Typography>
                  </div>
                  <Badge 
                    variant={cred.score >= 70 ? 'success' : cred.score >= 50 ? 'warning' : 'error'}
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

      {/* Info Section */}
      <Card variant="dark" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
          About Digital Credentials
        </Typography>
        <Typography variant="body" color="white" style={{ marginBottom: '1rem' }}>
          Digital credentials issued through this system are:
        </Typography>
        <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Blockchain-verified:</strong> Immutable and tamper-proof
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Instantly verifiable:</strong> Can be checked by any verifier
          </li>
          <li>
            <strong>Portable:</strong> Students can share them anywhere
          </li>
        </ul>
      </Card>
    </Container>
  );
}