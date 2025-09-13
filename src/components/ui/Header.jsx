import React from 'react';
import Typography from './Typography';
import styles from './Header.module.scss';

/**
 * Header Component - Page header with title and subtitle
 * @param {string} title - Main title
 * @param {string} subtitle - Subtitle text
 * @param {string} variant - Header variant: 'default', 'centered'
 * @param {boolean} gradient - Apply gradient to title
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional props
 */
export default function Header({
  title = '',
  subtitle = '',
  variant = 'default',
  gradient = false,
  className = '',
  ...props
}) {
  const headerClasses = [
    styles.header,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClasses} {...props}>
      <Typography 
        variant="h1" 
        gradient={gradient} 
        primary={gradient}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body" color="white">
          {subtitle}
        </Typography>
      )}
    </div>
  );
}
