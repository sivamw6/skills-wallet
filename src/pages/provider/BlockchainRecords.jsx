import { listChainTx } from "../../service/mockAPI";
import { useNavigate } from "react-router-dom";
import { 
  Button, 
  Card, 
  Typography, 
  Container, 
  Badge,
  Grid
} from "../../components/ui";

/**
 * Blockchain Records Page - Shows mock blockchain transaction history
 * Displays all issued credentials with their transaction IDs
 */
export default function BlockchainRecords() {
  const navigate = useNavigate();
  const txs = listChainTx();

  function getScoreVariant(score) {
    if (score >= 90) return 'success';
    if (score >= 80) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  }

  function getScoreLabel(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Pass';
    return 'Fail';
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
            🔗 Blockchain Records
          </Typography>
          <Typography variant="body" color="white" style={{ marginTop: '0.5rem' }}>
            Each issued credential is recorded with a unique transaction ID to simulate blockchain immutability and tamper-proof verification.
          </Typography>
        </div>
      </div>

      {/* Records List */}
      <Card variant="glass" size="lg" spacing="lg">
        <Typography variant="h2" color="white" style={{ marginBottom: '2rem' }}>
          Transaction History
        </Typography>
        
        {txs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>📋</Typography>
            <Typography variant="body" color="white" style={{ marginBottom: '0.5rem' }}>
              No transactions recorded yet.
            </Typography>
            <Typography variant="body" color="white">
              Start by issuing credentials to see them appear here.
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {txs.map(tx => (
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
                  <Typography 
                    variant="h5" 
                    color="primary" 
                    style={{ 
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                    onClick={() => navigate(`/provider/student/${tx.studentId}`)}
                  >
                    {tx.studentName}
                  </Typography>
                  <Typography variant="body" color="gray">
                    {tx.assessmentId} • Issued {new Date(tx.timestamp).toLocaleDateString()}
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

      {/* Score Legend */}
      <Card variant="glass" size="lg" spacing="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h3" color="white" style={{ marginBottom: '1.5rem' }}>
          Score Legend
        </Typography>
        <Grid columns={4} gap="md" responsive>
          <Card variant="dark" size="sm">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: '#10b981' 
              }}></div>
              <Typography variant="body" color="white">Excellent (90%+)</Typography>
            </div>
          </Card>
          <Card variant="dark" size="sm">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: '#10b981' 
              }}></div>
              <Typography variant="body" color="white">Good (80-89%)</Typography>
            </div>
          </Card>
          <Card variant="dark" size="sm">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: '#f59e0b' 
              }}></div>
              <Typography variant="body" color="white">Pass (70-79%)</Typography>
            </div>
          </Card>
          <Card variant="dark" size="sm">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: '#ef4444' 
              }}></div>
              <Typography variant="body" color="white">Fail (&lt;70%)</Typography>
            </div>
          </Card>
        </Grid>
      </Card>

      {/* Back Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/provider/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </Container>
  );
}