import React from 'react';
import { Card, Typography, Button } from '../ui';

/**
 * Reusable action card component
 * Displays an action with icon, title, description, and button
 */
export default function ActionCard({ 
  icon,
  title,
  description,
  buttonText,
  buttonVariant = 'primary',
  buttonTo,
  buttonAs: ButtonComponent = Button,
  onClick,
  className = '',
  ...props
}) {
  return (
    <Card 
      variant="glass" 
      hover 
      clickable 
      className={`action-card ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="action-content" style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <div style={{ flex: 1 }}>
          {icon && (
            <Typography variant="h2" style={{ marginBottom: '1rem' }}>
              {icon}
            </Typography>
          )}
          <Typography 
            variant="h4" 
            color="white" 
            style={{ marginBottom: '1rem' }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body" 
            color="white" 
            className="action-description"
          >
            {description}
          </Typography>
        </div>
        <Button 
          variant={buttonVariant} 
          fullWidth 
          as={ButtonComponent}
          to={buttonTo}
          className="action-button"
          style={{ marginTop: 'auto' }}
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}

