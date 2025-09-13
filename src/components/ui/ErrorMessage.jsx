import React from 'react';
import styles from './ErrorMessage.module.scss';

/**
 * ErrorMessage Component - Reusable error message display
 * @param {string} variant - Error variant: 'error', 'warning', 'info'
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Error message content
 * @param {Object} props - Additional props
 */
export default function ErrorMessage({
  variant = 'error',
  className = '',
  children,
  ...props
}) {
  const errorClasses = [
    styles.errorMessage,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={errorClasses} {...props}>
      {children}
    </div>
  );
}
