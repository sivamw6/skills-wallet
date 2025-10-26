import React from 'react';
import { Card, Typography, Button } from '../ui';

/**
 * Reusable empty state component
 * Displays when there's no data to show
 */
export default function EmptyState({ 
  icon = '📋',
  title = 'No Data Available',
  description = 'There is no data to display at this time.',
  actionText,
  onAction,
  actionVariant = 'primary',
  className = ''
}) {
  return (
    <Card variant="dark" className={`empty-state ${className}`} style={{
      textAlign: 'center',
      padding: '3rem'
    }}>
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        {icon}
      </Typography>
      <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
        {title}
      </Typography>
      <Typography variant="body" color="white" style={{ marginBottom: '2rem' }}>
        {description}
      </Typography>
      {actionText && onAction && (
        <Button 
          variant={actionVariant} 
          size="lg" 
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </Card>
  );
}

