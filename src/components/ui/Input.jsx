import React from 'react';
import styles from './Input.module.scss';

/**
 * Input Component - Reusable input field
 * @param {string} variant - Input variant: 'default', 'dark', 'outlined'
 * @param {string} size - Input size: 'sm', 'md', 'lg'
 * @param {string} type - Input type: 'text', 'email', 'password', 'number', etc.
 * @param {string} label - Input label
 * @param {string} placeholder - Placeholder text
 * @param {string} helperText - Helper text below input
 * @param {boolean} error - Error state
 * @param {boolean} disabled - Disabled state
 * @param {boolean} multiline - Multiline input (textarea)
 * @param {number} rows - Number of rows for textarea
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional props
 */
export default function Input({
  variant = 'default',
  size = 'md',
  type = 'text',
  label = '',
  placeholder = '',
  helperText = '',
  error = false,
  disabled = false,
  multiline = false,
  rows = 3,
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

  const InputComponent = multiline ? 'textarea' : 'input';
  const inputProps = multiline ? { rows, ...props } : { type, ...props };

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <InputComponent
        className={inputClasses}
        placeholder={placeholder}
        disabled={disabled}
        {...inputProps}
      />
      {helperText && (
        <div className={`${styles.helperText} ${error ? styles.error : ''}`}>
          {helperText}
        </div>
      )}
    </div>
  );
}
