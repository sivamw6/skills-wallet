import React from 'react';
import styles from './Badge.module.scss';

/**
 * Badge Component - Reusable badge for status indicators
 * @param {string} variant - Badge variant: 'success', 'warning', 'error', 'info', 'neutral'
 * @param {string} size - Badge size: 'sm', 'md', 'lg'
 * @param {boolean} outlined - Outlined style
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Badge content
 * @param {Object} props - Additional props
 */
export default function Badge({
  variant = 'neutral',
  size = 'md',
  outlined = false,
  className = '',
  children,
  ...props
}) {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[size],
    outlined && styles.outlined,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
}
