import React from 'react';
import styles from './FormGroup.module.scss';

/**
 * FormGroup Component - Form field wrapper with label
 * @param {string} label - Form label
 * @param {boolean} required - Required field indicator
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Form input/select
 * @param {Object} props - Additional props
 */
export default function FormGroup({
  label = '',
  required = false,
  className = '',
  children,
  ...props
}) {
  const groupClasses = [
    styles.formGroup,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} {...props}>
      {label && (
        <label className={styles.formLabel}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
    </div>
  );
}
