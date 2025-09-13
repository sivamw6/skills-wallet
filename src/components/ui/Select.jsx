import React from 'react';
import styles from './Select.module.scss';

/**
 * Select Component - Reusable select dropdown
 * @param {string} variant - Select variant: 'default', 'dark', 'outlined'
 * @param {string} size - Select size: 'sm', 'md', 'lg'
 * @param {boolean} error - Error state
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional props
 */
export default function Select({
  variant = 'default',
  size = 'md',
  error = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  const selectClasses = [
    styles.select,
    styles[variant],
    styles[size],
    error && styles.error,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <select className={selectClasses} disabled={disabled} {...props}>
      {children}
    </select>
  );
}
