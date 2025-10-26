import React from 'react';
import { Card, Typography } from '../ui';

/**
 * Reusable stats card component
 * Displays a metric with value, label, and description
 */
export default function StatsCard({ 
  value, 
  label, 
  description, 
  color = 'primary',
  variant = 'glass',
  hover = true,
  className = ''
}) {
  return (
    <Card variant={variant} hover={hover} className={className}>
      <div style={{ textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          color={color} 
          style={{ marginBottom: '0.5rem' }}
        >
          {value}
        </Typography>
        <Typography 
          variant="h4" 
          color="white" 
          style={{ marginBottom: '0.5rem' }}
        >
          {label}
        </Typography>
        <Typography variant="body" color="white">
          {description}
        </Typography>
      </div>
    </Card>
  );
}

