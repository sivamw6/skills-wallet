import React from 'react';
import { Button, Typography, Grid, Card } from '../ui';

/**
 * Verification Result Component
 * Displays verification results in a structured format
 */
export default function VerificationResult({ result, onClear }) {
  if (!result) return null;

  return (
    <Card variant="glass" size="lg" spacing="lg">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Typography variant="h2" color="white">
          Verification Result
        </Typography>
        <Button variant="secondary" size="md" onClick={onClear}>
          Clear Result
        </Button>
      </div>

      {result.valid ? (
        <div>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '2rem', 
            padding: '1rem', 
            background: 'rgba(16, 185, 129, 0.1)', 
            borderRadius: '0.5rem', 
            border: '1px solid rgba(16, 185, 129, 0.3)' 
          }}>
            <Typography variant="h3" color="success" style={{ marginBottom: '0.5rem' }}>
              ✅ Credential Verified - Candidate Qualified
            </Typography>
          </div>
          
          <div>
            <Typography variant="h3" color="white" style={{ marginBottom: '1.5rem' }}>
              Candidate Information
            </Typography>
            <Grid columns={2} gap="md" responsive>
              <CandidateInfoItem label="Student Name" value={result.credential.studentName} />
              <CandidateInfoItem label="Student ID" value={result.credential.studentId} />
              <CandidateInfoItem label="Assessment ID" value={result.credential.assessmentId} />
              <CandidateInfoItem 
                label="Performance Score" 
                value={`${result.credential.score}%`} 
                color="success" 
              />
              <CandidateInfoItem 
                label="Issue Date" 
                value={new Date(result.credential.timestamp).toLocaleDateString()} 
              />
              <Card variant="dark" size="sm">
                <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>
                  Transaction ID:
                </Typography>
                <Typography variant="body" color="white" style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {result.credential.txId}
                </Typography>
              </Card>
            </Grid>
          </div>

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: 'rgba(46, 134, 171, 0.1)', 
            borderRadius: '0.5rem', 
            border: '1px solid rgba(46, 134, 171, 0.3)' 
          }}>
            <Typography variant="body" color="white" style={{ textAlign: 'center' }}>
              <strong>🔗 Blockchain Verified:</strong> This credential has been recorded on the blockchain and is tamper-proof.
            </Typography>
          </div>
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          background: 'rgba(239, 68, 68, 0.1)', 
          borderRadius: '0.5rem', 
          border: '1px solid rgba(239, 68, 68, 0.3)' 
        }}>
          <Typography variant="h3" color="error" style={{ marginBottom: '1rem' }}>
            ❌ Credential Verification Failed
          </Typography>
          <Typography variant="body" color="white">
            {result.error || "The credential could not be verified. Please check the ID and try again."}
          </Typography>
        </div>
      )}
    </Card>
  );
}

/**
 * Candidate Info Item Component
 */
function CandidateInfoItem({ label, value, color = "white" }) {
  return (
    <Card variant="dark" size="sm">
      <Typography variant="body" color="gray" style={{ marginBottom: '0.5rem' }}>
        {label}:
      </Typography>
      <Typography variant="h5" color={color}>
        {value}
      </Typography>
    </Card>
  );
}
