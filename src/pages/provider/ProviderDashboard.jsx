import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { listCredentials, listExams, listSubjects } from "../../service/mockAPI";
import { 
  Button, 
  Card, 
  Typography, 
  Container, 
  Grid,
  Badge 
} from "../../components/ui";
import "../../styles/utilities.scss";

/**
 * Education Provider Dashboard - Main hub for credential management
 * Shows available exams, issued credentials, and quick actions
 */
export default function ProviderDashboard() {
  const { session, setSession } = useAuth();
  const navigate = useNavigate();
  const credentials = listCredentials();
  const exams = listExams();
  const subjects = listSubjects();

  function handleLogout() {
    setSession(null);
    navigate("/login", { replace: true });
  }
  
  return (
    <Container variant="default" size="lg" fullHeight>
      {/* Header */}
      <div className="page-header">
        <div>
          <Typography variant="h1" gradient color="primary">
            🎓 Education Provider Dashboard
          </Typography>
          <Typography variant="body" color="white" className="mt-2">
            Welcome back, <strong>{session?.name || "Provider"}</strong>
          </Typography>
        </div>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      {/* Stats Grid */}
      <Grid columns={4} gap="lg" responsive className="mb-12">
        <Card variant="glass" hover>
          <div className="stats-card">
            <Typography variant="h2" color="primary" className="mb-2">
              {subjects.length}
            </Typography>
            <Typography variant="h4" color="white" className="mb-2">
              Subjects
            </Typography>
            <Typography variant="body" color="white">
              Total subjects available
            </Typography>
          </div>
        </Card>
        
        <Card variant="glass" hover>
          <div className="stats-card">
            <Typography variant="h2" color="secondary" className="mb-2">
              {exams.length}
            </Typography>
            <Typography variant="h4" color="white" className="mb-2">
              Exams
            </Typography>
            <Typography variant="body" color="white">
              Total exams available
            </Typography>
          </div>
        </Card>
        
        <Card variant="glass" hover>
          <div className="stats-card">
            <Typography variant="h2" color="success" className="mb-2">
              {credentials.length}
            </Typography>
            <Typography variant="h4" color="white" className="mb-2">
              Issued Credentials
            </Typography>
            <Typography variant="body" color="white">
              Total credentials issued
            </Typography>
          </div>
        </Card>
        
        <Card variant="glass" hover>
          <div className="stats-card">
            <Typography variant="h2" color="warning" className="mb-2">
              {credentials.filter(c => c.score >= 70).length}
            </Typography>
            <Typography variant="h4" color="white" className="mb-2">
              Passed Students
            </Typography>
            <Typography variant="body" color="white">
              Students with passing scores
            </Typography>
          </div>
        </Card>
      </Grid>

      {/* Actions Grid */}
      <div className="grid-container">
        <Card variant="glass" hover clickable className="action-card">
          <div className="action-card-content">
            <Typography variant="h2" className="mb-4">📚</Typography>
            <Typography variant="h4" color="white" className="mb-4">
              Subject Management
            </Typography>
            <Typography variant="body" color="white" className="mb-6 flex-1">
              Manage subjects, classes, and exams in a structured hierarchy.
            </Typography>
            <Button variant="primary" fullWidth as={Link} to="/provider/subjects" className="mt-auto">
              Manage Subjects
            </Button>
          </div>
        </Card>

        <Card variant="glass" hover clickable className="action-card">
          <div className="action-card-content">
            <Typography variant="h2" className="mb-4">📝</Typography>
            <Typography variant="h4" color="white" className="mb-4">
              Take Exam (Simulation)
            </Typography>
            <Typography variant="body" color="white" className="mb-6 flex-1">
              Complete authentic, skill-based exams that measure practical competencies. 
              Generate tailored evaluations for specific roles and difficulty levels.
            </Typography>
            <Button variant="primary" fullWidth as={Link} to="/exam" className="mt-auto">
              Start Exam
            </Button>
          </div>
        </Card>

        <Card variant="glass" hover clickable className="action-card">
          <div className="action-card-content">
            <Typography variant="h2" className="mb-4">🎓</Typography>
            <Typography variant="h4" color="white" className="mb-4">
              Issue Credential
            </Typography>
            <Typography variant="body" color="white" className="mb-6 flex-1">
              Issue a digital credential for a completed exam.
            </Typography>
            <Button variant="primary" fullWidth as={Link} to="/provider/issue" className="mt-auto">
              Issue Credential
            </Button>
          </div>
        </Card>

        <Card variant="glass" hover clickable className="action-card">
          <div className="action-card-content">
            <Typography variant="h2" className="mb-4">🔗</Typography>
            <Typography variant="h4" color="white" className="mb-4">
              Blockchain Records
            </Typography>
            <Typography variant="body" color="white" className="mb-6 flex-1">
              View all issued credentials recorded on the blockchain.
            </Typography>
            <Button variant="primary" fullWidth as={Link} to="/provider/chain" className="mt-auto">
              View Records
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Credentials */}
      <Card variant="glass" size="lg">
        <Typography variant="h3" color="white" className="mb-8">
          Recently Issued Credentials
        </Typography>
        
        {credentials.length === 0 ? (
          <div className="empty-state">
            <Typography variant="h2" className="mb-4">📋</Typography>
            <Typography variant="body" color="white" className="mb-2">
              No credentials issued yet.
            </Typography>
            <Typography variant="body" color="white">
              Start by creating an exam or issuing a credential manually.
            </Typography>
          </div>
        ) : (
          <div className="flex flex-column gap-4">
            {credentials.slice(0, 5).map(cred => (
              <Card key={cred.credentialId} variant="dark" className="p-6">
                <div className="credential-header">
                  <div className="credential-body">
                    <Typography
                      variant="h5"
                      color="primary"
                      style={{
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                      onClick={() => navigate(`/provider/student/${cred.studentId}`)}
                    >
                      {cred.studentName || 'Student A'}
                    </Typography>
                    <Typography variant="body" color="white" className="mb-1">
                      <strong>Exam ID:</strong> {cred.examId}
                    </Typography>
                    <Typography variant="body" color="white" className="mb-1">
                      <strong>Issued:</strong> {new Date(cred.timestamp).toLocaleDateString()}
                    </Typography>
                  </div>
                  <div className="flex flex-column items-end gap-2">
                    <Badge 
                      variant={cred.score >= 70 ? 'success' : cred.score >= 50 ? 'warning' : 'error'}
                      size="lg"
                    >
                      {cred.score}%
                    </Badge>
                    <Typography 
                      variant="body" 
                      color="gray" 
                      className="mono-text"
                    >
                      {cred.txId}
                    </Typography>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Info */}
      <Card variant="dark" className="mt-8 p-6">
        <Typography variant="h4" color="white" className="mb-4">
          ℹ️ Getting Started
        </Typography>
        <Typography variant="body" color="white" className="mb-4">
          Welcome to your Digital Skills Wallet dashboard. Here's what you can do:
        </Typography>
        <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
          <li className="mb-2">
            <strong>Manage Subjects:</strong> Create and organize your educational content by subjects, classes, and exams.
          </li>
          <li className="mb-2">
            <strong>Take Exams:</strong> Complete skill-based assessments to demonstrate your competencies.
          </li>
        </ul>
      </Card>
    </Container>
  );
}