import React, { Children, isValidElement, cloneElement, useId } from 'react';
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

  const reactId = useId();
  let fieldId;
  let childElement = children;

  if (isValidElement(children)) {
    fieldId = children.props.id || `field-${reactId}`;
    childElement = cloneElement(children, { id: fieldId, ...children.props });
  }

  return (
    <div className={groupClasses} {...props}>
      {label && (
        <label className={styles.formLabel} htmlFor={fieldId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {childElement}
    </div>
  );
}
