import React from 'react';
import styles from './Input.module.scss';

/**
 * Input Component - Reusable input field
 * @param {string} variant - Input variant: 'default', 'dark', 'outlined'
 * @param {string} size - Input size: 'sm', 'md', 'lg'
 * @param {string} type - Input type: 'text', 'email', 'password', 'number', etc.
 * @param {string} placeholder - Placeholder text
 * @param {boolean} error - Error state
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional props
 */
export default function Input({
  variant = 'default',
  size = 'md',
  type = 'text',
  placeholder = '',
  error = false,
  disabled = false,
  className = '',
  ...props
}) {
  const inputClasses = [
    styles.input,
    styles[variant],
    styles[size],
    error && styles.error,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      type={type}
      className={inputClasses}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
  );
}
