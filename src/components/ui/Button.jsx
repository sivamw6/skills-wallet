import React from 'react';
import styles from './Button.module.scss';

/**
 * Button Component - Reusable button with multiple variants
 * @param {string} variant - Button variant: 'primary', 'secondary', 'success', 'danger'
 * @param {string} size - Button size: 'sm', 'md', 'lg'
 * @param {boolean} loading - Loading state
 * @param {boolean} disabled - Disabled state
 * @param {boolean} fullWidth - Full width button
 * @param {string} className - Additional CSS classes
 * @param {React.Component} as - Component to render as (e.g., Link)
 * @param {React.ReactNode} children - Button content
 * @param {Object} props - Additional props
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  as: Component = 'button',
  children,
  ...props
}) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner}></span>}
      <span className={loading ? styles.loadingText : ''}>{children}</span>
    </Component>
  );
}
