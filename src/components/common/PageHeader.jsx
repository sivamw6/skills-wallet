import React from 'react';
import { Typography, Button } from '../ui';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '../../hooks/useNavigation';

/**
 * Common page header component
 * Provides consistent header layout with title, subtitle, and logout button
 */
export default function PageHeader({ 
  title, 
  subtitle, 
  showLogout = true,
  actions = null,
  className = ''
}) {
  const { user } = useAuth();
  const { goToLogin } = useNavigation();
  
  return (
    <div className={`page-header ${className}`} style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3rem',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div>
        <Typography variant="h1" gradient>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body" color="white" style={{ marginTop: '0.5rem' }}>
            {subtitle}
          </Typography>
        )}
        {user?.name && (
          <Typography variant="body" color="white" style={{ marginTop: '0.5rem' }}>
            Welcome back, <strong>{user.name}</strong>
          </Typography>
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {actions}
        {showLogout && (
          <Button variant="danger" onClick={goToLogin}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}

