import React from 'react';
import styles from './Divider.module.scss';

/**
 * Divider Component - Reusable divider with text
 * @param {string} text - Divider text
 * @param {string} variant - Divider variant: 'default', 'gradient'
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional props
 */
export default function Divider({
  text = '',
  variant = 'default',
  className = '',
  ...props
}) {
  const dividerClasses = [
    styles.divider,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={dividerClasses} {...props}>
      {text && <span className={styles.dividerText}>{text}</span>}
      <div className={styles.dividerLine}></div>
    </div>
  );
}
