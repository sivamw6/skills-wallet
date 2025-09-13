import React from 'react';
import { Typography, Grid, Card } from '../ui';

/**
 * Help Section Component
 * Displays information about HR Credential Verification
 */
export default function HelpSection() {
  return (
    <Card variant="glass" size="lg" spacing="lg">
      <Typography variant="h2" color="white" centered style={{ marginBottom: '2rem' }}>
        About HR Credential Verification
      </Typography>
      
      <Grid columns={2} gap="lg" responsive style={{ marginBottom: '2rem' }}>
        <HowItWorksCard />
        <BenefitsCard />
      </Grid>
      
      <Card variant="glass" size="sm" spacing="none">
        <Typography variant="body" color="white" centered style={{ 
          fontStyle: 'italic',
          background: 'rgba(46, 134, 171, 0.1)',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(46, 134, 171, 0.2)'
        }}>
          This system ensures that all candidate credentials are authentic and verified, 
          helping you make confident hiring decisions based on reliable data.
        </Typography>
      </Card>
    </Card>
  );
}

/**
 * How It Works Card Component
 */
function HowItWorksCard() {
  const steps = [
    "Enter the candidate's Transaction ID or Credential ID",
    "Our system verifies the credential against the blockchain",
    "View detailed candidate information and performance scores",
    "Make informed hiring decisions based on verified data"
  ];

  return (
    <Card variant="dark" size="md" spacing="sm">
      <Typography variant="h3" color="primary" style={{ marginBottom: '1rem' }}>
        How it works:
      </Typography>
      <StepsList steps={steps} icon="→" color="#4ecdc4" />
    </Card>
  );
}

/**
 * Benefits Card Component
 */
function BenefitsCard() {
  const benefits = [
    "Instant verification of candidate credentials",
    "Tamper-proof data from blockchain technology",
    "Detailed performance metrics and recommendations",
    "Streamlined hiring process with verified qualifications"
  ];

  return (
    <Card variant="dark" size="md" spacing="sm">
      <Typography variant="h3" color="success" style={{ marginBottom: '1rem' }}>
        Benefits for HR:
      </Typography>
      <StepsList steps={benefits} icon="✓" color="#10b981" />
    </Card>
  );
}

/**
 * Steps List Component
 */
function StepsList({ steps, icon, color }) {
  return (
    <ul style={{ 
      listStyle: 'none', 
      padding: 0, 
      margin: 0,
      color: 'rgba(255, 255, 255, 0.9)'
    }}>
      {steps.map((step, index) => (
        <li key={index} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
          <span style={{ 
            position: 'absolute', 
            left: 0, 
            color: color,
            fontWeight: 'bold'
          }}>{icon}</span>
          {step}
        </li>
      ))}
    </ul>
  );
}
